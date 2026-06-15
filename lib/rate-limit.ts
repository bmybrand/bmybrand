type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  success: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfter: number
}

const store = globalThis as typeof globalThis & {
  __bmybrandRateLimitStore?: Map<string, RateLimitEntry>
}

const buckets = store.__bmybrandRateLimitStore ?? new Map<string, RateLimitEntry>()
store.__bmybrandRateLimitStore = buckets

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < 500) return

  for (const [key, entry] of buckets.entries()) {
    if (entry.resetAt <= now) {
      buckets.delete(key)
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const vercelIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  const cfIp = request.headers.get('cf-connecting-ip')?.trim()

  return forwardedFor || realIp || vercelIp || cfIp || 'unknown'
}

export async function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const now = Date.now()
  cleanupExpiredBuckets(now)

  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfter: 0,
    }
  }

  if (existing.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  existing.count += 1

  return {
    success: true,
    limit,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
    retryAfter: 0,
  }
}

export function rateLimitHeaders(result: RateLimitResult) {
  const headers = new Headers({
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetAt / 1000).toString(),
  })

  if (!result.success) {
    headers.set('Retry-After', result.retryAfter.toString())
  }

  return headers
}
