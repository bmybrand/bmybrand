'use client'

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import {
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
} from 'lucide-react'
import type { RegionContact } from '@/lib/chat/contact-info'
import type { ChatUi } from '@/types/chat'
import type { ContactFormValues } from '@/hooks/useChatState'

type SubmitContact = (values: ContactFormValues) => Promise<{ error?: string }>

interface CardProps {
  ui: ChatUi
  // Only the newest form in the chat can be filled in; older cards collapse.
  interactive: boolean
  submitted: boolean
  onSubmitContact: SubmitContact
}

// Rich cards shown under a bot reply (see ChatUi in types/chat.ts).
export default function ChatCard({ ui, interactive, submitted, onSubmitContact }: CardProps) {
  if (ui.type === 'booking') return <BookingCard url={ui.bookingUrl} />
  if (ui.type === 'sales') {
    return (
      <SalesCard
        url={ui.bookingUrl}
        contacts={ui.contacts}
        interactive={interactive}
        submitted={submitted}
        onSubmitContact={onSubmitContact}
      />
    )
  }
  return (
    <SupportCard
      contacts={ui.contacts}
      interactive={interactive}
      submitted={submitted}
      onSubmitContact={onSubmitContact}
    />
  )
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mb-3 ml-9 max-w-[88%] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1D1F52] to-[#181A45] shadow-lg shadow-black/20">
      {children}
    </div>
  )
}

function CardHeader({ icon, title, text }: { icon: ReactNode; title: string; text?: string }) {
  return (
    <div className="flex items-start gap-3 px-4 pt-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F45B25] to-[#FF843E] text-white shadow-md shadow-[#F45B25]/30">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-snug text-white">{title}</p>
        {text && <p className="mt-0.5 text-[13px] leading-snug text-[#ADAECC]">{text}</p>}
      </div>
    </div>
  )
}

function BookButton({ url, label = 'Book my free strategy call' }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#F45B25]/25 transition hover:brightness-110"
    >
      <CalendarCheck className="h-4 w-4" />
      {label}
      <ArrowUpRight className="h-4 w-4 opacity-80" />
    </a>
  )
}

function BookingCard({ url }: { url: string }) {
  return (
    <Shell>
      <CardHeader
        icon={<CalendarCheck className="h-5 w-5" />}
        title="Free strategy call"
        text="A no-pressure call to map out a plan and get a tailored quote."
      />
      <div className="p-4">
        <BookButton url={url} />
      </div>
    </Shell>
  )
}

function SalesCard({
  url,
  contacts,
  interactive,
  submitted,
  onSubmitContact,
}: {
  url: string
  contacts: RegionContact[]
  interactive: boolean
  submitted: boolean
  onSubmitContact: SubmitContact
}) {
  const [showForm, setShowForm] = useState(false)
  return (
    <Shell>
      <CardHeader
        icon={<CalendarCheck className="h-5 w-5" />}
        title="Let's plan your project"
        text="Book a free strategy call for a clear plan and a tailored quote."
      />
      <div className="space-y-2.5 p-4">
        <BookButton url={url} />
        {interactive && !submitted && !showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5"
          >
            <MessageSquareText className="h-4 w-4" />
            Have the team contact me
          </button>
        )}
        {interactive && submitted && <SentNote />}
      </div>
      {interactive && !submitted && showForm && (
        <div className="border-t border-white/10 p-4 pt-3">
          <ContactForm onSubmit={onSubmitContact} intro="Leave your details and the team will reach out." />
        </div>
      )}
      <ContactOptions contacts={contacts} compact />
    </Shell>
  )
}

function SupportCard({
  contacts,
  interactive,
  submitted,
  onSubmitContact,
}: {
  contacts: RegionContact[]
  interactive: boolean
  submitted: boolean
  onSubmitContact: SubmitContact
}) {
  const showForm = interactive && !submitted
  return (
    <Shell>
      <CardHeader
        icon={<Send className="h-[18px] w-[18px]" />}
        title={showForm ? 'Get this to the team' : 'Reach the team'}
        text={showForm ? "Share your details and I'll pass your message on right away." : undefined}
      />
      <div className="p-4 pb-3">
        {showForm && <ContactForm onSubmit={onSubmitContact} />}
        {interactive && submitted && <SentNote />}
      </div>
      <ContactOptions contacts={contacts} />
    </Shell>
  )
}

function SentNote() {
  return (
    <p className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5 text-sm text-emerald-200">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      Your details were sent to the team.
    </p>
  )
}

// Phone and email as large, obviously tappable buttons.
function ContactOptions({ contacts, compact = false }: { contacts: RegionContact[]; compact?: boolean }) {
  return (
    <div className="border-t border-white/10 bg-black/10 px-4 py-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#ADAECC]/80">
        {compact ? 'Prefer to talk now?' : 'Or contact the team directly'}
      </p>
      <div className="space-y-2">
        {contacts.map((c) => (
          <div key={c.region}>
            {contacts.length > 1 && (
              <p className="mb-1 text-[11px] font-semibold text-[#ADAECC]">{c.label}</p>
            )}
            <div className="grid grid-cols-1 gap-1.5">
              <a
                href={c.phoneHref}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white transition hover:border-[#FF843E]/50 hover:bg-[#F45B25]/10"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#FF843E]" />
                <span className="flex-1">{c.phone}</span>
                <span className="text-xs text-[#ADAECC]">Call</span>
              </a>
              <a
                href={`mailto:${c.email}`}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white transition hover:border-[#FF843E]/50 hover:bg-[#F45B25]/10"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#FF843E]" />
                <span className="min-w-0 flex-1 truncate">{c.email}</span>
                <span className="text-xs text-[#ADAECC]">Email</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const EMPTY: ContactFormValues = { name: '', email: '', phone: '', message: '', website: '' }

function ContactForm({ onSubmit, intro }: { onSubmit: SubmitContact; intro?: string }) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      {intro && <p className="text-[13px] text-[#ADAECC]">{intro}</p>}
      <Field icon={<User className="h-4 w-4" />}>
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
      </Field>
      <Field icon={<Mail className="h-4 w-4" />}>
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
      </Field>
      <Field icon={<Phone className="h-4 w-4" />}>
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
      </Field>
      <textarea
        value={values.message}
        onChange={update('message')}
        placeholder="How can we help? (optional)"
        rows={2}
        maxLength={2000}
        aria-label="How can we help?"
        className="w-full resize-none rounded-xl border border-white/10 bg-[#0F1033] px-3 py-2.5 text-base text-white placeholder-[#ADAECC]/50 outline-none transition focus:border-[#FF843E]/70 focus:ring-2 focus:ring-[#F45B25]/20 sm:text-sm"
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
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#F45B25]/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send to the team
          </>
        )}
      </button>
    </form>
  )
}

const inputClass =
  'w-full bg-transparent py-2.5 pr-3 text-base text-white placeholder-[#ADAECC]/50 outline-none sm:text-sm'

function Field({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0F1033] pl-3 text-[#ADAECC]/70 transition focus-within:border-[#FF843E]/70 focus-within:ring-2 focus-within:ring-[#F45B25]/20">
      {icon}
      {children}
    </label>
  )
}
