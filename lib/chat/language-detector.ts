import { chatCompletion } from '@/lib/openai/chat'
import { LANGUAGE_DETECTION_PROMPT, translationPrompt } from './system-prompts'

export async function detectLanguage(text: string): Promise<string> {
  const result = await chatCompletion(
    [
      { role: 'system', content: LANGUAGE_DETECTION_PROMPT },
      { role: 'user', content: text },
    ],
    { maxTokens: 5, temperature: 0 }
  )

  const code = result.toLowerCase().trim()

  // Validate it looks like an ISO 639-1 code (2-3 chars)
  if (/^[a-z]{2,3}$/.test(code)) {
    return code
  }

  return 'en'
}

// Translate a message to the target language (skip if already English)
export async function translateMessage(
  message: string,
  targetLanguage: string
): Promise<string> {
  if (targetLanguage === 'en') return message

  const result = await chatCompletion(
    [
      { role: 'system', content: translationPrompt(targetLanguage) },
      { role: 'user', content: message },
    ],
    { maxTokens: 512, temperature: 0.3 }
  )

  return result || message
}
