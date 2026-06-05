import { NextResponse } from 'next/server'

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

async function countryFromIpLookup() {
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
  } catch (error) {
    console.error('[geo] IP lookup failed:', error)
  }

  return null
}

export async function GET(request: Request) {
  const headerCountry = countryFromHeaders(request)
  if (headerCountry) {
    return NextResponse.json({ countryCode: headerCountry, source: 'header' })
  }

  const lookupCountry = await countryFromIpLookup()
  if (lookupCountry) {
    return NextResponse.json({ countryCode: lookupCountry, source: 'ip' })
  }

  return NextResponse.json({ countryCode: null, source: null })
}
