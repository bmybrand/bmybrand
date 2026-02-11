import { NextRequest, NextResponse } from 'next/server'
import { retrieveContext, assembleContext } from '@/lib/rag/retrieve'

export const runtime = 'nodejs'

// POST: Vector similarity search (used internally by the chat pipeline)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, threshold, count } = body as {
      query?: string
      threshold?: number
      count?: number
    }

    if (!query?.trim()) {
      return NextResponse.json(
        { error: 'query is required' },
        { status: 400 }
      )
    }

    const matches = await retrieveContext(query.trim(), { threshold, count })
    const context = assembleContext(matches)

    return NextResponse.json({
      matches,
      context,
      matchCount: matches.length,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Search failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
