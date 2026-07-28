import { NextResponse } from 'next/server'
import { getCareerOpening } from '@/lib/careers/queries'
import { getClientIp, rateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import { getContactSupabaseAdmin } from '@/lib/supabase/contact-server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const MAX_RESUME_SIZE = 5 * 1024 * 1024
const allowedResumeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
])

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validOptionalUrl(value: string) {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function safeFileName(value: string) {
  return value.replace(/[^\w.\-() ]+/g, '_').slice(0, 120) || 'resume'
}

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid application data.' }, { status: 400 })
  }

  const resume = formData.get('resume')
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: 'A résumé is required.' }, { status: 400 })
  }
  if (resume.size > MAX_RESUME_SIZE) {
    return NextResponse.json({ error: 'Your résumé must be 5 MB or smaller.' }, { status: 413 })
  }
  if (!allowedResumeTypes.has(resume.type)) {
    return NextResponse.json({ error: 'Upload a PDF, DOC, DOCX, or TXT résumé.' }, { status: 400 })
  }

  const payload = {
    jobSlug: field(formData, 'jobSlug'),
    jobTitle: field(formData, 'jobTitle'),
    source: field(formData, 'source'),
    workedBefore: field(formData, 'workedBefore'),
    firstName: field(formData, 'firstName'),
    lastName: field(formData, 'lastName'),
    email: field(formData, 'email').toLowerCase(),
    phone: field(formData, 'phone'),
    country: field(formData, 'country'),
    city: field(formData, 'city'),
    linkedIn: field(formData, 'linkedIn'),
    portfolio: field(formData, 'portfolio'),
    currentTitle: field(formData, 'currentTitle'),
    yearsExperience: field(formData, 'yearsExperience'),
    coverLetter: field(formData, 'coverLetter'),
    consent: field(formData, 'consent') === 'true',
  }

  if (
    !payload.jobSlug ||
    !payload.source ||
    !payload.workedBefore ||
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.phone ||
    !payload.country ||
    !payload.yearsExperience ||
    !payload.consent
  ) {
    return NextResponse.json({ error: 'Complete all required application fields.' }, { status: 400 })
  }
  if (!validEmail(payload.email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }
  if (!validOptionalUrl(payload.linkedIn) || !validOptionalUrl(payload.portfolio)) {
    return NextResponse.json({ error: 'LinkedIn and portfolio links must begin with http:// or https://.' }, { status: 400 })
  }

  const job = await getCareerOpening(payload.jobSlug)
  if (!job) return NextResponse.json({ error: 'This opportunity is no longer accepting applications.' }, { status: 404 })

  const clientIp = getClientIp(request)
  const limit = await rateLimit({
    key: `job-application:${clientIp}:${payload.email}`,
    limit: 3,
    windowMs: 24 * 60 * 60 * 1000,
  })
  if (!limit.success) {
    return NextResponse.json(
      { error: 'You have reached today’s application limit. Please try again tomorrow.' },
      { status: 429, headers: rateLimitHeaders(limit) },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CAREERS_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'info@bmybrand.com'
  if (!apiKey || !from) {
    return NextResponse.json({ error: 'The application email service is not configured.' }, { status: 503 })
  }

  const resumeName = safeFileName(resume.name)
  const resumeBuffer = Buffer.from(await resume.arrayBuffer())
  const fullName = `${payload.firstName} ${payload.lastName}`

  const text = [
    `New application for ${job.title}`,
    '',
    `Candidate: ${fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Location: ${[payload.city, payload.country].filter(Boolean).join(', ')}`,
    `Source: ${payload.source}`,
    `Worked with BmyBrand before: ${payload.workedBefore}`,
    `Current title: ${payload.currentTitle || 'Not provided'}`,
    `Relevant experience: ${payload.yearsExperience}`,
    `LinkedIn: ${payload.linkedIn || 'Not provided'}`,
    `Portfolio: ${payload.portfolio || 'Not provided'}`,
    '',
    'Cover note:',
    payload.coverLetter || 'Not provided',
  ].join('\n')

  const rows = [
    ['Role', job.title],
    ['Candidate', fullName],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Location', [payload.city, payload.country].filter(Boolean).join(', ')],
    ['Relevant experience', payload.yearsExperience],
    ['Current title', payload.currentTitle || 'Not provided'],
    ['LinkedIn', payload.linkedIn || 'Not provided'],
    ['Portfolio', payload.portfolio || 'Not provided'],
  ]
    .map(([label, value]) => `<tr><td style="padding:12px 16px;border-top:1px solid #e5e7eb;color:#6b7280;font-weight:700;width:180px">${escapeHtml(label)}</td><td style="padding:12px 16px;border-top:1px solid #e5e7eb;color:#11122f">${escapeHtml(value)}</td></tr>`)
    .join('')

  const html = `
    <div style="background:#f3f4f6;padding:32px 16px;font-family:Arial,sans-serif">
      <div style="max-width:720px;margin:0 auto;background:#fff">
        <div style="background:#11122f;border-bottom:6px solid #f45b25;padding:28px 32px;color:#fff">
          <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#ff8b61">New job application</div>
          <h1 style="margin:10px 0 0;font-size:25px">${escapeHtml(job.title)}</h1>
        </div>
        <div style="padding:28px 32px">
          <p style="margin:0 0 22px;color:#374151;line-height:1.7">${escapeHtml(fullName)} submitted an application through the BmyBrand careers page. The résumé is attached.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:14px;border-collapse:separate;border-spacing:0;overflow:hidden;font-size:14px">${rows}</table>
          <h2 style="margin:28px 0 10px;color:#11122f;font-size:18px">Cover note</h2>
          <p style="margin:0;white-space:pre-wrap;color:#4b5563;line-height:1.75">${escapeHtml(payload.coverLetter || 'Not provided')}</p>
        </div>
      </div>
    </div>
  `

  let careersDatabase
  try {
    careersDatabase = getContactSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'The application database is not configured.' }, { status: 503 })
  }

  const { error: insertError } = await careersDatabase.from('job_applications').insert({
    job_slug: job.slug,
    job_title: job.title,
    source: payload.source,
    worked_before: payload.workedBefore === 'Yes',
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    country: payload.country,
    city: payload.city,
    linkedin_url: payload.linkedIn,
    portfolio_url: payload.portfolio,
    current_title: payload.currentTitle,
    years_experience: payload.yearsExperience,
    cover_letter: payload.coverLetter,
    resume_file_name: resumeName,
    resume_file_type: resume.type,
    resume_file_size: resume.size,
  })

  if (insertError) {
    const duplicate = insertError.code === '23505'
    return NextResponse.json(
      { error: duplicate ? 'You have already applied for this role using this email address.' : 'We could not save your application.' },
      { status: duplicate ? 409 : 502 },
    )
  }

  let emailResponse: Response
  try {
    emailResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `Job application: ${job.title} — ${fullName}`,
        text,
        html,
        attachments: [{ filename: resumeName, content: resumeBuffer.toString('base64') }],
      }),
    })
  } catch {
    return NextResponse.json({ error: 'Your details were saved, but the résumé could not be delivered. Please contact us.' }, { status: 502 })
  }

  if (!emailResponse.ok) {
    return NextResponse.json({ error: 'Your details were saved, but the résumé could not be delivered. Please contact us.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
