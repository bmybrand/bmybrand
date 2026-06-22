import AnalyzingClient from "./AnalyzingClient";

export default async function AuditAnalyzingPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string; industry?: string; goal?: string }>;
}) {
  const params = await searchParams;

  return (
    <AnalyzingClient
      site={params.site}
      industry={params.industry}
      websiteGoal={params.goal}
    />
  );
}
