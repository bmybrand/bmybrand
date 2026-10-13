// Reads existing strategy-call bookings from the cPanel MySQL bridge, so both
// booking paths (chat and /strategy-call) can hide times that are taken.

import { bridgeHeaders, buildBridgeUrl, getBridgeConfig } from '../strategy-call-save'
import { getOpenDays, toInstant, type OpenDay } from './slots'
import type { AppSettings } from '../settings/schema'

interface BridgeBooking {
  id: number
  appointmentDate: string
  appointmentTime: string
  timezone: string
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

// ISO instants of bookings between two dates (YYYY-MM-DD, inclusive). The
// range is widened by a day on each side because stored dates are in the
// booker's own zone. Throws when the bridge can't be read.
export async function listTakenSlots(from: string, to: string): Promise<Set<string>> {
  const { url, secret } = getBridgeConfig()
  if (!url || !secret) throw new Error('Booking bridge is not configured')

  const day = 86_400_000
  const params = {
    list: '1',
    from: isoDate(new Date(Date.parse(`${from}T00:00:00Z`) - day)),
    to: isoDate(new Date(Date.parse(`${to}T00:00:00Z`) + day)),
  }
  const res = await fetch(buildBridgeUrl(url, secret, params), {
    headers: bridgeHeaders(secret),
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`Bridge list failed (${res.status})`)
  const data = (await res.json()) as { bookings?: BridgeBooking[] }

  const taken = new Set<string>()
  for (const b of data.bookings ?? []) {
    const at = toInstant(b.appointmentDate, b.appointmentTime, b.timezone)
    if (at) taken.add(at.toISOString())
  }
  return taken
}

// Open days for the visitor's zone with booked times removed. If the bridge
// can't be read, the office-hours slots are still returned (takenChecked is
// false); the booking request re-checks before saving.
export async function getOpenSlotsLive(
  timeZone: string,
  booking: AppSettings['booking'],
  now: Date = new Date()
): Promise<{ days: OpenDay[]; takenChecked: boolean }> {
  const from = isoDate(now)
  const to = isoDate(new Date(now.getTime() + booking.windowDays * 86_400_000))
  try {
    const taken = await listTakenSlots(from, to)
    return { days: getOpenDays(timeZone, taken, now, booking.windowDays, booking.hours), takenChecked: true }
  } catch (err) {
    console.warn('[booking] could not read booked times', err instanceof Error ? err.message : err)
    return { days: getOpenDays(timeZone, new Set(), now, booking.windowDays, booking.hours), takenChecked: false }
  }
}

// True when the instant is still an open slot (inside office hours, in the
// future, and not booked). Throws if the bridge can't be read, so a booking
// is never saved without the check.
export async function isSlotOpen(
  slotId: string,
  booking: AppSettings['booking'],
  now: Date = new Date()
): Promise<boolean> {
  const at = new Date(slotId)
  if (Number.isNaN(at.getTime())) return false
  const date = isoDate(at)
  const taken = await listTakenSlots(date, date)
  // Check in UTC: the slot rules don't depend on the viewer's zone.
  const days = getOpenDays('UTC', taken, now, booking.windowDays + 1, booking.hours)
  return days.some((d) => d.slots.some((s) => s.id === at.toISOString()))
}

// Removes a booking row (used by tests and cleanup scripts).
export async function deleteBridgeBooking(id: number): Promise<boolean> {
  const { url, secret } = getBridgeConfig()
  const res = await fetch(buildBridgeUrl(url, secret), {
    method: 'POST',
    headers: bridgeHeaders(secret),
    body: JSON.stringify({ action: 'delete', id }),
    cache: 'no-store',
  })
  return res.ok
}
