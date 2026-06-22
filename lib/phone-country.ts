export type PhoneCountry = {
  name: string
  dialCode: string
  code: string
  flag: string
}

/** Prefer these ISO codes when several countries share the same dial code. */
const PREFERRED_ISO_BY_DIAL: Record<string, string> = {
  '+1': 'US',
  '+44': 'GB',
  '+61': 'AU',
  '+212': 'MA',
  '+358': 'FI',
  '+590': 'GP',
  '+599': 'CW',
}

export function sortCountriesByDialCode(countries: PhoneCountry[]) {
  return [...countries].sort((a, b) => b.dialCode.length - a.dialCode.length)
}

export function findCountryByDialCode(
  phoneInput: string,
  countries: PhoneCountry[]
): PhoneCountry | null {
  const trimmed = phoneInput.trim()
  if (!trimmed.startsWith('+') || countries.length === 0) return null

  const sorted = sortCountriesByDialCode(countries)
  const matches = sorted.filter((country) => trimmed.startsWith(country.dialCode))
  if (matches.length === 0) return null

  const longestLength = matches[0].dialCode.length
  const longestMatches = matches.filter((c) => c.dialCode.length === longestLength)

  if (longestMatches.length === 1) return longestMatches[0]

  const preferredIso = PREFERRED_ISO_BY_DIAL[longestMatches[0].dialCode]
  if (preferredIso) {
    const preferred = longestMatches.find((c) => c.code === preferredIso)
    if (preferred) return preferred
  }

  return longestMatches[0]
}

export function findCountryByIso(iso: string, countries: PhoneCountry[]) {
  const code = iso.trim().toUpperCase()
  if (!code) return null
  return countries.find((country) => country.code === code) ?? null
}

export async function detectCountryIsoFromIp() {
  try {
    const response = await fetch('/api/geo', { cache: 'no-store' })
    if (response.ok) {
      const data = (await response.json()) as { countryCode?: string | null }
      if (data.countryCode) return data.countryCode
    }
  } catch {
    // fall through to client lookup
  }

  try {
    const response = await fetch('https://ipwho.is/', { cache: 'no-store' })
    if (!response.ok) return null

    const data = (await response.json()) as {
      success?: boolean
      country_code?: string
    }

    if (data.success && data.country_code) {
      return data.country_code.toUpperCase()
    }
  } catch {
    return null
  }

  return null
}

export function replacePhoneDialCode(
  phone: string,
  countries: PhoneCountry[],
  newCountry: PhoneCountry
) {
  const trimmed = phone.trim()
  if (!trimmed) return trimmed

  if (trimmed.startsWith('+')) {
    const current = findCountryByDialCode(trimmed, countries)
    const national = current
      ? trimmed.slice(current.dialCode.length).replace(/^[\s()-]+/, '')
      : trimmed.replace(/^\+\d+\s*/, '')

    return national ? `${newCountry.dialCode} ${national}` : `${newCountry.dialCode} `
  }

  return trimmed
}

export function formatRestCountries(data: unknown[]): PhoneCountry[] {
  return data
    .map((entry) => {
      const country = entry as {
        name?: { common?: string }
        idd?: { root?: string; suffixes?: string[] }
        cca2?: string
        flags?: { svg?: string }
      }

      const root = country.idd?.root || ''
      const suffixes = country.idd?.suffixes || []
      const dialCode =
        suffixes.length === 1 ? `${root}${suffixes[0]}` : root

      return {
        name: country.name?.common || '',
        dialCode,
        code: country.cca2 || '',
        flag: country.flags?.svg || '',
      }
    })
    .filter((country) => country.dialCode && country.code)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function inferIsoFromTimeZone(timeZone: string) {
  const tz = timeZone.trim()
  const exact: Record<string, string> = {
    'Asia/Karachi': 'PK',
    'Asia/Kolkata': 'IN',
    'Asia/Dubai': 'AE',
    'Asia/Singapore': 'SG',
    'Asia/Tokyo': 'JP',
    'Europe/London': 'GB',
    'Europe/Paris': 'FR',
    'Europe/Berlin': 'DE',
    'America/New_York': 'US',
    'America/Chicago': 'US',
    'America/Denver': 'US',
    'America/Los_Angeles': 'US',
    'America/Toronto': 'CA',
    'Australia/Sydney': 'AU',
  }

  if (exact[tz]) return exact[tz]
  if (tz.startsWith('America/')) return 'US'
  if (tz.startsWith('Australia/')) return 'AU'
  if (tz.startsWith('Europe/')) return 'GB'
  if (tz.includes('Karachi')) return 'PK'
  if (tz.startsWith('Asia/')) return 'IN'
  return 'US'
}

export const FALLBACK_DIAL_CODES: Record<string, string> = {
  PK: '+92',
  US: '+1',
  GB: '+44',
  CA: '+1',
  IN: '+91',
  AE: '+971',
  AU: '+61',
  DE: '+49',
  FR: '+33',
  SG: '+65',
  JP: '+81',
}

export const MINIMAL_PHONE_COUNTRIES: PhoneCountry[] = [
  { name: 'United States', dialCode: '+1', code: 'US', flag: 'https://flagcdn.com/w40/us.png' },
  { name: 'Pakistan', dialCode: '+92', code: 'PK', flag: 'https://flagcdn.com/w40/pk.png' },
  { name: 'United Kingdom', dialCode: '+44', code: 'GB', flag: 'https://flagcdn.com/w40/gb.png' },
  { name: 'Canada', dialCode: '+1', code: 'CA', flag: 'https://flagcdn.com/w40/ca.png' },
  { name: 'India', dialCode: '+91', code: 'IN', flag: 'https://flagcdn.com/w40/in.png' },
  { name: 'United Arab Emirates', dialCode: '+971', code: 'AE', flag: 'https://flagcdn.com/w40/ae.png' },
  { name: 'Australia', dialCode: '+61', code: 'AU', flag: 'https://flagcdn.com/w40/au.png' },
  { name: 'Germany', dialCode: '+49', code: 'DE', flag: 'https://flagcdn.com/w40/de.png' },
  { name: 'France', dialCode: '+33', code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
  { name: 'Singapore', dialCode: '+65', code: 'SG', flag: 'https://flagcdn.com/w40/sg.png' },
  { name: 'Japan', dialCode: '+81', code: 'JP', flag: 'https://flagcdn.com/w40/jp.png' },
]

export function getInitialCountryIso() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timeZone) return inferIsoFromTimeZone(timeZone)
  } catch {
    // ignore
  }
  return 'US'
}

export function getInitialPhoneCountryState() {
  const iso = getInitialCountryIso()
  return {
    countryIso: iso,
    countryCode: FALLBACK_DIAL_CODES[iso] ?? '+1',
  }
}

export function getFlagImageUrl(iso: string) {
  return `https://flagcdn.com/w40/${iso.trim().toLowerCase()}.png`
}

export function filterPhoneCountries(countries: PhoneCountry[], query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return countries

  const dialQuery = normalized.startsWith('+') ? normalized : normalized.replace(/\s/g, '')

  return countries.filter((country) => {
    const name = country.name.toLowerCase()
    const code = country.code.toLowerCase()
    const dial = country.dialCode.toLowerCase()

    return (
      name.includes(normalized) ||
      code.includes(normalized) ||
      dial.includes(dialQuery) ||
      dial.replace('+', '').includes(dialQuery.replace('+', ''))
    )
  })
}
