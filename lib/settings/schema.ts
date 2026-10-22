// Chatbot settings edited on the CRM's Settings page and stored in the
// app_settings table (row id 'global', column data).
//
// SHARED FILE: an identical copy lives in the CRM repo (chatbot-dashboard,
// lib/settings.ts). Change both together.
//
// No imports, so it runs anywhere (server, browser, scripts).

// One country's team contact, shown in the chat to visitors from that
// country, and the inboxes that get their leads.
export interface CountryContact {
  code: string // ISO 3166-1 alpha-2, e.g. "US"
  label: string
  phone: string
  email: string
  leadEmails: string[]
}

export interface OfficeHours {
  timeZone: string // IANA zone the times below are in
  days: number[] // 0 = Sunday … 6 = Saturday; the day a window starts on
  start: string // "HH:MM", on the hour or half hour
  end: string // "HH:MM"; earlier than start means it ends the next day
}

export interface AppSettings {
  assistant: {
    name: string
    subtitle: string
    welcome: string
    quickReplies: string[]
  }
  // In order; the first is the primary country. Visitors from a country not
  // listed get the primary's lead inboxes, and see either every country's
  // contact or only the primary's (otherVisitors).
  countries: CountryContact[]
  otherVisitors: 'all' | 'primary'
  booking: {
    enabled: boolean
    hours: OfficeHours
    windowDays: number
  }
}

export const DEFAULT_SETTINGS: AppSettings = {
  assistant: {
    name: 'Mr. B',
    subtitle: "BMYBrand's AI Assistant",
    welcome: 'Hi there! How can I help you today?',
    quickReplies: [
      'What services do you offer?',
      'I need a website built',
      'Tell me about your process',
      'Book a free strategy call',
    ],
  },
  countries: [
    {
      code: 'US',
      label: 'USA',
      phone: '+1 469 501 1401',
      email: 'jacob.green@bmybrand.com',
      leadEmails: ['jacob.green@bmybrand.com'],
    },
    {
      code: 'CA',
      label: 'Canada',
      phone: '+(587) 492-5888',
      email: 'jacob.green@bmybrand.ca',
      leadEmails: ['jacob.green@bmybrand.ca'],
    },
  ],
  otherVisitors: 'all',
  booking: {
    enabled: true,
    // Karachi office: Mon–Fri nights, 9 PM – 6 AM (11 AM – 8 PM US Central in summer).
    hours: { timeZone: 'Asia/Karachi', days: [1, 2, 3, 4, 5], start: '21:00', end: '06:00' },
    windowDays: 14,
  },
}

export const LIMITS = {
  name: 40,
  subtitle: 60,
  welcome: 200,
  quickReply: 60,
  quickReplies: 6,
  label: 30,
  leadEmails: 5,
  countries: 20,
  windowDays: { min: 1, max: 60 },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TIME_RE = /^([01]\d|2[0-3]):(00|30)$/

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value) && value.length <= 254
}

export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15 && /^[\d\s()+.-]+$/.test(value)
}

export function isCountryCode(value: string): boolean {
  return /^[A-Z]{2}$/.test(value)
}

export function isTime(value: string): boolean {
  return TIME_RE.test(value)
}

export function isTimeZone(value: string): boolean {
  if (!value) return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value })
    return true
  } catch {
    return false
  }
}

// tel: link for a displayed number. Ten digits are read as a North American
// number without the country code (e.g. "(587) 492-5888" → tel:+15874925888).
export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}

export function minutesOf(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

type Errors = Record<string, string>

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const t = value.trim()
  return t.length >= 1 && t.length <= max ? t : null
}

function emails(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null
  const list = [...new Set(value.map((v) => (typeof v === 'string' ? v.trim().toLowerCase() : '')).filter(Boolean))]
  if (list.length < 1 || list.length > LIMITS.leadEmails || !list.every(isEmail)) return null
  return list
}

