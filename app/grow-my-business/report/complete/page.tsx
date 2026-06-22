import CompleteReportClient from "./CompleteReportClient";

export default async function CompleteAuditReportPage({
  searchParams,
}: {
  searchParams: Promise<{ auditId?: string }>;
}) {
  const params = await searchParams;

  return <CompleteReportClient auditId={params.auditId} />;
}
