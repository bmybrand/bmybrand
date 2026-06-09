// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  Safety screening (SOP §5 — Ethical Guardrails)                            ║
// ║  Deterministic, server-side pre-screen that runs in EVERY conversation     ║
// ║  state before normal routing. Crisis detection must never depend on the    ║
// ║  LLM, so the mandated 988/911 script is returned verbatim from here.       ║
// ╚══════════════════════════════════════════════════════════════════════════╝

// Mandatory crisis response — do not remove or modify (SOP §5).
export const CRISIS_RESPONSE =
  'I can hear that you are going through something very difficult. Please reach out for immediate support. In the US, you can call or text 988 (Suicide and Crisis Lifeline), available 24/7. For emergencies, call 911. A trained professional can support you far better than I can right now.'

// Brief, non-judgmental refusal for prohibited categories (SOP §5).
export const PROHIBITED_REFUSAL =
  "That's not something I'm able to help with here. Is there something about BMYBrand's services I can help you with instead?"

// Conversation-ending message after 3 violations (SOP §5).
export const CONVERSATION_END =
  "I'm going to end this conversation now. Please reach out again when you're ready for help with BMYBrand's services."

// Self-harm / acute crisis signals (English + common Spanish phrasings).
const CRISIS_PATTERNS: RegExp[] = [
  /\b(kill(ing)?\s+myself|killed\s+myself)\b/i,
  /\b(end(ing)?\s+my\s+(own\s+)?life|take\s+my\s+(own\s+)?life|taking\s+my\s+(own\s+)?life)\b/i,
  /\b(want|wanna|going)\s+to\s+die\b/i,
  /\bdon'?t\s+want\s+to\s+(live|be\s+alive)\b/i,
  /\b(commit\s+)?suicid(e|al)\b/i,
  /\b(self[-\s]?harm|hurt(ing)?\s+myself|cut(ting)?\s+myself)\b/i,
  /\b(quiero\s+morir|matarme|quitarme\s+la\s+vida|suicidarme|no\s+quiero\s+vivir|hacerme\s+da[ñn]o)\b/i,
]

// Clearly prohibited requests. Kept narrow (intent verb + harmful object) so
// ordinary agency conversation is never tripped. Subtler cases are caught by
// the system prompt's ETHICAL GUARDRAILS block.
const PROHIBITED_PATTERNS: RegExp[] = [
  /\b(write|send|generate|create|make|tell|show)\b[^.?!]*\b(sexual|explicit|erotic|porn(ographic)?|nude|nsfw)\b/i,
  /\b(sext|erotic\s+roleplay|sexual\s+roleplay|sexual\s+story)\b/i,
  /\bhow\s+(to|do|did|does|can|could|should|would)\b[^.?!]*\b(kill|murder|hurt|harm|attack|poison|stab|shoot)\b[^.?!]*\b(someone|somebody|people|him|her|them|a\s+person)\b/i,
  /\b(make|build|create|how\s+to\s+(make|build))\b[^.?!]*\b(bomb|explosive|weapon|grenade)\b/i,
  /\bhow\s+to\b[^.?!]*\b(hack\s+(into|someone|an?\s+account)|steal|launder\s+money|counterfeit|forge\s+(a|an|documents)|make\s+(meth|cocaine|drugs))\b/i,
]

export type ScreenResult = 'crisis' | 'prohibited' | 'ok'

export function screenMessage(text: string): ScreenResult {
  if (!text) return 'ok'
  if (CRISIS_PATTERNS.some((p) => p.test(text))) return 'crisis'
  if (PROHIBITED_PATTERNS.some((p) => p.test(text))) return 'prohibited'
  return 'ok'
}
