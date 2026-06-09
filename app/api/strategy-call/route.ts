import { NextResponse } from 'next/server'
import { createStrategyCallCalendarEvent } from '@/lib/google-calendar'
import { getMysqlErrorDetails } from '@/lib/mysql'
import { saveStrategyCallBooking } from '@/lib/strategy-call-save'
import { isValidWebsiteUrl, normalizeWebsiteUrl } from '@/lib/website-url'

type StrategyCallPayload = {
  email: string
  name: string
  countryCode?: string
  phone: string
  companyName: string
  websiteUrl: string
  budget: string
  callNotes: string
  source: string
  appointmentDate?: string
  appointmentTime?: string
  timezone?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export async function POST(request: Request) {
  let body: StrategyCallPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const payload = {
    email: body.email?.trim(),
    name: body.name?.trim(),
    countryCode: body.countryCode?.trim(),
    phone: body.phone?.trim(),
    companyName: body.companyName?.trim(),
    websiteUrl: normalizeWebsiteUrl(body.websiteUrl ?? ''),
    budget: body.budget?.trim(),
    callNotes: body.callNotes?.trim(),
    source: body.source?.trim(),
    appointmentDate: body.appointmentDate?.trim(),
    appointmentTime: body.appointmentTime?.trim(),
    timezone: body.timezone?.trim(),
  }

  if (
    !payload.email ||
    !payload.name ||
    !payload.phone ||
    !payload.companyName ||
    !payload.budget ||
    !payload.callNotes ||
    !payload.source ||
    !payload.appointmentDate ||
    !payload.appointmentTime ||
    !payload.timezone
  ) {
    return NextResponse.json({ error: 'All required fields must be provided.' }, { status: 400 })
  }

  if (!isValidWebsiteUrl(payload.websiteUrl)) {
    return NextResponse.json({ error: 'Enter a valid website URL.' }, { status: 400 })
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  if (!isValidDate(payload.appointmentDate)) {
    return NextResponse.json({ error: 'Invalid appointment date.' }, { status: 400 })
  }

  const booking = {
    email: payload.email,
    name: payload.name,
    countryCode: payload.countryCode ?? '',
    phone: payload.phone,
    companyName: payload.companyName,
    websiteUrl: payload.websiteUrl,
    budget: payload.budget,
    callNotes: payload.callNotes,
    source: payload.source,
    appointmentDate: payload.appointmentDate,
    appointmentTime: payload.appointmentTime,
    timezone: payload.timezone,
  }

  try {
    const { id, mode } = await saveStrategyCallBooking(booking)

    let calendarCreated = false
    let calendarEventId: string | null = null
    let calendarError: string | null = null
    let calendarReason: string | null = null

    try {
      const calendar = await createStrategyCallCalendarEvent(booking)
      if (calendar.created) {
        calendarCreated = true
        calendarEventId = calendar.eventId ?? null
      } else if (calendar.reason === 'not_configured') {
        calendarReason = 'not_configured'
        calendarError =
          'Google Calendar env vars are not set on this server (add them in Vercel if deploying).'
      }
    } catch (err) {
      calendarError =
        err instanceof Error ? err.message : 'Google Calendar request failed'
      console.error('[strategy-call] Google Calendar failed:', err)
    }

    return NextResponse.json({
      ok: true,
      id,
      mode,
      calendarCreated,
      calendarEventId,
      ...(calendarError ? { calendarError } : {}),
      ...(calendarReason ? { calendarReason } : {}),
    })
  } catch (error) {
    const details = getMysqlErrorDetails(error)
    console.error('[strategy-call] Database insert failed:', details)

    const showDetails =
      process.env.NODE_ENV !== 'production' ||
      process.env.MYSQL_DEBUG === 'true'

    const hint = getMysqlHint(details.code)

    return NextResponse.json(
      {
        error: 'Failed to save booking. Check database configuration and table schema.',
        ...(showDetails ? { details, hint } : {}),
      },
      { status: 500 }
    )
  }
}

function getMysqlHint(code?: string) {
  switch (code) {
    case 'ECONNREFUSED':
    case 'ETIMEDOUT':
    case 'ENOTFOUND':
      return 'Remote MySQL is blocked on many cPanel hosts. Use the cpanel-bridge/strategy-call.php file and set MYSQL_BRIDGE_URL + MYSQL_BRIDGE_SECRET on Vercel.'
    case 'ER_ACCESS_DENIED_ERROR':
      return 'Wrong MYSQL_USER or MYSQL_PASSWORD, or this host is not allowed in cPanel Remote MySQL.'
    case 'ER_NO_SUCH_TABLE':
      return 'Run database/strategy_call_bookings.sql in phpMyAdmin on the production database.'
    case 'HANDSHAKE_SSL_ERROR':
    case 'ECONNRESET':
      return 'Try setting MYSQL_SSL=true in Vercel environment variables.'
    default:
      return undefined
  }
}
