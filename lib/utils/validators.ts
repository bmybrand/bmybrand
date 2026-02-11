// Email validation (permissive but catches obvious issues)
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// Phone validation (permissive — allows international formats)
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

// Sanitize user input — strip potential prompt injection markers
export function sanitizeInput(input: string): string {
  return input
    .replace(/\r\n/g, '\n')
    .trim()
    .substring(0, 2000) // Enforce character limit
}
