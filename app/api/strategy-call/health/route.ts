import { NextResponse } from 'next/server'
import { getMysqlConfig, getMysqlErrorDetails, getMysqlPool } from '@/lib/mysql'

export async function GET() {
  const config = getMysqlConfig()

  if (!config.isConfigured) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing MYSQL_HOST, MYSQL_USER, or MYSQL_DATABASE in environment variables.',
      },
      { status: 500 }
    )
  }

  try {
    const pool = getMysqlPool()
    await pool.query('SELECT 1')

    const [tables] = await pool.query("SHOW TABLES LIKE 'strategy_call_bookings'")
    const tableExists = Array.isArray(tables) && tables.length > 0

    return NextResponse.json({
      ok: true,
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      ssl: config.sslEnabled,
      tableExists,
      ...(tableExists
        ? {}
        : {
            warning:
              'Table strategy_call_bookings was not found. Import database/strategy_call_bookings.sql in phpMyAdmin.',
          }),
    })
  } catch (error) {
    const details = getMysqlErrorDetails(error)

    return NextResponse.json(
      {
        ok: false,
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        ssl: config.sslEnabled,
        ...details,
      },
      { status: 500 }
    )
  }
}
