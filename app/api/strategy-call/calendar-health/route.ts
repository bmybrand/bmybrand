import { NextResponse } from 'next/server'
import { testGoogleCalendarAccess } from '@/lib/google-calendar'

export async function GET() {
  const result = await testGoogleCalendarAccess()
  return NextResponse.json(result, { status: result.ok ? 200 : 500 })
}