function country(value: unknown, errors: Errors, path: string): CountryContact | null {
  const v = (value ?? {}) as Record<string, unknown>
  const code = typeof v.code === 'string' && isCountryCode(v.code.trim().toUpperCase()) ? v.code.trim().toUpperCase() : null
  const label = text(v.label, LIMITS.label)
  const phone = typeof v.phone === 'string' && isPhone(v.phone.trim()) ? v.phone.trim() : null
  const email = typeof v.email === 'string' && isEmail(v.email.trim()) ? v.email.trim().toLowerCase() : null
  const leadEmails = emails(v.leadEmails)
  if (!code) errors[`${path}.code`] = 'Pick a country.'
  if (!label) errors[`${path}.label`] = `Enter a label (up to ${LIMITS.label} characters).`
  if (!phone) errors[`${path}.phone`] = 'Enter a phone number (7 to 15 digits).'
  if (!email) errors[`${path}.email`] = 'Enter a valid email address.'
  if (!leadEmails) errors[`${path}.leadEmails`] = `Enter 1 to ${LIMITS.leadEmails} valid email addresses.`
  return code && label && phone && email && leadEmails ? { code, label, phone, email, leadEmails } : null
}

// Settings saved before countries became a list stored contacts and lead
// inboxes per region ({ contacts: { US, CA }, leadEmails: { US, CA } }).
function legacyCountries(v: Record<string, unknown>): CountryContact[] | null {
  const contacts = v.contacts as Record<string, Record<string, unknown>> | undefined
  if (!contacts || typeof contacts !== 'object') return null
  const lead = (v.leadEmails ?? {}) as Record<string, unknown>
  const list: CountryContact[] = []
  for (const code of ['US', 'CA']) {
    const fallback = DEFAULT_SETTINGS.countries.find((c) => c.code === code)!
    const c = contacts[code] ?? {}
    list.push(
      country({ ...fallback, ...c, code, leadEmails: lead[code] ?? fallback.leadEmails }, {}, code) ?? fallback
    )
  }
  return list
}

function hours(value: unknown, errors: Errors): OfficeHours | null {
  const v = (value ?? {}) as Record<string, unknown>
  const timeZone = typeof v.timeZone === 'string' && isTimeZone(v.timeZone) ? v.timeZone : null
  const days = Array.isArray(v.days)
    ? [...new Set(v.days.filter((d): d is number => Number.isInteger(d) && d >= 0 && d <= 6))].sort((x, y) => x - y)
    : []
  const start = typeof v.start === 'string' && isTime(v.start) ? v.start : null
  const end = typeof v.end === 'string' && isTime(v.end) ? v.end : null
  if (!timeZone) errors['booking.hours.timeZone'] = 'Pick a time zone.'
  if (days.length === 0) errors['booking.hours.days'] = 'Pick at least one day.'
  if (!start) errors['booking.hours.start'] = 'Pick a start time (on the hour or half hour).'
  if (!end) errors['booking.hours.end'] = 'Pick an end time (on the hour or half hour).'
  if (start && end && start === end) errors['booking.hours.end'] = 'End time must differ from the start time.'
  return timeZone && days.length && start && end && start !== end ? { timeZone, days, start, end } : null
}

