// Email validation (permissive but catches obvious issues)
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// Phone validation (permissive, allows international formats)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, '')
  return /^\d{7,15}$/.test(cleaned)
}

// Check if user wants to skip (for optional fields like phone)
export function isSkip(input: string): boolean {
  const normalized = input.toLowerCase().trim()
  return ['skip', 'no', 'nah', 'pass', 'none', 'n/a', 'na', '-'].includes(normalized)
}

// Basic name validation (at least 2 chars, no obviously invalid input)
export function isValidName(name: string): boolean {
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 100
}

// ─── Server-side input sanitization (SOP §3.4) ────────────────────────────
// Runs on every inbound message before it reaches the LLM. Dependency-free:
// we only need plain conversational text, so all markup is stripped (never
// rendered), not escaped.

// Null bytes + Unicode bidirectional / isolate overrides (encoding exploits).
// Built from char codes so no literal control chars live in the source.
const CONTROL_CHARS_RE = new RegExp(
  '[\\u0000\\u202A-\\u202E\\u2066-\\u2069]',
  'g'
)

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''

  let s = input.slice(0, 2000) // hard length cap first (SOP: 2000 chars max)
  s = s.replace(/\r\n/g, '\n')

  // Strip <script>/<style> blocks wholesale, then any remaining HTML tags
  // (this also removes on* event-handler attributes, which only live in tags).
  s = s.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  s = s.replace(/<\/?[a-z][^>]*>/gi, ' ')

  s = s.replace(CONTROL_CHARS_RE, '')

  // Common SQL-injection fragments.
  s = s.replace(/('?\s*(OR|AND)\s*'?\d+'?\s*=\s*'?\d+'?)/gi, ' ')
  s = s.replace(
    /\b(UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|DELETE\s+FROM|SELECT\s+\*\s+FROM)\b/gi,
    ' '
  )

  return s.replace(/[ \t]{2,}/g, ' ').trim().slice(0, 2000)
}

// Prompt-injection / jailbreak patterns. When matched, the request is blocked
// at the API layer and the attempt is logged (SOP §3.4). Kept deliberately
// narrow so ordinary messages are never blocked, the system prompt's SECURITY
// block being the second line of defense for subtler attempts.
const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+|any\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+(your\s+|all\s+|the\s+)?(rules?|instructions?|guidelines?|prompts?)/i,
  /forget\s+(everything|all|your\s+(rules?|instructions?|prompt))/i,
  /[Yy]ou\s+are\s+now\s+[A-Z]{2,}\b/, // "You are now DAN/STAN/…" — token stays caps-only
  /\bnew\s+instructions?\s*:/i,
  /\bSYSTEM\s*:/, // case-sensitive system-command spoofing
  /act\s+as\s+(if\s+you\s+have\s+no|dan\b|an?\s+AI\s+(with\s+no|without))/i,
  /\bdan\s+mode\b/i,
  /(reveal|show|print|repeat|expose|share)\s+(me\s+)?(your\s+|the\s+)?(system\s+)?(prompt|instructions?|configuration|rules?)\b/i,
  /pretend\s+(you\s+are|to\s+be)\s+(an?\s+)?(AI|assistant|model|bot)\s+(with\s+no|without)/i,
]

export function isInjectionAttempt(input: string): boolean {
  if (!input) return false
  return INJECTION_PATTERNS.some((p) => p.test(input))
}
