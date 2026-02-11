import { supabaseAdmin } from '@/lib/supabase/server'
import { chatCompletionStream } from '@/lib/openai/chat'
import { retrieveContext, assembleContext } from '@/lib/rag/retrieve'
import { detectIntent } from './intent-detector'
import { detectLanguage, translateMessage } from './language-detector'
import {
  LEAD_CAPTURE_PROMPTS,
  knowledgeQAPrompt,
  bookingResponse,
  HANDOFF_MESSAGES,
  FAREWELL_MESSAGE,
} from './system-prompts'
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  isSkip,
  sanitizeInput,
} from '@/lib/utils/validators'
import type { ChatSession, ConversationState } from '@/types/chat'

export interface StateMachineResult {
  response: string | null       // null when streaming
  stream: AsyncIterable<unknown> | null  // non-null for streamed responses
  newState: ConversationState
  sessionUpdates: Partial<ChatSession>
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

// Main state machine processor
export async function processMessage(
  session: ChatSession,
  rawInput: string
): Promise<StateMachineResult> {
  const input = sanitizeInput(rawInput)
  const { state } = session

  switch (state) {
    case 'GREETING':
    case 'LEAD_CAPTURE_NAME':
      return handleNameCapture(session, input)

    case 'LEAD_CAPTURE_EMAIL':
      return handleEmailCapture(session, input)

    case 'LEAD_CAPTURE_PHONE':
      return handlePhoneCapture(session, input)

    case 'KNOWLEDGE_QA':
      return handleKnowledgeQA(session, input)

    case 'BOOKING':
      return handleBookingFollowup(session, input)

    case 'HANDOFF_REQUESTED':
      return {
        response: HANDOFF_MESSAGES.AGENT_AVAILABLE,
        stream: null,
        newState: 'HANDOFF_REQUESTED',
        sessionUpdates: {},
      }

    case 'AGENT_CONNECTED':
      // Bot is disabled — messages go directly to agent via realtime
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

// ─── Lead Capture Handlers ───────────────────────────────────────────────

async function handleNameCapture(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  if (!isValidName(input)) {
    const msg = "I didn't catch that. Could you please tell me your name?"
    const response = await maybeTranslate(msg, session.visitor_language)
    return {
      response,
      stream: null,
      newState: session.state,
      sessionUpdates: {},
    }
  }

  const name = input.trim()
  const prompt = LEAD_CAPTURE_PROMPTS.LEAD_CAPTURE_EMAIL(name)
  const response = await maybeTranslate(prompt, session.visitor_language)

  return {
    response,
    stream: null,
    newState: 'LEAD_CAPTURE_EMAIL',
    sessionUpdates: {
      visitor_name: name,
      status: 'lead_capture',
    },
  }
}

async function handleEmailCapture(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  if (!isValidEmail(input)) {
    const msg = "That doesn't look like a valid email. Could you try again?"
    const response = await maybeTranslate(msg, session.visitor_language)
    return {
      response,
      stream: null,
      newState: 'LEAD_CAPTURE_EMAIL',
      sessionUpdates: {},
    }
  }

  const email = input.trim().toLowerCase()
  const prompt = LEAD_CAPTURE_PROMPTS.LEAD_CAPTURE_PHONE
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
      const msg =
        "That doesn't look like a valid phone number. Please try again, or type 'skip' to move on."
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
  const prompt = LEAD_CAPTURE_PROMPTS.LEAD_COMPLETE(name)
  const response = await maybeTranslate(prompt, session.visitor_language)

  return {
    response,
    stream: null,
    newState: 'KNOWLEDGE_QA',
    sessionUpdates: updates,
  }
}

// ─── Knowledge QA Handler (streaming) ────────────────────────────────────

async function handleKnowledgeQA(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  // Detect language on first QA message (or if not set)
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
    case 'booking_request': {
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

    case 'human_request': {
      // Check if any agent is online
      const { data: agents } = await supabaseAdmin
        .from('agents')
        .select('id')
        .eq('is_online', true)
        .limit(1)

      const agentAvailable = agents && agents.length > 0
      const handoffMsg: string = agentAvailable
        ? HANDOFF_MESSAGES.AGENT_AVAILABLE
        : HANDOFF_MESSAGES.NO_AGENT
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
    default: {
      // RAG retrieval
      const matches = await retrieveContext(input)
      const context = assembleContext(matches)
      const recentMessages = await getRecentMessages(session.id)

      const systemPrompt = knowledgeQAPrompt(language, context, recentMessages)

      // Stream the LLM response
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
  }
}

// ─── Booking Followup ────────────────────────────────────────────────────

async function handleBookingFollowup(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  // After booking link shown, route back to knowledge QA for any follow-up
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
