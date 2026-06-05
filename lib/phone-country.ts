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
