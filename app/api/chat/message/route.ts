import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { processMessage } from '@/lib/chat/state-machine'
import { checkRateLimit } from '@/lib/utils/rate-limiter'
import { sanitizeInput, isInjectionAttempt } from '@/lib/utils/validators'
import type { ChatSession, ChatUi } from '@/types/chat'

export const runtime = 'nodejs'
export const maxDuration = 30

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
}

// The prompt forbids em dashes but the model still slips them in now and then.
// Tokens never split a single character, so this is safe per chunk.
function stripDashes(text: string): string {
  return text.replace(/ ?\u2014 ?/g, ', ').replace(/ \u2013 /g, ', ')
}

function sseEvent(payload: Record<string, unknown>): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`)
}

// Wrap a single assistant message as an SSE stream so the client shows a
// typing indicator first (same shape as the streamed answers below).
function sseMessage(text: string, state: string, ui: ChatUi | null = null): Response {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(sseEvent({ text }))
      controller.enqueue(sseEvent({ done: true, state, ui }))
      controller.close()
    },
  })
  return new Response(readable, { headers: SSE_HEADERS })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, content } = body as {
      sessionId?: string
      content?: string
    }

    // Validate input
    if (!sessionId || !content?.trim()) {
      return Response.json(
        { error: 'sessionId and content are required' },
        { status: 400 }
      )
    }

    const sanitized = sanitizeInput(content)

    // 1. Load session
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return Response.json({ error: 'Session not found' }, { status: 404 })
    }

    if (session.status === 'closed' || session.state === 'CLOSED') {
      return Response.json(
        { error: 'Session is closed' },
        { status: 400 }
      )
    }

    // 2. Rate limit check
    const { allowed, remaining } = await checkRateLimit(sessionId)
    if (!allowed) {
      return Response.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    // 2b. Block + log prompt-injection / jailbreak attempts (SOP §3.4).
    //     Logged with a timestamp and the first 100 chars of the raw input.
    if (isInjectionAttempt(sanitized)) {
      console.warn('[SECURITY] Injection attempt blocked', {
        sessionId,
        preview: content.slice(0, 100),
        at: new Date().toISOString(),
      })
      const fallback =
        "I'm not able to process that message. Is there something about BMYBrand's services I can help you with?"
      const now = Date.now()
      await supabaseAdmin.from('chat_messages').insert([
        { session_id: sessionId, role: 'user', content: sanitized, created_at: new Date(now).toISOString() },
        { session_id: sessionId, role: 'assistant', content: fallback, created_at: new Date(now + 1).toISOString() },
      ])
      return sseMessage(fallback, session.state)
    }

    // 3. Insert user message
    await supabaseAdmin.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: sanitized,
    })

    // 4. Run state machine
    const result = await processMessage(session as ChatSession, sanitized)
    const messageMetadata = result.ui ? { ui: result.ui } : {}

    // 5. Update session state
    await supabaseAdmin
      .from('chat_sessions')
      .update({ state: result.newState, ...result.sessionUpdates })
      .eq('id', sessionId)

    // 6a. Fixed response (booking, farewell, safety), sent as SSE so the client
    //     always sees a typing indicator first.
    if (result.response) {
      await supabaseAdmin.from('chat_messages').insert({
        session_id: sessionId,
        role: 'assistant',
        content: result.response,
        metadata: messageMetadata,
      })
      return sseMessage(result.response, result.newState, result.ui)
    }

    // 6b. Streamed answer
    if (result.stream) {
      const stream = result.stream as AsyncIterable<{
        choices: Array<{ delta: { content?: string } }>
      }>

      let fullResponse = ''

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = stripDashes(chunk.choices[0]?.delta?.content || '')
              if (!text) continue
              fullResponse += text
              controller.enqueue(sseEvent({ text }))
            }

            controller.enqueue(sseEvent({ done: true, state: result.newState, ui: result.ui }))
            controller.close()

            if (fullResponse.trim()) {
              await supabaseAdmin.from('chat_messages').insert({
                session_id: sessionId,
                role: 'assistant',
                content: fullResponse.trim(),
                metadata: messageMetadata,
              })
            }
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : 'Stream error'
            console.error('[chat] stream failed', { sessionId, error: errMsg })
            controller.enqueue(sseEvent({ error: errMsg }))
            controller.close()
          }
        },
      })

      return new Response(readable, { headers: SSE_HEADERS })
    }

    // 7. No response (closed session)
    return Response.json({ state: result.newState })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to process message'
    return Response.json({ error: message }, { status: 500 })
  }
}
