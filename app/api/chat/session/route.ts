import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { GREETING } from '@/lib/chat/prompts'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { visitorFingerprint } = body as { visitorFingerprint?: string }

    // 1. Create new chat session — start in KNOWLEDGE_QA (no forced lead capture)
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('chat_sessions')
      .insert({
        status: 'bot',
        state: 'KNOWLEDGE_QA',
        metadata: visitorFingerprint ? { fingerprint: visitorFingerprint } : {},
      })
      .select()
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    // 2. Insert the greeting message
    const greeting = GREETING

    const { error: msgError } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        session_id: session.id,
        role: 'assistant',
        content: greeting,
      })

    if (msgError) {
      console.error('Failed to insert greeting:', msgError.message)
    }

    // 3. Return session info
    return NextResponse.json({
      sessionId: session.id,
      state: session.state,
      greeting,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
