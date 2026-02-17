import { supabase } from './client'
import type { ChatMessage, ChatSession } from '@/types/chat'
import type { RealtimeChannel } from '@supabase/supabase-js'

// Subscribe to new messages for a specific chat session
export function subscribeToMessages(
  sessionId: string,
  onMessage: (message: ChatMessage) => void
): RealtimeChannel {
  return supabase
    .channel(`chat-messages:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`,
      },
      (payload) => {
        onMessage(payload.new as ChatMessage)
      }
    )
    .subscribe()
}

// Subscribe to session status/state changes
export function subscribeToSession(
  sessionId: string,
  onUpdate: (session: ChatSession) => void
): RealtimeChannel {
  return supabase
    .channel(`chat-session:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_sessions',
        filter: `id=eq.${sessionId}`,
      },
      (payload) => {
        onUpdate(payload.new as ChatSession)
      }
    )
    .subscribe()
}

// Subscribe to agent typing indicator via Broadcast
export function subscribeToTyping(
  sessionId: string,
  onTyping: (isTyping: boolean) => void
): RealtimeChannel {
  return supabase
    .channel(`typing:${sessionId}`)
    .on('broadcast', { event: 'typing' }, (payload) => {
      onTyping(!!payload.payload?.isTyping)
    })
    .subscribe()
}

// Broadcast a typing event (called from agent dashboard)
export function broadcastTyping(
  sessionId: string,
  isTyping: boolean
): RealtimeChannel {
  const channel = supabase.channel(`typing:${sessionId}`)
  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { isTyping },
      })
    }
  })
  return channel
}

// Unsubscribe and remove a realtime channel
export function unsubscribeChannel(channel: RealtimeChannel) {
  supabase.removeChannel(channel)
}
