import type { RegionContact } from '@/lib/chat/contact-info'

// ─── Conversation State Machine ───────────────────────────────────────────
// LEAD_CAPTURE_*, HANDOFF_REQUESTED and AGENT_CONNECTED are legacy values that
// older sessions may still hold in the database. New sessions never enter them.

export type ConversationState =
  | 'GREETING'
  | 'LEAD_CAPTURE_NAME'
  | 'LEAD_CAPTURE_EMAIL'
  | 'LEAD_CAPTURE_PHONE'
  | 'KNOWLEDGE_QA'
  | 'BOOKING'
  | 'HANDOFF_REQUESTED'
  | 'AGENT_CONNECTED'
  | 'CLOSED'

export type SessionStatus =
  | 'lead_capture'
  | 'bot'
  | 'handoff_pending'
  | 'agent'
  | 'closed'

export type MessageRole = 'user' | 'assistant' | 'agent' | 'system'

export type UserIntent =
  | 'general_query'
  | 'service_inquiry'
  | 'booking_request'
  | 'support_request'
  | 'human_request'
  | 'farewell'

// ─── Rich UI attached to an assistant message ─────────────────────────────

// Support: an open contact form plus the team's phone and email.
export interface ContactFormUi {
  type: 'contact_form'
  contacts: RegionContact[]
}

// A strategy call booked in the chat (stored in session metadata.booking).
export interface BookingSummary {
  id: number | null
  startsAt: string // ISO instant
  timeZone: string // visitor's zone
  phone: string
}

// Sales: a "Pick a time" button that opens the in-chat calendar, with the
// contact form one tap away for visitors who would rather the team reached
// out. bookingUrl is the full strategy-call page, kept as a fallback link.
export interface SalesUi {
  type: 'sales'
  contacts: RegionContact[]
  bookingUrl: string
}

// The in-chat calendar, opened straight away (visitor asked to book).
export interface CalendarUi {
  type: 'calendar'
  bookingUrl: string
}

// Legacy: older messages carry a plain booking button.
export interface BookingUi {
  type: 'booking'
  bookingUrl: string
}

export type ChatUi = ContactFormUi | SalesUi | CalendarUi | BookingUi

// ─── Database Row Types ───────────────────────────────────────────────────

export interface Agent {
  id: string
  user_id: string
  name: string
  email: string
  avatar_url: string | null
  is_online: boolean
  max_concurrent_chats: number
  created_at: string
  updated_at: string
}

export interface ChatSession {
  id: string
  visitor_name: string | null
  visitor_email: string | null
  visitor_phone: string | null
  visitor_language: string
  status: SessionStatus
  state: ConversationState
  assigned_agent_id: string | null
  metadata: Record<string, unknown>
  bot_enabled: boolean
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  role: MessageRole
  content: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface KnowledgeDocument {
  id: string
  title: string
  source_filename: string
  content: string
  chunk_index: number
  total_chunks: number
  embedding: number[] | null
  metadata: Record<string, unknown>
  uploaded_by: string | null
  created_at: string
}

export interface CannedResponse {
  id: string
  title: string
  content: string
  category: string | null
  created_by: string | null
  created_at: string
}

// ─── API Request / Response Types ─────────────────────────────────────────

export interface CreateSessionRequest {
  visitorFingerprint?: string
}

export interface CreateSessionResponse {
  sessionId: string
  state: ConversationState
}

export interface SendMessageRequest {
  sessionId: string
  content: string
}

export interface ContactSubmitRequest {
  sessionId: string
  name: string
  email: string
  phone?: string
  message?: string
  // Honeypot: real visitors never see or fill this field.
  website?: string
}

export interface ContactSubmitResponse {
  ok: true
  messages: ChatMessage[]
}

export const BUDGET_OPTIONS = ['Below $1K', '$1K-$3K', '$3K-$5K', '$5K-$10K', '$10K-$20K', 'Above $20K'] as const

export interface BookingSubmitRequest {
  sessionId: string
  slotId: string // ISO instant
  timeZone: string
  name: string
  email: string
  phone: string
  company: string
  budget: string
  // Honeypot: real visitors never see or fill this field.
  website?: string
}

export interface BookingSubmitResponse {
  ok: true
  booking: BookingSummary
  messages: ChatMessage[]
}

export interface ChatHistoryResponse {
  messages: ChatMessage[]
  session: ChatSession
}

export interface KnowledgeIngestResponse {
  success: boolean
  chunksCreated: number
}

// ─── RAG Types ────────────────────────────────────────────────────────────

export interface TextChunk {
  content: string
  chunkIndex: number
  totalChunks: number
}

export interface KnowledgeMatch {
  id: string
  title: string
  content: string
  source_filename: string
  chunk_index: number
  similarity: number
}
