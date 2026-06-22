function CheckIcon({ color }: { color: string }) {
  return (
    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
        <path
          d="M2.5 8.5L6.5 12L13.5 5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function AuditPracticeList({
  items,
  variant,
}: {
  items: string[];
  variant: "positive" | "improvement";
}) {
  const color = variant === "positive" ? "#22C55E" : "#F45B25";

  if (!items.length) {
    return null;
  }

  return (
    <ul className="pl-0">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const itemClass = isFirst
          ? isLast
            ? "flex items-start gap-2 text-[16px]"
            : "flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]"
          : isLast
            ? "flex items-start gap-2 pt-5 text-[16px]"
            : "flex items-start gap-2 border-b border-white/10 py-5 text-[16px]";

        return (
          <li key={`${index}-${item.slice(0, 24)}`} className={itemClass}>
            <CheckIcon color={color} />
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export function SectionScore({ score }: { score: number }) {
  return (
    <div className="inline-flex items-center rounded-[10px] bg-[#4A4B68] px-4 py-2 text-[16px] font-semibold leading-none text-white/90">
      <span>Score: {score}</span>
    </div>
  );
}
