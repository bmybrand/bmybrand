'use client'

import { useState, useCallback, useRef } from 'react'
import type { ChatMessage, ChatUi, ConversationState } from '@/types/chat'

interface SendMessageResult {
  message?: string
  state?: ConversationState
  error?: string
}

export function useChatMessages(sessionId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [botThinking, setBotThinking] = useState(false)
  const localIdRef = useRef(0)

  // Load message history
  const loadHistory = useCallback(async (): Promise<ChatMessage[]> => {
    if (!sessionId) return []

    try {
      const res = await fetch(`/api/chat/history/${sessionId}`)
      if (res.ok) {
        const data = await res.json()
        const history: ChatMessage[] = data.messages ?? []
        setMessages(history)
        return history
      }
    } catch {
      // Silently fail — messages will be empty
    }
    return []
  }, [sessionId])

  // Add a local message (optimistic UI)
  const addLocalMessage = useCallback(
    (
      role: ChatMessage['role'],
      content: string,
      metadata: Record<string, unknown> = {}
    ) => {
      localIdRef.current += 1
      const msg: ChatMessage = {
        id: `local-${Date.now()}-${localIdRef.current}`,
        session_id: sessionId || '',
        role,
        content,
        metadata,
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, msg])
      return msg
    },
    [sessionId]
  )

  // Append messages returned by the server (e.g. after the contact form)
  const appendMessages = useCallback((incoming: ChatMessage[]) => {
    setMessages((prev) => [
      ...prev,
      ...incoming.filter((m) => !prev.some((p) => p.id === m.id)),
    ])
  }, [])

  // Send a message and handle the response (JSON or SSE stream)
  const sendMessage = useCallback(
    async (content: string, sessionIdOverride?: string): Promise<SendMessageResult> => {
      const activeSessionId = sessionIdOverride || sessionId
      if (!activeSessionId) return { error: 'No active session' }

      setBotThinking(true)
      try {
        const res = await fetch('/api/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: activeSessionId, content }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          return { error: err.error || 'Failed to send message' }
        }

        const contentType = res.headers.get('content-type') || ''

        // SSE stream (every bot reply)
        if (contentType.includes('text/event-stream')) {
          setIsStreaming(true)
          setStreamingText('')

          const reader = res.body?.getReader()
          const decoder = new TextDecoder()
          let fullText = ''
          let finalState: ConversationState | undefined
          let ui: ChatUi | null = null

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
                    ui = parsed.ui ?? null
                  }

                  if (parsed.error) {
                    setIsStreaming(false)
                    setStreamingText('')
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
            addLocalMessage('assistant', fullText.trim(), ui ? { ui } : {})
          }

          setIsStreaming(false)
          setStreamingText('')

          return { message: fullText, state: finalState }
        }

        // JSON response (closed session)
        const data = await res.json()
        return { state: data.state }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Network error'
        return { error: msg }
      } finally {
        setBotThinking(false)
      }
    },
    [sessionId, addLocalMessage]
  )

  return {
    messages,
    isStreaming,
    streamingText,
    botThinking,
    sendMessage,
    addLocalMessage,
    appendMessages,
    loadHistory,
    setMessages,
  }
}
