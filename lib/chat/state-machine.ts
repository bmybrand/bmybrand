import { supabaseAdmin } from '@/lib/supabase/server'
import { chatCompletionStream } from '@/lib/openai/chat'
import { retrieveContext, assembleContext } from '@/lib/rag/retrieve'
import { detectIntent } from './intent-detector'
import { detectLanguage, translateMessage } from './language-detector'
import {
  LEAD_CAPTURE,
  VALIDATION,
  knowledgeQAPrompt,
  bookingResponse,
  HANDOFF,
  FAREWELL_MESSAGE,
} from './prompts'
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  isSkip,
  sanitizeInput,
} from '@/lib/utils/validators'
import {
  screenMessage,
  CRISIS_RESPONSE,
  PROHIBITED_REFUSAL,
  CONVERSATION_END,
} from './safety'
import type { ChatSession, ConversationState } from '@/types/chat'

export interface StateMachineResult {
  response: string | null       // null when streaming
  stream: AsyncIterable<unknown> | null  // non-null for streamed responses
  newState: ConversationState
  sessionUpdates: Partial<ChatSession>
}

// Current date/time injected into the system prompt (SOP §2.4). Defaults to
// Texas time (US Central / America/Chicago — the Allen, TX HQ), overridable via
// CHATBOT_TIMEZONE. UTC is intentionally avoided for client-facing output.
function currentDateTime(): string {
  const timeZone = process.env.CHATBOT_TIMEZONE || 'America/Chicago'
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone,
    }).format(new Date())
  } catch {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date())
  }
}

// Fetch the last N messages for context
async function getRecentMessages(sessionId: string, limit = 10): Promise<string> {
  const { data } = await supabaseAdmin
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (!data || data.length === 0) return ''

  return data
    .reverse()
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n')
}

// ─── Main State Machine ──────────────────────────────────────────────────
// New flow: KNOWLEDGE_QA first, lead capture only on buying intent
//
// KNOWLEDGE_QA (answer freely)
//   → service_inquiry or booking_request (no lead yet) → LEAD_CAPTURE_NAME → EMAIL → PHONE → BOOKING / back to QA
//   → general_query → RAG streaming answer
//   → human_request → HANDOFF
//   → farewell → CLOSED

export async function processMessage(
  session: ChatSession,
  rawInput: string
): Promise<StateMachineResult> {
  const input = sanitizeInput(rawInput)

  // ─── Safety screen (SOP §5) — runs in every state before normal routing ──
  const screen = screenMessage(input)
  if (screen === 'crisis') {
    return {
      response: CRISIS_RESPONSE,
      stream: null,
      // Crisis is never treated as a violation; keep the visitor in flow.
      newState: session.state === 'CLOSED' ? 'KNOWLEDGE_QA' : session.state,
      sessionUpdates: {},
    }
  }
  if (screen === 'prohibited') {
    const meta = (session.metadata ?? {}) as Record<string, unknown>
    const count =
      (typeof meta.violation_count === 'number' ? meta.violation_count : 0) + 1
    // End the conversation on the 3rd consecutive prohibited request.
    if (count >= 3) {
      return {
        response: CONVERSATION_END,
        stream: null,
        newState: 'CLOSED',
        sessionUpdates: {
          status: 'closed',
          metadata: { ...meta, violation_count: count },
        },
      }
    }
    const response = await maybeTranslate(PROHIBITED_REFUSAL, session.visitor_language)
    return {
      response,
      stream: null,
      newState: session.state === 'CLOSED' ? 'KNOWLEDGE_QA' : session.state,
      sessionUpdates: { metadata: { ...meta, violation_count: count } },
    }
  }

  const { state } = session

  switch (state) {
    case 'GREETING':
    case 'KNOWLEDGE_QA':
      return handleKnowledgeQA(session, input)

    case 'LEAD_CAPTURE_NAME':
      return handleNameCapture(session, input)

    case 'LEAD_CAPTURE_EMAIL':
      return handleEmailCapture(session, input)

    case 'LEAD_CAPTURE_PHONE':
      return handlePhoneCapture(session, input)

    case 'BOOKING':
      return handleBookingFollowup(session, input)

    case 'HANDOFF_REQUESTED':
      return {
        response: HANDOFF.CONNECTING,
        stream: null,
        newState: 'HANDOFF_REQUESTED',
        sessionUpdates: {},
      }

    case 'AGENT_CONNECTED':
      return {
        response: null,
        stream: null,
        newState: 'AGENT_CONNECTED',
        sessionUpdates: {},
      }

    case 'CLOSED':
      return {
        response: null,
        stream: null,
        newState: 'CLOSED',
        sessionUpdates: {},
      }

    default:
      return handleKnowledgeQA(session, input)
  }
}

// ─── Knowledge QA Handler (streaming) ────────────────────────────────────

