# BMYBrand AI Chatbot — Complete Implementation Plan

> **Context:** BMYBrand is a creative/digital agency (branding, web dev, ecommerce, UI/UX, digital marketing, creative production). This plan covers an AI chatbot widget embedded in the Next.js 16 site, plus a separate agent dashboard project. Deployment target: Vercel. Vector DB + Auth + Realtime: Supabase. LLM/Embeddings: OpenAI.

---

## 1. PROJECT STRUCTURE

### 1A. Main Project (bmybrand site — chatbot widget + API)

```
src/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   ├── session/route.ts          # POST: create chat session
│   │   │   ├── message/route.ts          # POST: send message, stream LLM response
│   │   │   ├── handoff/route.ts          # POST: request human handoff
│   │   │   └── history/[sessionId]/route.ts  # GET: fetch chat history
│   │   ├── knowledge/
│   │   │   ├── ingest/route.ts           # POST: upload + process PDF/MD files
│   │   │   ├── documents/route.ts        # GET: list docs, DELETE: remove doc
│   │   │   └── search/route.ts           # POST: vector similarity search (internal use)
│   │   └── agents/
│   │       ├── auth/route.ts             # POST: agent login/logout
│   │       └── status/route.ts           # PATCH: toggle agent online/offline
│   ├── layout.tsx                        # Mount ChatWidget here globally
│   └── ...existing pages
├── components/
│   └── chatbot/
│       ├── ChatWidget.tsx                # Floating launcher button + container
│       ├── ChatWindow.tsx                # Message list with auto-scroll
│       ├── ChatInput.tsx                 # Text input + send
│       ├── ChatMessage.tsx               # Individual message bubble (bot/user/agent)
│       ├── LeadCaptureForm.tsx           # Inline form for name, email, phone
│       ├── TypingIndicator.tsx           # Animated dots during LLM streaming
│       ├── HandoffNotice.tsx             # UI notice when agent connects
│       ├── BookingPrompt.tsx             # Zoom meeting booking CTA
│       └── ChatHeader.tsx                # Brand header + minimize/close controls
├── lib/
│   ├── supabase/
│   │   ├── client.ts                     # Browser Supabase client (anon key)
│   │   ├── server.ts                     # Server Supabase client (service role key)
│   │   └── realtime.ts                   # Realtime subscription helpers
│   ├── openai/
│   │   ├── client.ts                     # OpenAI client singleton
│   │   ├── embeddings.ts                 # Generate embeddings (text-embedding-3-small)
│   │   └── chat.ts                       # LLM completion with streaming (GPT-4o-mini)
│   ├── rag/
│   │   ├── ingest.ts                     # PDF/MD parsing, chunking, embedding, upsert
│   │   ├── retrieve.ts                   # Vector search + context assembly
│   │   └── chunker.ts                    # Text splitter (500 tokens, 50 overlap)
│   ├── chat/
│   │   ├── state-machine.ts             # Conversation FSM logic
│   │   ├── intent-detector.ts           # LLM-based intent classification
│   │   ├── system-prompts.ts            # All system prompts per state
│   │   └── language-detector.ts         # Detect user language, set response language
│   └── utils/
│       ├── rate-limiter.ts              # Per-session rate limiting
│       └── validators.ts                # Input validation (email, phone, etc.)
├── types/
│   └── chat.ts                          # All TypeScript interfaces/types
└── hooks/
    ├── useChatSession.ts                # Session lifecycle hook
    ├── useChatMessages.ts               # Messages + realtime subscription hook
    └── useChatState.ts                  # FSM state management hook
```

### 1B. Agent Dashboard (separate Next.js project)

```
src/
├── app/
│   ├── login/page.tsx                   # Supabase Auth login
│   ├── dashboard/
│   │   ├── page.tsx                     # Session list overview
│   │   ├── chat/[sessionId]/page.tsx    # Live chat with visitor
│   │   └── knowledge/page.tsx           # Upload/manage KB documents
│   └── api/
│       ├── sessions/route.ts            # GET: list sessions, PATCH: assign/close
│       └── messages/route.ts            # POST: agent sends message
├── components/
│   ├── SessionList.tsx                  # Live session list with status badges
│   ├── SessionCard.tsx                  # Individual session preview
│   ├── AgentChatWindow.tsx              # Agent-side chat interface
│   ├── BotToggle.tsx                    # On/off bot per session
│   ├── KnowledgeUploader.tsx            # PDF/MD file upload with drag-drop
│   ├── KnowledgeDocList.tsx             # List uploaded documents
│   ├── CannedResponses.tsx             # Quick reply templates
│   └── AgentStatusToggle.tsx            # Online/offline toggle
├── lib/
│   ├── supabase/                        # Same structure, service role for admin ops
│   └── realtime/                        # Realtime subscriptions for sessions + messages
└── types/
    └── index.ts
```

