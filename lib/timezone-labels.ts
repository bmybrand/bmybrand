import { getAllTimeZones, getTimezoneOffsetMs, getZonedParts } from '@/lib/strategy-call-scheduling'

export type TimezoneOption = {
  id: string
  label: string
  offset: string
  region: string
  currentTime: string
  searchText: string
}

/** Microsoft-style display names for common IANA zones. */
const FRIENDLY_REGION_NAMES: Record<string, string> = {
  'Africa/Abidjan': 'Abidjan',
  'Africa/Cairo': 'Cairo',
  'Africa/Johannesburg': 'Johannesburg, Pretoria',
  'Africa/Lagos': 'West Central Africa',
  'Africa/Nairobi': 'Nairobi',
  'America/Anchorage': 'Alaska',
  'America/Argentina/Buenos_Aires': 'Buenos Aires',
  'America/Bogota': 'Bogota, Lima, Quito',
  'America/Chicago': 'Central Time (US & Canada)',
  'America/Denver': 'Mountain Time (US & Canada)',
  'America/Halifax': 'Atlantic Time (Canada)',
  'America/Los_Angeles': 'Pacific Time (US & Canada)',
  'America/Mexico_City': 'Guadalajara, Mexico City, Monterrey',
  'America/New_York': 'Eastern Time (US & Canada)',
  'America/Phoenix': 'Arizona',
  'America/Sao_Paulo': 'Brasilia',
  'America/St_Johns': 'Newfoundland',
  'America/Toronto': 'Eastern Time (US & Canada)',
  'America/Vancouver': 'Pacific Time (US & Canada)',
  'Asia/Baghdad': 'Baghdad',
  'Asia/Bangkok': 'Bangkok, Hanoi, Jakarta',
  'Asia/Dubai': 'Abu Dhabi, Dubai',
  'Asia/Hong_Kong': 'Beijing, Hong Kong, Urumqi',
  'Asia/Jakarta': 'Jakarta',
  'Asia/Karachi': 'Islamabad, Karachi',
  'Asia/Kolkata': 'Chennai, Kolkata, Mumbai, New Delhi',
  'Asia/Kuala_Lumpur': 'Kuala Lumpur, Singapore',
  'Asia/Manila': 'Manila',
  'Asia/Riyadh': 'Kuwait, Riyadh',
  'Asia/Seoul': 'Seoul',
  'Asia/Shanghai': 'Beijing, Chongqing, Hong Kong',
  'Asia/Singapore': 'Kuala Lumpur, Singapore',
  'Asia/Taipei': 'Taipei',
  'Asia/Tokyo': 'Osaka, Sapporo, Tokyo',
  'Australia/Adelaide': 'Adelaide',
  'Australia/Brisbane': 'Brisbane',
  'Australia/Darwin': 'Darwin',
  'Australia/Perth': 'Perth',
  'Australia/Sydney': 'Canberra, Melbourne, Sydney',
  'Europe/Amsterdam': 'Amsterdam, Berlin, Rome, Stockholm, Vienna',
  'Europe/Athens': 'Athens, Bucharest',
  'Europe/Berlin': 'Amsterdam, Berlin, Rome, Stockholm, Vienna',
  'Europe/Dublin': 'Dublin, Edinburgh, Lisbon, London',
  'Europe/Helsinki': 'Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
  'Europe/Istanbul': 'Istanbul',
  'Europe/Lisbon': 'Dublin, Edinburgh, Lisbon, London',
  'Europe/London': 'Dublin, Edinburgh, Lisbon, London',
  'Europe/Madrid': 'Madrid',
  'Europe/Moscow': 'Moscow, St. Petersburg',
  'Europe/Paris': 'Brussels, Copenhagen, Madrid, Paris',
  'Europe/Prague': 'Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  'Europe/Rome': 'Amsterdam, Berlin, Rome, Stockholm, Vienna',
  'Pacific/Auckland': 'Auckland, Wellington',
  'Pacific/Honolulu': 'Hawaii',
  UTC: 'Coordinated Universal Time',
}

const CONTINENT_NAMES: Record<string, string> = {
  Africa: 'Africa',
  America: 'Americas',
  Antarctica: 'Antarctica',
  Arctic: 'Arctic',
  Asia: 'Asia',
  Atlantic: 'Atlantic',
  Australia: 'Australia',
  Europe: 'Europe',
  Indian: 'Indian Ocean',
  Pacific: 'Pacific',
}

