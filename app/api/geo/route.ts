import { NextResponse } from 'next/server'
import { inferTimeZoneFromCountry } from '@/lib/timezone-labels'

function countryFromHeaders(request: Request) {
  const candidates = [
    request.headers.get('x-vercel-ip-country'),
    request.headers.get('cf-ipcountry'),
    request.headers.get('x-country-code'),
    request.headers.get('cloudfront-viewer-country'),
  ]

  for (const value of candidates) {
    const code = value?.trim().toUpperCase()
    if (code && code !== 'XX' && code !== 'T1') return code
  }

  return null
}

async function geoFromIpLookup() {
  try {
    const response = await fetch('https://ipwho.is/', { cache: 'no-store' })
    if (!response.ok) return null

    const data = (await response.json()) as {
      success?: boolean
      country_code?: string
      timezone?: { id?: string }
    }

    if (!data.success) return null

    return {
      countryCode: data.country_code?.toUpperCase() ?? null,
      timeZone: data.timezone?.id ?? null,
    }
  } catch (error) {
    console.error('[geo] IP lookup failed:', error)
    return null
  }
}

export async function GET(request: Request) {
  const lookup = await geoFromIpLookup()
  const headerCountry = countryFromHeaders(request)

  if (lookup?.countryCode || lookup?.timeZone) {
    return NextResponse.json({
      countryCode: lookup.countryCode ?? headerCountry,
      timeZone: lookup.timeZone ?? (headerCountry ? inferTimeZoneFromCountry(headerCountry) : null),
      source: 'ip',
    })
  }

  if (headerCountry) {
    return NextResponse.json({
      countryCode: headerCountry,
      timeZone: inferTimeZoneFromCountry(headerCountry),
      source: 'header',
    })
  }

  return NextResponse.json({ countryCode: null, timeZone: null, source: null })
}
