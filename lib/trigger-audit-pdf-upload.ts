import { getInvoicePortalOrigin } from "@/lib/invoice-portal-origin";

export async function triggerAuditPdfArchive(auditId: string) {
  const origin = getInvoicePortalOrigin();
  const secret = process.env.AUDIT_DRIVE_UPLOAD_SECRET?.trim();

  if (!origin || !secret) {
    console.warn(
      "Skipping audit PDF archive: set INVOICE_PORTAL_ORIGIN and AUDIT_DRIVE_UPLOAD_SECRET.",
    );
    return;
  }

  const response = await fetch(
    `${origin}/api/internal/audit-reports/${encodeURIComponent(auditId)}/drive`,
    {
      method: "POST",
      headers: {
        "x-audit-drive-secret": secret,
      },
    },
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(payload?.error || `Archive failed with status ${response.status}`);
  }
}
