"use client";

import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import AuditNavbar from "@/components/AuditNavbar";
import { AuditPracticeList, SectionScore } from "@/components/audit/AuditPracticeList";
import { AuditIssueCount, AuditScoreGauge } from "@/components/audit/AuditScoreGauge";
import { useAuditReport } from "@/lib/audit/use-audit-report";
import { getAuditIdForSite } from "@/lib/audit/session";

function getHostname(site: string) {
  try {
    return new URL(site).hostname.replace(/^www\./, "");
  } catch {
    return site.replace(/^https?:\/\//i, "").replace(/^www\./, "");
  }
}

function ReportUnlockModal({
  open,
  onClose,
  onUnlock,
  submitting,
  error,
}: {
  open: boolean;
  onClose: () => void;
  onUnlock: (values: { name: string; email: string; company: string }) => void;
  submitting: boolean;
  error: string | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  if (!open) return null;

  const highlights = [
    {
      title: "Uncover Hidden Issues",
      description: "Identify What's Limiting Your Website's Performance",
    },
    {
      title: "Prioritized Fixes",
      description: "Know Exactly What To Improve First For Maximum Impact",
    },
    {
      title: "Benchmark Your Site",
      description: "See How You Compare Against Industry Standards",
    },
    {
      title: "Actionable Roadmap",
      description: "Clear Next Steps To Improve UX, SEO, And Conversions",
    },
    {
      title: "Outperform Competitors",
      description: "Discover Gaps And Opportunities To Stay Ahead",
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUnlock({ name: name.trim(), email: email.trim(), company: company.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D21]/82 px-3 py-5 backdrop-blur-md">
      <div className="relative w-full max-w-[1160px] overflow-hidden rounded-[14px] border border-[#24274A] bg-[#232448] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-9 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#232448] transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4l8 8M12 4 4 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid gap-10 px-6 py-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] md:px-7 md:py-6">
          <div>
            <h3 className="max-w-[20ch] text-[28px] leading-[1.2] text-white BenzinSemibold">
              Your Full Audit Report Is Ready
            </h3>
            <p className="mt-2 max-w-[29rem] text-[18px] leading-8 text-[#A6ABCC]">
              Complete one quick step to unlock your detailed website audit
              and actionable growth insights.
            </p>

            <form className="mt-4 space-y-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-[20px] text-white BenzinRegular">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Alex Carter"
                  required
                  className="h-10 w-full rounded-[6px] border border-[#34375E] bg-[#25274B] px-4 text-[12px] text-white outline-none transition-colors placeholder:text-white/42 focus:border-[#F45B25]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[20px] text-white BenzinRegular">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="alex@company.com"
                  required
                  className="h-10 w-full rounded-[6px] border border-[#34375E] bg-[#25274B] px-4 text-[12px] text-white outline-none transition-colors placeholder:text-white/42 focus:border-[#F45B25]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[20px] text-white BenzinRegular">Company Name*</label>
                <input
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Company Inc."
                  required
                  className="h-10 w-full rounded-[6px] border border-[#34375E] bg-[#25274B] px-4 text-[12px] text-white outline-none transition-colors placeholder:text-white/42 focus:border-[#F45B25]"
                />
              </div>
              {error ? (
                <p className="text-sm text-[#F45B25]">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="mt-3 inline-flex h-[54px] w-full items-center justify-center rounded-[6px] bg-[#FF7A37] px-5 text-[20px] text-white BenzinSemibold transition-all duration-300 hover:brightness-105 disabled:opacity-60"
              >
                {submitting ? "Unlocking..." : "Unlock Full Report"}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center pt-12 md:pt-[4.8rem]">
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[2px] bg-[#FF7A37] text-[#171934]">
                    <svg viewBox="0 0 16 16" className="h-[10px] w-[10px]" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M3.5 8.5 6.5 11.5 12.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[16px] leading-7 text-[#A6ABCC]">
                    <span className="font-semibold text-white">{item.title}</span>
                    <span className="text-[#8F93B3]"> - {item.description}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportClient({
  auditId: auditIdProp,
  site,
}: {
  auditId?: string;
  site?: string;
}) {
  const router = useRouter();
  const [resolvedAuditId, setResolvedAuditId] = useState<string | undefined>(auditIdProp);
  const [resolvedIdReady, setResolvedIdReady] = useState(Boolean(auditIdProp));

  useEffect(() => {
    if (auditIdProp) {
      setResolvedAuditId(auditIdProp);
      setResolvedIdReady(true);
      return;
    }

    if (site) {
      const stored = getAuditIdForSite(site);
      if (stored) {
        setResolvedAuditId(stored);
        router.replace(`/grow-my-business/report?auditId=${encodeURIComponent(stored)}`);
      }
    }

    setResolvedIdReady(true);
  }, [auditIdProp, router, site]);

  const { data, loading, error } = useAuditReport(resolvedAuditId);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const siteLabel = data?.siteUrl ?? "";
  const hostname = useMemo(() => getHostname(siteLabel), [siteLabel]);
  const previewSrc = useMemo(
    () => (siteLabel ? `/api/screenshot?site=${encodeURIComponent(siteLabel)}` : ""),
    [siteLabel],
  );

  const positioningSection = data?.report.sections.find(
    (section) => section.id === "brand-positioning",
  );
  const differentiationSection = data?.report.sections.find(
    (section) => section.id === "competitive-differentiation",
  );

  useEffect(() => {
    if (!isReportModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsReportModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isReportModalOpen]);

  const handleUnlock = async (values: {
    name: string;
    email: string;
    company: string;
  }) => {
    if (!resolvedAuditId) return;

    setUnlocking(true);
    setUnlockError(null);

    try {
      const response = await fetch(`/api/audit/${resolvedAuditId}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to unlock report.");
      }

      router.push(`/grow-my-business/report/complete?auditId=${encodeURIComponent(resolvedAuditId)}`);
    } catch (unlockFailure) {
      setUnlockError(
        unlockFailure instanceof Error
          ? unlockFailure.message
          : "Failed to unlock report.",
      );
    } finally {
      setUnlocking(false);
    }
  };

  useEffect(() => {
    if (data?.unlocked && resolvedAuditId) {
      router.replace(`/grow-my-business/report/complete?auditId=${encodeURIComponent(resolvedAuditId)}`);
    }
  }, [resolvedAuditId, data?.unlocked, router]);

  if (!resolvedIdReady || (resolvedAuditId && loading)) {
    return (
      <div className="min-h-screen bg-[#11122F] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[20px] text-[#A6ABCC]">Loading your audit report...</p>
        </div>
      </div>
    );
  }

  if (!resolvedAuditId) {
    return (
      <div className="min-h-screen bg-[#11122F] text-white">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-[32px] BenzinSemibold">No audit report found</h1>
          <p className="mt-4 text-[18px] leading-8 text-[#A6ABCC]">
            Start a new audit from the grow-my-business page to generate a dynamic AI report.
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

  if (data.unlocked) {
    return (
      <div className="min-h-screen bg-[#11122F] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[20px] text-[#A6ABCC]">Redirecting to full report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11122F] text-white">
      <ReportUnlockModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onUnlock={handleUnlock}
        submitting={unlocking}
        error={unlockError}
      />
      <div className="px-2">
        <AuditNavbar siteLabel={siteLabel} resultsBy="Bmybrand" />
        <div className="relative bg-[#11122F] mx-auto w-[90%] xl:w-[75%]">
          <main className="pt-44 lg:pt-52">
            <section className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(290px,0.72fr)] lg:items-start">
              <div className="max-w-[45rem] pt-1">
                <h1 className="max-w-[13ch] text-[45px] leading-[1.08] text-white BenzinSemibold">
                  Key Issues Identified May Impact User Experience &amp; Overall Performance
                </h1>

                <p className="mt-3 max-w-[31rem] text-[16px] leading-6 text-[#A6ABCC] sm:text-[16px]">
                  {data.summary}
                </p>

                <div className="mt-6 mb-8 flex flex-col gap-4 BenzinSemibold sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)]"
                  >
                    <div className="rounded-lg bg-white p-4">
                      <img src="/bmyb-logo-group1190-01.svg" alt="" className="h-4 w-4" />
                    </div>
                    <span className="px-2">Access full report</span>
                  </button>
                  <Link
                    href="/strategy-call"
                    className="flex items-center justify-center gap-2 rounded-lg border border-white px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    <div className="rounded-lg bg-white p-4">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#11122F"/>
                      </svg>
                    </div>
                    <span className="px-2">Free Consultation</span>
                  </Link>
                </div>
              </div>

              <div className="grid max-w-[380px] gap-5 sm:grid-cols-2 lg:max-w-[420px]">
                <div className="rounded-[14px] bg-[#191A35] px-3 py-6">
                  <div className="text-[16px] leading-none text-white BenzinSemibold text-center w-full">Your Site Score</div>
                  <div className="mt-4 flex justify-center">
                    <AuditScoreGauge score={data.overallScore} className="h-[128px] w-[190px]" />
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#191A35] px-0 py-0 flex flex-col items-center overflow-hidden">
                  <div className="text-[16px] leading-none text-white BenzinSemibold text-center w-full mt-5">Current Status</div>
                  <div className="relative mt-3 w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <img
                      src="/bmyb-grow-report-bottom-accent-01.svg"
                      alt="Caution triangle"
                      className="absolute left-1/2 top-0 min-w-[120%] min-h-[120%] -translate-x-1/2 object-cover"
                      style={{ zIndex: 1, objectPosition: "top" }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-8">
                      <AuditIssueCount count={data.issueCount} />
                    </div>
                  </div>
                </div>

                {previewSrc ? (
                  <div className="sm:col-span-2">
                    <div className="relative overflow-hidden rounded-[12px] border border-[#3D447B] bg-[#1B1D44]">
                      <img
                        src={previewSrc}
                        alt={`${hostname} preview`}
                        className="h-[180px] w-full object-cover sm:h-[200px]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,28,0.04),rgba(10,12,28,0.4))]" />
                      <div className="absolute inset-x-0 top-1/2 h-[46px] -translate-y-1/2 bg-[rgba(11,13,33,0.62)] backdrop-blur-[1.5px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2.5 text-[18px] text-white BenzinSemibold">
                          <img src="/bmyb-tech-whitelogo-01.svg" alt="" className="h-6 w-6 object-contain brightness-0 invert" />
                          <span>{hostname}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="mt-16 flex flex-col gap-[50px] lg:flex-row lg:items-start">
              <div className="w-full lg:w-[65%]">
                <h2 className="text-[38px] leading-none text-white BenzinSemibold sm:text-[45px]">
                  Report Preview
                </h2>

                <div className="mt-6 mb-6 rounded-[16px] bg-[#191A35] p-6 text-sm leading-7 text-[#A6ABCC]">
                  <p className="text-[16px]">
                    Below is a preview of your website audit. To access the full report, click on{" "}
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="text-[#F45B25] hover:underline"
                    >
                      &quot;Access full report&quot;
                    </button>{" "}
                    and complete a short form.
                  </p>
                </div>

                {positioningSection ? (
                  <>
                    <div className="mt-15 flex items-center justify-between gap-4">
                      <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                        Positioning
                      </h2>
                      <SectionScore score={positioningSection.score} />
                    </div>
                    <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                      <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                        <span className="mr-2 flex h-2 w-2 items-center justify-center">
                          <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                        </span>
                        Effective Practices
                      </div>
                      <AuditPracticeList items={positioningSection.effectivePractices} variant="positive" />
                    </div>
                    {positioningSection.improvementOpportunities.length > 0 ? (
                      <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                        <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                          <span className="mr-2 flex h-2 w-2 items-center justify-center">
                            <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                          </span>
                          Improvement Opportunities
                        </div>
                        <AuditPracticeList
                          items={positioningSection.improvementOpportunities}
                          variant="improvement"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}

                {differentiationSection ? (
                  <>
                    <div className="mt-15 flex items-center justify-between gap-4">
                      <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[28px]">
                        Differentiation
                      </h2>
                      <SectionScore score={differentiationSection.score} />
                    </div>
                    <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                      <div className="mt-1 mb-7 flex items-center rounded-full border border-[#22C55E] px-3 py-0.5 text-[#22C55E] bg-[#11122F] text-[17px] font-semibold w-max">
                        <span className="mr-2 flex h-2 w-2 items-center justify-center">
                          <span className="block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                        </span>
                        Observations
                      </div>
                      <AuditPracticeList
                        items={differentiationSection.effectivePractices}
                        variant="positive"
                      />
                    </div>
                    {differentiationSection.improvementOpportunities.length > 0 ? (
                      <div className="mt-6 rounded-[16px] border border-[#1B1D44] p-6 text-sm leading-7 text-[#A6ABCC]">
                        <div className="mt-1 mb-7 flex items-center rounded-full border border-[#F45B25] px-3 py-0.5 text-[#F45B25] bg-[#11122F] text-[17px] font-semibold w-max">
                          <span className="mr-2 flex h-2 w-2 items-center justify-center">
                            <span className="block h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
                          </span>
                          Improvement Opportunities
                        </div>
                        <AuditPracticeList
                          items={differentiationSection.improvementOpportunities}
                          variant="improvement"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}

                <div className="mt-6 mb-6 overflow-hidden rounded-[16px] bg-[#191A35]">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                    <div className="w-full p-6 py-7 xl:w-[55%] xl:pl-6">
                      <h3 className="text-[18px] leading-[1.15] text-white BenzinSemibold sm:text-[24px]">
                        Unlock Your Full Website Audit
                      </h3>
                      <p className="mt-4 text-[16px] leading-8 text-[#A6ABCC]">
                        Unlock a detailed audit report with category scores, performance insights, UX findings, and actionable next steps tailored to your website.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsReportModalOpen(true)}
                        className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] BenzinSemibold"
                      >
                        <div className="rounded-lg bg-white p-4">
                          <img src="/bmyb-logo-group1190-01.svg" alt="" className="h-4 w-4" />
                        </div>
                        <span className="px-3">Access Full Report</span>
                      </button>
                    </div>
                    <div className="relative hidden h-[220px] w-full shrink-0 self-end overflow-hidden xl:block xl:w-[45%]">
                      <img
                        src="/bmyb-grow-report-cta-visual-01.svg"
                        alt="Website audit preview"
                        className="h-full w-full object-contain object-right-bottom"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <aside className="h-fit w-full lg:sticky lg:top-32 lg:w-[35%] lg:self-start">
                <div className="rounded-[16px] bg-gradient-to-r from-[#F45B25] to-[#FF843E] p-5 text-white shadow-[0_20px_40px_rgba(244,91,37,0.24)]">
                  <h3 className="mt-2 text-[24px] leading-[1.08] BenzinSemibold">
                    Improve What&apos;s Holding Your Website Back
                  </h3>
                  <p className="mt-4 text-[14px] leading-6 text-white/88">
                    Book a free consultation to review your audit and get expert recommendations tailored to your website.
                  </p>
                  <Link
                    href="/strategy-call"
                    className="mt-6 inline-flex h-[54px] items-center rounded-lg bg-white px-6 text-sm text-[#F45B25] transition-transform duration-200 hover:-translate-y-0.5 BenzinSemibold"
                  >
                    Talk To Our Team
                  </Link>
                </div>
              </aside>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
