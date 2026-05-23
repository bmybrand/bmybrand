"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-[#11122F]">
      <div className="mx-auto w-[90%] px-2 pt-4 xl:w-[75%]">
        <header className="mx-auto w-full">
          <Navbar />
        </header>

        <main className="flex min-h-screen items-center justify-center pt-24 pb-16">
          <section className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur md:px-10 md:py-14">
            <div className="mx-auto inline-flex items-center rounded-full border border-[#F45B25]/30 bg-[#F45B25]/10 px-4 py-2 text-sm text-[#FFB08A]">
              Coming Soon
            </div>
            <h1 className="BenzinSemibold mt-6 text-3xl text-white md:text-5xl">
              This Page Is Under Construction
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              We&apos;re still building this section. Check back soon for updates, or explore the rest of the site in the meantime.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
