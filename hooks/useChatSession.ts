'use client'

import { useState, useCallback, useEffect } from 'react'
import type { ConversationState, CreateSessionResponse } from '@/types/chat'

const SESSION_KEY = 'bmybrand_chat_session'
// Test chats (CRM test environment) are kept apart from a real visitor chat
// in the same browser.
const TEST_SESSION_KEY = 'bmybrand_chat_test_session'

export interface ChatSessionOptions {
  // Ticket from the CRM's Test chat page: new chats are saved as tests.
  testTicket?: string
}

export function useChatSession({ testTicket }: ChatSessionOptions = {}) {
  const storageKey = testTicket ? TEST_SESSION_KEY : SESSION_KEY
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [state, setState] = useState<ConversationState>('GREETING')
  // True once the visitor has sent their details through the contact form.
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSessionId(parsed.sessionId)
        setState(parsed.state)
        setContactSubmitted(Boolean(parsed.contactSubmitted))
      } catch {
        sessionStorage.removeItem(storageKey)
      }
    }
  }, [storageKey])

  // Persist session to sessionStorage when it changes
  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ sessionId, state, contactSubmitted })
      )
    }
  }, [storageKey, sessionId, state, contactSubmitted])

  const createSession = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testTicket ? { testTicket } : {}),
      })

      if (!res.ok) {
        throw new Error('Failed to create session')
      }

      const data: CreateSessionResponse = await res.json()
      setSessionId(data.sessionId)
      setState(data.state)
      setContactSubmitted(false)
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Session error'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [testTicket])

  const updateState = useCallback((newState: ConversationState) => {
    setState(newState)
  }, [])

  const markContactSubmitted = useCallback(() => {
    setContactSubmitted(true)
  }, [])

  const clearSession = useCallback(() => {
    setSessionId(null)
    setState('GREETING')
    setContactSubmitted(false)
    sessionStorage.removeItem(storageKey)
  }, [storageKey])

  return {
    sessionId,
    state,
    contactSubmitted,
    loading,
    error,
    createSession,
    updateState,
    markContactSubmitted,
    clearSession,
  }
}
