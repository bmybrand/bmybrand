"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const INDUSTRIES = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Food", href: "/industries/food" },
  { label: "Non-Profit", href: "/industries/non-profit" },
  { label: "Sports", href: "/industries/sports" },
  { label: "Travel and Tourism", href: "/industries/travel-and-tourism" },
  { label: "Education", href: "/industries/education" },
];

export default function IndustriesHero() {
  const pathname = usePathname()

  return (
    <section className="w-full bg-[#11122F] py-12 md:py-16">
      <div className="w-[90%] 2xl:w-[75%] mx-auto">
        <h2 className="text-center text-white BenzinSemibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-8">
          Tailored Solutions For The<br />Way You Work
        </h2>
        <hr className="border-t border-white/10 mb-6" />
        <div className="text-center text-white/80 mb-4 font-medium">Industries</div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {INDUSTRIES.map((industry, idx) => (
            <Link
              key={industry.label}
              href={industry.href}
              className={`px-7 py-3 rounded-full border border-white/40 text-base md:text-lg BenzinSemibold transition-all duration-200 focus:outline-none ${
                pathname === industry.href
                  ? "bg-[#F45B25] text-white border-none shadow-lg"
                  : "bg-transparent text-white hover:bg-white/10"
              }`}
            >
              {industry.label}
            </Link>
          ))}
        </div>
        <hr className="border-t border-white/10 mt-8" />
      </div>
    </section>
  );
}
