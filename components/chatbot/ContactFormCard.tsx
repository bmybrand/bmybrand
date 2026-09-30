'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Mail, Phone } from 'lucide-react'
import type { RegionContact } from '@/lib/chat/contact-info'
import type { ContactFormValues } from '@/hooks/useChatState'

interface ContactFormCardProps {
  contacts: RegionContact[]
  // Only the newest form in the chat can be filled in; older ones just show
  // the direct contact details.
  interactive: boolean
  submitted: boolean
  onSubmit: (values: ContactFormValues) => Promise<{ error?: string }>
}

const EMPTY: ContactFormValues = { name: '', email: '', phone: '', message: '', website: '' }

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#11122F] px-3 py-2 text-base text-white placeholder-[#ADAECC]/50 outline-none focus:border-[#F45B25]/60'

export default function ContactFormCard({
  contacts,
  interactive,
  submitted,
  onSubmit,
}: ContactFormCardProps) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const showForm = interactive && !submitted

  const update =
    (field: keyof ContactFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (values.name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setSending(true)
    const result = await onSubmit(values)
    setSending(false)
    if (result.error) setError(result.error)
  }

  return (
    <div className="relative mb-3 max-w-[92%] rounded-2xl border border-white/10 bg-[#1A1C4A] p-3">
      {showForm && (
        <form onSubmit={handleSubmit} noValidate className="space-y-2">
          <p className="text-sm font-medium text-white">
            Share your details and I&apos;ll pass them to the team.
          </p>
          <input
            type="text"
            value={values.name}
            onChange={update('name')}
            placeholder="Your name *"
            autoComplete="name"
            maxLength={100}
            aria-label="Your name"
            className={inputClass}
          />
          <input
            type="email"
            value={values.email}
            onChange={update('email')}
            placeholder="Email *"
            autoComplete="email"
            maxLength={254}
            aria-label="Email"
            className={inputClass}
          />
          <input
            type="tel"
            value={values.phone}
            onChange={update('phone')}
            placeholder="Phone (optional)"
            autoComplete="tel"
            maxLength={40}
            aria-label="Phone"
            className={inputClass}
          />
          <textarea
            value={values.message}
            onChange={update('message')}
            placeholder="How can we help? (optional)"
            rows={2}
            maxLength={2000}
            aria-label="How can we help?"
            className={`${inputClass} resize-none`}
          />
          {/* Honeypot: hidden from people, bots fill it in */}
          <input
            type="text"
            name="website"
            value={values.website}
            onChange={update('website')}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send to the team'
            )}
          </button>
        </form>
      )}

      {interactive && submitted && (
        <p className="flex items-center gap-2 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Your details were sent to the team.
        </p>
      )}

      <div className={interactive ? 'mt-3 border-t border-white/10 pt-2' : ''}>
        <p className="mb-1 text-xs text-[#ADAECC]">
          {showForm ? 'Prefer to reach out directly?' : 'Reach the team directly'}
        </p>
        <div className="space-y-1.5">
          {contacts.map((c) => (
            <div key={c.region} className="text-sm text-white/85">
              {contacts.length > 1 && (
                <span className="block text-xs font-semibold text-[#ADAECC]">{c.label}</span>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                <a
                  href={c.phoneHref}
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {c.phone}
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="inline-flex items-center gap-1 break-all hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {c.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
