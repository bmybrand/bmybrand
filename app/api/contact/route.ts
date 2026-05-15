import { NextResponse } from 'next/server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_TO_EMAIL = 'info@bmybrand.com'

type ContactPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  service?: string
  message: string
  accessPage?: string
  sourceForm?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    )
  }

  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const payload = {
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    email: body.email?.trim(),
    phone: body.phone?.trim(),
    service: body.service?.trim(),
    message: body.message?.trim(),
    accessPage: body.accessPage?.trim(),
    sourceForm: body.sourceForm?.trim(),
  }

  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.phone ||
    !payload.message
  ) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 400 }
    )
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 }
    )
  }

  const service = payload.service || 'General Inquiry'
  const sourceForm = payload.sourceForm || 'Website Form'
  const subject = `New contact form inquiry: ${service}`
  const text = [
    'New contact form submission',
    '',
    `Source: ${sourceForm}`,
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Service: ${service}`,
    ...(payload.accessPage ? [`Page: ${payload.accessPage}`] : []),
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <p><strong>Source:</strong> ${escapeHtml(sourceForm)}</p>
      <p><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      ${payload.accessPage ? `<p><strong>Page:</strong> ${escapeHtml(payload.accessPage)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `

  let resendResponse: Response

  try {
    resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the email service.' },
      { status: 502 }
    )
  }

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text()

    return NextResponse.json(
      { error: 'Failed to send email.', details: errorText },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
