import { REGION_CONTACTS, type ContactRegion } from './contact-info'

const RESEND_API_URL = 'https://api.resend.com/emails'

export interface LeadNotification {
  sessionId: string
  name: string
  email: string
  phone: string | null
  message: string | null
  interest: string | null
  region: ContactRegion | null
  country: string | null
  transcript: { role: string; content: string }[]
}

// Canada leads go to the Canada inbox, everything else to the US one.
// CHAT_LEAD_TO_EMAIL (comma-separated) overrides both, e.g. for testing.
function recipients(region: ContactRegion | null): string[] {
  const override = process.env.CHAT_LEAD_TO_EMAIL?.split(',')
    .map((e) => e.trim())
    .filter(Boolean)
  if (override && override.length > 0) return override
  return [REGION_CONTACTS[region === 'CA' ? 'CA' : 'US'].email]
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Emails the team about a chatbot lead via Resend. Never throws: the lead is
// already saved in the CRM, so a failed email is logged and reported back.
export async function notifyTeamOfLead(
  lead: LeadNotification
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from) {
    console.warn('[chat] lead email skipped: RESEND_API_KEY or RESEND_FROM_EMAIL missing', {
      sessionId: lead.sessionId,
    })
    return { sent: false, error: 'Email is not configured' }
  }

  const location = lead.region
    ? REGION_CONTACTS[lead.region].label
    : lead.country
      ? `Unknown (${lead.country})`
      : 'Unknown'

  const details: [string, string][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone || 'Not given'],
    ['Looking for', lead.interest || 'Chatbot inquiry'],
    ['Location', location],
    ['Chat session', lead.sessionId],
  ]

  const transcriptLines = lead.transcript.map(
    (m) => `${m.role === 'user' ? 'Visitor' : 'Mr. B'}: ${m.content}`
  )

  const text = [
    'A visitor asked the BMYBrand chatbot for the team to get back to them.',
    '',
    ...details.map(([k, v]) => `${k}: ${v}`),
    '',
    'Their message:',
    lead.message || '(none)',
    '',
    'Conversation:',
    ...transcriptLines,
  ].join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#1c1d2b;max-width:640px;">
      <h2 style="margin:0 0 12px;font-size:18px;">New chatbot lead: ${escapeHtml(lead.name)}</h2>
      <p style="margin:0 0 16px;">A visitor asked the BMYBrand chatbot for the team to get back to them.</p>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px;">
        ${details
          .map(
            ([k, v]) =>
              `<tr><td style="color:#5d6075;padding-right:16px;">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join('')}
      </table>
      <p style="margin:0 0 4px;color:#5d6075;">Their message</p>
      <p style="margin:0 0 16px;white-space:pre-wrap;">${escapeHtml(lead.message || '(none)')}</p>
      <p style="margin:0 0 4px;color:#5d6075;">Conversation</p>
      <div style="background:#f5f5f8;border-radius:8px;padding:12px;">
        ${transcriptLines.map((l) => `<p style="margin:0 0 6px;white-space:pre-wrap;">${escapeHtml(l)}</p>`).join('')}
      </div>
    </div>`

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: recipients(lead.region),
        reply_to: lead.email,
        subject: `New chatbot lead: ${lead.name}${lead.interest ? ` (${lead.interest})` : ''}`,
        text,
        html,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('[chat] lead email failed', { sessionId: lead.sessionId, status: res.status, error })
      return { sent: false, error }
    }
    return { sent: true }
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Could not reach the email service'
    console.error('[chat] lead email failed', { sessionId: lead.sessionId, error })
    return { sent: false, error }
  }
}
