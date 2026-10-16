import { NextRequest, NextResponse } from 'next/server'
import { getOpenSlotsLive } from '@/lib/booking/bridge'
import { DEFAULT_BOOKING_ZONE, isValidZone } from '@/lib/booking/slots'
import { getSettings } from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Open strategy-call times for the in-chat calendar, in the visitor's zone,
// with already-booked times removed.
export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get('tz')?.trim() ?? ''
  const timeZone = isValidZone(requested) ? requested : DEFAULT_BOOKING_ZONE
  const { booking } = await getSettings()
  const { days } = await getOpenSlotsLive(timeZone, booking)
  return NextResponse.json({ timeZone, days }, { headers: { 'Cache-Control': 'no-store' } })
}
