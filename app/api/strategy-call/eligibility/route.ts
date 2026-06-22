import { NextResponse } from 'next/server'
import { getClientIp } from '@/lib/client-ip'
import { strategyCallBookingExistsForIp } from '@/lib/strategy-call-ip'

export async function GET(request: Request) {
  const ipAddress = getClientIp(request)

  if (!ipAddress) {
    return NextResponse.json({ allowed: true, reason: 'ip_unavailable' })
  }

  try {
    const exists = await strategyCallBookingExistsForIp(ipAddress)
    return NextResponse.json({
      allowed: !exists,
      reason: exists ? 'already_submitted' : null,
    })
  } catch (error) {
    console.error('[strategy-call/eligibility] check failed:', error)
    return NextResponse.json({ allowed: true, reason: 'check_failed' })
  }
}
