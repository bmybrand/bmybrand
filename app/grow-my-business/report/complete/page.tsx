import CompleteReportClient from "./CompleteReportClient";

export default async function CompleteAuditReportPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const params = await searchParams;

  return <CompleteReportClient site={params.site} />;
}
