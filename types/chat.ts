// ─── Conversation State Machine ───────────────────────────────────────────

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
  | 'booking_request'
  | 'human_request'
  | 'farewell'

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
  greeting: string
}

export interface SendMessageRequest {
  sessionId: string
  content: string
}

export interface HandoffRequest {
  sessionId: string
}

export interface HandoffResponse {
  success: boolean
  agentAvailable: boolean
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

// ─── Realtime Payload Types ───────────────────────────────────────────────

export interface RealtimeMessagePayload {
  new: ChatMessage
  old: ChatMessage | null
  eventType: 'INSERT'
}

export interface RealtimeSessionPayload {
  new: ChatSession
  old: ChatSession | null
  eventType: 'UPDATE'
}
