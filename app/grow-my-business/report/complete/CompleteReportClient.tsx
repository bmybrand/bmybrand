"use client";

import Footer from "@/components/footer";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import AuditNavbar from "@/components/AuditNavbar";

function normalizeSiteLabel(site: string) {
  if (!site) return "https://www.bakertilly.com/";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

function getHostname(site: string) {
  try {
    return new URL(site).hostname.replace(/^www\./, "");
  } catch {
    return site.replace(/^https?:\/\//i, "").replace(/^www\./, "");
  }
}

const jumpLinks = [
  { label: "Brand Positioning", href: "#brand-positioning" },
  { label: "Competitive Differentiation", href: "#competitive-differentiation" },
  { label: "Target Audience Alignment", href: "#target-audience-alignment" },
  { label: "Website Structure & Navigation", href: "#website-structure-navigation" },
  { label: "Trust & Credibility Signals", href: "#trust-credibility-signals" },
  { label: "Brand Consistency", href: "#brand-consistency" },
  { label: "Conversion & Growth Strategy", href: "#conversion-growth-strategy" },
  { label: "SEO & AEO Optimization", href: "#seo-aeo-optimization" },
  { label: "Technical & Metadata Health", href: "#technical-metadata-health" },
  { label: "Analytics & Tracking Setup", href: "#analytics-tracking-setup" },
];

function SectionScore({ score }: { score: number }) {
  return (
    <div className="inline-flex items-center rounded-[10px] bg-[#4A4B68] px-4 py-2 text-[16px] font-semibold leading-none text-white/90">
      <span>Score: {score}</span>
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
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-[linear-gradient(180deg,rgba(17,18,47,0)_0%,rgba(17,18,47,0.82)_58%,rgba(17,18,47,1)_100%)]" />
        )}
      </div>
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
    </>
  );
}

