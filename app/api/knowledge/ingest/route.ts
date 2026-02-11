import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { ingestDocument } from '@/lib/rag/ingest'

export const runtime = 'nodejs'
export const maxDuration = 60 // PDF parsing + embedding can take time

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate agent via Supabase JWT
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Look up agent record
    const { data: agent } = await supabaseAdmin
      .from('agents')
      .select('id')
      .eq('user_id', user.id)
      .single()

    // 2. Parse multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const title = formData.get('title') as string | null

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/markdown', 'text/plain']
    const allowedExtensions = ['.pdf', '.md', '.txt']
    const hasAllowedType = allowedTypes.includes(file.type)
    const hasAllowedExtension = allowedExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    )

    if (!hasAllowedType && !hasAllowedExtension) {
      return NextResponse.json(
        { error: 'Only PDF, Markdown, and text files are supported' },
        { status: 400 }
      )
    }

    // 3. Read file into buffer and run ingestion pipeline
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await ingestDocument(
      buffer,
      file.name,
      title.trim(),
      file.type || 'text/plain',
      agent?.id
    )

    return NextResponse.json({
      success: true,
      chunksCreated: result.chunksCreated,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Ingestion failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
