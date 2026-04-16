"use client";

const INDUSTRIES = [
  { label: "Healthcare", active: true },
  { label: "Non-Profit" },
  { label: "Sports" },
  { label: "Travel and Tourism" },
  { label: "Education" },
];

export default function IndustriesHero() {
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
            <button
              key={industry.label}
              className={`px-7 py-3 rounded-full border border-white/40 text-base md:text-lg BenzinSemibold transition-all duration-200 focus:outline-none ${
                industry.active
                  ? "bg-[#F45B25] text-white border-none shadow-lg"
                  : "bg-transparent text-white hover:bg-white/10"
              }`}
              tabIndex={0}
            >
              {industry.label}
            </button>
          ))}
        </div>
        <hr className="border-t border-white/10 mt-8" />
      </div>
    </section>
  );
}
