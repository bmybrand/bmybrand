export function normalizeIpAddress(value: string | null | undefined) {
  const first = value?.split(',')[0]?.trim()
  if (!first) return null

  const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/
  const ipv6 = /^[0-9a-f:.]+$/i

  if (ipv4.test(first) || ipv6.test(first)) {
    return first
  }

  return null
}

export function getClientIp(request: Request) {
  const candidates = [
    request.headers.get('x-vercel-forwarded-for'),
    request.headers.get('x-real-ip'),
    request.headers.get('cf-connecting-ip'),
    request.headers.get('x-forwarded-for'),
  ]

  for (const value of candidates) {
    const ip = normalizeIpAddress(value)
    if (ip) return ip
  }

  return null
}