// Strict check for saving. Returns every problem, keyed by field path.
export function validateSettings(input: unknown): { ok: true; settings: AppSettings } | { ok: false; errors: Errors } {
  const errors: Errors = {}
  const v = (input ?? {}) as Record<string, Record<string, unknown>>
  const a = v.assistant ?? {}

  const name = text(a.name, LIMITS.name)
  if (!name) errors['assistant.name'] = `Enter a name (up to ${LIMITS.name} characters).`
  const subtitle = text(a.subtitle, LIMITS.subtitle)
  if (!subtitle) errors['assistant.subtitle'] = `Enter a subtitle (up to ${LIMITS.subtitle} characters).`
  const welcome = text(a.welcome, LIMITS.welcome)
  if (!welcome) errors['assistant.welcome'] = `Enter a welcome message (up to ${LIMITS.welcome} characters).`
  const replies = Array.isArray(a.quickReplies)
    ? a.quickReplies.map((r) => (typeof r === 'string' ? r.trim() : '')).filter(Boolean)
    : []
  if (replies.length > LIMITS.quickReplies) errors['assistant.quickReplies'] = `Use at most ${LIMITS.quickReplies} quick replies.`
  else if (replies.some((r) => r.length > LIMITS.quickReply)) {
    errors['assistant.quickReplies'] = `Keep each quick reply under ${LIMITS.quickReply} characters.`
  }

  const rawCountries = Array.isArray(v.countries) ? (v.countries as unknown[]) : []
  if (rawCountries.length < 1) errors.countries = 'Add at least one country.'
  else if (rawCountries.length > LIMITS.countries) errors.countries = `Add at most ${LIMITS.countries} countries.`
  const countries = rawCountries.map((c, i) => country(c, errors, `countries.${i}`))
  const seen = new Set<string>()
  rawCountries.forEach((c, i) => {
    const raw = (c ?? {}) as Record<string, unknown>
    const code = typeof raw.code === 'string' ? raw.code.trim().toUpperCase() : ''
    if (!code) return
    if (seen.has(code)) errors[`countries.${i}.code`] = 'This country is already in the list.'
    seen.add(code)
  })
  const otherVisitors = (v as Record<string, unknown>).otherVisitors
  if (otherVisitors !== 'all' && otherVisitors !== 'primary') {
    errors.otherVisitors = 'Choose what visitors from other countries see.'
  }

  const b = v.booking ?? {}
  const enabled = typeof b.enabled === 'boolean' ? b.enabled : null
  if (enabled === null) errors['booking.enabled'] = 'Choose whether the calendar is on.'
  const bookingHours = hours(b.hours, errors)
  const windowDays =
    Number.isInteger(b.windowDays) &&
    (b.windowDays as number) >= LIMITS.windowDays.min &&
    (b.windowDays as number) <= LIMITS.windowDays.max
      ? (b.windowDays as number)
      : null
  if (!windowDays) errors['booking.windowDays'] = `Enter ${LIMITS.windowDays.min} to ${LIMITS.windowDays.max} days.`

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return {
    ok: true,
    settings: {
      assistant: { name: name!, subtitle: subtitle!, welcome: welcome!, quickReplies: replies },
      countries: countries as CountryContact[],
      otherVisitors: otherVisitors as AppSettings['otherVisitors'],
      booking: { enabled: enabled!, hours: bookingHours!, windowDays: windowDays! },
    },
  }
}

// Lenient read: every missing or invalid part falls back to its default, so
// a bad row can never break the chatbot.
export function normalizeSettings(raw: unknown): AppSettings {
  const v = (raw && typeof raw === 'object' ? raw : {}) as Record<string, Record<string, unknown>>
  const d = DEFAULT_SETTINGS
  const ignore: Errors = {}
  const a = v.assistant ?? {}
  const replies = Array.isArray(a.quickReplies)
    ? a.quickReplies
        .filter((r): r is string => typeof r === 'string' && r.trim().length > 0 && r.trim().length <= LIMITS.quickReply)
        .map((r) => r.trim())
        .slice(0, LIMITS.quickReplies)
    : d.assistant.quickReplies
  const listed = Array.isArray(v.countries)
    ? (v.countries as unknown[])
        .map((c) => country(c, ignore, 'c'))
        .filter((c): c is CountryContact => c !== null)
        .filter((c, i, all) => all.findIndex((x) => x.code === c.code) === i)
        .slice(0, LIMITS.countries)
    : []
  const countries = listed.length > 0 ? listed : (legacyCountries(v) ?? d.countries)
  const otherVisitors = (v as Record<string, unknown>).otherVisitors
  const b = v.booking ?? {}
  const windowDays =
    Number.isInteger(b.windowDays) &&
    (b.windowDays as number) >= LIMITS.windowDays.min &&
    (b.windowDays as number) <= LIMITS.windowDays.max
      ? (b.windowDays as number)
      : d.booking.windowDays
  return {
    assistant: {
      name: text(a.name, LIMITS.name) ?? d.assistant.name,
      subtitle: text(a.subtitle, LIMITS.subtitle) ?? d.assistant.subtitle,
      welcome: text(a.welcome, LIMITS.welcome) ?? d.assistant.welcome,
      quickReplies: replies,
    },
    countries,
    otherVisitors: otherVisitors === 'primary' || otherVisitors === 'all' ? otherVisitors : d.otherVisitors,
    booking: {
      enabled: typeof b.enabled === 'boolean' ? b.enabled : d.booking.enabled,
      hours: hours(b.hours, ignore) ?? d.booking.hours,
      windowDays,
    },
  }
}
