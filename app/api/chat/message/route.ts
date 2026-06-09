import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { processMessage } from '@/lib/chat/state-machine'
import { checkRateLimit } from '@/lib/utils/rate-limiter'
import { sanitizeInput } from '@/lib/utils/validators'
import type { ChatSession } from '@/types/chat'

export const runtime = 'nodejs'
export const maxDuration = 30

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

    // 3. Insert user message
    await supabaseAdmin.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: sanitized,
    })

    // 4. If bot is disabled (agent mode), don't process
    if (!session.bot_enabled && session.state === 'AGENT_CONNECTED') {
      return Response.json({ status: 'agent_mode', message: 'Message delivered to agent' })
    }

    // 5. Run state machine
    const result = await processMessage(session as ChatSession, sanitized)

    // 6. Update session state
    const updates: Record<string, unknown> = {
      state: result.newState,
      ...result.sessionUpdates,
    }
    await supabaseAdmin
      .from('chat_sessions')
      .update(updates)
      .eq('id', sessionId)

    // 7a. Deterministic response (lead capture, booking, handoff, farewell)
    //     Wrapped as SSE so the client always sees a typing indicator first.
    if (result.response) {
      await supabaseAdmin.from('chat_messages').insert({
        session_id: sessionId,
        role: 'assistant',
        content: result.response,
      })

      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: result.response })}\n\n`)
          )
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ done: true, state: result.newState })}\n\n`)
          )
          controller.close()
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    }

    // 7b. Streaming response (knowledge QA)
    if (result.stream) {
      const stream = result.stream as AsyncIterable<{
        choices: Array<{ delta: { content?: string } }>
      }>

      const encoder = new TextEncoder()
      let fullResponse = ''

      // Strip control markers ([HANDOFF_REQUESTED]/[BOOKING_REQUESTED]) from the
      // streamed text so visitors never see them, while still detecting them for
      // state routing. A carry buffer holds back any tail that could be the start
      // of a marker split across token chunks, so partial markers never leak.
      const MARKER_RE = /\[(?:HANDOFF_REQUESTED|BOOKING_REQUESTED)\]/g
      const isMarkerPrefix = (s: string) =>
        '[HANDOFF_REQUESTED]'.startsWith(s) || '[BOOKING_REQUESTED]'.startsWith(s)
      let carry = ''
      let sawHandoff = false
      let sawBooking = false

      const pump = (incoming: string, isFinal: boolean): string => {
        carry = (carry + incoming).replace(MARKER_RE, (m) => {
          if (m.includes('HANDOFF')) sawHandoff = true
          else sawBooking = true
          return ''
        })
        if (isFinal) {
          const out = carry
          carry = ''
          return out
        }
        const idx = carry.lastIndexOf('[')
        if (idx !== -1 && isMarkerPrefix(carry.slice(idx))) {
          const out = carry.slice(0, idx)
          carry = carry.slice(idx)
          return out
        }
        const out = carry
        carry = ''
        return out
      }

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content || ''
              if (!text) continue
              const emit = pump(text, false)
              if (emit) {
                fullResponse += emit
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text: emit })}\n\n`)
                )
              }
            }
            const tail = pump('', true)
            if (tail) {
              fullResponse += tail
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: tail })}\n\n`))
            }

            // Route based on any markers the model emitted (rare now that the
            // prompt forbids them; detectIntent already handles escalation).
            let finalState = result.newState
            const sessionPatch: Record<string, unknown> = {}
            if (sawHandoff) {
              finalState = 'HANDOFF_REQUESTED'
              sessionPatch.status = 'handoff_pending'
            } else if (sawBooking) {
              finalState = 'BOOKING'
            }

            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ done: true, state: finalState })}\n\n`)
            )
            controller.close()

            if (fullResponse.trim()) {
              await supabaseAdmin.from('chat_messages').insert({
                session_id: sessionId,
                role: 'assistant',
                content: fullResponse.trim(),
              })
              if (Object.keys(sessionPatch).length > 0 || finalState !== result.newState) {
                await supabaseAdmin
                  .from('chat_sessions')
                  .update({ state: finalState, ...sessionPatch })
                  .eq('id', sessionId)
              }
            }
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : 'Stream error'
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
            )
            controller.close()
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    }

    // 8. No response (agent connected or closed state)
    return Response.json({ state: result.newState })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to process message'
    return Response.json({ error: message }, { status: 500 })
  }
}
