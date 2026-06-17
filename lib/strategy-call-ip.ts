import { getBridgeConfig } from '@/lib/strategy-call-save'
import { getMysqlPool } from '@/lib/mysql'

function bridgeHeaders(secret: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${secret}`,
  }
}

function buildBridgeUrl(baseUrl: string, secret: string, params: Record<string, string> = {}) {
  const url = new URL(baseUrl)
  url.searchParams.set('token', secret)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return url.toString()
}

async function bookingExistsForIpViaBridge(url: string, secret: string, ipAddress: string) {
  const response = await fetch(
    buildBridgeUrl(url, secret, { checkIp: ipAddress }),
    {
      method: 'GET',
      headers: bridgeHeaders(secret),
      cache: 'no-store',
    }
  )

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    return false
  }

  return result.exists === true
}

export async function strategyCallBookingExistsForIp(ipAddress: string) {
  const bridge = getBridgeConfig()

  if (bridge.url && bridge.secret) {
    return bookingExistsForIpViaBridge(bridge.url, bridge.secret, ipAddress)
  }

  const pool = getMysqlPool()
  const [rows] = await pool.execute(
    'SELECT id FROM strategy_call_bookings WHERE ip_address = ? LIMIT 1',
    [ipAddress]
  )

  return Array.isArray(rows) && rows.length > 0
}
