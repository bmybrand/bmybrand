import ReportClient from "./ReportClient";

export default async function AuditReportPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const params = await searchParams;

  return <ReportClient site={params.site} />;
}
