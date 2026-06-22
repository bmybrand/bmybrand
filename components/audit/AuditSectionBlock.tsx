"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { AuditSection } from "@/types/audit";
import { AuditPracticeList } from "./AuditPracticeList";

function SectionScoreBadge({ score }: { score: number }) {
  const displayScore = score * 10;
  return (
    <div className="inline-flex items-center rounded-[10px] bg-[#4A4B68] px-4 py-2 text-[16px] font-semibold leading-none text-white/90">
      <span>{displayScore}/100</span>
    </div>
  );
}

function ExpandablePractices({
  items,
  expanded,
  onToggle,
  checkColor,
  collapsedCount = 2,
}: {
  items: string[];
  expanded: boolean;
  onToggle: () => void;
  checkColor: string;
  collapsedCount?: number;
}) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [heights, setHeights] = useState({ collapsed: 0, expanded: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const entries = Array.from(list.children) as HTMLElement[];
    const collapsed = entries
      .slice(0, Math.min(collapsedCount, entries.length))
      .reduce((total, item) => total + item.offsetHeight, 0);

    setHeights({
      collapsed,
      expanded: list.scrollHeight,
    });
  }, [items, collapsedCount, expanded]);

  const lastVisibleIndex = expanded
    ? items.length - 1
    : Math.min(collapsedCount, items.length) - 1;

  return (
    <>
      <div
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{
          maxHeight: expanded ? `${heights.expanded}px` : `${heights.collapsed}px`,
        }}
      >
        <ul ref={listRef} className="pl-0">
          {items.map((item, index) => {
            const itemClass =
              index === 0
                ? index === lastVisibleIndex
                  ? "flex items-start gap-2 text-[16px]"
                  : "flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]"
                : index === lastVisibleIndex
                  ? "flex items-start gap-2 pt-5 text-[16px]"
                  : "flex items-start gap-2 border-b border-white/10 py-5 text-[16px]";

            return (
              <li key={item} className={itemClass}>
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M2.5 8.5L6.5 12L13.5 5" stroke={checkColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            );
          })}
        </ul>
        {!expanded && items.length > collapsedCount && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-[linear-gradient(180deg,rgba(17,18,47,0)_0%,rgba(17,18,47,0.82)_58%,rgba(17,18,47,1)_100%)]" />
        )}
      </div>
      {items.length > collapsedCount ? (
        <button
          type="button"
          onClick={onToggle}
          className="mt-7 inline-flex items-center gap-2 text-[16px] text-[#F45B25]"
        >
          <span>{expanded ? "View Less" : "View More"}</span>
          <img
            src="/bmyb-logo-group1190-01.svg"
            alt=""
            className={`h-2.5 w-2.5 object-contain transition-transform duration-500 ease-in-out ${
              expanded ? "-rotate-45" : "rotate-45"
            }`}
          />
        </button>
      ) : null}
    </>
  );
}

type AuditSectionBlockProps = {
  section: AuditSection;
  index: number;
  expandable?: boolean;
  expanded?: boolean;
  onToggleExpand?: () => void;
  aiInterpretationLabel?: string;
};

export function AuditSectionBlock({
  section,
  index,
  expandable = false,
  expanded = false,
  onToggleExpand,
  aiInterpretationLabel,
}: AuditSectionBlockProps) {
  return (
    <article className="mt-16 first:mt-0">
      <div
        id={section.id}
        className="scroll-mt-44 lg:scroll-mt-52 flex items-center justify-between gap-4"
      >
        <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
          {index + 1}. {section.title}
        </h2>
        <SectionScoreBadge score={section.score} />
      </div>

      {section.effectivePractices.length > 0 ? (
        <div className="mt-6 rounded-[16px] border border-[#1B1D44] bg-[#151733]/60 p-6 text-sm leading-7 text-[#A6ABCC]">
          <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max uppercase tracking-wide">
            <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            </span>
            Good News
          </div>
          {expandable && onToggleExpand ? (
            <ExpandablePractices
              items={section.effectivePractices}
              expanded={expanded}
              onToggle={onToggleExpand}
              checkColor="#22C55E"
            />
          ) : (
            <AuditPracticeList items={section.effectivePractices} variant="positive" />
          )}
        </div>
      ) : null}

      {section.improvementOpportunities.length > 0 ? (
        <div className="mt-6 rounded-[16px] border border-[#1B1D44] bg-[#151733]/60 p-6 text-sm leading-7 text-[#A6ABCC]">
          <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max uppercase tracking-wide">
            <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
            </span>
            Attention
          </div>
          <AuditPracticeList
            items={section.improvementOpportunities}
            variant="improvement"
          />
        </div>
      ) : null}

      {section.aiInterpretation ? (
        <div className="mt-4 rounded-[16px] border border-[#A84C2A] bg-[rgba(244,91,37,0.05)] p-6 text-[#F3D5C8]">
          <div className="inline-flex items-center rounded-full border border-[#A84C2A] px-3 py-0.5 text-[14px] text-[#F45B25] BenzinSemibold">
            <span className="mr-2 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-[#F45B25]" />
            {aiInterpretationLabel ?? "AI Recommendation"}
          </div>
          <p className="mt-5 text-[16px] leading-8 text-[#F4E3D8]">
            {section.aiInterpretation}
          </p>
        </div>
      ) : null}
    </article>
  );
}
