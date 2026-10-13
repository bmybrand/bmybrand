'use client'

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  Globe2,
  Loader2,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import { buildIcs } from '@/lib/booking/ics'
import { formatSlotLong, zoneAbbr, type OpenDay } from '@/lib/booking/slots'
import { BUDGET_OPTIONS, type BookingSummary } from '@/types/chat'
import type { BookingFormValues, BookingResult } from '@/hooks/useChatState'

export interface BookingPrefill {
  name?: string
  email?: string
  phone?: string
}

// Zones offered in the "change" list, besides the visitor's own.
const COMMON_ZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Phoenix',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'America/Halifax',
  'America/Toronto',
  'America/Winnipeg',
  'America/Edmonton',
  'America/Vancouver',
  'America/St_Johns',
  'Europe/London',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Australia/Sydney',
]

function detectZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Chicago'
  } catch {
    return 'America/Chicago'
  }
}

function zoneName(timeZone: string): string {
  try {
    const long = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long' })
      .formatToParts(new Date())
      .find((p) => p.type === 'timeZoneName')?.value
    return `${long ?? timeZone} (${zoneAbbr(new Date(), timeZone)})`
  } catch {
    return timeZone
  }
}

type Step = 'time' | 'details'

// In-chat strategy call booking: pick a day and time, then share details.
export default function BookingCalendar({
  prefill,
  onSubmit,
  fullPageUrl,
}: {
  prefill: BookingPrefill
  onSubmit: (values: BookingFormValues) => Promise<BookingResult>
  fullPageUrl: string
}) {
  const [timeZone, setTimeZone] = useState(detectZone)
  const [changingZone, setChangingZone] = useState(false)
  const [days, setDays] = useState<OpenDay[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [dayIndex, setDayIndex] = useState(0)
  const [slotId, setSlotId] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('time')
  const [notice, setNotice] = useState<string | null>(null)

  const loadSlots = useCallback(async (zone: string) => {
    setDays(null)
    setLoadError(false)
    try {
      const res = await fetch(`/api/chat/booking/slots?tz=${encodeURIComponent(zone)}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(String(res.status))
      const data = (await res.json()) as { days: OpenDay[] }
      setDays(data.days)
      setDayIndex(0)
    } catch {
      setLoadError(true)
    }
  }, [])

  useEffect(() => {
    void loadSlots(timeZone)
  }, [timeZone, loadSlots])

  const zones = useMemo(() => [...new Set([timeZone, ...COMMON_ZONES])], [timeZone])
  const day = days?.[dayIndex]

  if (step === 'details' && slotId) {
    return (
      <DetailsForm
        when={`${formatSlotLong(new Date(slotId), timeZone)} (${zoneAbbr(new Date(slotId), timeZone)})`}
        prefill={prefill}
        onBack={() => setStep('time')}
        onSubmit={async (details) => {
          const result = await onSubmit({ ...details, slotId, timeZone })
          if (result.code === 'slot_taken') {
            setSlotId(null)
            setStep('time')
            setNotice(result.error ?? 'That time was just taken. Here are the latest times.')
            void loadSlots(timeZone)
            return {}
          }
          return result
        }}
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-[#ADAECC]">
        <Globe2 className="h-3.5 w-3.5 shrink-0" />
        {changingZone ? (
          <select
            value={timeZone}
            onChange={(e) => {
              setTimeZone(e.target.value)
              setChangingZone(false)
              setSlotId(null)
            }}
            aria-label="Time zone"
            className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#0F1033] px-2 py-1 text-xs text-white outline-none focus:border-[#FF843E]/70"
          >
            {zones.map((z) => (
              <option key={z} value={z}>
                {zoneName(z)}
              </option>
            ))}
          </select>
        ) : (
          <>
            <span className="truncate">Times in {zoneName(timeZone)}</span>
            <button
              type="button"
              onClick={() => setChangingZone(true)}
              className="shrink-0 font-medium text-[#FF843E] hover:underline cursor-pointer"
            >
              Change
            </button>
          </>
        )}
      </div>

      {notice && (
        <p role="status" className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-[13px] text-amber-200">
          {notice}
        </p>
      )}

      {loadError ? (
        <div className="space-y-2 text-[13px] text-[#ADAECC]">
          <p>Couldn&apos;t load the calendar just now.</p>
          <button
            type="button"
            onClick={() => void loadSlots(timeZone)}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-white/90 hover:bg-white/5 cursor-pointer"
          >
            Try again
          </button>
        </div>
      ) : days === null ? (
        <div className="flex items-center gap-2 py-6 text-[13px] text-[#ADAECC]">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading available times...
        </div>
      ) : days.length === 0 ? (
        <p className="text-[13px] text-[#ADAECC]">
          No times are open in the next two weeks. Leave your details and the team will reach out.
        </p>
      ) : (
        <>
          <div className="chat-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Day">
            {days.map((d, i) => {
              const [weekday, ...rest] = d.label.split(', ')
              const active = i === dayIndex
              return (
                <button
                  key={d.date}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setDayIndex(i)
                    setSlotId(null)
                  }}
                  className={`flex w-[58px] shrink-0 flex-col items-center rounded-xl border px-1 py-1.5 text-center transition cursor-pointer ${
                    active
                      ? 'border-transparent bg-gradient-to-b from-[#F45B25] to-[#FF843E] text-white shadow-md shadow-[#F45B25]/25'
                      : 'border-white/10 bg-white/[0.04] text-white/85 hover:border-white/25'
                  }`}
                >
                  <span className="text-[11px] font-medium uppercase opacity-80">{weekday}</span>
                  <span className="text-[13px] font-semibold leading-tight">{rest.join(', ')}</span>
                </button>
              )
            })}
          </div>

          {day && (
            <div className="grid grid-cols-3 gap-1.5" role="listbox" aria-label={`Times on ${day.label}`}>
              {day.slots.map((s) => {
                const active = s.id === slotId
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => setSlotId(s.id)}
                    className={`rounded-lg border px-1 py-2 text-[13px] font-medium transition cursor-pointer ${
                      active
                        ? 'border-[#FF843E] bg-[#F45B25]/20 text-white'
                        : 'border-white/10 bg-white/[0.04] text-white/85 hover:border-[#FF843E]/50'
                    }`}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          )}

          <button
            type="button"
            disabled={!slotId}
            onClick={() => {
              setNotice(null)
              setStep('details')
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#F45B25]/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {slotId ? 'Continue' : 'Pick a time to continue'}
          </button>
        </>
      )}

      <a
        href={fullPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-xs text-[#ADAECC] underline-offset-2 hover:text-white hover:underline"
      >
        Prefer the full booking page?
      </a>
    </div>
  )
}

function DetailsForm({
  when,
  prefill,
  onBack,
  onSubmit,
}: {
  when: string
  prefill: BookingPrefill
  onBack: () => void
  onSubmit: (values: Omit<BookingFormValues, 'slotId' | 'timeZone'>) => Promise<BookingResult>
}) {
  const [values, setValues] = useState({
    name: prefill.name ?? '',
    email: prefill.email ?? '',
    phone: prefill.phone ?? '',
    company: '',
    budget: '',
    website: '',
  })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  const update = (field: keyof typeof values) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    const problem =
      values.name.trim().length < 2
        ? 'Please enter your name.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
          ? 'Please enter a valid email address.'
          : values.phone.replace(/[^\d]/g, '').length < 7
            ? 'Please enter a phone number so the team can call you.'
            : values.company.trim().length < 2
              ? 'Please enter your company name.'
              : !values.budget
                ? 'Please pick a budget range.'
                : null
    if (problem) {
      setError(problem)
      return
    }
    setError(null)
    setSending(true)
    const result = await onSubmit(values)
    setSending(false)
    if (result.error) {
      setError(result.error)
      if (result.code === 'booking_failed') setFailed(true)
    }
  }

  if (failed) {
    return (
      <p role="alert" className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-100">
        {error}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[#FF843E]/30 bg-[#F45B25]/10 px-3 py-2">
        <p className="min-w-0 text-[13px] font-medium leading-snug text-white">{when}</p>
        <button
          type="button"
          onClick={onBack}
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-[#FF843E] hover:underline cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Change
        </button>
      </div>
      <Field icon={<User className="h-4 w-4" />}>
        <input type="text" value={values.name} onChange={update('name')} placeholder="Your name *" autoComplete="name" maxLength={100} aria-label="Your name" className={inputClass} />
      </Field>
      <Field icon={<Mail className="h-4 w-4" />}>
        <input type="email" value={values.email} onChange={update('email')} placeholder="Email *" autoComplete="email" maxLength={254} aria-label="Email" className={inputClass} />
      </Field>
      <Field icon={<Phone className="h-4 w-4" />}>
        <input type="tel" value={values.phone} onChange={update('phone')} placeholder="Phone (we'll call you) *" autoComplete="tel" maxLength={40} aria-label="Phone" className={inputClass} />
      </Field>
      <Field icon={<Building2 className="h-4 w-4" />}>
        <input type="text" value={values.company} onChange={update('company')} placeholder="Company *" autoComplete="organization" maxLength={120} aria-label="Company" className={inputClass} />
      </Field>
      <fieldset>
        <legend className="mb-1.5 text-xs font-medium text-[#ADAECC]">Budget *</legend>
        <div className="grid grid-cols-3 gap-1.5">
          {BUDGET_OPTIONS.map((option) => {
            const active = values.budget === option
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setValues((v) => ({ ...v, budget: option }))}
                className={`rounded-lg border px-1 py-1.5 text-xs font-medium transition cursor-pointer ${
                  active
                    ? 'border-[#FF843E] bg-[#F45B25]/20 text-white'
                    : 'border-white/10 bg-white/[0.04] text-white/80 hover:border-[#FF843E]/50'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </fieldset>
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
            <Loader2 className="h-4 w-4 animate-spin" /> Booking...
          </>
        ) : (
          <>
            <CalendarCheck className="h-4 w-4" /> Confirm my call
          </>
        )}
      </button>
    </form>
  )
}

// Shown once the call is booked: when, how, and an "Add to calendar" file.
export function BookedSummary({ booking }: { booking: BookingSummary }) {
  const at = new Date(booking.startsAt)
  const when = `${formatSlotLong(at, booking.timeZone)} (${zoneAbbr(at, booking.timeZone)})`

  const addToCalendar = () => {
    const ics = buildIcs({
      uid: `strategy-call-${booking.id ?? at.getTime()}@bmybrand.com`,
      start: at,
      minutes: 30,
      summary: 'BMYBrand strategy call',
      description: `Free strategy call with BMYBrand. We'll call you on ${booking.phone}.`,
    })
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'bmybrand-strategy-call.ics'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="space-y-2.5">
      <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2.5 text-sm text-emerald-100">
        <p className="flex items-center gap-1.5 font-semibold text-emerald-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> You&apos;re booked
        </p>
        <p className="mt-1 text-white">{when}</p>
        <p className="mt-0.5 text-[13px] text-emerald-100/80">We&apos;ll call you on {booking.phone}.</p>
      </div>
      <button
        type="button"
        onClick={addToCalendar}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5 cursor-pointer"
      >
        <CalendarPlus className="h-4 w-4" /> Add to calendar
      </button>
    </div>
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
