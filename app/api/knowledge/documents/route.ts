import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'

// GET: List all uploaded documents (grouped by source_filename)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('knowledge_documents')
      .select('title, source_filename, total_chunks, uploaded_by, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group by source_filename to deduplicate chunks into documents
    const documentsMap = new Map<
      string,
      {
        title: string
        source_filename: string
        total_chunks: number
        uploaded_by: string | null
        created_at: string
      }
    >()

    for (const row of data ?? []) {
      if (!documentsMap.has(row.source_filename)) {
        documentsMap.set(row.source_filename, {
          title: row.title,
          source_filename: row.source_filename,
          total_chunks: row.total_chunks,
          uploaded_by: row.uploaded_by,
          created_at: row.created_at,
        })
      }
    }

    return NextResponse.json({
      documents: Array.from(documentsMap.values()),
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to list documents'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE: Remove a document and all its chunks by source_filename
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate agent
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

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json(
        { error: 'filename query parameter is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('knowledge_documents')
      .delete()
      .eq('source_filename', filename)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete document'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
