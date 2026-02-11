import { generateEmbedding } from '@/lib/openai/embeddings'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { KnowledgeMatch } from '@/types/chat'

const DEFAULT_MATCH_THRESHOLD = 0.75
const DEFAULT_MATCH_COUNT = 5

// Embed a query and search for matching knowledge chunks via vector similarity
export async function retrieveContext(
  query: string,
  options?: { threshold?: number; count?: number }
): Promise<KnowledgeMatch[]> {
  const threshold = options?.threshold ?? DEFAULT_MATCH_THRESHOLD
  const count = options?.count ?? DEFAULT_MATCH_COUNT

  // 1. Generate embedding for the user query
  const queryEmbedding = await generateEmbedding(query)

  // 2. Call the match_knowledge RPC function
  const { data, error } = await supabaseAdmin.rpc('match_knowledge', {
    query_embedding: JSON.stringify(queryEmbedding),
    match_threshold: threshold,
    match_count: count,
  })

  if (error) {
    throw new Error(`Vector search failed: ${error.message}`)
  }

  return (data ?? []) as KnowledgeMatch[]
}

// Assemble matched chunks into a single context string for the LLM
export function assembleContext(matches: KnowledgeMatch[]): string {
  if (matches.length === 0) return ''

  return matches
    .map(
      (match, i) =>
        `[Source ${i + 1}: ${match.title} (${match.source_filename}, chunk ${match.chunk_index + 1})]\n${match.content}`
    )
    .join('\n\n---\n\n')
}
