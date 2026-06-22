-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  BMYBrand Chatbot — Supabase Database Setup                            ║
-- ║  Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)  ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- ─── 1. Extensions ────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ─── 2. Tables ────────────────────────────────────────────────────────────

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
    CHECK (state IN (
      'GREETING', 'LEAD_CAPTURE_NAME', 'LEAD_CAPTURE_EMAIL',
      'LEAD_CAPTURE_PHONE', 'KNOWLEDGE_QA', 'BOOKING',
      'HANDOFF_REQUESTED', 'AGENT_CONNECTED', 'CLOSED'
    )),
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

-- Website audit reports (Brandsight / grow-my-business)
CREATE TABLE audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_url TEXT NOT NULL,
  industry TEXT,
  website_goal TEXT,
  overall_score INT NOT NULL DEFAULT 0,
  issue_count INT NOT NULL DEFAULT 0,
  summary TEXT,
  report JSONB NOT NULL DEFAULT '{}',
  unlocked BOOLEAN NOT NULL DEFAULT false,
  lead_name TEXT,
  lead_email TEXT,
  lead_company TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. Indexes ───────────────────────────────────────────────────────────

CREATE INDEX idx_chat_messages_session ON chat_messages(session_id, created_at);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_sessions_agent ON chat_sessions(assigned_agent_id);
CREATE INDEX idx_knowledge_embedding ON knowledge_documents
  USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);
CREATE INDEX idx_knowledge_source ON knowledge_documents(source_filename);
CREATE INDEX idx_audit_reports_created_at ON audit_reports(created_at DESC);
CREATE INDEX idx_audit_reports_site_url ON audit_reports(site_url);

-- ─── 4. Vector Search RPC ─────────────────────────────────────────────────

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

-- ─── 5. Row Level Security ────────────────────────────────────────────────

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE canned_responses ENABLE ROW LEVEL SECURITY;

-- Chat sessions
CREATE POLICY "Anon can insert sessions" ON chat_sessions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read own session" ON chat_sessions
  FOR SELECT TO anon USING (true);

CREATE POLICY "Agents full access to sessions" ON chat_sessions
  FOR ALL TO authenticated USING (true);

-- Chat messages
CREATE POLICY "Anon can insert messages" ON chat_messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read session messages" ON chat_messages
  FOR SELECT TO anon USING (true);

CREATE POLICY "Agents full access to messages" ON chat_messages
  FOR ALL TO authenticated USING (true);

-- Knowledge documents
CREATE POLICY "Agents manage knowledge" ON knowledge_documents
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Anon can read knowledge" ON knowledge_documents
  FOR SELECT TO anon USING (true);

-- Agents
CREATE POLICY "Agents can read agents" ON agents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Agents can update own status" ON agents
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Canned responses
CREATE POLICY "Agents manage canned responses" ON canned_responses
  FOR ALL TO authenticated USING (true);

-- ─── 6. Agent Auto-Creation Trigger ──────────────────────────────────────

CREATE OR REPLACE FUNCTION handle_new_agent()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.agents (user_id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Agent'), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_agent();

-- ─── 7. Updated_at Auto-Update Triggers ──────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── 8. Enable Realtime ──────────────────────────────────────────────────
-- NOTE: Also enable Realtime on these tables in Supabase Dashboard:
--   Dashboard → Database → Replication → Enable for:
--     - chat_sessions
--     - chat_messages
--     - agents

ALTER PUBLICATION supabase_realtime ADD TABLE chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE agents;
