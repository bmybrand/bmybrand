'use client'

import Link from 'next/link'
import type { IndustryProcessStep } from '@/data/industries/types'

const processSteps = [
  {
    title: 'Discovery & Strategy',
    description:
      'We analyze your services, audience, and compliance needs to define a clear strategy and positioning.',
    icon: (
      <img src="/bmyb-industries-healthcare-growth-01.svg" className="h-7 w-7 object-contain" alt="" />
    ),
  },
  {
    title: 'Messaging & SEO',
    description:
      'We craft compliant messaging and SEO to improve visibility and attract the right patients.',
    icon: (
      <img src="/bmyb-industries-healthcare-growth-02.svg" className="h-7 w-7 object-contain" alt="" />
    ),
  },
  {
    title: 'Design & Development',
    description:
      'We design patient-focused experiences and build secure, scalable platforms with essential integrations.',
    icon: (
      <img src="/bmyb-industries-healthcare-growth-03.svg" className="h-7 w-7 object-contain" alt="" />
    ),
  },
  {
    title: 'Growth & Optimization',
    description:
      'We optimize performance through data and SEO to drive engagement and patient growth.',
    icon: (
      <img src="/bmyb-industries-healthcare-growth-04.svg" className="h-7 w-7 object-contain" alt="" />
    ),
  },
]

const avatarImages = [14, 27, 33, 45, 52]

type HealthcareProcessProps = {
  title?: string
  description?: string
  steps?: IndustryProcessStep[]
  ctaTitle?: string
  ctaButtonLabel?: string
  teamDescription?: string
}

export default function HealthcareProcess({
  title = 'A Proven Process Built for Healthcare Growth',
  description = 'Our process is designed to simplify complexity and deliver measurable results for healthcare organizations. From strategy to ongoing optimization, we handle everything so your team can focus on delivering care.',
  steps,
  ctaTitle = 'Your Healthcare Growth Partner Starts Here.',
  ctaButtonLabel = 'Start Your Healthcare Project',
  teamDescription = 'A team of 50+ specialists in healthcare-focused strategy, design, development, and growth.',
}: HealthcareProcessProps) {
  const processContent = (steps ?? processSteps).map((step, index) => ({
    ...step,
    icon: 'icon' in step ? step.icon : processSteps[index]?.icon,
  }))

  return (
    <section className="mx-auto w-[90%] 2xl:w-[75%] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-[760px] text-center">
        <h2 className="BenzinSemibold text-white text-[0.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.18]">
          {title}
        </h2>
        <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
          {description}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {processContent.map((step) => (
          <div key={step.title} className="rounded-[18px] bg-white/[0.035] px-6 py-7 sm:px-7 sm:py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
              {step.icon}
            </div>
            <h3 className="mt-5 text-white text-[0.75rem] sm:text-[0.85rem] md:text-[0.95rem] lg:text-[1.1rem] xl:text-[1.35rem] 2xl:text-[1.57rem] leading-[1.12] BenzinSemibold">
              {step.title}
            </h3>
            <p className="mt-4 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/58">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[24px] bg-white/[0.04] px-6 py-10 sm:px-9 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <h3 className="BenzinSemibold text-white text-[0.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] xl:text-[2.2rem] 2xl:text-[2.64rem] leading-[1.1]">
              {ctaTitle}
            </h3>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 BenzinSemibold"
            >
              <div className="rounded-lg bg-white p-4">
                <img src="/bmyb-logo-group1190-01.svg" alt="" className="h-4 w-4" />
              </div>
              <span className="px-2">{ctaButtonLabel}</span>
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
              <p className="text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                {teamDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
