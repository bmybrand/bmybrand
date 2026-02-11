import { openai } from './client'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

const CHAT_MODEL = 'gpt-4o-mini'

// Non-streaming completion (for intent detection, language detection, translations)
export async function chatCompletion(
  messages: ChatCompletionMessageParam[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
    max_tokens: options?.maxTokens ?? 1024,
    temperature: options?.temperature ?? 0.7,
  })
  return response.choices[0].message.content?.trim() ?? ''
}

// Streaming completion (for RAG-powered chat responses)
export async function chatCompletionStream(
  messages: ChatCompletionMessageParam[],
  options?: { maxTokens?: number; temperature?: number }
) {
  return openai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
    max_tokens: options?.maxTokens ?? 1024,
    temperature: options?.temperature ?? 0.7,
    stream: true,
  })
}
