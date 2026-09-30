import { supabaseAdmin } from '@/lib/supabase/server'
import { chatCompletionStream } from '@/lib/openai/chat'
import { retrieveContext, assembleContext } from '@/lib/rag/retrieve'
import { detectIntent } from './intent-detector'
import { detectLanguage, translateMessage } from './language-detector'
import {
  knowledgeQAPrompt,
  bookingResponse,
  getBookingUrl,
  FAREWELL_MESSAGE,
  type TurnCard,
} from './prompts'
import { contactsForRegion, regionFromCountry } from './contact-info'
import { sanitizeInput } from '@/lib/utils/validators'
import {
  screenMessage,
  CRISIS_RESPONSE,
  PROHIBITED_REFUSAL,
  CONVERSATION_END,
} from './safety'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import type { ChatSession, ChatUi, ConversationState, UserIntent } from '@/types/chat'

export interface StateMachineResult {
  response: string | null       // null when streaming
  stream: AsyncIterable<unknown> | null  // non-null for streamed responses
  newState: ConversationState
  sessionUpdates: Partial<ChatSession>
  ui: ChatUi | null             // rich UI to show under the reply (contact form)
}

// Current date/time injected into the system prompt (SOP §2.4). Defaults to
// Texas time (US Central / America/Chicago — the Allen, TX HQ), overridable via
// CHATBOT_TIMEZONE. UTC is intentionally avoided for client-facing output.
function currentDateTime(date = new Date()): string {
  const timeZone = process.env.CHATBOT_TIMEZONE || 'America/Chicago'
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone,
    }).format(date)
  } catch {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(date)
  }
}

interface HistoryMessage {
  role: string
  content: string
  metadata: Record<string, unknown> | null
}

// Fetch the last N messages before the current one (oldest first). The message
// route saves the visitor's message before running the state machine, so the
// newest row is dropped when it is that same message.
async function getRecentMessages(
  sessionId: string,
  currentInput: string,
  limit = 12
): Promise<HistoryMessage[]> {
  const { data } = await supabaseAdmin
    .from('chat_messages')
    .select('role, content, metadata')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit + 1)

  const rows = (data ?? []) as HistoryMessage[]
  if (rows[0]?.role === 'user' && rows[0].content === currentInput) rows.shift()
  return rows.slice(0, limit).reverse()
}

function historyAsText(history: HistoryMessage[]): string {
  return history.map((m) => `${m.role}: ${m.content}`).join('\n')
}

// A card shown in one of the last few assistant replies is still easy to
// find, so the next reply does not need another one.
function cardShownInLast(
  history: HistoryMessage[],
  replies: number,
  types: ChatUi['type'][]
): boolean {
  return history
    .filter((m) => m.role === 'assistant')
    .slice(-replies)
    .some((m) => {
      const ui = m.metadata?.ui as ChatUi | undefined
      return ui ? types.includes(ui.type) : false
    })
}

// ─── Main State Machine ──────────────────────────────────────────────────
// There is no live handoff. Every turn is answered by the bot:
//   general_query                   → knowledge base answer
//   service_inquiry                 → answer, then offer a free strategy call
//                                     (booking button, contact form one tap away)
//   support_request / human_request → explain there is no live chat, share the
//                                     team's phone/email and show the contact form
//   booking_request                 → booking button
//   farewell                        → CLOSED
// Contact details are collected by the in-chat form (/api/chat/contact), which
// emails the team.

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
      newState: 'KNOWLEDGE_QA',
      sessionUpdates: {},
      ui: null,
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
        ui: null,
      }
    }
    const response = await maybeTranslate(PROHIBITED_REFUSAL, session.visitor_language)
    return {
      response,
      stream: null,
      newState: 'KNOWLEDGE_QA',
      sessionUpdates: { metadata: { ...meta, violation_count: count } },
      ui: null,
    }
  }

  if (session.state === 'CLOSED') {
    return {
      response: null,
      stream: null,
      newState: 'CLOSED',
      sessionUpdates: {},
      ui: null,
    }
  }

  // Every other state, including legacy handoff and lead-capture states on
  // older sessions, is handled as a normal conversation turn.
  return handleConversation(session, input)
}

