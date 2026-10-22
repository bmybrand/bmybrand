import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { testerForTicket } from '@/lib/chat/test-mode'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { visitorFingerprint, testTicket } = body as { visitorFingerprint?: string; testTicket?: string }

    // A chat from the CRM's Test chat page. Never fall back to a real chat:
    // test messages must not reach the real CRM data.
    const tester = testTicket ? await testerForTicket(testTicket) : null
    if (testTicket && !tester) {
      return NextResponse.json(
        { error: 'This test link has expired. Reload the Test chat page in the CRM.' },
        { status: 403 }
      )
    }

    // Vercel sets the visitor's country from their IP. It decides which team
    // phone and email (US or Canada) the bot offers; unknown gets both.
    const country = request.headers.get('x-vercel-ip-country')?.trim().toUpperCase() || null

    const metadata: Record<string, unknown> = {}
    if (visitorFingerprint) metadata.fingerprint = visitorFingerprint
    if (country) metadata.country = country
    if (tester) metadata.test_by = tester.email

    // Create new chat session — start in KNOWLEDGE_QA (no forced lead capture)
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('chat_sessions')
      .insert({
        status: 'bot',
        state: 'KNOWLEDGE_QA',
        metadata,
        ...(tester ? { is_test: true } : {}),
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
