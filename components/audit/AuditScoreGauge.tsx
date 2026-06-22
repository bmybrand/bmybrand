export function getScoreArcDasharray(score: number) {
  const clamped = Math.max(0, Math.min(100, score));
  return `${clamped} ${100 - clamped}`;
}

export function AuditScoreGauge({
  score,
  className = "",
}: {
  score: number;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`} style={{ height: "128px" }}>
      <svg
        viewBox="0 0 190 128"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M 5 118 A 90 90 0 0 1 185 118"
          fill="none"
          stroke="#2E315F"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M 5 118 A 90 90 0 0 1 185 118"
          fill="none"
          stroke="#FF7A37"
          strokeWidth="26"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray={getScoreArcDasharray(score)}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-[18px] text-center text-[20px] leading-none text-[#FF7A37] BenzinSemibold">
        {score}/100
      </div>
    </div>
  );
}

export function AuditIssueCount({ count }: { count: number }) {
  return (
    <>
      <div className="text-[32px] leading-none text-[#FF7A37] BenzinSemibold">
        {count}+
      </div>
      <div className="mt-2 text-center text-[13px] leading-none text-[#FF7A37] font-normal">
        issues found
      </div>
    </>
  );
}
