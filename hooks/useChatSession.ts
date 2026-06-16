'use client'

import { useState, useCallback, useEffect } from 'react'
import type { ConversationState, CreateSessionResponse } from '@/types/chat'

const SESSION_KEY = 'bmybrand_chat_session'

export function useChatSession() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [state, setState] = useState<ConversationState>('GREETING')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSessionId(parsed.sessionId)
        setState(parsed.state)
      } catch {
        sessionStorage.removeItem(SESSION_KEY)
      }
    }
  }, [])

  // Persist session to sessionStorage when it changes
  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ sessionId, state })
      )
    }
  }, [sessionId, state])

  const createSession = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      if (!res.ok) {
        throw new Error('Failed to create session')
      }

      const data: CreateSessionResponse = await res.json()
      setSessionId(data.sessionId)
      setState(data.state)
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Session error'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateState = useCallback((newState: ConversationState) => {
    setState(newState)
  }, [])

  const clearSession = useCallback(() => {
    setSessionId(null)
    setState('GREETING')
    sessionStorage.removeItem(SESSION_KEY)
  }, [])

  return {
    sessionId,
    state,
    loading,
    error,
    createSession,
    updateState,
    clearSession,
  }
}
