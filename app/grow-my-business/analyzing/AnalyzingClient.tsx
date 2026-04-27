"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const progressStops = [14, 21, 32, 41, 53, 61, 68];

function normalizeSiteLabel(site: string) {
  if (!site) return "https://www.mrclean.com/en-us";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

export default function AnalyzingClient({ site }: { site?: string }) {
  const router = useRouter();
  const siteLabel = useMemo(() => normalizeSiteLabel(site ?? ""), [site]);
  const [progress, setProgress] = useState(progressStops[0]);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [runLogoOutro, setRunLogoOutro] = useState(false);
  const [logoHidden, setLogoHidden] = useState(false);
  const [runPreviewFlash, setRunPreviewFlash] = useState(false);
  const [previewDimmed, setPreviewDimmed] = useState(false);
  const [canRevealPreview, setCanRevealPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const sequenceStartedRef = useRef(false);
  const shouldRevealPreview = canRevealPreview && (previewLoaded || previewFailed);
  const previewSrc = useMemo(
    () => `/api/screenshot?site=${encodeURIComponent(siteLabel)}`,
    [siteLabel]
  );

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      if (index >= progressStops.length) {
        window.clearInterval(timer);
        return;
      }
      setProgress(progressStops[index]);
    }, 420);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (sequenceStartedRef.current) return;

    sequenceStartedRef.current = true;

    const logoTimer = window.setTimeout(() => {
      setRunLogoOutro(true);
    }, 3000);

    const previewShowTimer = window.setTimeout(() => {
      setCanRevealPreview(true);
    }, 3000);

    const logoHideTimer = window.setTimeout(() => {
      setLogoHidden(true);
    }, 4450);

    const previewFlashTimer = window.setTimeout(() => {
      setRunPreviewFlash(true);
    }, 5200);

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
      window.setTimeout(() => {
        setPreviewDimmed(false);
      }, 420);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [runPreviewFlash]);

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      router.push(`/grow-my-business/report?site=${encodeURIComponent(siteLabel)}`);
    }, 7600);

    return () => window.clearTimeout(redirectTimer);
  }, [router, siteLabel]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#11122F]">
      <div className="mx-auto w-[90%] 2xl:w-[85%] px-2 py-6">
        <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-2xl border border-[#3A3B61] bg-[#1A1B3D] px-6 py-3 text-white/88">
          <Link href="/" className="shrink-0">
            <img src="/bmyb-logo-bmylogo-01.svg" alt="BMYBrand" className="h-7 w-auto object-contain" />
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-white/64">
            <div>
              Results by <span className="text-white BenzinSemibold">Foresight</span>
            </div>
            <div className="inline-flex h-[36px] items-center gap-2 rounded-xl border border-[#3A3B61] bg-[#202143] px-3 text-[0.78rem] text-white/88">
              <img src="/bmyb-global-globe-01.svg" alt="" className="h-4 w-4 object-contain" />
              <span className="max-w-[20rem] truncate">{siteLabel}</span>
            </div>
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col items-center justify-center py-10 text-center">
          <h1 className="text-[35px] leading-none text-white BenzinSemibold">
            Analyzing Your Website
          </h1>

          <p className="mt-5 text-[1.02rem] text-[#9EA2C5]">
            Checking clarity, structure, and conversion opportunities...
          </p>

          <div className="mt-6 w-full max-w-[17rem]">
            <div className="h-[7px] overflow-hidden rounded-full bg-[#2A2B47]">
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
                    alt="BMYBrand Logo"
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

              <div className="pointer-events-none absolute left-[12%] top-[13%] h-4 w-4 rounded-full bg-[#7A81FF]/70 blur-[1.5px] shadow-[0_0_22px_8px_rgba(122,129,255,0.32)] z-30" style={{ animation: "dotFade 2.8s ease-in-out infinite", animationDelay: "0s" }} />
              <div className="pointer-events-none absolute right-[14%] top-[32%] h-3.5 w-3.5 rounded-full bg-[#7A81FF]/60 blur-[1.5px] shadow-[0_0_18px_7px_rgba(122,129,255,0.26)] z-30" style={{ animation: "dotFade 2.8s ease-in-out infinite", animationDelay: "0.7s" }} />
              <div className="pointer-events-none absolute left-[22%] bottom-[18%] h-3 w-3 rounded-full bg-[#7A81FF]/50 blur-[1.5px] shadow-[0_0_14px_6px_rgba(122,129,255,0.22)] z-30" style={{ animation: "dotFade 2.8s ease-in-out infinite", animationDelay: "1.4s" }} />
              <div className="pointer-events-none absolute right-[18%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-[#7A81FF]/40 blur-[1.5px] shadow-[0_0_10px_5px_rgba(122,129,255,0.18)] z-30" style={{ animation: "dotFade 2.8s ease-in-out infinite", animationDelay: "2.1s" }} />

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
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(98,85,196,0.18),rgba(53,45,110,0.26))] mix-blend-screen" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/6" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#11122F]/18 to-transparent" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[16px] z-30" style={{ boxShadow: "inset 0 0 36px 8px rgba(122,129,255,0.22)" }} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
