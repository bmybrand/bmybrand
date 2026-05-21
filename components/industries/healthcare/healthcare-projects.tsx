'use client'

import Link from 'next/link'
import type { IndustryProject } from '@/data/industries/types'

type ProjectCard = {
  brandTitle: string
  brandSubtitle?: string
  brandLogo?: string
  logoClassName?: string
  title: string
  image: string
  tag: string
  href: string
  imageClassName: string
  featured?: boolean
}

const projectCards: ProjectCard[] = [
  {
    brandTitle: 'INSTINCTIVE',
    brandSubtitle: 'HEALTHCARE SOLUTIONS',
    brandLogo: '/bmyb-industries-healthcare-client-logo-02.svg',
    title: 'Scalable Digital Growth For Healthcare',
    image: '/bmyb-industries-healthcare-project-01.webp',
    tag: 'Healthcare',
    href: 'https://instinctivehealthpass.com/',
    imageClassName: 'object-cover object-center',
  },
  {
    brandTitle: 'FOUNTAIN HILLS',
    brandSubtitle: 'EMERGENCY ROOM & MEDICAL CENTER',
    brandLogo: '/bmyb-industries-healthcare-client-logo-01.svg',
    title: 'Patient-First Emergency Care Experience',
    image: '/bmyb-industries-healthcare-project-02.webp',
    tag: 'Healthcare',
    href: 'https://fhmcaz.com/',
    imageClassName: 'object-cover object-center',
  },
  {
    brandTitle: 'INSTINCTIVE',
    brandSubtitle: 'HEALTH',
    brandLogo: '/bmyb-industries-healthcare-client-logo-03.svg',
    logoClassName: '',
    title: 'AI-Powered Digital Care For Modern Patients',
    image: '/bmyb-industries-healthcare-project-03.svg',
    tag: 'AI / Healthcare',
    href: '#',
    imageClassName: 'object-contain object-center bg-[#f1f5fb]',
  },
]

type HealthcareProjectsProps = {
  title?: string
  description?: string
  projects?: IndustryProject[]
}

export default function HealthcareProjects({
  title = 'Healthcare Projects That Drive Real Impact',
  description = 'We partner with healthcare brands, providers, and medical organizations to create digital experiences that build trust, improve usability, and support measurable growth.',
  projects,
}: HealthcareProjectsProps) {
  const projectContent = (projects ?? projectCards).map((project, index) => ({
    ...projectCards[index],
    ...project,
    brandTitle: 'brandTitle' in project ? project.brandTitle : ('brand' in project ? project.brand : projectCards[index]?.brandTitle),
    href: project.href ?? projectCards[index]?.href ?? '#',
    image: project.image ?? projectCards[index]?.image ?? '',
    imageClassName: project.imageClassName ?? projectCards[index]?.imageClassName ?? 'object-cover object-center',
    brandLogo: project.brandLogo ?? projectCards[index]?.brandLogo,
    brandSubtitle: project.brandSubtitle ?? projectCards[index]?.brandSubtitle,
    logoClassName: project.logoClassName ?? projectCards[index]?.logoClassName,
  }))

  return (
    <section className="mx-auto w-[90%] 2xl:w-[75%] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="BenzinSemibold text-white text-[2rem] leading-[1.16] sm:text-[2.7rem] lg:text-[3.2rem]">
          {title}
        </h2>
        <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
          {description}
        </p>
      </div>

      <div className="mt-12 flex flex-wrap items-stretch justify-center gap-5">
        {projectContent.map((card) => (
          <div key={card.title} className="flex w-full max-w-[420px] flex-col lg:flex-[0_1_calc(33.333%-14px)]">
            <Link
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-white/8 bg-transparent px-5 pt-5 pb-0 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#202141] ${
                card.featured ? 'shadow-[0_0_0_1px_rgba(255,132,62,0.1)]' : ''
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E1026] via-[#0E1026]/82 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-white text-[1.3rem] leading-none BenzinRegular">View Website</span>
                <img src="/bmyb-logo-group119-01.svg" alt="" className="h-4 w-4 object-contain brightness-0 invert" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  {card.brandLogo ? (
                    <img 
                      src={card.brandLogo} 
                      alt={card.brandTitle} 
                      className={`h-12 w-auto object-contain brightness-0 invert ${card.logoClassName || ''}`} 
                    />
                  ) : card.brandSubtitle ? (
                    <div className="leading-none">
                      <div className="text-white text-[18px] leading-[1.25] tracking-[0.04em] BenzinSemibold">
                        {card.brandTitle}
                      </div>
                      <div className="mt-1 text-[0.5rem] tracking-[0.16em] text-white/70 BenzinSemibold">
                        {card.brandSubtitle}
                      </div>
                    </div>
                  ) : (
                    <div className="text-white text-[18px] leading-[1.25] BenzinSemibold">
                      {card.brandTitle}
                    </div>
                  )}
                </div>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6A3542] transition-all duration-300 group-hover:bg-[#FF843E]"
                >
                  <img src="/bmyb-logo-group119-01.svg" alt="" className="h-4 w-4 object-contain brightness-0 invert" />
                </div>
              </div>

              <h3 className="mt-10 text-white text-[20px] leading-[1.3] BenzinSemibold">
                {card.title}
              </h3>

              <div className="mt-6 h-px w-full bg-white/8" />

              <div className="mt-auto pt-6 overflow-hidden rounded-t-[10px] rounded-b-none">
                <img
                  src={card.image}
                  alt={card.title}
                  className={`h-[210px] w-full ${card.imageClassName}`}
                />
              </div>
            </Link>
            <div className="mt-auto pt-4">
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
