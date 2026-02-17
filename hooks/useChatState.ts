'use client'

import { useEffect } from 'react'
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

  // Initialize new session
  const initSession = async () => {
    const result = await session.createSession()
    if (result) {
      messages.addLocalMessage('assistant', result.greeting)
    }
  }

  // Send message with state sync
  const sendMessage = async (content: string) => {
    messages.addLocalMessage('user', content)
    const result = await messages.sendMessage(content)

    if (result.state) {
      session.updateState(result.state)
    }

    return result
  }

  return {
    // Session
    sessionId: session.sessionId,
    state: session.state,
    sessionLoading: session.loading,
    sessionError: session.error,
    initSession,
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