---

## 2. SUPABASE SETUP

### 2A. Extensions

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- for text search fallback
```

### 2B. Database Schema

```sql
-- Agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  is_online BOOLEAN DEFAULT false,
  max_concurrent_chats INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Chat sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_phone TEXT,
  visitor_language TEXT DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'bot'
    CHECK (status IN ('lead_capture', 'bot', 'handoff_pending', 'agent', 'closed')),
  state TEXT NOT NULL DEFAULT 'GREETING'
    CHECK (state IN ('GREETING', 'LEAD_CAPTURE_NAME', 'LEAD_CAPTURE_EMAIL', 'LEAD_CAPTURE_PHONE', 'KNOWLEDGE_QA', 'BOOKING', 'HANDOFF_REQUESTED', 'AGENT_CONNECTED', 'CLOSED')),
  assigned_agent_id UUID REFERENCES agents(id),
  metadata JSONB DEFAULT '{}',
  bot_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Chat messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'agent', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Knowledge documents (chunked + embedded)
CREATE TABLE knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source_filename TEXT NOT NULL,
  content TEXT NOT NULL,
  chunk_index INT NOT NULL,
  total_chunks INT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Canned responses
CREATE TABLE canned_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_by UUID REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id, created_at);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_sessions_agent ON chat_sessions(assigned_agent_id);
CREATE INDEX idx_knowledge_embedding ON knowledge_documents
  USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);
CREATE INDEX idx_knowledge_source ON knowledge_documents(source_filename);
```

### 2C. Vector Search RPC Function

```sql
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.75,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  source_filename TEXT,
  chunk_index INT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kd.id,
    kd.title,
    kd.content,
    kd.source_filename,
    kd.chunk_index,
    1 - (kd.embedding <=> query_embedding) AS similarity
  FROM knowledge_documents kd
  WHERE 1 - (kd.embedding <=> query_embedding) > match_threshold
  ORDER BY kd.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

### 2D. Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE canned_responses ENABLE ROW LEVEL SECURITY;

-- Chat sessions: anon users can create and read their own sessions (via session_id in metadata)
-- Agents can read all sessions
CREATE POLICY "Anon can insert sessions" ON chat_sessions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read own session" ON chat_sessions
  FOR SELECT TO anon USING (true);  -- filtered by session_id in app layer

CREATE POLICY "Agents full access to sessions" ON chat_sessions
  FOR ALL TO authenticated USING (true);

-- Chat messages: similar pattern
CREATE POLICY "Anon can insert messages" ON chat_messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read session messages" ON chat_messages
  FOR SELECT TO anon USING (true);  -- filtered by session_id in app layer

CREATE POLICY "Agents full access to messages" ON chat_messages
  FOR ALL TO authenticated USING (true);

-- Knowledge documents: only agents can CRUD
CREATE POLICY "Agents manage knowledge" ON knowledge_documents
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Anon can read knowledge" ON knowledge_documents
  FOR SELECT TO anon USING (true);

