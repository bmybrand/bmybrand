"use client";

type AuditDetailsPanelProps = {
  siteUrl: string;
  hostname: string;
  industry: string | null;
  websiteGoal: string | null;
  issueCount: number;
  overallScore: number;
  auditId: string;
};

function formatLabel(value: string | null) {
  if (!value) return "—";
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AuditDetailsPanel({
  siteUrl,
  hostname,
  industry,
  websiteGoal,
  issueCount,
  overallScore,
  auditId,
}: AuditDetailsPanelProps) {
  const auditDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDownloadPdf = () => {
    const encodedAuditId = encodeURIComponent(auditId);
    window.location.href = `/api/audit/${encodedAuditId}/pdf`;
  };

  const details = [
    { label: "Website", value: hostname },
    { label: "Full URL", value: siteUrl },
    { label: "Audit Date", value: auditDate },
    { label: "Industry", value: formatLabel(industry) },
    { label: "Website Goal", value: formatLabel(websiteGoal) },
    { label: "Overall Score", value: `${overallScore}/100` },
    { label: "Issues Found", value: `${issueCount}+` },
    { label: "Report ID", value: auditId.slice(0, 8) },
  ];

  return (
    <div className="flex h-full min-h-full flex-col rounded-[18px] border border-[#2A2D4A] bg-[#191A35] p-6 sm:p-7">
      <div>
        <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[26px]">Details</h2>
        <p className="mt-2 text-[14px] text-[#9EA2C5]">
          Audit metadata and export options
        </p>
      </div>

      <dl className="mt-5 flex-1 space-y-3">
        {details.map((item) => (
          <div key={item.label} className="border-b border-white/8 pb-3 last:border-0 last:pb-0">
            <dt className="text-[12px] uppercase tracking-wide text-[#7E83A8]">
              {item.label}
            </dt>
            <dd className="mt-1 break-all text-[15px] leading-6 text-white">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={handleDownloadPdf}
        className="mt-6 inline-flex h-[52px] w-full shrink-0 items-center justify-center rounded-[8px] bg-white text-[16px] text-[#191A35] BenzinSemibold transition-transform hover:-translate-y-0.5"
      >
        Download PDF
      </button>
    </div>
  );
}
