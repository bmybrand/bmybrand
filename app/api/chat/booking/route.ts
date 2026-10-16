import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isValidEmail, isValidPhone, sanitizeInput } from '@/lib/utils/validators'
import { getClientIp } from '@/lib/client-ip'
import { isSlotOpen } from '@/lib/booking/bridge'
import { sendBookingConfirmation } from '@/lib/booking/confirmation-email'
import { appointmentParts, DEFAULT_BOOKING_ZONE, formatSlotLong, isValidZone, zoneAbbr } from '@/lib/booking/slots'
import { saveStrategyCallBooking, updateStrategyCallCalendarEventId } from '@/lib/strategy-call-save'
import { createStrategyCallCalendarEvent } from '@/lib/google-calendar'
import { STRATEGY_CALL_IP_LIMIT_MESSAGE } from '@/lib/strategy-call-ip-config'
import { notifyTeamOfLead } from '@/lib/chat/notify-team'
import { regionContacts, regionFromCountry } from '@/lib/chat/contact-info'
import { getSettings } from '@/lib/settings'
import { translateMessage } from '@/lib/chat/language-detector'
import {
  BUDGET_OPTIONS,
  type BookingSubmitRequest,
  type BookingSummary,
  type ChatMessage,
} from '@/types/chat'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_FAILED_ATTEMPTS = 3

function fail(error: string, status: number, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ error, ...extra }, { status })
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'there'
}

// The team works in US Central time; lead labels and team emails use it.
function teamWhen(at: Date) {
  const zone = process.env.CHATBOT_TIMEZONE || 'America/Chicago'
  return `${formatSlotLong(at, zone)} ${zoneAbbr(at, zone)}`
}

