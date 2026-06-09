'use client'

import type { ReactNode } from 'react'

const advantageCards = [
  {
    eyebrow: 'Healthcare-Focused Team',
    title: 'Specialized Team,\nNo Guesswork',
    description:
      'Our team understands healthcare from compliance to patient experience. We work closely with you to deliver solutions tailored to your services, audience, and growth goals.',
    type: 'avatars' as const,
    span: 'md:col-span-5',
  },
  {
    eyebrow: 'Structured Workflow',
    title: 'Streamlined\nProject Execution',
    description:
      'We follow a clear, structured workflow that keeps timelines, communication, and deliverables aligned so your healthcare projects move forward efficiently and without delays.',
    type: 'dashboard' as const,
    image: '/bmyb-industries-healthcare-healthcare-workflow-01.svg',
    span: 'md:col-span-7',
  },
  {
    eyebrow: 'End-to-End Solutions',
    title: 'Everything Your\nHealthcare Brand Needs',
    description:
      'From branding and websites to AI systems and growth marketing, we provide complete digital solutions designed to improve patient experience and drive measurable results.',
    type: 'website' as const,
    image: '/bmyb-industries-healthcare-healthcare-compliance-01.webp',
    span: 'md:col-span-7',
  },
  {
    eyebrow: 'Quality & Compliance',
    title: 'Built For\nAccuracy & Trust',
    description:
      'Our QA and compliance approach ensures secure, reliable projects aligned with healthcare standards and built for long-term trust.',
    type: 'compliance' as const,
    image: '/bmyb-industries-healthcare-healthcare-brand-system-01.webp',
    span: 'md:col-span-5',
  },
]

const avatarImages = [13, 22, 34, 47, 58]

type HealthcareAdvantageProps = {
  title?: ReactNode
  cards?: Array<{
    eyebrow: string
    title: string
    description: string
  }>
}

export default function HealthcareAdvantage({
  title = (
    <>
      Experience the BmyBrand
      <br />
      Healthcare Advantage
    </>
  ),
  cards,
}: HealthcareAdvantageProps) {
  const cardContent = (cards ?? advantageCards).map((card, index) => ({
    ...advantageCards[index],
    ...card,
  }))

  return (
    <section className="bg-[#11122F]">
      <div className="mx-auto w-[90%] py-14 sm:py-18 xl:w-[75%] xl:py-22">
        <div className="max-w-4xl">
          <h2 className="BenzinSemibold text-white text-[1.0rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.9rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.12]">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {cardContent.map((card) => (
            <article
              key={card.title}
              className={`${card.span} group relative min-h-[280px] overflow-hidden rounded-[18px] border border-[#2A2B47] bg-[#11122F] transition-all duration-300 hover:-translate-y-1 hover:border-[#2A2B47] hover:bg-[#202141] hover:shadow-[0_24px_60px_rgba(4,8,30,0.45)] ${
                card.type === 'avatars' ? 'px-6 py-6 sm:px-7 sm:py-7' : 'pl-6 pr-0 pt-6 pb-0 sm:pl-7 sm:pt-7'
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,120,255,0.18),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col gap-0 xl:flex-row xl:items-stretch xl:justify-between">
                <div className={`flex w-full flex-col ${card.type === 'avatars' ? 'pr-0 pb-20' : 'pb-6 xl:w-[56%] xl:pb-7'}`}>
                  <span className="text-xs text-white/42">{card.eyebrow}</span>
                  <h3 className="mt-3 whitespace-pre-line text-white text-[0.9rem] sm:text-[1.0rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.25rem] leading-[1.05] transition-colors duration-300 group-hover:text-white BenzinSemibold">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-[28rem] text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 sm:leading-7 text-white/62 transition-colors duration-300 group-hover:text-white/78">
                    {card.description}
                  </p>

                </div>

                <div className={`relative flex min-h-[120px] w-full items-end justify-end self-end xl:w-[40%] ${card.type === 'avatars' ? 'hidden' : ''}`}>
                  {card.type === 'dashboard' && card.image && (
                    <div className="pointer-events-none w-full self-end opacity-92 transition-transform duration-500 group-hover:scale-[1.01]">
                      <img src={card.image} alt="" className="block h-full w-full object-cover object-right-bottom" />
                    </div>
                  )}

                  {card.type === 'website' && card.image && (
                    <div className="pointer-events-none w-full self-end opacity-95 transition-transform duration-500 group-hover:scale-[1.01]">
                      <img src={card.image} alt="" className="block h-full w-full object-cover object-right-bottom" />
                    </div>
                  )}

                  {card.type === 'compliance' && card.image && (
                    <div className="pointer-events-none w-full self-end opacity-95 transition-transform duration-500 group-hover:scale-[1.01]">
                      <img src={card.image} alt="" className="block h-full w-full object-cover object-right-bottom" />
                    </div>
                  )}
                </div>
              </div>

              {card.type === 'avatars' && (
                <div className="absolute bottom-7 right-7 z-20 flex items-center">
                  {avatarImages.map((imageId, index) => (
                    <div
                      key={imageId}
                      className="-ml-2 first:ml-0 h-12 w-12 overflow-hidden rounded-full border-2 border-[#191A35] transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ transitionDelay: `${index * 35}ms` }}
                    >
                      <img
                        src={`https://i.pravatar.cc/96?img=${imageId}`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
