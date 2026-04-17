'use client'

import Link from 'next/link'

type ProjectCard = {
  brandTitle: string
  brandSubtitle?: string
  title: string
  image: string
  tag: string
  href: string
  imageClassName: string
  featured?: boolean
}

const projectCards: ProjectCard[] = [
  {
    brandTitle: 'FOUNTAIN HILLS',
    brandSubtitle: 'EMERGENCY ROOM & MEDICAL CENTER',
    title: 'Patient-First Emergency Care Experience',
    image: '/Container (2).svg',
    tag: 'Healthcare',
    href: '/case-studies/fountain-hills',
    imageClassName: 'object-cover object-center',
  },
  {
    brandTitle: 'INSTINCTIVE',
    brandSubtitle: 'HEALTHCARE SOLUTIONS',
    title: 'Scalable Digital Growth For Healthcare',
    image: '/Container.svg',
    tag: 'Healthcare',
    href: '/contact',
    imageClassName: 'object-cover object-center',
  },
  {
    brandTitle: 'HealTrust',
    title: 'Smarter Digital Systems For Modern Care',
    image: '/healthcareservies2.svg',
    tag: 'AI / Healthcare',
    href: '/contact',
    imageClassName: 'object-contain object-center bg-[#f1f5fb]',
  },
]

export default function HealthcareProjects() {
  return (
    <section className="mx-auto w-[90%] 2xl:w-[85%] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="BenzinSemibold text-white text-[2rem] leading-[1.16] sm:text-[2.7rem] lg:text-[3.2rem]">
          Healthcare Projects That Drive Real Impact
        </h2>
        <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
          We partner with healthcare brands, providers, and medical organizations to create digital experiences that
          build trust, improve usability, and support measurable growth.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {projectCards.map((card) => (
          <div key={card.title}>
            <Link
              href={card.href}
              className={`group relative block overflow-hidden rounded-[18px] border border-white/8 bg-transparent px-5 pt-5 pb-0 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#202141] ${
                card.featured ? 'shadow-[0_0_0_1px_rgba(255,132,62,0.1)]' : ''
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E1026] via-[#0E1026]/82 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-white text-[2rem] leading-none BenzinSemibold">View Website</span>
                <img src="/group119.svg" alt="" className="h-4 w-4 object-contain brightness-0 invert" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  {card.brandSubtitle ? (
                    <div className="leading-none">
                      <div className="text-white text-[1.4rem] tracking-[0.04em] BenzinSemibold">
                        {card.brandTitle}
                      </div>
                      <div className="mt-1 text-[0.5rem] tracking-[0.16em] text-white/70 BenzinSemibold">
                        {card.brandSubtitle}
                      </div>
                    </div>
                  ) : (
                    <div className="text-white text-[1.6rem] sm:text-[1.85rem] lg:text-[2.2rem] leading-none BenzinSemibold">
                      {card.brandTitle}
                    </div>
                  )}
                </div>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6A3542] transition-all duration-300 group-hover:bg-[#FF843E]"
                >
                  <img src="/group119.svg" alt="" className="h-4 w-4 object-contain brightness-0 invert" />
                </div>
              </div>

              <h3 className="mt-10 text-white text-[2rem] leading-[1.14] BenzinSemibold">
                {card.title}
              </h3>

              <div className="mt-6 h-px w-full bg-white/8" />

              <div className="mt-6 overflow-hidden rounded-t-[10px] rounded-b-none">
                <img
                  src={card.image}
                  alt={card.title}
                  className={`h-[210px] w-full ${card.imageClassName}`}
                />
              </div>
            </Link>
            <div className="mt-4">
              <span className="inline-flex rounded-md bg-white/[0.06] px-3 py-1 text-sm text-white/80">
                {card.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