-- Agents: only authenticated can read/update
CREATE POLICY "Agents can read agents" ON agents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Agents can update own status" ON agents
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
```

### 2E. Realtime Configuration

Enable Realtime on these tables in Supabase Dashboard:

- `chat_sessions` (for agent dashboard to see new sessions, status changes)
- `chat_messages` (for both widget and agent dashboard to receive new messages)
- `agents` (for widget to check agent availability)

---

## 3. NEW DEPENDENCIES (Main Project)

```bash
npm install @supabase/supabase-js ai openai pdf-parse
```

| Package                 | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `@supabase/supabase-js` | Supabase client (DB, auth, realtime, storage)     |
| `ai`                    | Vercel AI SDK for LLM streaming                   |
| `openai`                | OpenAI API client (embeddings + chat completions) |
| `pdf-parse`             | Extract text from uploaded PDFs                   |

### Agent Dashboard Dependencies (separate project)

```bash
npx create-next-app@latest bmybrand-agent-dashboard --typescript --tailwind --app
cd bmybrand-agent-dashboard
npm install @supabase/supabase-js @supabase/ssr react-dropzone sonner
```

---

## 4. ENVIRONMENT VARIABLES

### Main Project (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_CHAT_RATE_LIMIT=20          # messages per minute per session
ZOOM_BOOKING_URL=https://calendly.com/bmybrand/consultation  # or Zoom scheduler link
```

### Agent Dashboard (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 5. RAG PIPELINE

### 5A. Document Ingestion Flow

```
Agent uploads PDF/MD via Dashboard
  → POST /api/knowledge/ingest
    → If PDF: pdf-parse extracts text
    → If MD: read as plain text
    → chunker.ts splits into chunks (500 tokens, 50 token overlap)
    → For each chunk:
      → Generate embedding via text-embedding-3-small (1536 dimensions)
      → Upsert into knowledge_documents table
    → Return success with chunk count
```

### 5B. Chunking Strategy

- **Chunk size:** 500 tokens (~375 words)
- **Overlap:** 50 tokens
- **Split boundaries:** Prefer paragraph breaks > sentence breaks > word breaks
- **Metadata per chunk:** source_filename, chunk_index, total_chunks, title
- **Deduplication:** Before ingesting, delete all existing chunks with same source_filename (allows re-upload/update)

### 5C. Retrieval Flow

```
User sends message
  → Embed user query via text-embedding-3-small
  → Call match_knowledge RPC (threshold: 0.75, top 5)
  → If results found:
    → Assemble context string from top chunks
    → Pass to LLM as system context
  → If no results above threshold:
    → LLM responds with fallback: "I don't have specific information on that.
       Let me connect you with our team." (trigger handoff suggestion)
```

---

## 6. CONVERSATION STATE MACHINE (FSM)

### 6A. States and Transitions

```
GREETING
  → User sends first message
  → Bot introduces itself, asks for name
  → Transition to: LEAD_CAPTURE_NAME

LEAD_CAPTURE_NAME
  → User provides name
  → Store visitor_name on session
  → Ask for email
  → Transition to: LEAD_CAPTURE_EMAIL

LEAD_CAPTURE_EMAIL
  → User provides email (validate format)
  → Store visitor_email on session
  → Ask for phone (mark as optional, offer skip)
  → Transition to: LEAD_CAPTURE_PHONE

LEAD_CAPTURE_PHONE
  → User provides phone OR says skip/no
  → Store visitor_phone if provided
  → Welcome message + "How can I help you today?"
  → Transition to: KNOWLEDGE_QA

KNOWLEDGE_QA
  → Default operational state
  → Every user message:
    1. Detect language (set visitor_language on session if changed)
    2. Classify intent: [general_query, booking_request, human_request, farewell]
    3. Based on intent:
       - general_query → RAG retrieval → LLM response
       - booking_request → Transition to BOOKING
       - human_request → Transition to HANDOFF_REQUESTED
       - farewell → Transition to CLOSED

BOOKING
  → Present Zoom consultation booking link
  → Ask if they need anything else
  → Transition back to: KNOWLEDGE_QA or CLOSED

HANDOFF_REQUESTED
  → Check if any agent is online
  → If yes: update session status to 'handoff_pending', notify agents via realtime
  → If no: inform user, offer to leave a message or book consultation
  → On agent accept → Transition to: AGENT_CONNECTED

AGENT_CONNECTED
  → Bot disabled for this session (bot_enabled = false)
  → All messages routed directly (user <-> agent via realtime)
  → Agent can re-enable bot at any time
  → Agent closes session → Transition to: CLOSED

CLOSED
  → Farewell message
  → Optional: email transcript to visitor
  → No further bot responses
```

### 6B. Intent Detection Prompt

