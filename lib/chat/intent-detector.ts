import { chatCompletion } from '@/lib/openai/chat'
import { INTENT_DETECTION_PROMPT } from './prompts'
import type { UserIntent } from '@/types/chat'

const VALID_INTENTS: UserIntent[] = [
  'general_query',
  'service_inquiry',
  'booking_request',
  'support_request',
  'human_request',
  'farewell',
]

// `history` is the recent conversation as "role: content" lines, so short
// replies like "yes" or "when will they call?" are read in context.
export async function detectIntent(
  userMessage: string,
  history = ''
): Promise<UserIntent> {
  const content = history
    ? `Recent conversation:\n${history}\n\nLatest visitor message:\n${userMessage}`
    : userMessage

  const result = await chatCompletion(
    [
      { role: 'system', content: INTENT_DETECTION_PROMPT },
      { role: 'user', content },
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
