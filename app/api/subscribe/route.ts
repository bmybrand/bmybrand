import { NextResponse } from 'next/server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_SUPABASE_TABLE = 'leads'

type SubscribePayload = {
  email: string
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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
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

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Lead database is not configured.' },
      { status: 500 }
    )
  }

  let body: SubscribePayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const payload = {
    email: body.email?.trim(),
    accessPage: body.accessPage?.trim(),
  }

  if (!payload.email || !payload.accessPage) {
    return NextResponse.json(
      { error: 'Email and access page are required.' },
      { status: 400 }
    )
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 }
    )
  }

  const existingLeadResponse = await fetch(
    `${supabaseUrl}/rest/v1/${DEFAULT_SUPABASE_TABLE}?select=id&email=eq.${encodeURIComponent(payload.email)}&form_type=eq.${encodeURIComponent('newsletter_subscription')}&limit=1`,
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
      { error: 'Failed to check existing subscription.', details: errorText },
      { status: 502 }
    )
  }

  const existingLead = (await existingLeadResponse.json()) as Array<{ id: number }>

  if (existingLead.length > 0) {
    return NextResponse.json({
      ok: true,
      alreadySubscribed: true,
      message: 'You are already subscribed.',
    })
  }


  const subject = 'Thanks for subscribing to BmyBrand'
  const text = [
    'Hi,',
    '',
    'Thanks for subscribing to BmyBrand.',
    'You will now receive design, AI, and growth insights plus future updates from our team.',
    '',
    'Regards,',
    'BmyBrand',
  ].join('\n')

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
                      <td width="10%" style="background:linear-gradient(60deg, #231f20 0%, #231f20 36%, #f45b25 36%, #ff843e 58%, #11122f 58%, #11122f 74%, #ffffff 74%, #ffffff 100%); font-size:0; line-height:0;">&nbsp;</td>
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
                  <p style="margin:0 0 22px;">Hi,</p>
                  <p style="margin:0 0 22px;">Thanks for subscribing to BmyBrand.</p>
                  <p style="margin:0 0 22px;">You will now receive design, AI, and growth insights plus future updates from our team.</p>
                  <p style="margin:0 0 22px;">We will keep the emails useful, relevant, and easy to read.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 36px; font-family:Arial,sans-serif; color:#11122f; font-size:18px; line-height:1.8;">
                  <p style="margin:0 0 18px;">Kind regards,</p>
                  <p style="margin:0;"><strong>BmyBrand Team</strong><br />Design. Build. Grow.</p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#111111; border-top:6px solid #f45b25; padding:20px 32px; text-align:center; font-family:Arial,sans-serif;">
                  <div style="margin:0 0 10px; font-size:14px; color:#ffffff; font-weight:700;">BmyBrand</div>
                  <div style="font-size:13px; line-height:1.8;">
                    <a href="https://www.instagram.com/" style="color:#ffffff; text-decoration:none; margin:0 8px;">Instagram</a>
                    <a href="https://www.linkedin.com/" style="color:#ffffff; text-decoration:none; margin:0 8px;">LinkedIn</a>
                    <a href="https://www.youtube.com/" style="color:#ffffff; text-decoration:none; margin:0 8px;">YouTube</a>
                    <a href="mailto:info@bmybrand.com" style="color:#ffffff; text-decoration:none; margin:0 8px;">Contact</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `

  const resendResponse = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [payload.email],
      subject,
      text,
      html,
    }),
  })

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text()

    return NextResponse.json(
      { error: 'Failed to send thank-you email.', details: errorText },
      { status: 502 }
    )
  }

  // Only insert the lead after the thank-you email was sent successfully.
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
        form_type: 'newsletter_subscription',
        access_page: payload.accessPage,
        email: payload.email,
      }),
    }
  )

  if (!leadInsertResponse.ok) {
    const errorText = await leadInsertResponse.text()

    return NextResponse.json(
      {
        error: 'Failed to save lead after sending email.',
        details: errorText,
      },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true, message: 'Subscribed successfully.' })
}
