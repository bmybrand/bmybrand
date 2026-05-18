import { NextResponse } from 'next/server'
import { getMysqlConfig, getMysqlErrorDetails } from '@/lib/mysql'
import { checkStrategyCallStorage, usesMysqlBridge } from '@/lib/strategy-call-save'

export async function GET() {
  if (usesMysqlBridge()) {
    try {
      const result = await checkStrategyCallStorage()
      return NextResponse.json(result, { status: result.ok ? 200 : 500 })
    } catch (error) {
      return NextResponse.json(
        { ok: false, mode: 'bridge', ...getMysqlErrorDetails(error) },
        { status: 500 }
      )
    }
  }

  const config = getMysqlConfig()

  if (!config.isConfigured) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Missing MYSQL_BRIDGE_URL + MYSQL_BRIDGE_SECRET, or MYSQL_HOST + MYSQL_USER + MYSQL_DATABASE.',
      },
      { status: 500 }
    )
  }

  try {
    const result = await checkStrategyCallStorage()
    return NextResponse.json({
      ...result,
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      ssl: config.sslEnabled,
    })
  } catch (error) {
    const details = getMysqlErrorDetails(error)

    return NextResponse.json(
      {
        ok: false,
        mode: 'mysql',
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
