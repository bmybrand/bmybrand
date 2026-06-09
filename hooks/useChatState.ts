'use client'

import { useEffect, useRef } from 'react'
import { subscribeToSession, unsubscribeChannel } from '@/lib/supabase/realtime'
import { useChatSession } from './useChatSession'
import { useChatMessages } from './useChatMessages'

export function useChatState() {
  const session = useChatSession()
  const messages = useChatMessages(session.sessionId)

  // Subscribe to session state changes (e.g., agent connects, bot toggled)
  useEffect(() => {
    if (!session.sessionId) return

    const channel = subscribeToSession(session.sessionId, (updatedSession) => {
      session.updateState(updatedSession.state as typeof session.state)
    })

    return () => unsubscribeChannel(channel)
  }, [session.sessionId, session.updateState])

  // Load history when session is restored from sessionStorage
  useEffect(() => {
    if (session.sessionId && messages.messages.length === 0) {
      messages.loadHistory()
    }
  }, [session.sessionId, messages.messages.length, messages.loadHistory])

  // Guards against duplicate/concurrent sends — e.g. double-clicking a preset
  // or the send button before the first message has flipped the UI to a
  // streaming/loading state. Held across the whole send (session creation +
  // streaming) and released in finally.
  const sendingRef = useRef(false)

  // Send message with state sync — auto-creates session on first message
  const sendMessage = async (content: string) => {
    if (sendingRef.current) return { error: 'A message is already being sent' }
    sendingRef.current = true
    try {
      let activeSessionId = session.sessionId

      // Create session on the fly if none exists yet
      if (!activeSessionId) {
        const created = await session.createSession()
        if (!created) return { error: 'Failed to create session' }
        activeSessionId = created.sessionId
      }

      messages.addLocalMessage('user', content)
      const result = await messages.sendMessage(content, activeSessionId)

      if (result.state) {
        session.updateState(result.state)
      }

      return result
    } finally {
      sendingRef.current = false
    }
  }

  return {
    // Session
    sessionId: session.sessionId,
    state: session.state,
    sessionLoading: session.loading,
    sessionError: session.error,
    clearSession: () => {
      session.clearSession()
      messages.setMessages([])
    },

    // Messages
    messages: messages.messages,
    isStreaming: messages.isStreaming,
    streamingText: messages.streamingText,
    agentTyping: messages.agentTyping,
    botThinking: messages.botThinking,
    sendMessage,
  }
}
