import { supabaseAdmin } from '@/lib/supabase/server'

const RATE_LIMIT = parseInt(process.env.NEXT_PUBLIC_CHAT_RATE_LIMIT || '20', 10)
const WINDOW_MS = 60_000 // 1 minute window

// DB-based rate limiter (works across stateless serverless functions)
// Counts messages inserted in the last minute for a given session
export async function checkRateLimit(sessionId: string): Promise<{
  allowed: boolean
  remaining: number
}> {
  const windowStart = new Date(Date.now() - WINDOW_MS).toISOString()

  const { count, error } = await supabaseAdmin
    .from('chat_messages')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('role', 'user')
    .gte('created_at', windowStart)

  if (error) {
    // On error, allow the message (fail open) but log
    console.error('Rate limit check failed:', error.message)
    return { allowed: true, remaining: RATE_LIMIT }
  }

  const messageCount = count ?? 0
  const remaining = Math.max(0, RATE_LIMIT - messageCount)

  return {
    allowed: messageCount < RATE_LIMIT,
    remaining,
  }
}