```
You are an intent classifier for BMYBrand, a creative and digital agency.
Classify the user's message into exactly ONE of these intents:
- general_query: Questions about services, pricing, process, company info, or any knowledge-base topic
- booking_request: Wants to schedule a call, meeting, consultation, or demo
- human_request: Wants to talk to a real person, human agent, or representative
- farewell: Saying goodbye, ending the conversation

Respond with ONLY the intent label. Nothing else.
```

### 6C. Language Handling

- Detect language from the user's first substantive message (use OpenAI or a lightweight detection library)
- Store detected language in `chat_sessions.visitor_language`
- All subsequent LLM system prompts include: `"Respond in {{visitor_language}}. Match the user's language at all times."`
- Lead capture form labels should also be dynamically translated by the LLM

---

## 7. SYSTEM PROMPTS

### 7A. Main Chat System Prompt (KNOWLEDGE_QA state)

```
You are BMYBrand's AI assistant. BMYBrand is a creative and digital agency
offering branding, web development, ecommerce solutions, digital marketing,
creative production, and business operations support.

Your role:
- Answer questions about BMYBrand's services, process, and capabilities
  using ONLY the provided knowledge context
- Be friendly, professional, and concise
- If the knowledge context does not contain the answer, say:
  "I don't have specific details on that. Would you like me to connect you
  with one of our team members?"
- Never fabricate information about pricing, timelines, or deliverables
- If the user asks to speak with a human, respond with: [HANDOFF_REQUESTED]
- If the user wants to book a consultation/call, respond with: [BOOKING_REQUESTED]
- Respond in {{visitor_language}}

Knowledge Context:
{{retrieved_chunks}}

Conversation History:
{{recent_messages}}
```

### 7B. Lead Capture Prompts (per sub-state)

These are NOT LLM-generated. Use hardcoded messages per state to guarantee deterministic lead capture. Only use the LLM for language translation of these messages.

```
GREETING:
  "Hi there! 👋 Welcome to BMYBrand. I'm here to help you with branding,
   web development, marketing, and more. Before we get started, may I
   have your name?"

LEAD_CAPTURE_EMAIL:
  "Nice to meet you, {{name}}! What's the best email to reach you at?"

LEAD_CAPTURE_PHONE:
  "Thanks! And your phone number? (This is optional — you can type 'skip'
   to move on.)"

LEAD_COMPLETE:
  "You're all set, {{name}}! How can I help you today?"
```

For multi-language: send these strings through a quick LLM call with prompt:
`"Translate the following message to {{visitor_language}}. Keep the tone friendly and professional. Keep any emojis. Return ONLY the translated text."`

---

## 8. API ROUTE SPECIFICATIONS

### POST /api/chat/session

```
Request: { visitorFingerprint?: string }
Response: { sessionId: string, state: string }

Logic:
  1. Create new row in chat_sessions (status: 'bot', state: 'GREETING')
  2. Insert system greeting message into chat_messages
  3. Return session ID and initial state
```

### POST /api/chat/message

```
Request: {
  sessionId: string,
  content: string
}
Response: ReadableStream (SSE/streaming)

Logic:
  1. Validate session exists and is not closed
  2. Rate limit check (20 msg/min per session)
  3. Insert user message into chat_messages
  4. Load current session state
  5. Run state machine:
     - If lead capture state → validate input, update session, return next prompt
     - If KNOWLEDGE_QA →
       a. Detect intent
       b. If general_query: embed query → vector search → assemble context → stream LLM response
       c. If booking_request: return booking link message
       d. If human_request: trigger handoff flow
       e. If farewell: close session
  6. Insert assistant message into chat_messages
  7. Update session state + updated_at
```

### POST /api/chat/handoff

```
Request: { sessionId: string }
Response: { success: boolean, agentAvailable: boolean }

Logic:
  1. Update session: status = 'handoff_pending'
  2. Query agents where is_online = true
  3. If agents available: return agentAvailable: true
  4. If no agents: return agentAvailable: false
     (client shows "leave message or book consultation" UI)
  5. Realtime will notify agent dashboard of the pending handoff
```

### GET /api/chat/history/[sessionId]

```
Response: { messages: ChatMessage[], session: ChatSession }

Logic:
  1. Fetch all messages for session ordered by created_at
  2. Return with session metadata
```

### POST /api/knowledge/ingest

