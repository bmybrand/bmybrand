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

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content || ''
              if (text) {
                fullResponse += text
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                )
              }
            }

            // Send done event
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ done: true, state: result.newState })}\n\n`
              )
            )
            controller.close()

            // Save complete response to DB after stream finishes
            if (fullResponse.trim()) {
              // Check for special markers in the response
              let finalState = result.newState
              const sessionPatch: Record<string, unknown> = {}

              if (fullResponse.includes('[HANDOFF_REQUESTED]')) {
                finalState = 'HANDOFF_REQUESTED'
                sessionPatch.status = 'handoff_pending'
                fullResponse = fullResponse.replace('[HANDOFF_REQUESTED]', '').trim()
              } else if (fullResponse.includes('[BOOKING_REQUESTED]')) {
                finalState = 'BOOKING'
                fullResponse = fullResponse.replace('[BOOKING_REQUESTED]', '').trim()
              }

              await supabaseAdmin.from('chat_messages').insert({
                session_id: sessionId,
                role: 'assistant',
                content: fullResponse,
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
