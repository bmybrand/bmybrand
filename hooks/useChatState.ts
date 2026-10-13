'use client'

import { useEffect, useRef, useState } from 'react'
import { useChatSession } from './useChatSession'
import { useChatMessages } from './useChatMessages'
import type {
  BookingSubmitRequest,
  BookingSubmitResponse,
  BookingSummary,
  ChatMessage,
  ContactSubmitResponse,
} from '@/types/chat'

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  message: string
  website: string
}

export type BookingFormValues = Omit<BookingSubmitRequest, 'sessionId'>

export interface BookingResult {
  error?: string
  // 'slot_taken': reload times; 'booking_failed': the team has the request.
  code?: string
}

function bookingFrom(messages: ChatMessage[]): BookingSummary | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const meta = messages[i].metadata
    if (meta?.type === 'booking' && meta.booking) return meta.booking as BookingSummary
  }
  return null
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
  const [booking, setBooking] = useState<BookingSummary | null>(null)

  // Load history when session is restored from sessionStorage
  const { sessionId, markContactSubmitted } = session
  const { loadHistory } = messages
  const messageCount = messages.messages.length
  useEffect(() => {
    if (sessionId && messageCount === 0) {
      loadHistory().then((history) => {
        if (history.some((m) => m.metadata?.type === 'contact_form' || m.metadata?.type === 'booking')) {
          markContactSubmitted()
        }
        setBooking(bookingFrom(history))
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

  // Book a strategy call from the in-chat calendar. The server saves it,
  // emails the team and the visitor, and returns the messages to show.
  const submitBooking = async (values: BookingFormValues): Promise<BookingResult> => {
    if (!session.sessionId) return { error: 'Please start a chat first.' }
    try {
      const res = await fetch('/api/chat/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.sessionId, ...values }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return {
          error: data.error || 'Sorry, something went wrong. Please try again.',
          code: data.code,
        }
      }
      const result = data as BookingSubmitResponse
      messages.appendMessages(result.messages ?? [])
      setBooking(result.booking)
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
      setBooking(null)
    },
    booking,
    submitBooking,

    // Messages
    messages: messages.messages,
    isStreaming: messages.isStreaming,
    streamingText: messages.streamingText,
    botThinking: messages.botThinking,
    sendMessage,
    submitContact,
  }
}
