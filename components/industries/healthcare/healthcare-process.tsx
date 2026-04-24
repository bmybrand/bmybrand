'use client'

import Link from 'next/link'

const processSteps = [
  {
    title: 'Discovery & Strategy',
    description:
      'We analyze your services, audience, and compliance needs to define a clear strategy and positioning.',
    icon: (
      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
        <path d="M19.4 15a1 1 0 00.2 1.1l.1.1a1.8 1.8 0 01-2.5 2.5l-.1-.1a1 1 0 00-1.1-.2 1 1 0 00-.6.9V20a1.8 1.8 0 01-3.6 0v-.2a1 1 0 00-.6-.9 1 1 0 00-1.1.2l-.1.1a1.8 1.8 0 01-2.5-2.5l.1-.1a1 1 0 00.2-1.1 1 1 0 00-.9-.6H4a1.8 1.8 0 010-3.6h.2a1 1 0 00.9-.6 1 1 0 00-.2-1.1l-.1-.1a1.8 1.8 0 012.5-2.5l.1.1a1 1 0 001.1.2 1 1 0 00.6-.9V4a1.8 1.8 0 013.6 0v.2a1 1 0 00.6.9 1 1 0 001.1-.2l.1-.1a1.8 1.8 0 012.5 2.5l-.1.1a1 1 0 00-.2 1.1 1 1 0 00.9.6h.2a1.8 1.8 0 010 3.6h-.2a1 1 0 00-.9.6z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Messaging & SEO',
    description:
      'We craft compliant messaging and SEO to improve visibility and attract the right patients.',
    icon: (
      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.4 0-2.73-.34-3.9-.95L3 21l1.95-5.6A8.47 8.47 0 013.5 11.5 8.5 8.5 0 1112 20" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10h6M8 13h4M18 6v4M16 8h4" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Design & Development',
    description:
      'We design patient-focused experiences and build secure, scalable platforms with essential integrations.',
    icon: (
      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="5" width="16" height="11" rx="2" strokeWidth="1.7" />
        <path d="M10 20h4M8 16h8M8 9h4M8 12h3M15 9h1M17 9h.01" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Growth & Optimization',
    description:
      'We optimize performance through data and SEO to drive engagement and patient growth.',
    icon: (
      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 16l4-4 3 3 5-6 4 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7h6v6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="7" r="2" strokeWidth="1.6" />
        <path d="M3.5 15.5a3.5 3.5 0 015 0" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

const avatarImages = [14, 27, 33, 45, 52]

export default function HealthcareProcess() {
  return (
    <section className="mx-auto w-[90%] 2xl:w-[85%] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-[760px] text-center">
        <h2 className="BenzinSemibold text-white text-[2rem] leading-[1.18] sm:text-[2.6rem] lg:text-[3.05rem]">
          A Proven Process Built for Healthcare Growth
        </h2>
        <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
          Our process is designed to simplify complexity and deliver measurable results for healthcare organizations.
          From strategy to ongoing optimization, we handle everything so your team can focus on delivering care.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step) => (
          <div key={step.title} className="rounded-[18px] bg-white/[0.035] px-6 py-7 sm:px-7 sm:py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
              {step.icon}
            </div>
            <h3 className="mt-5 text-white text-[1.9rem] leading-[1.12] BenzinSemibold">
              {step.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/58">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[24px] bg-white/[0.04] px-6 py-10 sm:px-9 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <h3 className="BenzinSemibold text-white text-[2.2rem] leading-[1.1] sm:text-[2.7rem]">
              Your Healthcare Growth Partner Starts Here.
            </h3>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 BenzinSemibold"
            >
              <div className="rounded-lg bg-white p-4">
                <img src="/bmyb-logo-group1190-01.svg" alt="" className="h-4 w-4" />
              </div>
              <span className="px-2">Start Your Healthcare Project</span>
            </Link>
          </div>

          <div className="lg:pl-10">
            <div className="flex items-center gap-3 text-white">
              <img
                src="/bmyb-logo-clutch-01.svg"
                alt="Clutch"
                className="h-6 w-auto object-contain"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/bmyb-logo-vector-01.svg"
                    alt=""
                    className="h-4 w-4 object-contain"
                  />
                ))}
              </div>
              <span className="text-white/75">4.9</span>
            </div>

            <div className="mt-8 flex items-center gap-0">
              {avatarImages.map((imageId) => (
                <div
                  key={imageId}
                  className="-ml-2 first:ml-0 h-14 w-14 overflow-hidden rounded-full border-2 border-[#191A35]"
                >
                  <img
                    src={`https://i.pravatar.cc/112?img=${imageId}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 border-l border-white/18 pl-4">
              <p className="text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                A team of 50+ specialists in healthcare-focused strategy, design, development, and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