export default function CompleteReportClient({ site }: { site?: string }) {
  const [activeJumpHref, setActiveJumpHref] = useState(jumpLinks[0]?.href ?? "");
  const [showAllEffectivePractices, setShowAllEffectivePractices] = useState(false);
  const [showAllStructurePractices, setShowAllStructurePractices] = useState(false);
  const [showAllBrandConsistency, setShowAllBrandConsistency] = useState(false);
  const [showAllSeoPractices, setShowAllSeoPractices] = useState(false);
  const siteLabel = useMemo(() => normalizeSiteLabel(site ?? ""), [site]);
  const hostname = useMemo(() => getHostname(siteLabel), [siteLabel]);
  const previewSrc = useMemo(
    () => `/api/screenshot?site=${encodeURIComponent(siteLabel)}`,
    [siteLabel]
  );

  useEffect(() => {
    const sections = jumpLinks
      .map((item) => {
        const id = item.href.replace("#", "");
        return document.getElementById(id);
      })
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const activeId = visibleEntries[0]?.target.id;
        if (!activeId) return;

        setActiveJumpHref(`#${activeId}`);
      },
      {
        root: null,
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const effectivePractices = [
    "The homepage clearly presents advisory, tax, and assurance services, particularly for the finance and fintech audience.",
    "Service descriptions highlight key benefits such as risk reduction and customized solutions, aligning well with the needs of finance clients.",
    "The content focuses on tailored, specialized offerings, reflecting a custom approach for different client requirements.",
  ];

  const visibleEffectivePractices = showAllEffectivePractices
    ? effectivePractices
    : effectivePractices.slice(0, 2);

  const brandConsistencyPractices = [
    "Logo usage remains consistent across key areas such as the header and footer, reinforcing brand recognition.",
    "Brand colors are applied consistently throughout the website, creating a cohesive and unified visual identity.",
    "Typography is used consistently across pages, maintaining readability and a clear brand voice."
  ];
  const visibleBrandConsistencyPractices = showAllBrandConsistency
    ? brandConsistencyPractices
    : brandConsistencyPractices.slice(0, 2);

  const seoPractices = [
    "The About Us page is clearly linked and provides a structured overview of the company's mission, purpose, and overall positioning.",
    "Alt LM.txt file is present on the website, helping improve AI readability and ensuring better structured data accessibility.",
    "The content tone is consistent, professional, and insight-driven, focusing on real industry value rather than generic marketing language."
  ];
  const visibleSeoPractices = showAllSeoPractices
    ? seoPractices
    : seoPractices.slice(0, 2);

  const structurePractices = [
    "Industry-specific pages are well-structured and clearly represent key sectors, including Financial Services and related industries.",
    "Headings are consistently organized and follow a logical hierarchy that aligns with the overall homepage structure and user flow.",
    "A dedicated Services page is available, providing detailed descriptions of offerings to help users better understand the solutions available.",
  ];

  const visibleStructurePractices = showAllStructurePractices
    ? structurePractices
    : structurePractices.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#11122F] text-white">
      <div className="px-2">
        <AuditNavbar siteLabel={siteLabel} resultsBy="Brandsight" />

        <main className="mx-auto w-[90%] xl:w-[75%] pt-44 lg:pt-52">
          <section className="grid items-center gap-12 pb-16  lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.72fr)]">
            <div>
              <h1 className="text-[45px] leading-[1.05] text-white BenzinSemibold">
                Complete Audit Report
              </h1>

              <p className="mt-4 text-[16px] leading-7 text-[#A6ABCC]">
                You&apos;re off to a strong start. Now refine clarity, user flow, and
                performance for better results.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="min-h-[230px] rounded-[14px] bg-[#191A35] px-5 py-6">
                  <div className="text-[16px] leading-none text-white BenzinSemibold text-center w-full">
                    Your Site Score
                  </div>
                  <div className="mt-6 flex justify-center">
                    <div className="relative w-full" style={{height: '128px'}}>
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
                          strokeDasharray="64 36"
                        />
                      </svg>
                      <div className="absolute inset-x-0 bottom-[18px] text-center text-[20px] leading-none text-[#FF7A37] BenzinSemibold">
                        27/100
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#191A35] px-0 py-0 flex flex-col items-center overflow-hidden min-h-[230px]">
                  <div className="text-[16px] leading-none text-white BenzinSemibold text-center w-full mt-5">Current Status</div>
                  <div className="relative mt-3 w-full h-full flex flex-col items-center justify-center overflow-hidden" >
                    <img
                      src="/bmyb-grow-report-bottom-accent-01.svg"
                      alt="Caution triangle"
                      className="absolute left-1/2 top-0 min-w-[120%] min-h-[120%] -translate-x-1/2 object-cover"
                      style={{zIndex: 1, objectPosition: 'top'}}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                      <div className="text-[32px] leading-none text-[#FF7A37] BenzinSemibold">9+</div>
                      <div className="mt-2 text-center text-[13px] leading-none text-[#FF7A37] font-normal">issues found</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="relative overflow-hidden rounded-[12px] border border-[#3D447B] bg-[#1B1D44]">
                <img
                  src={previewSrc}
                  alt={`${hostname} preview`}
                  className="h-[240px] w-full object-cover sm:h-[260px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,28,0.04),rgba(10,12,28,0.4))]" />
                <div className="absolute inset-x-0 top-1/2 h-[46px] -translate-y-1/2 bg-[rgba(11,13,33,0.62)] backdrop-blur-[1.5px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2.5 text-[18px] text-white BenzinSemibold">
                    <img
                      src="/bmyb-tech-whitelogo-01.svg"
                      alt=""
                      className="h-6 w-6 object-contain brightness-0 invert"
                    />
                    <span>{hostname}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-[50px] lg:grid-cols-[minmax(0,1fr)_35%] lg:items-start">
            <div className="min-h-[520px] rounded-[18px] bg-[#151733]/35" />
            <aside className="w-full lg:row-span-2 lg:sticky lg:top-32 lg:self-start">
              <div className="w-full rounded-[14px] bg-[#191A35] p-5">
                <h2 className="text-[28px] leading-none text-white BenzinSemibold">Jump To:</h2>
                <div className="mt-6 space-y-6">
                  {jumpLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveJumpHref(item.href);

                        const section = document.getElementById(item.href.replace("#", ""));
                        section?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`flex items-center text-[16px] leading-none transition-colors hover:text-[#F45B25] ${
                        activeJumpHref === item.href ? "text-[#F45B25]" : "text-[#A6ABCC]"
                      }`}
                    >
                      {activeJumpHref === item.href ? (
                        <>
                          <img
                            src="/bmyb-logo-group1190-01.svg"
                            alt=""
                            className="mr-2 h-2.5 w-2.5 rotate-45 object-contain"
                          />
                          <span>{item.label}</span>
                        </>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-8 inline-flex h-[52px] w-full items-center justify-center rounded-[6px] bg-white text-[18px] text-[#191A35] BenzinSemibold"
                >
                  Bookmark this tab
                </button>
              </div>

              <div className="mt-5 rounded-[16px] bg-gradient-to-r from-[#F45B25] to-[#FF843E] p-5 text-white shadow-[0_20px_40px_rgba(244,91,37,0.24)]">
                <div className="flex -space-x-2">
                  <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#F45B25] bg-[#1B1D44]">
                    <img src="/bmyb-global-ai-01.png" alt="" className="h-full w-full object-cover" />
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#F45B25] bg-[#2D356B]">
                    <img src="/bmyb-tech-figma-01.png" alt="" className="h-full w-full object-cover" />
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#F45B25] bg-[#6A321E]">
                    <img src="/bmyb-tech-react-01.png" alt="" className="h-full w-full object-cover" />
                  </span>
                </div>
                <h3 className="mt-5 text-[24px] leading-[1.08] BenzinSemibold">
                  Improve What&apos;s Holding Your Website Back
                </h3>
                <p className="mt-4 text-[14px] leading-6 text-white/88">
                  Book a free consultation to review your audit and get expert recommendations tailored to your website.
                </p>
                <Link
                  href="/strategy-call"
                  className="mt-6 inline-flex h-[54px] items-center rounded-lg bg-white px-6 text-sm text-[#F45B25] transition-transform duration-200 hover:-translate-y-0.5 BenzinSemibold"
                >
                  Talk to our team
                </Link>
              </div>
            </aside>
            <div className="w-full">
              <h2 className="text-[38px] leading-none text-white BenzinSemibold sm:text-[45px]">
                Key Improvement Points
              </h2>

              <div className="mt-6 mb-10 rounded-[16px] bg-[#191A35] p-6 text-sm leading-8 text-[#A6ABCC]">
                <p className="text-[16px]">
                  This audit is powered by AI and built on a framework informed by 200+ successful Webflow projects delivered by Flow Ninja. It provides an overview of your website&apos;s current state and should be used as a starting point for identifying areas of improvement with your team.
                </p>
                <p className="mt-5 text-[16px]">
                  Please note that some discrepancies may occur, as the AI model is primarily trained on B2B websites and continues to improve with each completed audit.
                </p>
              </div>

              <div id="brand-positioning" className="scroll-mt-44 lg:scroll-mt-52 mt-12 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Brand Positioning
                </h2>
                <SectionScore score={9} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ExpandablePractices
                  items={effectivePractices}
                  expanded={showAllEffectivePractices}
                  onToggle={() => setShowAllEffectivePractices((value) => !value)}
                  checkColor="#22C55E"
                />
              </div>

              <div className="mt-4 rounded-[16px] border border-[#A84C2A] bg-[rgba(244,91,37,0.05)] p-6 text-[#F3D5C8]">
                <div className="inline-flex items-center rounded-full border border-[#A84C2A] px-3 py-0.5 text-[14px] text-[#F45B25] BenzinSemibold">
                  <span className="mr-2 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-[#F45B25]" />
                  How AI interprets your positioning?
                </div>
                <p className="mt-5 text-[16px] leading-8 text-[#F4E3D8]">
                  Your homepage messaging suggests that the company provides advisory, tax, and assurance services with a focus on finance and related sectors.
                </p>
              </div>

              <div id="competitive-differentiation" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Competitive Differentiation
                </h2>
                <SectionScore score={0} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    The current messaging lacks strong differentiation and does not clearly communicate what sets the company apart from competitors.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add a clear and concise homepage headline that communicates Baker Tilly&apos;s core value proposition for the finance/fintech audience.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Showcase distinct processes and approaches prominently on the homepage to better communicate differentiation.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Include a subtle competitor comparison section to demonstrate Baker Tilly&apos;s advantages within the finance/fintech industry.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Introduce clear mission and vision statements on the homepage or About page to strengthen brand identity.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add case studies that highlight successful finance/fintech client outcomes to reinforce differentiation.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Develop dedicated content comparing Baker Tilly with competitors while showcasing client success stories to clearly position its value.
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-[16px] border border-[#A84C2A] bg-[rgba(244,91,37,0.05)] p-6 text-[#F3D5C8]">
                <div className="inline-flex items-center rounded-full border border-[#A84C2A] px-3 py-0.5 text-[14px] text-[#F45B25] BenzinSemibold">
                  <span className="mr-2 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-[#F45B25]" />
                  How AI interprets your differentiation?
                </div>
                <p className="mt-5 text-[16px] leading-8 text-[#F4E3D8]">
                  Your messaging highlights differentiation through client-focused outcomes, emphasizing stronger insights, expanded capabilities, and a customer-centric approach.
                </p>
              </div>

              <div id="target-audience-alignment" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Target Audience Alignment
                </h2>
                <SectionScore score={8} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    The messaging strikes a balance between technical depth and accessibility, making it suitable for finance professionals and decision-makers.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Industry-specific pages are available, but audience segmentation by company size or role could be further improved.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Clearly highlight key finance/fintech audience pain points in your messaging to improve relevance and engagement.
                  </li>
                  <li className="flex items-start gap-2 border-t border-white/10 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Refine messaging to better address specific audience segments such as startups, enterprises, or decision-makers.
                  </li>
                  <li className="flex items-start gap-2 border-t border-white/10 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Tailor content to speak directly to different roles (e.g., CFOs, founders, finance managers) for stronger connection.
                  </li>
                  <li className="flex items-start gap-2 border-t border-white/10 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add dedicated sections or pages targeting specific audience needs and use cases.
                  </li>
                  <li className="flex items-start gap-2 border-t border-white/10 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Use more relatable, problem-focused language to align with real-world industry challenges.
                  </li>
                  <li className="flex items-start gap-2 border-t border-white/10 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Improve personalization by aligning messaging with different stages of the customer journey.
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-[16px] border border-[#A84C2A] bg-[rgba(244,91,37,0.05)] p-6 text-[#F3D5C8]">
                <div className="inline-flex items-center rounded-full border border-[#A84C2A] px-3 py-0.5 text-[14px] text-[#F45B25] BenzinSemibold">
                  <span className="mr-2 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-[#F45B25]" />
                  How AI interprets your target audience?
                </div>
                <p className="mt-5 text-[16px] leading-8 text-[#F4E3D8]">
                  Your messaging is primarily focused on finance professionals and decision-makers, including mid-market executives, private equity firms, and industry-specific leaders. It addresses key challenges such as complexity, compliance, and the need for tailored financial and advisory solutions.
                </p>
              </div>

              <div id="website-structure-navigation" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Website Structure &amp; Navigation
                </h2>
                <SectionScore score={9} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ExpandablePractices
                  items={structurePractices}
                  expanded={showAllStructurePractices}
                  onToggle={() => setShowAllStructurePractices((value) => !value)}
                  checkColor="#22C55E"
                />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add direct links to Pricing and Case Studies in the main navigation to improve accessibility and strengthen user flow for finance/fintech audiences.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Introduce a dedicated Pricing page with clear service tiers or tailored contact options to improve transparency and build trust.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Develop a Case Studies section highlighting finance/fintech success stories to enhance credibility and showcase real results.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Create a structured Blog or Resources hub with industry-focused content to support thought leadership and ongoing engagement.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Improve CTA visibility and consistency across the navigation, homepage, and footer to drive better user interaction and conversions.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Include quick-access links to Pricing and Case Studies in the footer to enhance navigation and overall user experience.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Refine page layouts to clearly communicate problem, solution, benefits, proof, and CTA, especially on key finance-focused pages.
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-[16px] border border-[#A84C2A] bg-[rgba(244,91,37,0.05)] p-6 text-[#F3D5C8]">
                <div className="inline-flex items-center rounded-full border border-[#A84C2A] px-3 py-0.5 text-[14px] text-[#F45B25] BenzinSemibold">
                  <span className="mr-2 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-[#F45B25]" />
                  How AI interprets your positioning?
                </div>
                <p className="mt-5 text-[16px] leading-8 text-[#F4E3D8]">
                  Your homepage messaging suggests that the company provides advisory, tax, and assurance services with a focus on finance and related sectors.
                </p>
              </div>

              <div id="trust-credibility-signals" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Trust &amp; Credibility Signals
                </h2>
                <SectionScore score={0} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    This area requires improvement, but there&apos;s a strong opportunity to enhance trust and credibility with the right additions.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add client testimonials across key areas of the website to build trust and strengthen credibility among finance/fintech audiences.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Distribute testimonials strategically on high-impact pages such as services, industries, and landing pages to reinforce confidence during decision-making.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Ensure testimonials include complete client details (name, role, and company) to improve authenticity and make the feedback more credible.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Incorporate client photos alongside testimonials to create a more personal, relatable, and trustworthy brand experience.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Introduce video testimonials to deliver more engaging, human-centered proof and enhance overall credibility.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Display client logos prominently throughout the website to showcase established relationships and reinforce brand authority.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Make client logos interactive by linking them to relevant case studies or testimonials, encouraging deeper user engagement.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add a dedicated section for press mentions, awards, and recognitions to highlight achievements and build stronger brand validation.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Include visible security certifications and compliance badges (e.g., SOC 2) to establish trust and reliability within the finance/fintech space.
                  </li>
                </ul>
              </div>

              <div id="brand-consistency" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Brand Consistency
                </h2>
                <SectionScore score={9} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ExpandablePractices
                  items={brandConsistencyPractices}
                  expanded={showAllBrandConsistency}
                  onToggle={() => setShowAllBrandConsistency((value) => !value)}
                  checkColor="#22C55E"
                />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Standardize CTA design, messaging, and placement across the website to ensure a consistent brand experience and improve user recognition in the finance/fintech space.
                  </li>
                </ul>
              </div>

              <div id="conversion-growth-strategy" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Conversion &amp; Growth Strategy
                </h2>
                <SectionScore score={0} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    The main navigation includes key actions like “Request a Proposal,” providing a clear entry point for user engagement.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Multiple conversion paths are available, including newsletter sign-ups and proposal requests, offering users different ways to take action.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Place clear and highly visible CTAs above the fold on key pages to capture attention early and drive conversions.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    When introducing a Pricing page, include action-oriented CTAs near each option to guide users toward the next step.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Maintain consistent CTA placement across all service pages to create a predictable and conversion-focused user journey.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Refine landing page headlines to better match finance/fintech user intent and improve engagement.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Include important landing pages in the main navigation to simplify access and enhance overall usability.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add targeted lead capture forms (e.g., whitepapers, demos) tailored to finance audiences to increase lead generation.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Use exit-intent pop-ups or banners with relevant insights or offers to reduce drop-offs and encourage conversions.
                  </li>
                </ul>
              </div>

              <div id="seo-aeo-optimization" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  SEO &amp; AEO Optimization
                </h2>
                <SectionScore score={0} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ExpandablePractices
                  items={seoPractices}
                  expanded={showAllSeoPractices}
                  onToggle={() => setShowAllSeoPractices((value) => !value)}
                  checkColor="#22C55E"
                />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Create a clearly structured blog or resource hub featuring finance/fintech content to strengthen SEO performance and build brand authority.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add FAQ sections with proper schema markup on key service pages to improve search visibility and enhance user experience.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Implement structured data (schema) for Organization, Articles, and Breadcrumbs to support better indexing and AI understanding.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Apply blog-specific schema such as Article and FAQ to improve search rankings and increase content discoverability.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Optimize content with clear, direct answers to common finance queries to target featured snippets and boost visibility.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Include “Key Takeaways” sections in long-form content to improve readability, user comprehension, and AI summarization.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Ensure all images include descriptive alt text to enhance accessibility and improve AI and search engine interpretation.
                  </li>
                  <li className="flex items-start gap-2 border-b border-white/10 py-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add a dedicated section highlighting awards, media mentions, and author expertise to build trust and authority.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Use canonical URLs across blog content to prevent duplication issues and maintain strong SEO performance.
                  </li>
                </ul>
              </div>

              <div id="technical-metadata-health" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Technical &amp; Metadata Health
                </h2>
                <SectionScore score={0} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    This area requires improvement, but it presents a strong opportunity to enhance overall SEO performance and technical visibility.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add a sitemap.xml file and ensure it is properly linked in the robots.txt file to improve search engine crawling and indexing efficiency.
                  </li>
                </ul>
              </div>

              <div id="analytics-tracking-setup" className="scroll-mt-44 lg:scroll-mt-52 mt-16 flex items-center justify-between gap-4">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Analytics &amp; Tracking Setup
                </h2>
                <SectionScore score={0} />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Effective Practices
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Google Tag Manager is properly installed, providing a solid foundation for managing tracking and marketing tags efficiently.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                  <span className="mr-2 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                  </span>
                  Improvement Opportunities
                </div>
                <ul className="pl-0">
                  <li className="flex items-start gap-2 border-b border-white/10 pb-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Set up Google Analytics 4 to collect detailed user data and enable deeper insights for performance and growth tracking.
                  </li>
                  <li className="flex items-start gap-2 pt-5 text-[16px]">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 8.5L6.5 12L13.5 5" stroke="#F45B25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Integrate heatmaps or session recording tools to better understand user behavior and identify opportunities for optimization.
                  </li>
                </ul>
              </div>

              <div className="mt-16">
                <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                  Share Audit Results:
                </h2>
                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6 pb-6">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#F45B25] text-white" aria-label="Share on Facebook">
                    <FaFacebookF className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#2A2C52] text-white" aria-label="Share on Instagram">
                    <FaInstagram className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#2A2C52] text-white" aria-label="Share on LinkedIn">
                    <FaLinkedinIn className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#2A2C52] text-white" aria-label="Share on X">
                    <FaXTwitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#2A2C52] text-white" aria-label="Share on YouTube">
                    <FaYoutube className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
