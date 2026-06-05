export const KARACHI_OFFICE_TZ = 'Asia/Karachi'
export const SLOT_INTERVAL_MINUTES = 30
export const CALL_DURATION_MINUTES = 30

export type BookingSlot = {
  id: string
  startsAt: Date
  label12h: string
  label24h: string
}

const WEEKDAY: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

type ZonedParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  weekday: string
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

export function detectUserTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

export function getAllTimeZones() {
  if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
    return (Intl as typeof Intl & { supportedValuesOf: (key: string) => string[] })
      .supportedValuesOf('timeZone')
      .sort()
  }

  return [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Toronto',
    'America/Sao_Paulo',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Istanbul',
    'Africa/Cairo',
    'Asia/Dubai',
    'Asia/Karachi',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Singapore',
    'Asia/Hong_Kong',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Australia/Sydney',
    'Pacific/Auckland',
  ]
}

export function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  })

  const parts = Object.fromEntries(
    dtf
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  )

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour === '24' ? '0' : parts.hour),
    minute: Number(parts.minute),
    weekday: parts.weekday,
  }
}

export function getTimezoneOffsetMs(timeZone: string, date: Date) {
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  const zoned = new Date(date.toLocaleString('en-US', { timeZone }))
  return zoned.getTime() - utc.getTime()
}

export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
) {
  let utcMs = Date.UTC(year, month - 1, day, hour, minute, 0, 0)
  let offset = getTimezoneOffsetMs(timeZone, new Date(utcMs))
  utcMs -= offset
  offset = getTimezoneOffsetMs(timeZone, new Date(utcMs))
  return new Date(utcMs - offset)
}

/** Karachi office: Mon–Fri, 9:00 PM – 6:00 AM (next calendar day). */
export function isInKarachiOfficeHours(instant: Date) {
  const karachi = getZonedParts(instant, KARACHI_OFFICE_TZ)
  const dow = WEEKDAY[karachi.weekday]

  if (karachi.hour >= 21) {
    return dow >= 1 && dow <= 5
  }

  if (karachi.hour < 6) {
    const previousDay = zonedTimeToUtc(
      karachi.year,
      karachi.month,
      karachi.day,
      12,
      0,
      KARACHI_OFFICE_TZ
    )
    const prev = getZonedParts(new Date(previousDay.getTime() - 86_400_000), KARACHI_OFFICE_TZ)
    const prevDow = WEEKDAY[prev.weekday]
    return prevDow >= 1 && prevDow <= 5
  }

  return false
}

export function formatSlotLabels(instant: Date, timeZone: string) {
  const label12h = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(instant)

  const parts = getZonedParts(instant, timeZone)
  const label24h = `${pad2(parts.hour)}:${pad2(parts.minute)}`

  return { label12h, label24h }
}

export function getAvailableSlots(
  year: number,
  month: number,
  day: number,
  viewerTimeZone: string,
  now: Date = new Date()
) {
  const slots: BookingSlot[] = []

  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const startsAt = zonedTimeToUtc(year, month, day, hour, minute, viewerTimeZone)
      if (startsAt.getTime() <= now.getTime()) continue
      if (!isInKarachiOfficeHours(startsAt)) continue

      const labels = formatSlotLabels(startsAt, viewerTimeZone)
      slots.push({
        id: startsAt.toISOString(),
        startsAt,
        ...labels,
      })
    }
  }

  return slots
}

export function dateHasAvailableSlots(
  year: number,
  month: number,
  day: number,
  viewerTimeZone: string,
  now: Date = new Date()
) {
  return getAvailableSlots(year, month, day, viewerTimeZone, now).length > 0
}

export function firstSelectableDayInMonthWithSlots(
  year: number,
  month: number,
  viewerTimeZone: string,
  now: Date = new Date()
) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= daysInMonth; day++) {
    const today = getZonedParts(now, viewerTimeZone)
    const todayStart = zonedTimeToUtc(today.year, today.month, today.day, 0, 0, viewerTimeZone)
    const cellStart = zonedTimeToUtc(year, month + 1, day, 0, 0, viewerTimeZone)
    if (cellStart.getTime() < todayStart.getTime()) continue
    if (dateHasAvailableSlots(year, month + 1, day, viewerTimeZone, now)) return day
  }
  return null
}

export function getInitialCalendarStateForTimeZone(viewerTimeZone: string) {
  const now = new Date()
  const today = getZonedParts(now, viewerTimeZone)
  const monthStart = new Date(today.year, today.month - 1, 1)
  const firstDay =
    firstSelectableDayInMonthWithSlots(today.year, today.month - 1, viewerTimeZone, now) ??
    today.day

  return {
    calendarDate: monthStart,
    selectedDate: firstDay,
  }
}

export function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function formatAppointmentDateFromSlot(slot: BookingSlot, viewerTimeZone: string) {
  const parts = getZonedParts(slot.startsAt, viewerTimeZone)
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`
}
