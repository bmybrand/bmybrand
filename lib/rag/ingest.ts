import { PDFParse } from 'pdf-parse'
import { chunkText } from './chunker'
import { generateEmbeddings } from '@/lib/openai/embeddings'
import { supabaseAdmin } from '@/lib/supabase/server'

const EMBEDDING_BATCH_SIZE = 20 // OpenAI allows up to 2048 inputs, but we batch for safety

// Extract raw text from a PDF buffer (pdf-parse v2 API)
async function extractPdfText(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer })
  const result = await parser.getText()
  await parser.destroy()
  return result.pages.map((p) => p.text).join('\n\n')
}

// Main ingestion pipeline: parse → chunk → embed → upsert
export async function ingestDocument(
  file: Buffer,
  filename: string,
  title: string,
  mimeType: string,
  uploadedBy?: string
): Promise<{ chunksCreated: number }> {
  // 1. Extract text based on file type
  let rawText: string

  if (mimeType === 'application/pdf') {
    rawText = await extractPdfText(file)
  } else if (
    mimeType === 'text/markdown' ||
    mimeType === 'text/plain' ||
    filename.endsWith('.md') ||
    filename.endsWith('.txt')
  ) {
    rawText = file.toString('utf-8')
  } else {
    throw new Error(`Unsupported file type: ${mimeType}`)
  }

  if (!rawText.trim()) {
    throw new Error('Document contains no extractable text')
  }

  // 2. Delete existing chunks for this filename (allows re-upload/update)
  await supabaseAdmin
    .from('knowledge_documents')
    .delete()
    .eq('source_filename', filename)

  // 3. Split into chunks
  const chunks = chunkText(rawText)

  // 4. Generate embeddings in batches
  const allEmbeddings: number[][] = []

  for (let i = 0; i < chunks.length; i += EMBEDDING_BATCH_SIZE) {
    const batch = chunks.slice(i, i + EMBEDDING_BATCH_SIZE)
    const batchTexts = batch.map((c) => c.content)
    const batchEmbeddings = await generateEmbeddings(batchTexts)
    allEmbeddings.push(...batchEmbeddings)
  }

  // 5. Prepare rows and batch insert
  const rows = chunks.map((chunk, index) => ({
    title,
    source_filename: filename,
    content: chunk.content,
    chunk_index: chunk.chunkIndex,
    total_chunks: chunk.totalChunks,
    embedding: JSON.stringify(allEmbeddings[index]),
    metadata: {},
    uploaded_by: uploadedBy ?? null,
  }))

  // Insert in batches of 50 rows to avoid payload limits
  const INSERT_BATCH_SIZE = 50
  for (let i = 0; i < rows.length; i += INSERT_BATCH_SIZE) {
    const batch = rows.slice(i, i + INSERT_BATCH_SIZE)
    const { error } = await supabaseAdmin
      .from('knowledge_documents')
      .insert(batch)

    if (error) {
      throw new Error(`Failed to insert chunks: ${error.message}`)
    }
  }

  return { chunksCreated: chunks.length }
}

// Delete all chunks belonging to a document by source filename
export async function deleteDocument(filename: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('knowledge_documents')
    .delete()
    .eq('source_filename', filename)

  if (error) {
    throw new Error(`Failed to delete document: ${error.message}`)
  }
}
