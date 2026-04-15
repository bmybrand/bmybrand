'use client'

import Link from 'next/link'

export default function HealthcareHero() {
  return (
    <div className="mx-auto flex w-[90%] 2xl:w-[85%] flex-col items-center text-center py-16">
      <h1 className="BenzinSemibold text-white text-[2.2rem] leading-[1.16] sm:text-[3rem] lg:text-[4.1rem]">
        Full-Service Healthcare Marketing
        <br />
        &amp; Digital Solutions Built for
        <br />
        Growth-Driven Organizations
      </h1>

      <p className="mt-5 max-w-5xl text-sm sm:text-base lg:text-lg leading-5 sm:leading-6 lg:leading-8 text-white/60">
        Healthcare marketing requires more than design. It demands trust, clarity, compliance, and performance.
        Patients make critical decisions online, and your digital presence must communicate credibility instantly.
        At BMYBrand, we combine brand strategy, UX design, and AI-powered systems to create healthcare platforms
        that build trust and drive measurable growth.
      </p>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row BenzinSemibold">
        <Link
          href="/contact"
          className="bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2"
        >
          <div className="bg-white p-4 rounded-lg">
            <img src="/group1190.svg" alt="" className="w-4 h-4" />
          </div>
          <span className="px-2">Get Started Now</span>
        </Link>

        <Link
          href="/case-studies"
          className="border border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex justify-center items-center gap-2"
        >
          <div className="bg-white p-4 rounded-lg">
            <img src="/group119.svg" alt="" className="w-4 h-4" />
          </div>
          <span className="px-2">Explore Our Work</span>
        </Link>
      </div>
    </div>
  )
}
