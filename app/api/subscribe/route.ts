import { NextResponse } from 'next/server'
import { getClientIp, rateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import { getContactSupabaseAdmin } from '@/lib/supabase/contact-server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_SUPABASE_TABLE = 'leads'
const SUBSCRIBE_RATE_LIMIT = {
  limit: 1,
  windowMs: 24 * 60 * 60 * 1000,
}

type SubscribePayload = {
  email: string
  accessPage?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  const supabaseAdmin = getContactSupabaseAdmin()
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

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

  const clientIp = getClientIp(request)
  const ipLimit = await rateLimit({
    key: `subscribe:ip:${clientIp}`,
    ...SUBSCRIBE_RATE_LIMIT,
  })

  if (!ipLimit.success) {
    return NextResponse.json(
      { error: 'You can submit this form once per day. Please try again tomorrow.' },
      { status: 429, headers: rateLimitHeaders(ipLimit) }
    )
  }

  const emailLimit = await rateLimit({
    key: `subscribe:email:${payload.email.toLowerCase()}`,
    ...SUBSCRIBE_RATE_LIMIT,
  })

  if (!emailLimit.success) {
    return NextResponse.json(
      { error: 'This email has already been submitted today. Please try again tomorrow.' },
      { status: 429, headers: rateLimitHeaders(emailLimit) }
    )
  }

  const { data: existingLead, error: existingLeadError } = await supabaseAdmin
    .from(DEFAULT_SUPABASE_TABLE)
    .select('id')
    .eq('email', payload.email)
    .eq('form_type', 'newsletter_subscription')
    .limit(1)

  if (existingLeadError) {
    return NextResponse.json(
      {
        error: 'Failed to check existing subscription.',
        details: existingLeadError.message,
      },
      { status: 502 }
    )
  }

  if (existingLead && existingLead.length > 0) {
    return NextResponse.json({
      ok: true,
      alreadySubscribed: true,
      message: 'You are already subscribed.',
    })
  }

  const { error: leadInsertError } = await supabaseAdmin
    .from(DEFAULT_SUPABASE_TABLE)
    .insert({
      form_type: 'newsletter_subscription',
      access_page: payload.accessPage,
      email: payload.email,
    })

  if (leadInsertError) {
    return NextResponse.json(
      {
        error: 'Failed to save subscription.',
        details: leadInsertError.message,
      },
      { status: 502 }
    )
  }

  if (!apiKey || !from) {
    return NextResponse.json({
      ok: true,
      emailSkipped: true,
      message: 'Subscribed successfully.',
    })
  }

  const subject = 'Thanks for subscribing to BmyBrand'
  const logoUrl = process.env.BMYBRAND_EMAIL_LOGO_URL?.trim() || 'http://bmybrand.com/bmyb-services-brand-bmybrand-01-01.svg?dpl=dpl_E3BqAnZ5brZJwUG3yvtPpDntgK2e'
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
                      <td width="50%" align="left" style="background-color:#11122F; padding:28px 28px 26px; color:#ffffff; font-family:Arial,sans-serif; vertical-align:middle; text-align:left;">
                        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin:0;">
                          <tr>
                            <td style="vertical-align:middle;">
                              <img src="${escapeHtml(logoUrl)}" alt="BmyBrand" width="170" style="display:block; width:170px; max-height:150px; height:auto; border-radius:12px; object-fit:contain;" />
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td width="50%" align="right" style="background-color:#11122f; padding:18px 28px 10px; font-family:Arial,sans-serif; vertical-align:middle; text-align:right;">
                        <div style="font-size:15px; line-height:1.9; text-align:right;">
                          <div style="color:#ffffff;">Austin, TX 73301, USA</div>
                          <div><a href="mailto:info@bmybrand.com" style="color:#ffffff; text-decoration:none;">info@bmybrand.com</a></div>
                          <div style="color:#ffffff;">+1 469 501 1401</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="background-color:#f45b25; padding:9px 24px; text-align:right; font-family:Arial,sans-serif; font-size:14px; color:#ffffff;">
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
                <td style="background-color:#11122F; border-top:6px solid #f45b25; padding:20px 32px; text-align:center; font-family:Arial,sans-serif;">
                  <div style="margin:0 0 10px; font-size:14px; color:#ffffff; font-weight:700;">BmyBrand</div>
                  <div style="font-size:13px; line-height:1.8;">
                    <a href="https://www.instagram.com/bmybrand_official/" style="color:#ffffff; text-decoration:none; margin:0 8px;">Instagram</a>
                    <a href="https://www.linkedin.com/company/bmy-brand/" style="color:#ffffff; text-decoration:none; margin:0 8px;">LinkedIn</a>
                    <a href="https://www.facebook.com/bmybrandofficial/" style="color:#ffffff; text-decoration:none; margin:0 8px;">Facebook</a>
                    <a href="https://www.youtube.com/@BMyBrandofficial" style="color:#ffffff; text-decoration:none; margin:0 8px;">YouTube</a>
                    <a href="mailto:info@bmybrand.com" style="color:#ffffff; text-decoration:none; margin:0 8px;">Reply</a>
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

    return NextResponse.json({
      ok: true,
      emailWarning: errorText,
      message: 'Subscribed successfully.',
    })
  }

  return NextResponse.json({ ok: true, message: 'Subscribed successfully.' })
}
