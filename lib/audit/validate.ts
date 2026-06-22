export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizeAuditSiteInput(site: string) {
  const trimmed = site.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function isAllowedAuditUrl(site: string) {
  try {
    const normalized = normalizeAuditSiteInput(site);
    const parsed = new URL(normalized);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    if (process.env.NODE_ENV === "production") {
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".local")
      ) {
        return false;
      }

      const ipMatch = hostname.match(/^(\d{1,3}\.){3}\d{1,3}$/);
      if (ipMatch) {
        const parts = hostname.split(".").map(Number);
        const [a, b] = parts;
        if (
          a === 10 ||
          a === 127 ||
          (a === 192 && b === 168) ||
          (a === 172 && b >= 16 && b <= 31)
        ) {
          return false;
        }
      }
    }

    return true;
  } catch {
    return false;
  }
}
