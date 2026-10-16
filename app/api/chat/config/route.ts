import { NextResponse } from 'next/server'
import { getSettings, publicConfig } from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Public chat widget settings (assistant name, welcome text, quick replies,
// calendar switch). Cached for a minute at the edge.
export async function GET() {
  const settings = await getSettings()
  return NextResponse.json(publicConfig(settings), {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  })
}