const COUNTRY_DEFAULT_TIMEZONE: Record<string, string> = {
  AE: 'Asia/Dubai',
  AU: 'Australia/Sydney',
  CA: 'America/Toronto',
  DE: 'Europe/Berlin',
  FR: 'Europe/Paris',
  GB: 'Europe/London',
  IN: 'Asia/Kolkata',
  JP: 'Asia/Tokyo',
  PK: 'Asia/Karachi',
  SA: 'Asia/Riyadh',
  SG: 'Asia/Singapore',
  US: 'America/New_York',
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

export function isValidTimeZone(timeZone: string) {
  if (!timeZone.trim()) return false

  try {
    Intl.DateTimeFormat(undefined, { timeZone })
    return true
  } catch {
    return false
  }
}

export function formatUtcOffset(timeZone: string, now = new Date()) {
  const offsetMinutes = Math.round(getTimezoneOffsetMs(timeZone, now) / 60_000)
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const abs = Math.abs(offsetMinutes)
  return `(UTC${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)})`
}

function getGenericTimeZoneName(timeZone: string, now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longGeneric',
    }).formatToParts(now)

    return parts.find((part) => part.type === 'timeZoneName')?.value ?? ''
  } catch {
    return ''
  }
}

export function getTimezoneRegionName(timeZone: string, now = new Date()) {
  if (FRIENDLY_REGION_NAMES[timeZone]) {
    return FRIENDLY_REGION_NAMES[timeZone]
  }

  if (timeZone === 'UTC') return FRIENDLY_REGION_NAMES.UTC

  const segments = timeZone.split('/')
  if (segments.length === 1) {
    return getGenericTimeZoneName(timeZone, now) || timeZone
  }

  const location = segments
    .slice(1)
    .map((segment) => segment.replace(/_/g, ' '))
    .join(', ')

  const genericName = getGenericTimeZoneName(timeZone, now)
  if (genericName && !/time$/i.test(genericName)) {
    return location || genericName
  }

  return location
}

function buildSearchText(
  timeZone: string,
  region: string,
  offset: string,
  now = new Date()
) {
  const segments = timeZone.split('/')
  const continent = CONTINENT_NAMES[segments[0]] ?? segments[0]?.replace(/_/g, ' ') ?? ''
  const ianaLocation = segments.slice(1).join(' ').replace(/_/g, ' ')
  const genericName = getGenericTimeZoneName(timeZone, now)

  return [
    timeZone,
    region,
    offset,
    offset.replace('UTC', 'GMT'),
    continent,
    ianaLocation,
    genericName,
    region.split(',').join(' '),
  ]
    .join(' ')
    .toLowerCase()
}

export function formatTimezoneLabel(timeZone: string, now = new Date()): TimezoneOption {
  const offset = formatUtcOffset(timeZone, now)
  const region = getTimezoneRegionName(timeZone, now)
  const currentTime = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now)

  return {
    id: timeZone,
    label: `${offset} ${region}`,
    offset,
    region,
    currentTime,
    searchText: buildSearchText(timeZone, region, offset, now),
  }
}

export function getTimezoneOptions(now = new Date()) {
  return getAllTimeZones().map((timeZone) => formatTimezoneLabel(timeZone, now))
}

export function filterTimezoneOptions(options: TimezoneOption[], query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return options

  const compact = normalized.replace(/\s/g, '')

  return options.filter((option) => {
    if (option.searchText.includes(normalized)) return true
    if (option.offset.toLowerCase().replace(/\s/g, '').includes(compact)) return true
    if (option.region.toLowerCase().includes(normalized)) return true
    return option.id.toLowerCase().includes(normalized)
  })
}

export function inferTimeZoneFromCountry(countryCode: string) {
  return COUNTRY_DEFAULT_TIMEZONE[countryCode.trim().toUpperCase()] ?? null
}

export async function detectTimeZoneFromIp() {
  try {
    const response = await fetch('/api/geo', { cache: 'no-store' })
    if (response.ok) {
      const data = (await response.json()) as {
        timeZone?: string | null
        countryCode?: string | null
      }

      if (data.timeZone && isValidTimeZone(data.timeZone)) {
        return data.timeZone
      }

      if (data.countryCode) {
        const inferred = inferTimeZoneFromCountry(data.countryCode)
        if (inferred && isValidTimeZone(inferred)) return inferred
      }
    }
  } catch {
    // fall through
  }

  try {
    const response = await fetch('https://ipwho.is/', { cache: 'no-store' })
    if (!response.ok) return null

    const data = (await response.json()) as {
      success?: boolean
      timezone?: { id?: string }
      country_code?: string
    }

    if (data.success && data.timezone?.id && isValidTimeZone(data.timezone.id)) {
      return data.timezone.id
    }

    if (data.success && data.country_code) {
      const inferred = inferTimeZoneFromCountry(data.country_code)
      if (inferred && isValidTimeZone(inferred)) return inferred
    }
  } catch {
    return null
  }

  return null
}
