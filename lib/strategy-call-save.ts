import { getMysqlErrorDetails, getMysqlPool, getMysqlConfig } from '@/lib/mysql'

export type StrategyCallRecord = {
  email: string
  name: string
  countryCode: string
  phone: string
  companyName: string
  websiteUrl: string
  budget: string
  callNotes: string
  source: string
  appointmentDate: string
  appointmentTime: string
  timezone: string
  ipAddress?: string
}

export function getBridgeConfig() {
  return {
    url: process.env.MYSQL_BRIDGE_URL?.trim() ?? '',
    secret: process.env.MYSQL_BRIDGE_SECRET?.trim() ?? '',
  }
}

export function usesMysqlBridge() {
  const { url, secret } = getBridgeConfig()
  return Boolean(url && secret)
}

/** cPanel/Apache often strips Authorization; pass token in the query string too. */
function buildBridgeUrl(baseUrl: string, secret: string, params: Record<string, string> = {}) {
  const url = new URL(baseUrl)
  url.searchParams.set('token', secret)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return url.toString()
}

function bridgeHeaders(secret: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${secret}`,
  }
}

export async function saveStrategyCallBooking(payload: StrategyCallRecord) {
  const bridge = getBridgeConfig()

  if (bridge.url && bridge.secret) {
    return saveViaBridge(bridge.url, bridge.secret, payload)
  }

  const mysqlConfig = getMysqlConfig()
  if (!mysqlConfig.isConfigured) {
    throw Object.assign(
      new Error(
        'Booking storage is not configured. Set MYSQL_BRIDGE_URL + MYSQL_BRIDGE_SECRET or MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE.'
      ),
      { details: { code: 'STORAGE_NOT_CONFIGURED' } }
    )
  }

  return saveViaDirectMysql(payload)
}

async function saveViaBridge(
  url: string,
  secret: string,
  payload: StrategyCallRecord
) {
  let response: Response

  try {
    response = await fetch(buildBridgeUrl(url, secret), {
      method: 'POST',
      headers: bridgeHeaders(secret),
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
  } catch (error) {
    const details = getMysqlErrorDetails(error)
    throw Object.assign(new Error('Bridge request failed'), { details })
  }

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const bridgeError =
      typeof result.error === 'string' ? result.error : 'Bridge rejected the booking.'

    throw Object.assign(new Error(bridgeError), {
      details: {
        code:
          response.status === 401
            ? 'BRIDGE_UNAUTHORIZED'
            : response.status === 429
              ? 'IP_ALREADY_SUBMITTED'
              : 'BRIDGE_HTTP_ERROR',
        status: response.status,
        message: bridgeError,
      },
    })
  }

  return {
    id: typeof result.id === 'number' ? result.id : null,
    mode: 'bridge' as const,
  }
}

async function saveViaDirectMysql(payload: StrategyCallRecord) {
  const pool = getMysqlPool()

  const [result] = await pool.execute(
    `INSERT INTO strategy_call_bookings (
      email, name, country_code, phone, company_name, website_url,
      budget, call_notes, source, appointment_date, appointment_time, timezone, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.email,
      payload.name,
      payload.countryCode || null,
      payload.phone,
      payload.companyName,
      payload.websiteUrl,
      payload.budget,
      payload.callNotes,
      payload.source,
      payload.appointmentDate,
      payload.appointmentTime,
      payload.timezone,
      payload.ipAddress || null,
    ]
  )

  const insertId =
    typeof result === 'object' && result !== null && 'insertId' in result
      ? Number((result as { insertId: number }).insertId)
      : null

  return { id: insertId, mode: 'mysql' as const }
}

export async function checkStrategyCallStorage() {
  const bridge = getBridgeConfig()

  if (bridge.url && bridge.secret) {
    const healthUrl = buildBridgeUrl(bridge.url, bridge.secret, { health: '1' })

    let response: Response
    try {
      response = await fetch(healthUrl, {
        method: 'GET',
        headers: bridgeHeaders(bridge.secret),
        cache: 'no-store',
      })
    } catch (error) {
      return {
        ok: false as const,
        mode: 'bridge' as const,
        ...getMysqlErrorDetails(error),
      }
    }

    const result = await response.json().catch(() => ({}))
    const unauthorized = response.status === 401

    return {
      ok: response.ok && result.ok === true,
      mode: 'bridge' as const,
      url: bridge.url,
      tableExists: result.tableExists === true,
      ...(unauthorized
        ? {
            message:
              'Bridge unauthorized. MYSQL_BRIDGE_SECRET on Vercel must exactly match BRIDGE_SECRET in cpanel strategy-call.php.',
          }
        : response.ok
          ? {}
          : { message: result.error ?? 'Bridge health check failed' }),
    }
  }

  const pool = getMysqlPool()
  await pool.query('SELECT 1')
  const [tables] = await pool.query("SHOW TABLES LIKE 'strategy_call_bookings'")
  const tableExists = Array.isArray(tables) && tables.length > 0

  return { ok: true as const, mode: 'mysql' as const, tableExists }
}