// ─── Conversation turn ───────────────────────────────────────────────────

async function handleConversation(
  session: ChatSession,
  input: string
): Promise<StateMachineResult> {
  const history = await getRecentMessages(session.id, input)

  // Language, intent and knowledge retrieval are independent, so run them
  // together to keep the reply fast.
  const knownLanguage = session.visitor_language || 'en'
  const [language, intent, matches] = await Promise.all([
    knownLanguage === 'en' ? detectLanguage(input) : Promise.resolve(knownLanguage),
    detectIntent(input, historyAsText(history)),
    retrieveContext(input).catch((err) => {
      console.error('[chat] knowledge retrieval failed', err)
      return []
    }),
  ])

  if (intent === 'farewell') {
    const response = await maybeTranslate(FAREWELL_MESSAGE, language)
    return {
      response,
      stream: null,
      newState: 'CLOSED',
      sessionUpdates: { status: 'closed', visitor_language: language },
      ui: null,
    }
  }

  if (intent === 'booking_request') {
    const response = await maybeTranslate(bookingResponse(), language)
    return {
      response,
      stream: null,
      newState: 'BOOKING',
      sessionUpdates: { status: 'bot', visitor_language: language },
      ui: { type: 'booking', bookingUrl: getBookingUrl() },
    }
  }

  return handleAnswer(session, input, language, intent, history, assembleContext(matches))
}

// ─── Streaming answer ────────────────────────────────────────────────────

async function handleAnswer(
  session: ChatSession,
  input: string,
  language: string,
  intent: UserIntent,
  history: HistoryMessage[],
  context: string
): Promise<StateMachineResult> {
  const meta = (session.metadata ?? {}) as Record<string, unknown>
  const leadSubmittedAt =
    typeof meta.lead_submitted_at === 'string' ? meta.lead_submitted_at : null
  const region = regionFromCountry(meta.country as string | undefined)
  const contacts = contactsForRegion(region)

  const wantsTeam = intent === 'support_request' || intent === 'human_request'
  const bookingUrl = getBookingUrl()

  let card: TurnCard = null
  if (wantsTeam && !leadSubmittedAt && !cardShownInLast(history, 2, ['contact_form'])) {
    card = 'contact_form'
  } else if (
    intent === 'service_inquiry' &&
    !cardShownInLast(history, 4, ['sales', 'booking'])
  ) {
    card = leadSubmittedAt ? 'booking' : 'sales'
  }

  let ui: ChatUi | null = null
  if (card === 'contact_form') ui = { type: 'contact_form', contacts }
  else if (card === 'sales') ui = { type: 'sales', contacts, bookingUrl }
  else if (card === 'booking') ui = { type: 'booking', bookingUrl }

  const systemPrompt = knowledgeQAPrompt(language, context, currentDateTime(), {
    intent,
    contacts,
    card,
    teamInformedAt: leadSubmittedAt ? currentDateTime(new Date(leadSubmittedAt)) : null,
    visitorName: session.visitor_name,
    bookingUrl,
  })

  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...history
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: input },
  ]

  const stream = await chatCompletionStream(messages, { temperature: 0.5 })

  return {
    response: null,
    stream,
    newState: 'KNOWLEDGE_QA',
    sessionUpdates: {
      status: 'bot',
      visitor_language: language,
      // Remember what the visitor wanted, so the lead shows it in the CRM.
      // Existing-client support is kept once seen, since follow-ups like
      // "when can I talk to someone" would otherwise relabel it.
      ...((wantsTeam || intent === 'service_inquiry') &&
      meta.lead_interest !== interestLabel('support_request')
        ? { metadata: { ...meta, lead_interest: interestLabel(intent) } }
        : {}),
    },
    ui,
  }
}

function interestLabel(intent: UserIntent): string {
  switch (intent) {
    case 'support_request':
      return 'Existing client support'
    case 'human_request':
      return 'Asked to talk to the team'
    case 'service_inquiry':
      return 'New project inquiry'
    default:
      return 'Chatbot inquiry'
  }
}

// ─── Translation Helper ─────────────────────────────────────────────────

async function maybeTranslate(message: string, language: string): Promise<string> {
  if (!language || language === 'en') return message
  return translateMessage(message, language)
}
