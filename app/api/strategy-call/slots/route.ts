import { NextRequest, NextResponse } from 'next/server'
import { listTakenSlots } from '@/lib/booking/bridge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DATE = /^\d{4}-\d{2}-\d{2}$/

// Booked strategy-call times (ISO instants) between two dates, so the
// strategy-call page can hide them. Bookings from the chat calendar count too.
export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get('from') ?? ''
  const to = request.nextUrl.searchParams.get('to') ?? ''
  if (!DATE.test(from) || !DATE.test(to)) {
    return NextResponse.json({ error: 'from and to must be YYYY-MM-DD' }, { status: 400 })
  }
  try {
    const taken = await listTakenSlots(from, to)
    return NextResponse.json({ taken: [...taken] }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.warn('[strategy-call/slots] could not read booked times', err instanceof Error ? err.message : err)
    return NextResponse.json({ taken: [] }, { headers: { 'Cache-Control': 'no-store' } })
  }
}