```
Request: FormData { file: File (PDF or MD), title: string }
Response: { success: boolean, chunksCreated: number }
Headers: Authorization: Bearer <agent_jwt>

Logic:
  1. Authenticate agent via Supabase JWT
  2. Parse file (pdf-parse for PDF, raw text for MD)
  3. Delete existing chunks with same source_filename (for re-uploads)
  4. Split text into chunks
  5. Batch generate embeddings (OpenAI allows batching)
  6. Batch upsert into knowledge_documents
  7. Return chunk count
```

---

## 9. CHATBOT WIDGET (UI SPEC)

### 9A. ChatWidget.tsx (Root Component)

- Floating circular button, bottom-right corner, 60px diameter
- BMYBrand accent color (red/pink from site design: #E63946 or similar)
- Click opens chat panel (400px wide x 600px tall on desktop, full-screen on mobile)
- Animate open/close with framer-motion (already installed)
- Persist session ID in sessionStorage (not localStorage) for tab lifetime
- On mount: check for existing session, restore or create new

### 9B. ChatWindow.tsx

- Message list with auto-scroll to bottom on new messages
- User messages: right-aligned, brand accent color background
- Bot messages: left-aligned, light gray background
- Agent messages: left-aligned, distinct color (e.g., blue) with "Agent" badge
- System messages: centered, muted text
- Typing indicator during LLM streaming
- Timestamp on hover for each message

### 9C. ChatInput.tsx

- Text input with send button
- Enter to send, Shift+Enter for new line
- Disabled state during lead capture form display
- Character limit: 2000

### 9D. LeadCaptureForm.tsx

- Rendered inline in chat window (not a modal)
- Sequential: name field → email field → phone field (with skip button)
- Client-side validation: email regex, phone format (permissive)
- On submit of each field: trigger state transition via /api/chat/message

### 9E. Realtime Integration

```typescript
// In useChatMessages.ts hook
const channel = supabase
  .channel(`chat:${sessionId}`)
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "chat_messages",
      filter: `session_id=eq.${sessionId}`,
    },
    (payload) => {
      // Only add messages not sent by current user
      if (payload.new.role === "agent" || payload.new.role === "system") {
        addMessage(payload.new);
      }
    },
  )
  .subscribe();
```

### 9F. Widget Styling

- Match BMYBrand design system: dark theme option, clean typography
- Use Tailwind (already in project) for all styling
- Z-index: 9999 to ensure overlay on all page content
- Responsive: full-screen takeover on mobile (< 768px)
- Smooth animations for open/close/message appear

---

## 10. AGENT DASHBOARD SPECIFICATIONS

### 10A. Authentication

- Supabase Auth with email/password
- On sign-up, create corresponding row in `agents` table via DB trigger:

```sql
CREATE OR REPLACE FUNCTION handle_new_agent()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.agents (user_id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_agent();
```

### 10B. Session List Page (/dashboard)

- Real-time list of all chat sessions sorted by updated_at DESC
- Status badges: 🟢 Bot Active | 🟡 Handoff Pending | 🔵 Agent Connected | ⚫ Closed
- Handoff pending sessions highlighted/pinned to top
- Click to enter live chat view
- Filter by status, search by visitor name/email
- Show unread message count per session

### 10C. Live Chat Page (/dashboard/chat/[sessionId])

- Full message history loaded on entry
- Real-time incoming messages via Supabase Realtime
- Agent text input at bottom
- Bot toggle switch: on/off for this session
  - When turned off: bot_enabled = false, status = 'agent'
  - When turned on: bot_enabled = true, status = 'bot'
- "Close Session" button
- Canned responses panel (slide-out sidebar)
- Visitor info panel: name, email, phone, language, session start time

### 10D. Knowledge Base Page (/dashboard/knowledge)

- Drag-and-drop file upload (PDF, MD)
- Title field for each document
- List of uploaded documents with: title, filename, chunk count, upload date
- Delete document (cascades to all chunks)
- Re-upload/replace document
- Processing status indicator during ingestion

### 10E. Agent Status

- Global online/offline toggle in dashboard header
- When offline: agent does not receive handoff requests
- Display count of active sessions being handled

---

## 11. REAL-TIME ARCHITECTURE

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────────┐
│  Chat Widget     │         │   Supabase   │         │ Agent Dashboard  │
│  (Visitor)       │         │   Realtime   │         │ (Human Rep)      │
├─────────────────┤         ├──────────────┤         ├─────────────────┤
│                  │         │              │         │                  │
│ User sends msg   │──POST──→│ API inserts  │         │                  │
│                  │         │ into DB      │──PUSH──→│ New msg appears  │
│                  │         │              │         │                  │
│                  │         │              │         │ Agent sends msg  │
│ New msg appears  │←──PUSH──│ DB insert    │←──POST──│                  │
│                  │         │ triggers     │         │                  │
│                  │         │ realtime     │         │                  │
│                  │         │              │         │ Toggle bot off   │
│ "Agent connected"│←──PUSH──│ Session      │←──PATCH─│                  │
│ notice appears   │         │ status       │         │                  │
│                  │         │ change       │         │                  │
└─────────────────┘         └──────────────┘         └─────────────────┘
```

**Flow Summary:**

1. Widget sends messages via REST API (POST /api/chat/message)
2. API inserts message into `chat_messages` table
3. Supabase Realtime pushes INSERT event to all subscribers of that session
4. Agent dashboard receives the message in real-time
5. Agent replies: POST to API → insert into DB → Realtime pushes to widget
6. Session status changes propagate the same way

---

## 12. MULTI-LANGUAGE IMPLEMENTATION

### Detection

```typescript
// lib/chat/language-detector.ts
// Use OpenAI to detect language from first substantive user message

const detectLanguage = async (text: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Detect the language of the following text. Respond with ONLY the ISO 639-1 language code (e.g., en, es, fr, ar, zh, de, ur). Nothing else.",
      },
      { role: "user", content: text },
    ],
    max_tokens: 5,
    temperature: 0,
  });
  return response.choices[0].message.content?.trim() || "en";
};
```

### Application

- Detected language stored in `chat_sessions.visitor_language`
- Every LLM call includes instruction: `"Always respond in {{visitor_language}}."`
- Lead capture prompts translated via LLM on the fly (cache translations for common languages)
- Agent dashboard shows detected language badge on each session
- Agent messages are NOT auto-translated (agents respond in their own language; future enhancement could add translation)

---

## 13. ZOOM BOOKING INTEGRATION

- Store booking URL in environment variable: `ZOOM_BOOKING_URL`
- When booking intent detected, bot responds with:
  ```
  "I'd love to set up a consultation for you! You can book a time
   directly here: [Book a Consultation]({{ZOOM_BOOKING_URL}})
   Is there anything else I can help with?"
  ```
- The booking link renders as a clickable card/button in the chat UI (BookingPrompt.tsx)
- If using Calendly or Cal.com for Zoom scheduling, the link works as-is
- Future enhancement: embed Calendly widget inline in the chat

---

## 14. LLM MODEL SELECTION

| Use Case                      | Model                    | Reasoning                                                           |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------- |
| Chat responses (KNOWLEDGE_QA) | `gpt-4o-mini`            | Cost-effective, fast, sufficient quality for RAG-grounded responses |
| Intent detection              | `gpt-4o-mini`            | Simple classification task, low latency required                    |
| Language detection            | `gpt-4o-mini`            | Trivial task                                                        |
| Embeddings                    | `text-embedding-3-small` | 1536 dimensions, best cost/performance for KB under 10K chunks      |
| Complex escalation (future)   | `gpt-4o`                 | Reserve for cases where mini produces poor results                  |

**Cost estimation (monthly, moderate usage ~5000 conversations):**

- GPT-4o-mini: ~$15-30
- Embeddings: ~$2-5 (one-time for KB, minimal for queries)
- Total: ~$20-40/month

---

## 15. SECURITY CONSIDERATIONS

1. **API routes:** All mutation endpoints validate session existence and rate limits
2. **Knowledge ingest:** Protected by agent JWT authentication
3. **Supabase RLS:** Enforced on all tables as defined in Section 2D
4. **OpenAI key:** Server-side only, never exposed to client
5. **Session isolation:** Widget only accesses its own session via session ID
6. **Input sanitization:** All user inputs sanitized before DB insertion and LLM prompt injection
7. **Rate limiting:** 20 messages/min per session, implemented at API route level
8. **CORS:** API routes only accept requests from the deployed domain

---

## 16. IMPLEMENTATION ORDER

```
Phase 1: Foundation (Days 1-3)
  ├── Set up Supabase project (schema, RLS, extensions, realtime)
  ├── Configure environment variables
  ├── Install new dependencies
  ├── Create Supabase client utilities (lib/supabase/*)
  └── Create OpenAI client utilities (lib/openai/*)

Phase 2: RAG Pipeline (Days 3-5)
  ├── Implement chunker.ts
  ├── Implement embeddings.ts
  ├── Implement ingest.ts (PDF + MD parsing)
  ├── Implement retrieve.ts (vector search)
  ├── Build POST /api/knowledge/ingest
  └── Test with sample BMYBrand content

Phase 3: Chat Backend (Days 5-8)
  ├── Implement state-machine.ts (full FSM)
  ├── Implement intent-detector.ts
  ├── Implement language-detector.ts
  ├── Implement system-prompts.ts
  ├── Build POST /api/chat/session
  ├── Build POST /api/chat/message (with streaming)
  ├── Build POST /api/chat/handoff
  ├── Build GET /api/chat/history/[sessionId]
  └── Test full conversation flow via API

Phase 4: Chat Widget UI (Days 8-12)
  ├── Build ChatWidget.tsx (launcher + panel)
  ├── Build ChatWindow.tsx + ChatMessage.tsx
  ├── Build ChatInput.tsx
  ├── Build LeadCaptureForm.tsx
  ├── Build TypingIndicator.tsx
  ├── Build BookingPrompt.tsx + HandoffNotice.tsx
  ├── Implement useChatSession, useChatMessages, useChatState hooks
  ├── Integrate Supabase Realtime subscriptions
  ├── Mount ChatWidget in root layout.tsx
  └── Responsive design + animations

Phase 5: Agent Dashboard (Days 12-17)
  ├── Scaffold new Next.js project
  ├── Implement Supabase Auth (login, agent creation trigger)
  ├── Build SessionList + SessionCard
  ├── Build AgentChatWindow with realtime
  ├── Build BotToggle (on/off per session)
  ├── Build KnowledgeUploader + KnowledgeDocList
  ├── Build CannedResponses
  ├── Build AgentStatusToggle
  └── Test full handoff flow end-to-end

Phase 6: Testing + Polish (Days 17-20)
  ├── End-to-end testing: lead capture → Q&A → handoff → agent chat → close
  ├── Multi-language testing (Arabic, Spanish, Urdu, etc.)
  ├── Mobile responsiveness
  ├── Edge cases: agent goes offline during chat, session timeout, empty KB
  ├── Rate limiting verification
  └── Deploy both projects to Vercel
```

---

## 17. VERCEL DEPLOYMENT NOTES

- **Main project:** Deploy as-is. API routes run as serverless functions. Streaming responses work natively on Vercel.
- **Agent dashboard:** Separate Vercel project, same Supabase instance.
- **Serverless function timeout:** Vercel Hobby plan has 10s timeout. Pro plan has 60s. For LLM streaming, use `export const maxDuration = 30;` in API routes (requires Pro plan for > 10s).
- **Environment variables:** Set all env vars in Vercel dashboard for both projects.
- **Edge runtime:** Do NOT use Edge runtime for chat/message route (pdf-parse and OpenAI SDK need Node.js runtime). Use `export const runtime = 'nodejs';` explicitly.

---

## 18. FUTURE ENHANCEMENTS (Post-MVP)

1. **Analytics dashboard:** Conversation metrics, lead conversion rates, popular questions, response quality scoring
2. **Auto-translation for agents:** Translate agent messages to visitor's language in real-time
3. **Proactive triggers:** Bot initiates conversation based on page dwell time or scroll depth
4. **File sharing in chat:** Visitor can upload files/images
5. **Email transcript:** Auto-email conversation transcript to visitor on session close
6. **Webhook integrations:** Push leads to CRM (HubSpot, etc.)
7. **A/B testing system prompts:** Test different bot personalities for conversion optimization
8. **Feedback collection:** Post-chat satisfaction rating
9. **Offline message queue:** When no agents available, queue messages and notify agents via email
10. **Voice messages:** Audio input/output in chat widget
