'use client'

import { useEffect, useRef } from 'react'
import { useChatSession } from './useChatSession'
import { useChatMessages } from './useChatMessages'
import type { ContactSubmitResponse } from '@/types/chat'

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  message: string
  website: string
}

function friendlyError(error: string): string {
  if (/rate limit/i.test(error)) {
    return "You're sending messages a little fast. Please wait a moment and try again."
  }
  return "Sorry, that message didn't go through. Please try again."
}

export function useChatState() {
  const session = useChatSession()
  const messages = useChatMessages(session.sessionId)

  // Load history when session is restored from sessionStorage
  const { sessionId, markContactSubmitted } = session
  const { loadHistory } = messages
  const messageCount = messages.messages.length
  useEffect(() => {
    if (sessionId && messageCount === 0) {
      loadHistory().then((history) => {
        if (history.some((m) => m.metadata?.type === 'contact_form')) {
          markContactSubmitted()
        }
      })
    }
  }, [sessionId, messageCount, loadHistory, markContactSubmitted])

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
        if (!created) {
          messages.addLocalMessage('user', content)
          messages.addLocalMessage(
            'system',
            'Sorry, the chat is having trouble connecting. Please try again in a moment.'
          )
          return { error: 'Failed to create session' }
        }
        activeSessionId = created.sessionId
      }

      messages.addLocalMessage('user', content)
      const result = await messages.sendMessage(content, activeSessionId)

      if (result.error) {
        messages.addLocalMessage('system', friendlyError(result.error))
      }

      if (result.state) {
        session.updateState(result.state)
      }

      return result
    } finally {
      sendingRef.current = false
    }
  }

  // Send the in-chat contact form. The server saves the lead, emails the team
  // and returns the messages to show.
  const submitContact = async (values: ContactFormValues): Promise<{ error?: string }> => {
    if (!session.sessionId) return { error: 'Please start a chat first.' }
    try {
      const res = await fetch('/api/chat/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.sessionId, ...values }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return { error: data.error || 'Sorry, something went wrong. Please try again.' }
      }
      messages.appendMessages((data as ContactSubmitResponse).messages ?? [])
      session.markContactSubmitted()
      return {}
    } catch {
      return { error: 'Sorry, something went wrong. Please try again.' }
    }
  }

  return {
    // Session
    sessionId: session.sessionId,
    state: session.state,
    contactSubmitted: session.contactSubmitted,
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
    botThinking: messages.botThinking,
    sendMessage,
    submitContact,
  }
}
