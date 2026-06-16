import type { TextChunk } from '@/types/chat'

const DEFAULT_CHUNK_SIZE = 500    // tokens (~375 words)
const DEFAULT_CHUNK_OVERLAP = 50  // tokens overlap between consecutive chunks

// Rough token estimation: ~4 characters per token for English text
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

function tokensToChars(tokens: number): number {
  return tokens * 4
}

// Find the best split point near a target position, preferring paragraph > sentence > word boundaries
function findSplitPoint(text: string, target: number): number {
  const searchStart = Math.max(0, target - tokensToChars(50))
  const searchEnd = Math.min(text.length, target + tokensToChars(50))
  const searchRegion = text.substring(searchStart, searchEnd)

  // Prefer paragraph break (double newline)
  const paragraphBreak = searchRegion.lastIndexOf('\n\n')
  if (paragraphBreak !== -1) {
    return searchStart + paragraphBreak + 2
  }

  // Then sentence break (. ! ? followed by space or newline)
  const sentenceMatch = searchRegion.match(/.*[.!?][\s\n]/)
  if (sentenceMatch) {
    return searchStart + sentenceMatch[0].length
  }

  // Then single newline
  const newlineBreak = searchRegion.lastIndexOf('\n')
  if (newlineBreak !== -1) {
    return searchStart + newlineBreak + 1
  }

  // Then word boundary (space)
  const spaceBreak = searchRegion.lastIndexOf(' ')
  if (spaceBreak !== -1) {
    return searchStart + spaceBreak + 1
  }

  // Fallback: split at target position
  return target
}

export function chunkText(
  text: string,
  chunkSize: number = DEFAULT_CHUNK_SIZE,
  chunkOverlap: number = DEFAULT_CHUNK_OVERLAP
): TextChunk[] {
  // Clean up the text — normalize whitespace, trim
  const cleaned = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()

  if (estimateTokens(cleaned) <= chunkSize) {
    return [{ content: cleaned, chunkIndex: 0, totalChunks: 1 }]
  }

  const chunks: string[] = []
  const chunkCharSize = tokensToChars(chunkSize)
  const overlapChars = tokensToChars(chunkOverlap)
  let position = 0

  while (position < cleaned.length) {
    const end = position + chunkCharSize

    if (end >= cleaned.length) {
      // Last chunk — take everything remaining
      chunks.push(cleaned.substring(position).trim())
      break
    }

    const splitAt = findSplitPoint(cleaned, end)
    chunks.push(cleaned.substring(position, splitAt).trim())

    // Move forward by chunk size minus overlap
    const nextPosition = splitAt - overlapChars
    if (nextPosition <= position) {
      // Safety: always advance at least half a chunk to prevent infinite loops
      position = splitAt - Math.floor(overlapChars / 2)
    } else {
      position = nextPosition
    }
  }

  // Filter out empty chunks
  const validChunks = chunks.filter((c) => c.length > 0)
  const totalChunks = validChunks.length

  return validChunks.map((content, index) => ({
    content,
    chunkIndex: index,
    totalChunks,
  }))
}
