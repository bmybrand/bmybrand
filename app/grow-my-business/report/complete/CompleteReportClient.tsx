"use client";

import Footer from "@/components/footer";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";

import AuditNavbar from "@/components/AuditNavbar";
import { AuditDetailsPanel } from "@/components/audit/AuditDetailsPanel";
import { AuditRadarChart } from "@/components/audit/AuditRadarChart";
import { AuditSectionBlock } from "@/components/audit/AuditSectionBlock";
import { AuditIssueCount, AuditScoreGauge } from "@/components/audit/AuditScoreGauge";
import { useAuditReport } from "@/lib/audit/use-audit-report";
import { AUDIT_SECTION_IDS, AUDIT_SECTION_TITLES } from "@/types/audit";

function getHostname(site: string) {
  try {
    return new URL(site).hostname.replace(/^www\./, "");
  } catch {
    return site.replace(/^https?:\/\//i, "").replace(/^www\./, "");
  }
}

const jumpLinks = AUDIT_SECTION_IDS.map((id) => ({
  label: AUDIT_SECTION_TITLES[id],
  href: `#${id}`,
}));

const expandableSectionIds = new Set([
  "brand-positioning",
  "website-structure-navigation",
  "brand-consistency",
  "seo-aeo-optimization",
]);

const aiInterpretationLabels: Record<string, string> = {
  "brand-positioning": "How AI interprets your positioning?",
  "competitive-differentiation": "How AI interprets your differentiation?",
  "target-audience-alignment": "How AI interprets your target audience?",
  "website-structure-navigation": "How AI interprets your site structure?",
  "trust-credibility-signals": "How AI interprets your trust signals?",
  "conversion-growth-strategy": "How AI interprets your conversion strategy?",
  "seo-aeo-optimization": "How AI interprets your SEO & AEO?",
};

export default function CompleteReportClient({ auditId }: { auditId?: string }) {
  const { data, loading, error } = useAuditReport(auditId);
  const [activeJumpHref, setActiveJumpHref] = useState(jumpLinks[0]?.href ?? "");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const siteLabel = data?.siteUrl ?? "";
  const hostname = useMemo(() => getHostname(siteLabel), [siteLabel]);
  const previewSrc = useMemo(
    () => (siteLabel ? `/api/screenshot?site=${encodeURIComponent(siteLabel)}` : ""),
    [siteLabel],
  );

  useEffect(() => {
    const sections = jumpLinks
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveJumpHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#11122F] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[20px] text-[#A6ABCC]">Loading your complete audit report...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#11122F] text-white">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-[32px] BenzinSemibold">Report unavailable</h1>
          <p className="mt-4 text-[18px] leading-8 text-[#A6ABCC]">
            {error ?? "We could not load this audit report."}
          </p>
          <Link
            href="/grow-my-business"
            className="mt-8 inline-flex h-[52px] items-center rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-8 text-white BenzinSemibold"
          >
            Start a new audit
          </Link>
        </main>
      </div>
    );
  }

  if (!data.unlocked) {
    return (
      <div className="min-h-screen bg-[#11122F] text-white">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-[32px] BenzinSemibold">Full report locked</h1>
          <p className="mt-4 text-[18px] leading-8 text-[#A6ABCC]">
            Complete the unlock form to access your full audit report.
          </p>
          <Link
            href={`/grow-my-business/report?auditId=${encodeURIComponent(data.auditId)}`}
            className="mt-8 inline-flex h-[52px] items-center rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-8 text-white BenzinSemibold"
          >
            Unlock report
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11122F] text-white print:bg-white print:text-black">
      <div className="px-2 print:hidden">
        <AuditNavbar siteLabel={siteLabel} resultsBy="Brandsight" />
      </div>

      <main className="mx-auto w-[90%] xl:w-[75%] pt-44 lg:pt-52 print:pt-8 print:w-full print:max-w-none">
        {/* Hero */}
        <section className="grid items-start gap-10 pb-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.72fr)] lg:gap-12">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-[#F45B25] BenzinSemibold">
              Brandsight AI Audit
            </p>
            <h1 className="mt-3 text-[42px] leading-[1.05] text-white BenzinSemibold sm:text-[45px]">
              Complete Audit Report
            </h1>
            <p className="mt-4 max-w-[38rem] text-[16px] leading-7 text-[#A6ABCC]">
              {data.summary}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="min-h-[230px] rounded-[14px] border border-[#2A2D4A] bg-[#191A35] px-5 py-6">
                <div className="text-center text-[16px] leading-none text-white BenzinSemibold">
                  Your Site Score
                </div>
                <div className="mt-6 flex justify-center">
                  <AuditScoreGauge score={data.overallScore} />
                </div>
              </div>

              <div className="flex min-h-[230px] flex-col items-center overflow-hidden rounded-[14px] border border-[#2A2D4A] bg-[#191A35]">
                <div className="mt-5 w-full text-center text-[16px] leading-none text-white BenzinSemibold">
                  Current Status
                </div>
                <div className="relative mt-3 flex h-full w-full flex-col items-center justify-center overflow-hidden">
                  <img
                    src="/bmyb-grow-report-bottom-accent-01.svg"
                    alt=""
                    className="absolute left-1/2 top-0 min-h-[120%] min-w-[120%] -translate-x-1/2 object-cover"
                    style={{ zIndex: 1, objectPosition: "top" }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center py-8">
                    <AuditIssueCount count={data.issueCount} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {previewSrc ? (
            <div className="w-full">
              <div className="relative overflow-hidden rounded-[12px] border border-[#3D447B] bg-[#1B1D44] shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                <img
                  src={previewSrc}
                  alt={`${hostname} preview`}
                  className="h-[240px] w-full object-cover object-top sm:h-[280px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,28,0.04),rgba(10,12,28,0.45))]" />
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
          ) : null}
        </section>

        {/* Radar + Details */}
        <section className="grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-stretch">
          <AuditRadarChart sections={data.report.sections} />
          <AuditDetailsPanel
            siteUrl={siteLabel}
            hostname={hostname}
            industry={data.industry}
            websiteGoal={data.websiteGoal}
            issueCount={data.issueCount}
            overallScore={data.overallScore}
            auditId={data.auditId}
          />
        </section>

        {/* Findings + Sidebar */}
        <section className="grid gap-[50px] border-t border-white/8 pt-14 lg:grid-cols-[minmax(0,1fr)_35%] lg:items-start">
          <div className="w-full">
            <h2 className="text-[38px] leading-none text-white BenzinSemibold sm:text-[45px]">
              Key Improvement Points
            </h2>

            <div className="mt-6 mb-12 rounded-[16px] border border-[#2A2D4A] bg-[#191A35] p-6 text-sm leading-8 text-[#A6ABCC]">
              <p className="text-[16px]">
                This audit is powered by AI and built on a framework informed by 200+ successful
                Webflow projects. It provides an overview of your website&apos;s current state and
                should be used as a starting point for identifying areas of improvement with your
                team.
              </p>
              <p className="mt-5 text-[16px]">
                Each section below highlights what&apos;s working well (Good News), what needs
                attention, and AI-driven recommendations tailored to your industry and goals.
              </p>
            </div>

            <div className="space-y-2">
              {data.report.sections.map((section, index) => (
                <AuditSectionBlock
                  key={section.id}
                  section={section}
                  index={index}
                  expandable={expandableSectionIds.has(section.id)}
                  expanded={expandedSections[section.id] ?? false}
                  onToggleExpand={() =>
                    setExpandedSections((current) => ({
                      ...current,
                      [section.id]: !current[section.id],
                    }))
                  }
                  aiInterpretationLabel={aiInterpretationLabels[section.id]}
                />
              ))}
            </div>

            <div className="mt-16 print:hidden">
              <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                Share Audit Results
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

          <aside className="h-fit w-full lg:sticky lg:top-32 lg:self-start print:hidden">
            <div className="w-full rounded-[14px] border border-[#2A2D4A] bg-[#191A35] p-5">
              <h2 className="text-[28px] leading-none text-white BenzinSemibold">Jump To:</h2>
              <nav className="mt-6 space-y-5">
                {jumpLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveJumpHref(item.href);
                      document.getElementById(item.href.replace("#", ""))?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`flex items-center text-[15px] leading-snug transition-colors hover:text-[#F45B25] ${
                      activeJumpHref === item.href ? "text-[#F45B25]" : "text-[#A6ABCC]"
                    }`}
                  >
                    {activeJumpHref === item.href ? (
                      <>
                        <img
                          src="/bmyb-logo-group1190-01.svg"
                          alt=""
                          className="mr-2 h-2.5 w-2.5 shrink-0 rotate-45 object-contain"
                        />
                        <span>{item.label}</span>
                      </>
                    ) : (
                      <span className="pl-4">{item.label}</span>
                    )}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => window.print()}
                className="mt-8 inline-flex h-[52px] w-full items-center justify-center rounded-[6px] border border-white/15 bg-transparent text-[16px] text-white BenzinSemibold transition-colors hover:bg-white/5"
              >
                Bookmark / Print Report
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
                Book a free consultation to review your audit and get expert recommendations
                tailored to your website.
              </p>
              <Link
                href="/strategy-call"
                className="mt-6 inline-flex h-[54px] items-center rounded-lg bg-white px-6 text-sm text-[#F45B25] transition-transform duration-200 hover:-translate-y-0.5 BenzinSemibold"
              >
                Talk to our team
              </Link>
            </div>
          </aside>
        </section>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
