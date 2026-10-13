// Slot math for the in-chat booking calendar. Pure functions (no I/O), so
// they can run on the server and in scripts/test-booking-slots.ts.
//
// Office hours come from the strategy-call page (Karachi office, Mon–Fri,
// 9 PM–6 AM), so both booking paths offer exactly the same times.

import { getAvailableSlots, getZonedParts, zonedTimeToUtc } from '../strategy-call-scheduling'

export const BOOKING_WINDOW_DAYS = 14
export const DEFAULT_BOOKING_ZONE = 'America/Chicago'

export interface OpenSlot {
  id: string // ISO instant
  label: string // "2:30 PM" in the visitor's zone
}

export interface OpenDay {
  date: string // YYYY-MM-DD in the visitor's zone
  label: string // "Tue, Oct 20"
  slots: OpenSlot[]
}

export function isValidZone(timeZone: string): boolean {
  if (!timeZone) return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone })
    return true
  } catch {
    return false
  }
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

// A stored booking's date + time label + zone as a UTC instant. Accepts the
// strategy-call page's labels ("02:00 PM", sometimes with a narrow no-break
// space) and 24h times ("14:00"). Returns null when anything is unreadable.
export function toInstant(date: string, time: string, timeZone: string): Date | null {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim())
  const t = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i.exec(time.trim())
  if (!d || !t || !isValidZone(timeZone)) return null
  let hour = Number(t[1])
  const minute = Number(t[2])
  const period = t[3]?.toUpperCase()
  if (period === 'PM' && hour !== 12) hour += 12
  if (period === 'AM' && hour === 12) hour = 0
  if (hour > 23 || minute > 59) return null
  return zonedTimeToUtc(Number(d[1]), Number(d[2]), Number(d[3]), hour, minute, timeZone)
}

// The date (YYYY-MM-DD) and 12h time label of an instant in a zone, in the
// format the strategy-call page stores.
export function appointmentParts(instant: Date, timeZone: string) {
  const p = getZonedParts(instant, timeZone)
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
    .format(instant)
    .replace(/\s+/g, ' ')
  return { date: `${p.year}-${pad2(p.month)}-${pad2(p.day)}`, time }
}

export function formatSlotTime(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' })
    .format(instant)
    .replace(/\s+/g, ' ')
}

// "Tuesday, October 20 at 2:00 PM" in the given zone.
export function formatSlotLong(instant: Date, timeZone: string): string {
  const day = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(instant)
  return `${day} at ${formatSlotTime(instant, timeZone)}`
}

// Short zone name for display, e.g. "CDT" or "GMT+5".
export function zoneAbbr(instant: Date, timeZone: string): string {
  const part = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    .formatToParts(instant)
    .find((p) => p.type === 'timeZoneName')
  return part?.value ?? timeZone
}

// Bookable days for the next `days` calendar days in the visitor's zone, with
// already-booked instants removed. Days without a free slot are left out.
export function getOpenDays(
  timeZone: string,
  taken: Set<string>,
  now: Date = new Date(),
  days: number = BOOKING_WINDOW_DAYS
): OpenDay[] {
  const today = getZonedParts(now, timeZone)
  const result: OpenDay[] = []
  for (let i = 0; i < days; i++) {
    const cal = new Date(Date.UTC(today.year, today.month - 1, today.day + i))
    const year = cal.getUTCFullYear()
    const month = cal.getUTCMonth() + 1
    const day = cal.getUTCDate()
    const slots = getAvailableSlots(year, month, day, timeZone, now)
      .filter((s) => !taken.has(s.startsAt.toISOString()))
      .map((s) => ({ id: s.startsAt.toISOString(), label: formatSlotTime(s.startsAt, timeZone) }))
    if (slots.length === 0) continue
    const label = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(cal)
    result.push({ date: `${year}-${pad2(month)}-${pad2(day)}`, label, slots })
  }
  return result
}
