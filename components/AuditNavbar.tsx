"use client";

import Link from "next/link";

interface AuditNavbarProps {
  siteLabel: string;
  resultsBy?: string;
}

export default function AuditNavbar({ siteLabel, resultsBy = "Brandsight" }: AuditNavbarProps) {
  return (
    <header className="fixed top-7 left-1/2 z-[9999] w-[90%] -translate-x-1/2 rounded-2xl border-2 border-white/20 bg-[#FFFFFF]/5 backdrop-blur 2xl:w-[85%]">
      <div className="mx-auto flex items-center justify-between px-6 py-4 text-white/88 md:px-10">
        <Link href="/" className="shrink-0">
          <img
            src="/logo-animation-1.gif"
            alt="BmyBrand"
            className="h-9 w-auto cursor-pointer object-contain sm:h-10 lg:h-[39px] 2xl:h-[43px]"
          />
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-white/64">
          <div>
            Results by <span className="text-white BenzinSemibold">{resultsBy}</span>
          </div>
          <div className="inline-flex h-[36px] items-center gap-2 rounded-xl border border-[#3A3B61] bg-[#202143] px-3 text-[0.78rem] text-white/88">
            <img src="/bmyb-global-globe-01.svg" alt="" className="h-4 w-4 object-contain" />
            <span className="max-w-[20rem] truncate">{siteLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
