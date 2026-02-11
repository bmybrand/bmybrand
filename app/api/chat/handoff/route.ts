import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body as { sessionId?: string }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    // 1. Verify session exists
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('chat_sessions')
      .select('id, status')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // 2. Update session status to handoff_pending
    await supabaseAdmin
      .from('chat_sessions')
      .update({
        status: 'handoff_pending',
        state: 'HANDOFF_REQUESTED',
      })
      .eq('id', sessionId)

    // 3. Check if any agent is online
    const { data: agents } = await supabaseAdmin
      .from('agents')
      .select('id, name')
      .eq('is_online', true)
      .limit(1)

    const agentAvailable = agents && agents.length > 0

    // 4. Insert system message
    const systemMessage = agentAvailable
      ? 'Connecting you with a team member...'
      : 'Our team is currently offline. We will get back to you soon.'

    await supabaseAdmin.from('chat_messages').insert({
      session_id: sessionId,
      role: 'system',
      content: systemMessage,
    })

    return NextResponse.json({
      success: true,
      agentAvailable,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Handoff request failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
