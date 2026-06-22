const AUDIT_ID_PREFIX = "bmybrand-audit-id:";

export function normalizeAuditSiteKey(site: string) {
  try {
    const url = new URL(site.startsWith("http") ? site : `https://${site}`);
    return url.href.replace(/\/$/, "");
  } catch {
    return site.trim();
  }
}

export function saveAuditIdForSite(site: string, auditId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`${AUDIT_ID_PREFIX}${normalizeAuditSiteKey(site)}`, auditId);
}

export function getAuditIdForSite(site: string) {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(`${AUDIT_ID_PREFIX}${normalizeAuditSiteKey(site)}`);
}
