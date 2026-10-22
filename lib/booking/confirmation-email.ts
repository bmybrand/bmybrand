// Confirmation email to a visitor who booked a strategy call in the chat,
// with an .ics attachment so they can add it to their calendar.

import { buildIcs } from './ics'
import { formatSlotLong, zoneAbbr } from './slots'
import { CALL_DURATION_MINUTES } from '../strategy-call-scheduling'

const RESEND_API_URL = 'https://api.resend.com/emails'

export interface BookingConfirmation {
  bookingId: number | null
  to: string
  name: string
  startsAt: Date
  timeZone: string
  phone: string
  team: { phone: string; email: string }
  // A booking from the CRM's test environment: "[TEST]" subject.
  test?: boolean
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Never throws: the booking is already saved, so a failed email is logged
// and reported back.
export async function sendBookingConfirmation(
  booking: BookingConfirmation
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from) {
    console.warn('[booking] confirmation email skipped: RESEND_API_KEY or RESEND_FROM_EMAIL missing')
    return { sent: false, error: 'Email is not configured' }
  }

  const firstName = booking.name.trim().split(/\s+/)[0] || 'there'
  const when = `${formatSlotLong(booking.startsAt, booking.timeZone)} (${zoneAbbr(booking.startsAt, booking.timeZone)})`

  const ics = buildIcs({
    uid: `strategy-call-${booking.bookingId ?? booking.startsAt.getTime()}@bmybrand.com`,
    start: booking.startsAt,
    minutes: CALL_DURATION_MINUTES,
    summary: 'BMYBrand strategy call',
    description: `Free ${CALL_DURATION_MINUTES}-minute strategy call with BMYBrand. We'll call you on ${booking.phone}. To change the time, reply to the confirmation email or call ${booking.team.phone}.`,
    organizerEmail: booking.team.email,
  })

  const text = [
    `Hi ${firstName},`,
    '',
    `Your free strategy call with BMYBrand is booked for ${when}.`,
    '',
    `We'll call you on ${booking.phone}. The call takes about ${CALL_DURATION_MINUTES} minutes: we'll talk through your goals, map out a plan and give you a tailored quote.`,
    '',
    `Need a different time? Just reply to this email or call us on ${booking.team.phone}.`,
    '',
    'Talk soon,',
    'The BMYBrand team',
  ].join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#1c1d2b;max-width:560px;">
      <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 14px;">Your free strategy call with BMYBrand is booked.</p>
      <div style="border:1px solid #f1d2c4;background:#fff6f1;border-radius:10px;padding:14px 16px;margin:0 0 16px;">
        <p style="margin:0;font-size:13px;color:#8a5a45;">When</p>
        <p style="margin:2px 0 10px;font-weight:bold;">${escapeHtml(when)}</p>
        <p style="margin:0;font-size:13px;color:#8a5a45;">How</p>
        <p style="margin:2px 0 0;font-weight:bold;">We'll call you on ${escapeHtml(booking.phone)}</p>
      </div>
      <p style="margin:0 0 14px;">The call takes about ${CALL_DURATION_MINUTES} minutes: we'll talk through your goals, map out a plan and give you a tailored quote. The attached invite adds it to your calendar.</p>
      <p style="margin:0 0 14px;">Need a different time? Just reply to this email or call us on ${escapeHtml(booking.team.phone)}.</p>
      <p style="margin:0;">Talk soon,<br/>The BMYBrand team</p>
    </div>`

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [booking.to],
        reply_to: booking.team.email,
        subject: `${booking.test ? '[TEST] ' : ''}Your BMYBrand strategy call: ${when}`,
        text,
        html,
        attachments: [
          {
            filename: 'strategy-call.ics',
            content: Buffer.from(ics, 'utf8').toString('base64'),
            content_type: 'text/calendar; charset=utf-8; method=PUBLISH',
          },
        ],
      }),
    })
    if (!res.ok) {
      const error = await res.text()
      console.error('[booking] confirmation email failed', { status: res.status, error })
      return { sent: false, error }
    }
    return { sent: true }
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Could not reach the email service'
    console.error('[booking] confirmation email failed', { error })
    return { sent: false, error }
  }
}
