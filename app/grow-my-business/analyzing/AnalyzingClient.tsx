"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuditNavbar from "@/components/AuditNavbar";
import { saveAuditIdForSite } from "@/lib/audit/session";

const progressStops = [14, 21, 32, 41, 53, 61, 68, 76, 84, 92, 98];
const DEFAULT_INDUSTRY = "other";
const DEFAULT_WEBSITE_GOAL = "generate-leads";

function normalizeSiteLabel(site: string) {
  if (!site) return "";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

export default function AnalyzingClient({
  site,
  industry,
  websiteGoal,
}: {
  site?: string;
  industry?: string;
  websiteGoal?: string;
}) {
  const router = useRouter();
  const siteLabel = useMemo(() => normalizeSiteLabel(site ?? ""), [site]);
  const resolvedIndustry = industry?.trim() || DEFAULT_INDUSTRY;
  const resolvedWebsiteGoal = websiteGoal?.trim() || DEFAULT_WEBSITE_GOAL;
  const [progress, setProgress] = useState(progressStops[0]);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [runLogoOutro, setRunLogoOutro] = useState(false);
  const [logoHidden, setLogoHidden] = useState(false);
  const [runPreviewFlash, setRunPreviewFlash] = useState(false);
  const [previewDimmed, setPreviewDimmed] = useState(false);
  const [canRevealPreview, setCanRevealPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const sequenceStartedRef = useRef(false);
  const auditStartedRef = useRef(false);
  const shouldRevealPreview = canRevealPreview && (previewLoaded || previewFailed);
  const previewSrc = useMemo(
    () => `/api/screenshot?site=${encodeURIComponent(siteLabel)}`,
    [siteLabel],
  );

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      if (!isGenerating) return;
      index += 1;
      if (index >= progressStops.length - 1) {
        window.clearInterval(timer);
        return;
      }
      setProgress(progressStops[index]);
    }, 1200);

    return () => window.clearInterval(timer);
  }, [isGenerating]);

  useEffect(() => {
    if (sequenceStartedRef.current) return;
    sequenceStartedRef.current = true;

    const logoTimer = window.setTimeout(() => setRunLogoOutro(true), 3000);
    const previewShowTimer = window.setTimeout(() => setCanRevealPreview(true), 3000);
    const logoHideTimer = window.setTimeout(() => setLogoHidden(true), 4450);
    const previewFlashTimer = window.setTimeout(() => setRunPreviewFlash(true), 5200);

    return () => {
      window.clearTimeout(logoTimer);
      window.clearTimeout(previewShowTimer);
      window.clearTimeout(logoHideTimer);
      window.clearTimeout(previewFlashTimer);
    };
  }, []);

  useEffect(() => {
    if (!shouldRevealPreview) return;
    setShowPreview(true);
  }, [shouldRevealPreview]);

  useEffect(() => {
    if (!runPreviewFlash) return;

    const interval = window.setInterval(() => {
      setPreviewDimmed(true);
      window.setTimeout(() => setPreviewDimmed(false), 420);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [runPreviewFlash]);

  useEffect(() => {
    if (auditStartedRef.current) return;
    if (!siteLabel) {
      setError("Missing website URL. Please start again from the audit page.");
      setIsGenerating(false);
      return;
    }

    auditStartedRef.current = true;

    async function runAudit() {
      try {
        const response = await fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site: siteLabel,
            industry: resolvedIndustry,
            websiteGoal: resolvedWebsiteGoal,
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload.error ?? "Audit generation failed.");
        }

        saveAuditIdForSite(siteLabel, payload.auditId);

        setProgress(100);
        setIsGenerating(false);

        window.setTimeout(() => {
          router.replace(`/grow-my-business/report?auditId=${encodeURIComponent(payload.auditId)}`);
        }, 800);
      } catch (auditError) {
        setIsGenerating(false);
        setError(
          auditError instanceof Error
            ? auditError.message
            : "Audit generation failed.",
        );
      }
    }

    runAudit();
  }, [resolvedIndustry, resolvedWebsiteGoal, router, siteLabel]);

  if (error) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#11122F]">
        <AuditNavbar siteLabel={siteLabel || "Website audit"} resultsBy="Brandsight" />
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-28 text-center">
          <h1 className="text-[32px] text-white BenzinSemibold">Audit could not be completed</h1>
          <p className="mt-4 text-[18px] leading-8 text-[#9EA2C5]">{error}</p>
          <Link
            href="/grow-my-business"
            className="mt-8 inline-flex h-[52px] items-center rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-8 text-white BenzinSemibold"
          >
            Try again
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#11122F]">
      <AuditNavbar siteLabel={siteLabel} resultsBy="Brandsight" />

      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center pt-28 lg:pt-36 pb-10 text-center">
        <h1 className="text-[35px] leading-none text-white BenzinSemibold">
          Analyzing Your Website
        </h1>

        <p className="mt-5 text-[24px] text-[#9EA2C5]">
          Checking clarity, structure, and conversion opportunities...
        </p>

        <div className="mt-8 w-full max-w-[32rem]">
          <div className="h-[8px] overflow-hidden rounded-full bg-[#2A2B47]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="relative mt-16 w-full max-w-[56rem]">
          <style>{`
            @keyframes previewPan {
              0% { transform: translateY(0); }
              50% { transform: translateY(calc(30rem - 100%)); }
              100% { transform: translateY(0); }
            }
            @keyframes scannerSweep {
              0% { top: 0; opacity: 0.42; }
              50% { top: calc(100% - 4px); opacity: 0.78; }
              100% { top: 0; opacity: 0.42; }
            }
            @keyframes scannerGlowDown {
              0% { top: 4px; opacity: 0.9; }
              50% { top: calc(100% - 4px); opacity: 0; }
              100% { top: 4px; opacity: 0.9; }
            }
            @keyframes scannerGlowUp {
              0% { top: calc(-1 * 8.5rem); opacity: 0; }
              50% { top: calc(100% - 4px - 8.5rem); opacity: 0.9; }
              100% { top: calc(-1 * 8.5rem); opacity: 0; }
            }
            @keyframes logoOutro {
              0% { opacity: 0.58; transform: scale(1); }
              28% { opacity: 0.96; transform: scale(1.03); }
              100% { opacity: 0; transform: scale(1.06); }
            }
            @keyframes dotFade {
              0%, 100% { opacity: 0.92; }
              50% { opacity: 0.32; }
            }
          `}</style>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-[124%] -translate-x-1/2 overflow-visible">
            <div
              className="absolute left-1/2 h-[8.5rem] w-[102%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(146,152,255,0.5)_0%,rgba(146,152,255,0.26)_34%,rgba(146,152,255,0)_100%)] blur-[14px]"
              style={{ animation: "scannerGlowDown 5.8s ease-in-out infinite" }}
            />
            <div
              className="absolute left-1/2 h-[8.5rem] w-[102%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(146,152,255,0)_0%,rgba(146,152,255,0.26)_66%,rgba(146,152,255,0.5)_100%)] blur-[14px]"
              style={{ animation: "scannerGlowUp 5.8s ease-in-out infinite" }}
            />
            <div
              className="absolute left-1/2 h-[5px] w-full -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(122,129,255,0),rgba(137,142,255,0.95)_14%,rgba(161,165,255,1)_50%,rgba(137,142,255,0.95)_86%,rgba(122,129,255,0))] shadow-[0_0_18px_rgba(132,138,255,0.9),0_0_42px_rgba(132,138,255,0.5)]"
              style={{ animation: "scannerSweep 5.8s ease-in-out infinite" }}
            />
          </div>
          <div className="relative overflow-hidden rounded-[16px] border border-[#474A86] bg-[radial-gradient(circle_at_top,rgba(122,129,255,0.32),rgba(26,27,61,0.94)_50%,rgba(20,21,47,1)_100%)]">
            {!logoHidden || runPreviewFlash ? (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <img
                  src="/bmyb-logo-bmylogo-01.svg"
                  alt="BmyBrand Logo"
                  className="w-32 h-32 opacity-60"
                  style={
                    !logoHidden
                      ? runLogoOutro
                        ? { animation: "logoOutro 1.4s ease-out forwards" }
                        : undefined
                      : { opacity: 0.6 }
                  }
                />
              </div>
            ) : null}

            <div
              className="relative z-20"
              style={{
                opacity: showPreview ? (previewDimmed ? 0 : 1) : 0,
                willChange: "opacity",
                transition: runPreviewFlash ? "opacity 420ms ease-out" : "opacity 450ms ease-out",
              }}
            >
              <div className="relative w-full max-w-[60rem]">
                <div className="relative h-[30rem] w-full overflow-hidden rounded-[18px] border border-[#50539A] bg-[#1B1D44] shadow-[0_18px_36px_rgba(8,10,26,0.45)]">
                  {!previewLoaded && !previewFailed ? (
                    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,#20234d_0%,#2b2e5e_50%,#20234d_100%)]" />
                  ) : null}
                  {!previewFailed ? (
                    <img
                      src={previewSrc}
                      alt="Website preview"
                      className="absolute left-0 top-0 h-auto w-full max-w-none"
                      style={{ animation: "previewPan 24s ease-in-out infinite" }}
                      onLoad={() => {
                        setPreviewLoaded(true);
                        setPreviewFailed(false);
                      }}
                      onError={() => {
                        setPreviewLoaded(false);
                        setPreviewFailed(true);
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1B1D44] px-8 text-center">
                      <div>
                        <div className="text-lg text-white BenzinSemibold">Preview unavailable</div>
                        <p className="mt-3 text-sm leading-7 text-[#9EA2C5]">
                          Screenshot preview could not be generated for this site.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
