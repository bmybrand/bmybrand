import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

function trimEnv(value: string | undefined) {
  return value?.trim() ?? ''
}

function parseHost(value: string) {
  // Supports "hostname" or "hostname:3306" pasted from cPanel
  if (value.includes(':') && !value.startsWith('[')) {
    const [host, portPart] = value.split(':')
    const port = Number(portPart)
    if (host && Number.isFinite(port)) {
      return { host, port }
    }
  }
  return { host: value, port: null as number | null }
}

export function getMysqlConfig() {
  const hostRaw = trimEnv(process.env.MYSQL_HOST)
  const user = trimEnv(process.env.MYSQL_USER)
  const password = process.env.MYSQL_PASSWORD ?? ''
  const database = trimEnv(process.env.MYSQL_DATABASE)
  const parsed = parseHost(hostRaw)
  const port = parsed.port ?? Number(process.env.MYSQL_PORT || 3306)
  const sslEnabled =
    trimEnv(process.env.MYSQL_SSL).toLowerCase() === 'true' ||
    trimEnv(process.env.MYSQL_SSL).toLowerCase() === '1'

  return {
    host: parsed.host,
    user,
    password,
    database,
    port,
    sslEnabled,
    isConfigured: Boolean(parsed.host && user && database),
  }
}

export function getMysqlPool() {
  if (pool) return pool

  const config = getMysqlConfig()

  if (!config.isConfigured) {
    throw new Error(
      'MySQL is not configured. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE.'
    )
  }

  pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    waitForConnections: true,
    // Serverless-friendly: avoid exhausting cPanel connection limits
    connectionLimit: 2,
    maxIdle: 1,
    idleTimeout: 60_000,
    connectTimeout: 15_000,
    enableKeepAlive: true,
    ...(config.sslEnabled
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {}),
  })

  return pool
}

export function getMysqlErrorDetails(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: 'Unknown database error' }
  }

  const err = error as Error & { code?: string; errno?: number }

  return {
    message: err.message,
    code: err.code,
    errno: err.errno,
  }
}
