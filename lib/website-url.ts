export function normalizeWebsiteUrl(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed.replace(/^\/+/, '')}`
}

export function isValidWebsiteUrl(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return true

  const normalized = normalizeWebsiteUrl(trimmed)

  try {
    const { hostname } = new URL(normalized)
    if (!hostname || !hostname.includes('.')) return false
    return /^[a-zA-Z0-9.-]+$/.test(hostname)
  } catch {
    return false
  }
}
