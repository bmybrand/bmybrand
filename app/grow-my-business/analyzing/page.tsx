import AnalyzingClient from "./AnalyzingClient";

export default async function AuditAnalyzingPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const params = await searchParams;

  return <AnalyzingClient site={params.site} />;
}
