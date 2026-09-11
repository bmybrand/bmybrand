import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Supabase pauses Free plan projects with low activity over a 7-day window,
// and its guidance is "a few user requests to the database each day". So the
// Vercel cron hits this route DAILY — every run issues a real read against the
// REST API, and that request is what keeps the project awake.
//
// A row is only appended once the newest one is older than WRITE_INTERVAL_DAYS,
// so the heartbeat table stays small instead of growing a row per day.
const WRITE_INTERVAL_DAYS = 3
const MS_PER_DAY = 24 * 60 * 60 * 1000

// Vercel sends `Authorization: Bearer <CRON_SECRET>` on cron invocations when
// CRON_SECRET is set on the project. If it isn't set, the route stays open —
// it leaks nothing beyond a timestamp.
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim()
  if (!secret) return true
  return request.headers.get('authorization') === `Bearer ${secret}`
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: latest, error: readError } = await supabaseAdmin
      .from('health_check')
      .select('checked_at')
      .order('checked_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (readError) {
      console.error('[keepalive] read failed:', readError)
      return NextResponse.json(
        { ok: false, stage: 'read', error: readError.message },
        { status: 500 }
      )
    }

    const lastCheckedAt = latest?.checked_at ? new Date(latest.checked_at) : null
    const ageDays = lastCheckedAt
      ? (Date.now() - lastCheckedAt.getTime()) / MS_PER_DAY
      : null

    if (ageDays !== null && ageDays < WRITE_INTERVAL_DAYS) {
      return NextResponse.json({
        ok: true,
        wrote: false,
        lastCheckedAt: lastCheckedAt?.toISOString() ?? null,
        ageDays: Number(ageDays.toFixed(2)),
        writeIntervalDays: WRITE_INTERVAL_DAYS,
      })
    }

    const { data: inserted, error: writeError } = await supabaseAdmin
      .from('health_check')
      .insert({ source: 'vercel-cron' })
      .select('id, checked_at')
      .single()

    if (writeError || !inserted) {
      console.error('[keepalive] write failed:', writeError)
      return NextResponse.json(
        { ok: false, stage: 'write', error: writeError?.message ?? 'Insert returned no row' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      wrote: true,
      id: inserted.id,
      checkedAt: inserted.checked_at,
      previousCheckedAt: lastCheckedAt?.toISOString() ?? null,
      writeIntervalDays: WRITE_INTERVAL_DAYS,
    })
  } catch (error) {
    // supabaseAdmin throws here when the Supabase env vars are missing, so a
    // failing cron doubles as an early warning that the project is misconfigured.
    const message = error instanceof Error ? error.message : 'Keepalive failed'
    console.error('[keepalive] unexpected failure:', error)
    return NextResponse.json({ ok: false, stage: 'config', error: message }, { status: 500 })
  }
}
