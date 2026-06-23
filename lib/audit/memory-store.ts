import type { AuditApiResponse, AuditReport, AuditReportRow } from "@/types/audit";

type MemoryAuditRecord = AuditReportRow;

const memoryStore = globalThis as typeof globalThis & {
  __bmybrandAuditMemoryStore?: Map<string, MemoryAuditRecord>;
};

const audits =
  memoryStore.__bmybrandAuditMemoryStore ?? new Map<string, MemoryAuditRecord>();
memoryStore.__bmybrandAuditMemoryStore = audits;

export function isSupabaseConfigured() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.BMYB_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  return Boolean(supabaseUrl && serviceRoleKey);
}

export function createMemoryAuditRecord(input: {
  siteUrl: string;
  industry: string;
  websiteGoal: string;
  report: AuditReport;
}): string {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  audits.set(id, {
    id,
    site_url: input.siteUrl,
    industry: input.industry,
    website_goal: input.websiteGoal,
    overall_score: input.report.overallScore,
    issue_count: input.report.issueCount,
    summary: input.report.summary,
    report: input.report,
    unlocked: false,
    lead_name: null,
    lead_email: null,
    lead_company: null,
    created_at: now,
  });

  return id;
}

export function getMemoryAuditRecord(id: string) {
  return audits.get(id) ?? null;
}

export function unlockMemoryAuditRecord(
  id: string,
  lead: { name: string; email: string; company: string },
) {
  const existing = audits.get(id);
  if (!existing) return null;

  const updated: MemoryAuditRecord = {
    ...existing,
    unlocked: true,
    lead_name: lead.name,
    lead_email: lead.email,
    lead_company: lead.company,
  };

  audits.set(id, updated);
  return updated;
}

export function memoryRecordToApiResponse(
  row: MemoryAuditRecord,
  preview = false,
): AuditApiResponse {
  return {
    auditId: row.id,
    siteUrl: row.site_url,
    industry: row.industry,
    websiteGoal: row.website_goal,
    overallScore: row.overall_score,
    issueCount: row.issue_count,
    summary: row.summary ?? row.report.summary,
    unlocked: row.unlocked,
    report: row.report,
    ...(preview && !row.unlocked ? {} : {}),
  };
}
