import { redirect } from "next/navigation";

import ReportClient from "./ReportClient";

export default async function AuditReportPage({
  searchParams,
}: {
  searchParams: Promise<{
    auditId?: string;
    site?: string;
    industry?: string;
    goal?: string;
  }>;
}) {
  const params = await searchParams;

  if (!params.auditId && params.site) {
    const query = new URLSearchParams({
      site: params.site,
      industry: params.industry || "other",
      goal: params.goal || "generate-leads",
    });
    redirect(`/grow-my-business/analyzing?${query.toString()}`);
  }

  return (
    <ReportClient
      auditId={params.auditId}
      site={params.site}
    />
  );
}
