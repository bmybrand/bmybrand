import { NextResponse } from 'next/server'
import { getClientIp, rateLimit, rateLimitHeaders } from '@/lib/rate-limit'

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_TO_EMAIL = 'info@bmybrand.com'
const DEFAULT_SUPABASE_TABLE = 'leads'
const CONTACT_RATE_LIMIT = {
  limit: 1,
  windowMs: 24 * 60 * 60 * 1000,
}

type ContactPayload = {
  formType?: 'contact' | 'custom_quote_request'
  firstName: string
  lastName: string
  email: string
  phone: string
  service?: string
  message: string
  accessPage?: string
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

function containsUnsafeMarkup(value: string) {
  return /<[^>]*>|javascript:|data:text\/html/i.test(value)
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL
  const supabaseUrl = process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL
  const supabaseKey =
    process.env.BMYB_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

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
    formType: body.formType,
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    email: body.email?.trim(),
    phone: body.phone?.trim(),
    service: body.service?.trim(),
    message: body.message?.trim(),
    accessPage: body.accessPage?.trim(),
  }

  const formType =
    payload.formType === 'custom_quote_request'
      ? 'custom_quote_request'
      : 'contact'

  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.phone ||
    !payload.message ||
    !payload.accessPage
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

  const submittedTextValues = [
    payload.firstName,
    payload.lastName,
    payload.phone,
    payload.service,
    payload.message,
    payload.accessPage,
  ].filter((value): value is string => Boolean(value))

  if (submittedTextValues.some(containsUnsafeMarkup)) {
    return NextResponse.json(
      { error: 'HTML or script content is not allowed in this form.' },
      { status: 400 }
    )
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Lead database is not configured.' },
      { status: 500 }
    )
  }

  const existingLeadResponse = await fetch(
    `${supabaseUrl}/rest/v1/${DEFAULT_SUPABASE_TABLE}?select=id&email=eq.${encodeURIComponent(payload.email)}&form_type=eq.${encodeURIComponent(formType)}&limit=1`,
    {
      method: 'GET',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  )

  if (!existingLeadResponse.ok) {
    const errorText = await existingLeadResponse.text()

    return NextResponse.json(
      { error: 'Failed to check existing lead.', details: errorText },
      { status: 502 }
    )
  }

  const existingLead = (await existingLeadResponse.json()) as Array<{ id: number }>

  if (existingLead.length > 0) {
    const message =
      formType === 'custom_quote_request'
        ? 'This email has already requested a quote.'
        : 'This email has already submitted the contact form.'

    return NextResponse.json(
      { error: message },
      { status: 409 }
    )
  }

  const service = payload.service || 'General Inquiry'
  const clientIp = getClientIp(request)
  const ipLimit = await rateLimit({
    key: `contact:${formType}:ip:${clientIp}`,
    ...CONTACT_RATE_LIMIT,
  })

  if (!ipLimit.success) {
    return NextResponse.json(
      { error: 'You can send one message per day. Please try again tomorrow.' },
      { status: 429, headers: rateLimitHeaders(ipLimit) }
    )
  }

  const emailLimit = await rateLimit({
    key: `contact:${formType}:email:${payload.email.toLowerCase()}`,
    ...CONTACT_RATE_LIMIT,
  })

  if (!emailLimit.success) {
    return NextResponse.json(
      { error: 'This email has already sent a message today. Please try again tomorrow.' },
      { status: 429, headers: rateLimitHeaders(emailLimit) }
    )
  }

  const subject = `New contact form inquiry: ${service}`
  const text = [
    'New contact form submission',
    '',
    `Page: ${payload.accessPage}`,
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Service: ${service}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const fullName = `${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}`
  const html = `
    <div style="margin:0; padding:0; background-color:#f3f4f6;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background-color:#f3f4f6;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; max-width:720px; background-color:#ffffff;">
              <tr>
                <td style="padding:0;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      <td width="58%" style="background-color:#231f20; padding:28px 28px 26px; color:#ffffff; font-family:Arial,sans-serif; vertical-align:top;">
                        <div style="font-size:15px; line-height:1.9;">
                          <div>PO BOX 605 Allen, TX 75013</div>
                          <div><a href="mailto:info@bmybrand.com" style="color:#ffffff; text-decoration:none;">info@bmybrand.com</a></div>
                          <div>+1 469 501 1401</div>
                        </div>
                      </td>
                      <td width="10%" style="background:linear-gradient(60deg, #231f20 0%, #231f20 36%, #f45b25 36%, #ff843e 58%, #11122f 58%, #11122f 74%, #ffffff 74%, #ffffff 100%); font-size:0; line-height:0;">
                        &nbsp;
                      </td>
                      <td width="32%" align="center" style="background-color:#ffffff; padding:18px 20px 10px; font-family:Arial,sans-serif; vertical-align:middle; text-align:center;">
                        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin:0 auto;">
                          <tr>
                            <td style="padding-right:12px; vertical-align:middle;">
                              <div style="width:44px; height:44px; background:linear-gradient(135deg, #f45b25 0%, #ff843e 100%); border-radius:10px; color:#ffffff; font-size:28px; line-height:44px; font-weight:700; text-align:center;">B</div>
                            </td>
                            <td style="vertical-align:middle; text-align:left;">
                              <div style="font-size:24px; line-height:1; font-weight:700; color:#11122f; letter-spacing:0.2px;">BmyBrand</div>
                              <div style="margin-top:6px; font-size:12px; line-height:1; color:#6b7280;">Design. Build. Grow.</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" style="background:linear-gradient(90deg, #11122f 0%, #1a1d4a 40%, #f45b25 100%); padding:9px 24px; text-align:right; font-family:Arial,sans-serif; font-size:14px; color:#ffffff;">
                        <a href="https://bmybrand.com" style="color:#ffffff; text-decoration:none;">bmybrand.com</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 32px 0; font-family:Arial,sans-serif; color:#11122f; font-size:18px; line-height:1.8;">
                  <p style="margin:0 0 22px;">Hi Team,</p>
                  <p style="margin:0 0 22px;">You received a new inquiry from the page <strong>${escapeHtml(payload.accessPage)}</strong>.</p>
                  <p style="margin:0 0 22px;">${fullName} submitted a request and would like to hear back regarding <strong>${escapeHtml(service)}</strong>.</p>
                  <p style="margin:0 0 22px;">The submitted message is included below along with the sender details.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 32px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:0; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden;">
                    <tr>
                      <td colspan="2" style="padding:16px 20px; background-color:#11122f; color:#ffffff; font-family:Arial,sans-serif; font-size:16px; font-weight:700;">
                        Inquiry Details
                      </td>
                    </tr>
                    <tr>
                      <td style="width:160px; padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:14px; color:#6b7280; font-weight:700;">Name</td>
                      <td style="padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:15px; color:#11122f;">${fullName}</td>
                    </tr>
                    <tr>
                      <td style="width:160px; padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:14px; color:#6b7280; font-weight:700;">Email</td>
                      <td style="padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:15px; color:#11122f;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#f45b25; text-decoration:none;">${escapeHtml(payload.email)}</a></td>
                    </tr>
                    <tr>
                      <td style="width:160px; padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:14px; color:#6b7280; font-weight:700;">Phone</td>
                      <td style="padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:15px; color:#11122f;">${escapeHtml(payload.phone)}</td>
                    </tr>
                    <tr>
                      <td style="width:160px; padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:14px; color:#6b7280; font-weight:700;">Service</td>
                      <td style="padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:15px; color:#11122f;">${escapeHtml(service)}</td>
                    </tr>
                    <tr>
                      <td style="width:160px; padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:14px; color:#6b7280; font-weight:700;">Page</td>
                      <td style="padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:15px; color:#11122f;">${escapeHtml(payload.accessPage)}</td>
                    </tr>
                    <tr>
                      <td style="width:160px; padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:14px; color:#6b7280; font-weight:700; vertical-align:top;">Message</td>
                      <td style="padding:14px 20px; border-top:1px solid #e5e7eb; font-family:Arial,sans-serif; font-size:15px; line-height:1.8; color:#11122f; white-space:pre-wrap;">${escapeHtml(payload.message)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 36px; font-family:Arial,sans-serif; color:#11122f; font-size:18px; line-height:1.8;">
                  <p style="margin:0 0 18px;">Kind regards,</p>
                  <p style="margin:0;"><strong>BmyBrand Website</strong><br />Lead Notification System</p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#111111; border-top:6px solid #f45b25; padding:20px 32px; text-align:center; font-family:Arial,sans-serif;">
                  <div style="margin:0 0 10px; font-size:14px; color:#ffffff; font-weight:700;">BmyBrand</div>
                  <div style="font-size:13px; line-height:1.8;">
                    <a href="https://www.instagram.com/" style="color:#ffffff; text-decoration:none; margin:0 8px;">Instagram</a>
                    <a href="https://www.linkedin.com/" style="color:#ffffff; text-decoration:none; margin:0 8px;">LinkedIn</a>
                    <a href="https://www.youtube.com/" style="color:#ffffff; text-decoration:none; margin:0 8px;">YouTube</a>
                    <a href="mailto:${escapeHtml(payload.email)}" style="color:#ffffff; text-decoration:none; margin:0 8px;">Reply</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `

  const leadInsertResponse = await fetch(
    `${supabaseUrl}/rest/v1/${DEFAULT_SUPABASE_TABLE}`,
    {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        form_type: formType,
        access_page: payload.accessPage,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        service,
        message: payload.message,
      }),
    }
  )

  if (!leadInsertResponse.ok) {
    const errorText = await leadInsertResponse.text()

    return NextResponse.json(
      { error: 'Failed to save lead.', details: errorText },
      { status: 502 }
    )
  }

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
