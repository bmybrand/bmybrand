import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { visitorFingerprint } = body as { visitorFingerprint?: string }

    // Vercel sets the visitor's country from their IP. It decides which team
    // phone and email (US or Canada) the bot offers; unknown gets both.
    const country = request.headers.get('x-vercel-ip-country')?.trim().toUpperCase() || null

    const metadata: Record<string, unknown> = {}
    if (visitorFingerprint) metadata.fingerprint = visitorFingerprint
    if (country) metadata.country = country

    // Create new chat session — start in KNOWLEDGE_QA (no forced lead capture)
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('chat_sessions')
      .insert({
        status: 'bot',
        state: 'KNOWLEDGE_QA',
        metadata,
      })
      .select()
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      sessionId: session.id,
      state: session.state,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
