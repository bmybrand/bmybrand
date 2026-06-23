import {
  createMemoryAuditRecord,
  getMemoryAuditRecord,
  isSupabaseConfigured,
  unlockMemoryAuditRecord,
} from "@/lib/audit/memory-store";
import { normalizeAuditSummary } from "@/lib/audit/summary";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { AuditApiResponse, AuditReport, AuditReportRow } from "@/types/audit";

const TABLE = "audit_reports";

type CreateAuditInput = {
  siteUrl: string;
  industry: string;
  websiteGoal: string;
  report: AuditReport;
};

type UnlockLeadInput = {
  name: string;
  email: string;
  company: string;
};

function rowToApiResponse(row: AuditReportRow): AuditApiResponse {
  const summary = normalizeAuditSummary(row.summary ?? row.report.summary);
  return {
    auditId: row.id,
    siteUrl: row.site_url,
    industry: row.industry,
    websiteGoal: row.website_goal,
    overallScore: row.overall_score,
    issueCount: row.issue_count,
    summary,
    unlocked: row.unlocked,
    report: {
      ...row.report,
      summary,
    },
  };
}

function buildPreviewReport(report: AuditReport): AuditReport {
  const previewSectionIds = new Set([
    "brand-positioning",
    "competitive-differentiation",
  ]);

  return {
    ...report,
    sections: report.sections.map((section) => {
      if (previewSectionIds.has(section.id)) {
        return section;
      }
      return {
        ...section,
        effectivePractices: [],
        improvementOpportunities: [],
        aiInterpretation: undefined,
      };
    }),
  };
}

function formatResponse(row: AuditReportRow): AuditApiResponse {
  const response = rowToApiResponse(row);

  if (!row.unlocked) {
    response.report = buildPreviewReport(row.report);
  }

  return response;
}

export async function createAuditReport(
  input: CreateAuditInput,
): Promise<string> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured — storing audit in memory for this dev session.");
    return createMemoryAuditRecord(input);
  }

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .insert({
      site_url: input.siteUrl,
      industry: input.industry,
      website_goal: input.websiteGoal,
      overall_score: input.report.overallScore,
      issue_count: input.report.issueCount,
      summary: input.report.summary,
      report: input.report,
      unlocked: false,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to save audit report to Supabase:", error?.message);
    throw new Error(error?.message ?? "Failed to save audit report.");
  }

  return data.id as string;
}

export async function getAuditReport(
  id: string,
): Promise<AuditApiResponse | null> {
  if (!isSupabaseConfigured()) {
    const row = getMemoryAuditRecord(id);
    return row ? formatResponse(row) : null;
  }

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load audit report from Supabase:", error.message);
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return formatResponse(data as AuditReportRow);
}

export async function unlockAuditReport(
  id: string,
  lead: UnlockLeadInput,
): Promise<AuditApiResponse | null> {
  if (!isSupabaseConfigured()) {
    const row = unlockMemoryAuditRecord(id, lead);
    return row ? formatResponse(row) : null;
  }

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update({
      unlocked: true,
      lead_name: lead.name,
      lead_email: lead.email,
      lead_company: lead.company,
    })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Failed to unlock audit report in Supabase:", error.message);
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return formatResponse(data as AuditReportRow);
}

export async function saveAuditLeadToLeadsTable(lead: {
  name: string;
  email: string;
  company: string;
  siteUrl: string;
  auditId: string;
}) {
  if (!isSupabaseConfigured()) {
    return;
  }

  const { error } = await supabaseAdmin.from("leads").insert({
    first_name: lead.name.split(" ")[0] ?? lead.name,
    last_name: lead.name.split(" ").slice(1).join(" ") || "—",
    email: lead.email,
    phone: "",
    service: "website_audit",
    message: `Website audit unlock for ${lead.siteUrl} (auditId: ${lead.auditId}, company: ${lead.company})`,
    form_type: "website_audit",
    access_page: "/grow-my-business/report",
  });

  if (error) {
    console.warn("Failed to save audit lead to leads table:", error.message);
  }
}
