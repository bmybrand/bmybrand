import { NextResponse } from 'next/server'
import { getMysqlPool } from '@/lib/mysql'

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
    websiteUrl: body.websiteUrl?.trim(),
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
    !payload.websiteUrl ||
    !payload.budget ||
    !payload.callNotes ||
    !payload.source ||
    !payload.appointmentDate ||
    !payload.appointmentTime ||
    !payload.timezone
  ) {
    return NextResponse.json({ error: 'All required fields must be provided.' }, { status: 400 })
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  if (!isValidDate(payload.appointmentDate)) {
    return NextResponse.json({ error: 'Invalid appointment date.' }, { status: 400 })
  }

  try {
    const pool = getMysqlPool()

    const [result] = await pool.execute(
      `INSERT INTO strategy_call_bookings (
        email, name, country_code, phone, company_name, website_url,
        budget, call_notes, source, appointment_date, appointment_time, timezone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.email,
        payload.name,
        payload.countryCode || null,
        payload.phone,
        payload.companyName,
        payload.websiteUrl,
        payload.budget,
        payload.callNotes,
        payload.source,
        payload.appointmentDate,
        payload.appointmentTime,
        payload.timezone,
      ]
    )

    const insertId =
      typeof result === 'object' && result !== null && 'insertId' in result
        ? Number((result as { insertId: number }).insertId)
        : null

    return NextResponse.json({ ok: true, id: insertId })
  } catch (error) {
    console.error('[strategy-call] Database insert failed:', error)
    return NextResponse.json(
      { error: 'Failed to save booking. Check database configuration and table schema.' },
      { status: 500 }
    )
  }
}
