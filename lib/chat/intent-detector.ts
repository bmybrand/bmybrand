import { chatCompletion } from '@/lib/openai/chat'
import { INTENT_DETECTION_PROMPT } from './system-prompts'
import type { UserIntent } from '@/types/chat'

const VALID_INTENTS: UserIntent[] = [
  'general_query',
  'booking_request',
  'human_request',
  'farewell',
]

export async function detectIntent(userMessage: string): Promise<UserIntent> {
  const result = await chatCompletion(
    [
      { role: 'system', content: INTENT_DETECTION_PROMPT },
      { role: 'user', content: userMessage },
    ],
    { maxTokens: 10, temperature: 0 }
  )

  const intent = result.toLowerCase().trim() as UserIntent

  if (VALID_INTENTS.includes(intent)) {
    return intent
  }

  // Default to general_query if classification is unclear
  return 'general_query'
}
