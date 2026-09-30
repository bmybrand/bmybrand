import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isValidEmail, isValidPhone, sanitizeInput } from '@/lib/utils/validators'
import { notifyTeamOfLead } from '@/lib/chat/notify-team'
import { contactConfirmation } from '@/lib/chat/prompts'
import { translateMessage } from '@/lib/chat/language-detector'
import { regionFromCountry } from '@/lib/chat/contact-info'
import type { ChatMessage, ContactSubmitRequest } from '@/types/chat'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_SUBMISSIONS_PER_SESSION = 3

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

// Saves the contact form shown in the chat, emails the team, and returns the
// two messages to show in the chat (the visitor's details and the bot's
// confirmation). The confirmation says the team was informed, so it is only
// sent after the lead is saved.
export async function POST(request: NextRequest) {
  let body: ContactSubmitRequest
  try {
    body = await request.json()
  } catch {
    return fail('Invalid request body.', 400)
  }

  const sessionId = body.sessionId?.trim()
  const name = sanitizeInput(body.name ?? '').slice(0, 100)
  const email = sanitizeInput(body.email ?? '').toLowerCase().slice(0, 254)
  const phone = sanitizeInput(body.phone ?? '').slice(0, 40)
  const message = sanitizeInput(body.message ?? '').slice(0, 2000)

  if (!sessionId) return fail('sessionId is required.', 400)
  if (name.length < 2) return fail('Please enter your name.', 400)
  if (!isValidEmail(email)) return fail('Please enter a valid email address.', 400)
  if (phone && !isValidPhone(phone)) {
    return fail('Please enter a valid phone number, or leave it empty.', 400)
  }

  const { data: session, error: sessionError } = await supabaseAdmin
    .from('chat_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session) return fail('Session not found.', 404)

  const meta = (session.metadata ?? {}) as Record<string, unknown>
  const submissions = typeof meta.lead_submissions === 'number' ? meta.lead_submissions : 0
  if (submissions >= MAX_SUBMISSIONS_PER_SESSION) {
    return fail('Your details have already been sent to the team.', 429)
  }

  // Honeypot: the field is hidden from people, so only bots fill it in.
  // Answer like a success so they move on, but save and send nothing.
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true, messages: [] })
  }

  const submittedAt = new Date()
  const interest =
    typeof meta.lead_interest === 'string' ? meta.lead_interest : 'Chatbot inquiry'
  const leadMeta = {
    ...meta,
    lead_submitted_at: submittedAt.toISOString(),
    lead_submissions: submissions + 1,
    lead_message: message || null,
    lead_interest: interest,
  }

  // Saving the details creates or updates the CRM lead (trg_sync_lead_from_chat).
  const { error: updateError } = await supabaseAdmin
    .from('chat_sessions')
    .update({
      visitor_name: name,
      visitor_email: email,
      visitor_phone: phone || session.visitor_phone,
      status: 'bot',
      metadata: leadMeta,
    })
    .eq('id', sessionId)

  if (updateError) {
    console.error('[chat] contact form save failed', { sessionId, error: updateError.message })
    return fail("Sorry, we couldn't save your details. Please try again.", 500)
  }

  const { data: recent } = await supabaseAdmin
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .in('role', ['user', 'assistant'])
    .order('created_at', { ascending: false })
    .limit(40)

  const country = typeof meta.country === 'string' ? meta.country : null
  const notified = await notifyTeamOfLead({
    sessionId,
    name,
    email,
    phone: phone || session.visitor_phone || null,
    message: message || null,
    interest,
    region: regionFromCountry(country),
    country,
    transcript: (recent ?? []).reverse(),
  })

  await supabaseAdmin
    .from('chat_sessions')
    .update({ metadata: { ...leadMeta, lead_email_sent: notified.sent } })
    .eq('id', sessionId)

  const summary = [
    'Shared contact details with the team',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    message ? `Message: ${message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  let confirmation = contactConfirmation(name, email)
  if (session.visitor_language && session.visitor_language !== 'en') {
    confirmation = await translateMessage(confirmation, session.visitor_language)
  }

  // Explicit timestamps keep the two rows in order (a single insert would give
  // both the same created_at).
  const { data: inserted, error: insertError } = await supabaseAdmin
    .from('chat_messages')
    .insert([
      {
        session_id: sessionId,
        role: 'user',
        content: summary,
        metadata: { type: 'contact_form' },
        created_at: submittedAt.toISOString(),
      },
      {
        session_id: sessionId,
        role: 'assistant',
        content: confirmation,
        metadata: { type: 'contact_confirmation' },
        created_at: new Date(submittedAt.getTime() + 1).toISOString(),
      },
    ])
    .select()

  let messages = ((inserted ?? []) as ChatMessage[]).sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  )

  if (insertError || messages.length === 0) {
    // The lead is saved and the team emailed; only the transcript rows failed.
    // Still show the visitor what happened.
    console.error('[chat] contact form messages not saved', { sessionId, error: insertError?.message })
    const now = submittedAt.toISOString()
    messages = [
      { id: `contact-${now}`, session_id: sessionId, role: 'user', content: summary, metadata: { type: 'contact_form' }, created_at: now },
      { id: `confirm-${now}`, session_id: sessionId, role: 'assistant', content: confirmation, metadata: { type: 'contact_confirmation' }, created_at: now },
    ]
  }

  return NextResponse.json({ ok: true, messages })
}
