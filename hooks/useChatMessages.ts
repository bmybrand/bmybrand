'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { subscribeToMessages, unsubscribeChannel } from '@/lib/supabase/realtime'
import type { ChatMessage, ConversationState } from '@/types/chat'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface SendMessageResult {
  message?: string
  state?: ConversationState
  error?: string
}

export function useChatMessages(sessionId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const channelRef = useRef<RealtimeChannel | null>(null)

  // Subscribe to realtime messages (for agent/system messages)
  useEffect(() => {
    if (!sessionId) return

    channelRef.current = subscribeToMessages(sessionId, (newMsg) => {
      // Only add messages from agents/system (bot messages come from API response)
      if (newMsg.role === 'agent' || newMsg.role === 'system') {
        setMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev
          return [...prev, newMsg]
        })
      }
    })

    return () => {
      if (channelRef.current) {
        unsubscribeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [sessionId])

  // Load message history
  const loadHistory = useCallback(async () => {
    if (!sessionId) return

    try {
      const res = await fetch(`/api/chat/history/${sessionId}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages ?? [])
      }
    } catch {
      // Silently fail — messages will be empty
    }
  }, [sessionId])

  // Add a local message (optimistic UI)
  const addLocalMessage = useCallback(
    (role: ChatMessage['role'], content: string) => {
      const msg: ChatMessage = {
        id: `local-${Date.now()}`,
        session_id: sessionId || '',
        role,
        content,
        metadata: {},
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, msg])
      return msg
    },
    [sessionId]
  )

  // Send a message and handle the response (JSON or SSE stream)
  const sendMessage = useCallback(
    async (content: string): Promise<SendMessageResult> => {
      if (!sessionId) return { error: 'No active session' }

      try {
        const res = await fetch('/api/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, content }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          return { error: err.error || 'Failed to send message' }
        }

        const contentType = res.headers.get('content-type') || ''

        // SSE stream (knowledge QA responses)
        if (contentType.includes('text/event-stream')) {
          setIsStreaming(true)
          setStreamingText('')

          const reader = res.body?.getReader()
          const decoder = new TextDecoder()
          let fullText = ''
          let finalState: ConversationState | undefined

          if (reader) {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break

              const chunk = decoder.decode(value, { stream: true })
              const lines = chunk.split('\n')

              for (const line of lines) {
                if (!line.startsWith('data: ')) continue
                const jsonStr = line.slice(6)

                try {
                  const parsed = JSON.parse(jsonStr)

                  if (parsed.text) {
                    fullText += parsed.text
                    setStreamingText(fullText)
                  }

                  if (parsed.done) {
                    finalState = parsed.state
                  }

                  if (parsed.error) {
                    setIsStreaming(false)
                    return { error: parsed.error }
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }

          // Add completed streamed message to list
          if (fullText.trim()) {
            addLocalMessage('assistant', fullText.trim())
          }

          setIsStreaming(false)
          setStreamingText('')

          return { message: fullText, state: finalState }
        }

        // JSON response (lead capture, booking, handoff, etc.)
        const data = await res.json()
        if (data.message) {
          addLocalMessage('assistant', data.message)
        }

        return { message: data.message, state: data.state }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Network error'
        return { error: msg }
      }
    },
    [sessionId, addLocalMessage]
  )

  return {
    messages,
    isStreaming,
    streamingText,
    sendMessage,
    addLocalMessage,
    loadHistory,
    setMessages,
  }
}
