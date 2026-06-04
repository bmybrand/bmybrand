import { google } from 'googleapis'
import type { StrategyCallRecord } from '@/lib/strategy-call-save'

const CALL_DURATION_MINUTES = 30

const TIMEZONE_IANA: Record<string, string> = {
  'Asia/Mongolia/Ulaanbaatar': 'Asia/Ulaanbaatar',
  'Asia/Israel/Jerusalem': 'Asia/Jerusalem',
  'Asia/Afghanistan/Kabul': 'Asia/Kabul',
  'Asia/Russia/Kamchatka': 'Asia/Kamchatka',
  'Asia/Pakistan/Karachi': 'Asia/Karachi',
  'Asia/Uzbekistan/Tashkent': 'Asia/Tashkent',
  'Asia/Nepal/Kathmandu': 'Asia/Kathmandu',
  'Asia/India/Kolkata': 'Asia/Kolkata',
  'Asia/Russia/Krasnoyarsk': 'Asia/Krasnoyarsk',
}

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim()
  )
}

function getPrivateKey() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? ''
  return raw.replace(/\\n/g, '\n')
}

function toIanaTimezone(label: string) {
  if (TIMEZONE_IANA[label]) return TIMEZONE_IANA[label]
  const parts = label.split('/').filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]}/${parts[parts.length - 1]}`
  }
  return 'UTC'
}

function parseTimeTo24h(timeLabel: string) {
  const trimmed = timeLabel.trim()
  const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (match12) {
    let hours = Number(match12[1])
    const minutes = Number(match12[2])
    const period = match12[3].toUpperCase()
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    return { hours, minutes }
  }

  const match24 = trimmed.match(/^(\d{1,2}):(\d{2})$/)
  if (match24) {
    return { hours: Number(match24[1]), minutes: Number(match24[2]) }
  }

  throw new Error(`Could not parse appointment time: ${timeLabel}`)
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function buildDateTimeParts(
  appointmentDate: string,
  appointmentTime: string,
  timezoneLabel: string
) {
  const { hours, minutes } = parseTimeTo24h(appointmentTime)
  const timeZone = toIanaTimezone(timezoneLabel)
  const [year, month, day] = appointmentDate.split('-').map(Number)

  const totalStartMinutes = hours * 60 + minutes
  const totalEndMinutes = totalStartMinutes + CALL_DURATION_MINUTES
  const endHours = Math.floor(totalEndMinutes / 60) % 24
  const endMinutes = totalEndMinutes % 60

  const start = `${year}-${pad2(month)}-${pad2(day)}T${pad2(hours)}:${pad2(minutes)}:00`
  const end = `${year}-${pad2(month)}-${pad2(day)}T${pad2(endHours)}:${pad2(endMinutes)}:00`

  return { timeZone, start, end }
}

function buildEventDescription(booking: StrategyCallRecord) {
  const phone = [booking.countryCode, booking.phone].filter(Boolean).join(' ').trim()
  return [
    'Strategy call booked via BMYBrand website.',
    '',
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${phone}`,
    `Company: ${booking.companyName}`,
    `Website: ${booking.websiteUrl}`,
    `Budget: ${booking.budget}`,
    `Source: ${booking.source}`,
    `Timezone: ${booking.timezone}`,
    '',
    'Notes:',
    booking.callNotes,
  ].join('\n')
}

export async function createStrategyCallCalendarEvent(booking: StrategyCallRecord) {
  if (!isGoogleCalendarConfigured()) {
    return { created: false as const, reason: 'not_configured' as const }
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID!.trim()
  const { timeZone, start, end } = buildDateTimeParts(
    booking.appointmentDate,
    booking.appointmentTime,
    booking.timezone
  )

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!.trim(),
    key: getPrivateKey(),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  const calendar = google.calendar({ version: 'v3', auth })

  const requestBody = {
    summary: `Strategy Call — ${booking.name} (${booking.companyName})`,
    description: buildEventDescription(booking),
    start: { dateTime: start, timeZone },
    end: { dateTime: end, timeZone },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email' as const, minutes: 24 * 60 },
        { method: 'popup' as const, minutes: 30 },
      ],
    },
  }

  let response
  try {
    response = await calendar.events.insert({
      calendarId,
      sendUpdates: 'none',
      requestBody: {
        ...requestBody,
        attendees: [{ email: booking.email, displayName: booking.name }],
      },
    })
  } catch {
    // Service accounts often cannot add guests without Workspace domain-wide delegation
    response = await calendar.events.insert({
      calendarId,
      sendUpdates: 'none',
      requestBody,
    })
  }

  return {
    created: true as const,
    eventId: response.data.id ?? null,
    htmlLink: response.data.htmlLink ?? null,
  }
}