// Books a strategy call from the in-chat calendar: re-checks the time, saves
// it through the MySQL bridge (same table as /strategy-call), adds the Google
// Calendar event when configured, updates the chat session (which creates or
// updates the CRM lead), emails the team and the visitor, and returns the two
// chat messages to show.
export async function POST(request: NextRequest) {
  let body: BookingSubmitRequest
  try {
    body = await request.json()
  } catch {
    return fail('Invalid request body.', 400)
  }

  const sessionId = body.sessionId?.trim()
  const name = sanitizeInput(body.name ?? '').slice(0, 100)
  const email = sanitizeInput(body.email ?? '').toLowerCase().slice(0, 254)
  const phone = sanitizeInput(body.phone ?? '').slice(0, 40)
  const company = sanitizeInput(body.company ?? '').slice(0, 120)
  const budget = (BUDGET_OPTIONS as readonly string[]).includes(body.budget) ? body.budget : ''
  const timeZone = isValidZone(body.timeZone ?? '') ? body.timeZone : DEFAULT_BOOKING_ZONE
  const startsAt = new Date(body.slotId ?? '')

  const settings = await getSettings()
  if (!settings.booking.enabled) return fail('Booking in the chat is turned off right now.', 403)

  if (!sessionId) return fail('sessionId is required.', 400)
  if (Number.isNaN(startsAt.getTime())) return fail('Please pick a time.', 400)
  if (name.length < 2) return fail('Please enter your name.', 400)
  if (!isValidEmail(email)) return fail('Please enter a valid email address.', 400)
  if (!isValidPhone(phone)) return fail('Please enter a valid phone number so the team can call you.', 400)
  if (company.length < 2) return fail('Please enter your company name.', 400)
  if (!budget) return fail('Please pick a budget range.', 400)

  const { data: session, error: sessionError } = await supabaseAdmin
    .from('chat_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()
  if (sessionError || !session) return fail('Session not found.', 404)

  const meta = (session.metadata ?? {}) as Record<string, unknown>
  const existing = meta.booking as (BookingSummary & Record<string, unknown>) | undefined
  if (existing?.startsAt) {
    // Already booked in this chat (e.g. a double click): return that booking.
    return NextResponse.json({ ok: true, booking: summaryOf(existing), messages: [] })
  }
  const failures = typeof meta.booking_failures === 'number' ? meta.booking_failures : 0
  if (failures >= MAX_FAILED_ATTEMPTS) {
    return fail('The team already has your request and will call you to confirm a time.', 429)
  }

  // Honeypot: hidden from people, so only bots fill it in. Answer like a
  // success so they move on, but save and send nothing.
  if (body.website?.trim()) {
    return NextResponse.json({
      ok: true,
      booking: { id: null, startsAt: startsAt.toISOString(), timeZone, phone },
      messages: [],
    })
  }

  const region = regionFromCountry(typeof meta.country === 'string' ? meta.country : null)
  const team = regionContacts(settings)[region === 'CA' ? 'CA' : 'US']
  const country = typeof meta.country === 'string' ? meta.country : null
  const interest = typeof meta.lead_interest === 'string' ? meta.lead_interest : null

  const { data: recent } = await supabaseAdmin
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .in('role', ['user', 'assistant'])
    .order('created_at', { ascending: false })
    .limit(40)
  const transcript = (recent ?? []).reverse()

  // ─── Is the time still free? ───────────────────────────────────────────
  let open: boolean
  try {
    open = await isSlotOpen(startsAt.toISOString(), settings.booking)
  } catch (err) {
    console.error('[booking] slot check failed', { sessionId, error: err instanceof Error ? err.message : err })
    return bookingFailed()
  }
  if (!open) {
    return fail('That time was just taken. Here are the latest times.', 409, { code: 'slot_taken' })
  }

  // ─── Save the booking ─────────────────────────────────────────────────
  const { date, time } = appointmentParts(startsAt, timeZone)
  const visitorLines = transcript
    .filter((m) => m.role === 'user')
    .slice(-4)
    .map((m) => m.content)
  const callNotes = [`Booked in the website chatbot.${interest ? ` Interest: ${interest}.` : ''}`, ...visitorLines]
    .join('\n')
    .slice(0, 600)
  const record = {
    email,
    name,
    countryCode: '',
    phone,
    companyName: company,
    websiteUrl: '',
    budget,
    callNotes,
    source: 'Chatbot',
    appointmentDate: date,
    appointmentTime: time,
    timezone: timeZone,
    ipAddress: getClientIp(request) ?? undefined,
  }

  let bookingId: number | null
  try {
    bookingId = (await saveStrategyCallBooking(record)).id
  } catch (err) {
    const code = (err as { details?: { code?: string } }).details?.code
    if (code === 'IP_ALREADY_SUBMITTED') return fail(STRATEGY_CALL_IP_LIMIT_MESSAGE, 429)
    console.error('[booking] bridge save failed', { sessionId, error: err instanceof Error ? err.message : err })
    return bookingFailed()
  }

  let calendarEventId: string | null = null
  try {
    const calendar = await createStrategyCallCalendarEvent(record)
    if (calendar.created && calendar.eventId) {
      calendarEventId = calendar.eventId
      if (bookingId) await updateStrategyCallCalendarEventId(bookingId, calendarEventId)
    }
  } catch (err) {
    console.error('[booking] Google Calendar event failed', { sessionId, error: err instanceof Error ? err.message : err })
  }

  // ─── Session + CRM lead ───────────────────────────────────────────────
  const booking: BookingSummary = { id: bookingId, startsAt: startsAt.toISOString(), timeZone, phone }
  const bookedAt = new Date()
  const leadMeta: Record<string, unknown> = {
    ...meta,
    booking: { ...booking, company, budget, calendarEventId },
    lead_interest: `Strategy call booked – ${teamWhen(startsAt)}`,
    lead_submitted_at: bookedAt.toISOString(),
    lead_submissions: (typeof meta.lead_submissions === 'number' ? meta.lead_submissions : 0) + 1,
  }
  // Saving the details creates or updates the CRM lead (trg_sync_lead_from_chat).
  const { error: updateError } = await supabaseAdmin
    .from('chat_sessions')
    .update({ visitor_name: name, visitor_email: email, visitor_phone: phone, status: 'bot', metadata: leadMeta })
    .eq('id', sessionId)
  if (updateError) {
    console.error('[booking] session update failed', { sessionId, bookingId, error: updateError.message })
  }

  // ─── Emails ───────────────────────────────────────────────────────────
  const [teamEmail, visitorEmail] = await Promise.all([
    notifyTeamOfLead({
      sessionId,
      name,
      email,
      phone,
      message: null,
      interest: leadMeta.lead_interest as string,
      region,
      country,
      transcript,
      booking: { when: teamWhen(startsAt), company, budget },
    }),
    sendBookingConfirmation({ bookingId, to: email, name, startsAt, timeZone, phone, team }),
  ])
  await supabaseAdmin
    .from('chat_sessions')
    .update({
      metadata: { ...leadMeta, lead_email_sent: teamEmail.sent, booking_email_sent: visitorEmail.sent },
    })
    .eq('id', sessionId)

  // ─── Chat messages ────────────────────────────────────────────────────
  const visitorWhen = `${formatSlotLong(startsAt, timeZone)} (${zoneAbbr(startsAt, timeZone)})`
  const summary = [
    'Booked a free strategy call',
    `When: ${visitorWhen}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Company: ${company}`,
    `Budget: ${budget}`,
  ].join('\n')
  let confirmation = `You're all set, ${firstName(name)}! Your free strategy call is booked for ${visitorWhen}. The team will call you on ${phone}${
    visitorEmail.sent ? `, and a confirmation with a calendar invite is on its way to ${email}` : ''
  }. Anything else I can help with before then?`
  if (session.visitor_language && session.visitor_language !== 'en') {
    confirmation = await translateMessage(confirmation, session.visitor_language)
  }

  // Explicit timestamps keep the two rows in order.
  const { data: inserted, error: insertError } = await supabaseAdmin
    .from('chat_messages')
    .insert([
      {
        session_id: sessionId,
        role: 'user',
        content: summary,
        metadata: { type: 'booking', booking },
        created_at: bookedAt.toISOString(),
      },
      {
        session_id: sessionId,
        role: 'assistant',
        content: confirmation,
        metadata: { type: 'booking_confirmation' },
        created_at: new Date(bookedAt.getTime() + 1).toISOString(),
      },
    ])
    .select()

  let messages = ((inserted ?? []) as ChatMessage[]).sort((a, b) => a.created_at.localeCompare(b.created_at))
  if (insertError || messages.length === 0) {
    console.error('[booking] chat messages not saved', { sessionId, error: insertError?.message })
    const now = bookedAt.toISOString()
    messages = [
      { id: `booking-${now}`, session_id: sessionId, role: 'user', content: summary, metadata: { type: 'booking', booking }, created_at: now },
      { id: `booked-${now}`, session_id: sessionId, role: 'assistant', content: confirmation, metadata: { type: 'booking_confirmation' }, created_at: now },
    ]
  }

  return NextResponse.json({ ok: true, booking, messages })

  // The bridge could not be reached: keep the request as a lead and tell the
  // team which time the visitor wanted, so nobody is lost.
  async function bookingFailed() {
    const when = teamWhen(startsAt)
    const failedMeta: Record<string, unknown> = {
      ...meta,
      booking_failed: { slotId: startsAt.toISOString(), timeZone, company, budget, at: new Date().toISOString() },
      booking_failures: failures + 1,
      lead_interest: `Strategy call request (wanted ${when})`,
      lead_submitted_at: new Date().toISOString(),
    }
    await supabaseAdmin
      .from('chat_sessions')
      .update({ visitor_name: name, visitor_email: email, visitor_phone: phone, metadata: failedMeta })
      .eq('id', sessionId)
    await notifyTeamOfLead({
      sessionId,
      name,
      email,
      phone,
      message: null,
      interest: failedMeta.lead_interest as string,
      region,
      country,
      transcript,
      booking: { when, company, budget, failed: true },
    })
    return fail(
      "We couldn't lock in that time just now, but the team has your request and will call you to confirm a time.",
      503,
      { code: 'booking_failed' }
    )
  }
}

function summaryOf(b: BookingSummary): BookingSummary {
  return { id: b.id ?? null, startsAt: b.startsAt, timeZone: b.timeZone, phone: b.phone }
}
