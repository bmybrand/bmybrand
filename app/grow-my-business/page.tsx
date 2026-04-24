"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Brandsspec from "@/components/brandsspec";
import Evaluate from "@/components/evaluatcta";
import HealthcareSpotlight from "@/components/industries/healthcare/healthcare-spotlight";
import HealthcareStories from "@/components/industries/healthcare/healthcare-stories";
import Logobar from "@/components/logobar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function GrowMyBusinessPage() {
  const router = useRouter();
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [websiteGoal, setWebsiteGoal] = useState("");
  const canStartAudit = industry !== "" && websiteGoal !== "";

  const resolveAuditSiteInput = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return trimmedValue;

    try {
      const normalizedValue = /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
      const parsedUrl = new URL(normalizedValue);

      if (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1") {
        const currentOrigin = window.location.origin;
        return `${currentOrigin}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }

      return normalizedValue;
    } catch {
      return trimmedValue;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!website.trim()) return;
    setAuditModalOpen(true);
  };

  const handleAuditStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canStartAudit) return;
    setSubmitted(true);
    setAuditModalOpen(false);
    const resolvedSite = resolveAuditSiteInput(website);
    router.push(`/grow-my-business/analyzing?site=${encodeURIComponent(resolvedSite)}`);
  };

  useEffect(() => {
    if (!auditModalOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [auditModalOpen]);

  return (
    <div className="min-h-screen bg-[#11122F]">
      <div className="mx-auto w-[90%] 2xl:w-[75%] px-2 py-8">
        <header className="mx-auto max-w-7xl">
          <Navbar />
        </header>

        <main className="mx-auto max-w-7xl pt-20 lg:pt-24">
          <section className="flex min-h-[calc(100vh-8rem)] items-center py-0 lg:min-h-[calc(100vh-8rem)]">
            <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.82fr)] lg:items-center">
              <div className="max-w-[44rem]">
                <div className="inline-flex h-[39px] items-center gap-2 rounded-md border border-[#2A2B47] bg-[#1B1C3A] px-3 text-[0.72rem] text-white/88">
                  <span className="inline-flex h-5 items-center rounded bg-[#F45B25] px-1.5 py-0.5">
                    <img src="/bmyb-logo-clutch-01.svg" alt="Clutch" className="h-3.5 w-auto object-contain brightness-0 invert" />
                  </span>
                  <span className="flex items-center gap-1 text-white" aria-hidden="true">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </span>
                  <span className="text-white/92">4.9</span>
                </div>

                <h1 className="mt-6 max-w-[13ch] text-[45px] leading-[1.04] text-white BenzinSemibold">
                  Smarter Insights To Power Better Website Performance &amp; Growth
                </h1>

                <p className="mt-5 max-w-[34rem] text-sm leading-8 text-[#9EA2C5] sm:text-base">
                  From strategy and design to development and optimization, we provide everything your website
                  needs to grow with clarity, consistency, and performance. Instead of juggling multiple
                  partners, you get one experienced team focused on building a stronger digital presence.
                </p>
              </div>

              <div className="max-w-[25rem]">
                <div className="inline-flex h-[39px] items-center gap-2 rounded-md border border-[#2A2B47] bg-[#1B1C3A] px-3 text-[0.72rem] text-white/88">
                  <span className="text-white/85">✦</span>
                  <span>Free Audit</span>
                </div>

                <h2 className="mt-6 max-w-[12ch] text-[45px] leading-[1.05] text-white BenzinSemibold">
                  Get An AI-Powered Website Audit
                </h2>

                <p className="mt-4 max-w-[24rem] text-sm leading-7 text-[#9EA2C5] sm:text-base">
                  Foresight is BMYBrand&apos;s AI-powered website audit tool designed to help brands uncover
                  performance gaps, improve user experience, and drive better results.
                </p>

                <form onSubmit={handleSubmit} className="mt-7">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Type your website address"
                      className="h-14 flex-1 rounded-lg border border-[#2A2B47] bg-[#1B1C3A] px-4 text-white placeholder:text-white/28 outline-none transition-colors focus:border-[#F45B25]"
                    />
                    <button
                      type="submit"
                      className="h-14 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-7 text-white transition-all duration-200 hover:brightness-110 BenzinSemibold"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-sm leading-6 text-[#9EA2C5]">
                  <span className="text-[#F45B25]">Free website audit.</span>{" "}
                  {submitted ? "Request received. We&apos;ll send it shortly." : "Sent to your inbox in 2 minutes."}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className="pb-16 lg:pb-20">
        <Logobar />
      </div>
      <div className="[&>section>div]:2xl:w-[75%]">
        <HealthcareStories />
      </div>
      <div className="[&>section>div]:2xl:w-[75%]">
        <HealthcareSpotlight />
      </div>
      <Evaluate />
      <Brandsspec />
      <Footer />

      {auditModalOpen ? (
        <div className="fixed inset-0 z-[10020] flex items-center justify-center bg-[#0E1026]/78 px-4 py-8 backdrop-blur-sm">
          <div
            className="relative mx-auto w-full max-w-[42rem] max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[24px] border border-[#2A2B47] bg-[#25264B] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] [::-webkit-scrollbar]:hidden sm:max-h-[calc(100vh-5rem)] sm:px-8 sm:py-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              type="button"
              onClick={() => setAuditModalOpen(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#17183B] transition-transform duration-200 hover:scale-[1.03]"
              aria-label="Close audit form"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="inline-flex h-[39px] items-center gap-2 rounded-xl border border-[#3A3B61] bg-[#2B2C54] px-4 text-[0.8rem] text-white/90">
              <span className="text-white/85">Foresight™</span>
            </div>

            <h2 className="mt-6 max-w-[15ch] text-[35px] leading-[1.03] text-white BenzinSemibold">
              Help Us Personalize Your Report With Some Quick Questions
            </h2>

            <form onSubmit={handleAuditStart} className="mt-8">
              <label className="block">
                <span className="mb-2 block text-[20px] text-white BenzinRegular">What Industry Does Your Business Operate In?*</span>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="h-14 w-full appearance-none rounded-xl border border-[#3A3B61] bg-[#292A52] px-4 pr-12 text-white outline-none transition-colors focus:border-[#F45B25]"
                  >
                    <option value="" disabled className="text-[#11122F]">
                      Choose your Industry
                    </option>
                    <option value="healthcare">Healthcare</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                    <option value="education">Education</option>
                    <option value="finance">Finance</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </label>

              <label className="mt-5 block">
                <span className="mb-2 block text-[20px] text-white BenzinRegular">What Is The Primary Goal Of Your Website?*</span>
                <div className="relative">
                  <select
                    value={websiteGoal}
                    onChange={(e) => setWebsiteGoal(e.target.value)}
                    className="h-14 w-full appearance-none rounded-xl border border-[#3A3B61] bg-[#292A52] px-4 pr-12 text-white outline-none transition-colors focus:border-[#F45B25]"
                  >
                    <option value="" disabled className="text-[#11122F]">
                      Choose your website goal
                    </option>
                    <option value="generate-leads">Generate leads</option>
                    <option value="sell-products">Sell products</option>
                    <option value="book-appointments">Book appointments</option>
                    <option value="build-awareness">Build brand awareness</option>
                    <option value="improve-conversions">Improve conversions</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </label>

              <button
                type="submit"
                disabled={!canStartAudit}
                className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:brightness-100 BenzinSemibold"
              >
                Start Website Audit
              </button>

              <p className="mt-4 text-center text-sm leading-6 text-[#9EA2C5]">
                <span className="text-[#F45B25]">Free website audit.</span> Sent to your inbox in 2 minutes.
              </p>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