async function handleKnowledgeQA(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  // Detect language on first message
  let language = session.visitor_language || 'en'
  if (language === 'en') {
    const detected = await detectLanguage(input)
    if (detected !== language) {
      language = detected
    }
  }

  // Classify intent
  const intent = await detectIntent(input)

  switch (intent) {
    // Service inquiry or booking — trigger lead capture if we don't have details yet
    case 'service_inquiry':
    case 'booking_request': {
      const hasLead = session.visitor_name && session.visitor_email
      if (!hasLead) {
        // Start lead capture flow
        const msg = LEAD_CAPTURE.ASK_NAME
        const response = await maybeTranslate(msg, language)
        return {
          response,
          stream: null,
          newState: 'LEAD_CAPTURE_NAME',
          sessionUpdates: {
            status: 'lead_capture',
            visitor_language: language,
            // Remember what the user wanted so we can resume after capture
            metadata: { ...session.metadata, pending_intent: intent },
          },
        }
      }

      // Already have lead details — handle booking directly
      if (intent === 'booking_request') {
        const bookingUrl = process.env.ZOOM_BOOKING_URL || '#'
        let response = bookingResponse(bookingUrl)
        response = await maybeTranslate(response, language)
        return {
          response,
          stream: null,
          newState: 'BOOKING',
          sessionUpdates: { visitor_language: language },
        }
      }

      // service_inquiry with lead already captured — just answer via RAG
      return handleRAGResponse(session, input, language)
    }

    case 'human_request': {
      const { data: agents } = await supabaseAdmin
        .from('agents')
        .select('id')
        .eq('is_online', true)
        .limit(1)

      const agentAvailable = agents && agents.length > 0
      const handoffMsg: string = agentAvailable
        ? HANDOFF.CONNECTING
        : HANDOFF.NO_AGENT_ONLINE
      const response = await maybeTranslate(handoffMsg, language)

      return {
        response,
        stream: null,
        newState: 'HANDOFF_REQUESTED',
        sessionUpdates: {
          status: agentAvailable ? 'handoff_pending' : 'bot',
          visitor_language: language,
        },
      }
    }

    case 'farewell': {
      const response = await maybeTranslate(FAREWELL_MESSAGE, language)
      return {
        response,
        stream: null,
        newState: 'CLOSED',
        sessionUpdates: { status: 'closed', visitor_language: language },
      }
    }

    case 'general_query':
    default:
      return handleRAGResponse(session, input, language)
  }
}

// ─── RAG Streaming Response ──────────────────────────────────────────────

async function handleRAGResponse(
  session: ChatSession,
  input: string,
  language: string
): Promise<StateMachineResult> {
  const matches = await retrieveContext(input)
  const context = assembleContext(matches)
  const recentMessages = await getRecentMessages(session.id)
  const systemPrompt = knowledgeQAPrompt(
    language,
    context,
    recentMessages,
    currentDateTime()
  )

  const stream = await chatCompletionStream(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: input },
    ],
    { temperature: 0.7 }
  )

  return {
    response: null,
    stream,
    newState: 'KNOWLEDGE_QA',
    sessionUpdates: { visitor_language: language },
  }
}

// ─── Lead Capture Handlers ───────────────────────────────────────────────

async function handleNameCapture(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  if (!isValidName(input)) {
    const msg = VALIDATION.INVALID_NAME
    const response = await maybeTranslate(msg, session.visitor_language)
    return {
      response,
      stream: null,
      newState: 'LEAD_CAPTURE_NAME',
      sessionUpdates: {},
    }
  }

  const name = input.trim()
  const prompt = LEAD_CAPTURE.ASK_EMAIL(name)
  const response = await maybeTranslate(prompt, session.visitor_language)

  return {
    response,
    stream: null,
    newState: 'LEAD_CAPTURE_EMAIL',
    sessionUpdates: { visitor_name: name },
  }
}

async function handleEmailCapture(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  if (!isValidEmail(input)) {
    const msg = VALIDATION.INVALID_EMAIL
    const response = await maybeTranslate(msg, session.visitor_language)
    return {
      response,
      stream: null,
      newState: 'LEAD_CAPTURE_EMAIL',
      sessionUpdates: {},
    }
  }

  const email = input.trim().toLowerCase()
  const prompt = LEAD_CAPTURE.ASK_PHONE
  const response = await maybeTranslate(prompt, session.visitor_language)

  return {
    response,
    stream: null,
    newState: 'LEAD_CAPTURE_PHONE',
    sessionUpdates: { visitor_email: email },
  }
}

async function handlePhoneCapture(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  const updates: Partial<ChatSession> = {
    status: 'bot',
  }

  if (!isSkip(input)) {
    if (!isValidPhone(input)) {
      const msg = VALIDATION.INVALID_PHONE
      const response = await maybeTranslate(msg, session.visitor_language)
      return {
        response,
        stream: null,
        newState: 'LEAD_CAPTURE_PHONE',
        sessionUpdates: {},
      }
    }
    updates.visitor_phone = input.trim()
  }

  const name = session.visitor_name || 'there'

  // Check if user had a pending booking request
  const pendingIntent = (session.metadata as Record<string, string>)?.pending_intent
  if (pendingIntent === 'booking_request') {
    const bookingUrl = process.env.ZOOM_BOOKING_URL || '#'
    let response = bookingResponse(bookingUrl)
    response = await maybeTranslate(response, session.visitor_language)
    // Clear pending intent
    updates.metadata = { ...session.metadata, pending_intent: null }
    return {
      response,
      stream: null,
      newState: 'BOOKING',
      sessionUpdates: updates,
    }
  }

  // Otherwise complete lead capture and go back to QA
  const prompt = LEAD_CAPTURE.COMPLETE(name)
  const response = await maybeTranslate(prompt, session.visitor_language)
  updates.metadata = { ...session.metadata, pending_intent: null }

  return {
    response,
    stream: null,
    newState: 'KNOWLEDGE_QA',
    sessionUpdates: updates,
  }
}

// ─── Booking Followup ────────────────────────────────────────────────────

async function handleBookingFollowup(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  return handleKnowledgeQA(
    { ...session, state: 'KNOWLEDGE_QA' },
    input
  )
}

// ─── Translation Helper ─────────────────────────────────────────────────

async function maybeTranslate(message: string, language: string): Promise<string> {
  if (!language || language === 'en') return message
  return translateMessage(message, language)
}
