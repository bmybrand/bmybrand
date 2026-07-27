'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import { openCareerRoles, type CareerOpening } from '@/data/careers'

const departments: Array<CareerOpening['department']> = ['Design', 'Technology', 'Growth', 'Operations']
const workplaceTypes: Array<CareerOpening['workplace']> = ['Remote', 'Hybrid', 'On-site']
const employmentTypes: Array<CareerOpening['employmentType']> = ['Full-time', 'Part-time', 'Contract', 'Internship']

const primaryButtonClass =
  'BenzinSemibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] sm:text-[14px] md:text-[15px] 2xl:text-base'

function ButtonIcon() {
  return (
    <span className="relative z-10 shrink-0 rounded-lg bg-white p-4">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="h-4 w-4">
        <path
          d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z"
          fill="#FF7A32"
        />
      </svg>
    </span>
  )
}

export default function OpportunitiesPage() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('')
  const [workplace, setWorkplace] = useState('')
  const [employmentType, setEmploymentType] = useState('')

  const filteredRoles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return openCareerRoles.filter((role) => {
      const searchableText = `${role.title} ${role.summary} ${role.department} ${role.location}`.toLowerCase()

      return (
        (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
        (!department || role.department === department) &&
        (!workplace || role.workplace === workplace) &&
        (!employmentType || role.employmentType === employmentType)
      )
    })
  }, [department, employmentType, query, workplace])

  const hasActiveFilters = Boolean(query || department || workplace || employmentType)

  const clearFilters = () => {
    setQuery('')
    setDepartment('')
    setWorkplace('')
    setEmploymentType('')
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#11122F] text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pb-20 pt-40 sm:pt-48 lg:pb-28 lg:pt-56">
          <div className="absolute -left-40 top-24 h-[28rem] w-[28rem] rounded-full bg-[#F45B25]/16 blur-[120px]" />
          <div className="absolute -right-44 top-0 h-[32rem] w-[32rem] rounded-full bg-[#6558E8]/14 blur-[140px]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="relative mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid gap-10 lg:grid-cols-[1fr_.42fr] lg:items-end">
              <div className="max-w-5xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">Open opportunities</p>
                <h1 className="BenzinSemibold text-[clamp(3rem,7.5vw,7.5rem)] leading-[.92] tracking-[-0.045em]">
                  Find work worth
                  <span className="block text-[#F45B25]">showing up for.</span>
                </h1>
              </div>
              <p className="max-w-md text-base leading-7 text-white/55 lg:pb-2 lg:text-lg lg:leading-8">
                Explore roles across strategy, design, growth, and technology—and find the next place your craft can make a visible difference.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="rounded-[2rem] border border-white/12 bg-[#171835] p-5 shadow-[0_28px_80px_rgba(0,0,0,.2)] sm:p-7 lg:p-9">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-5 w-5 text-[#F45B25]" />
                <p className="BenzinSemibold text-lg">Search open roles</p>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-[1.5fr_repeat(3,1fr)_auto]">
                <label className="relative">
                  <span className="sr-only">Search by job title or keyword</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Job title or keyword"
                    className="h-14 w-full rounded-xl border border-white/12 bg-[#0D0E28] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/32 focus:border-[#F45B25]/70"
                  />
                </label>

                <FilterSelect label="Department" value={department} onChange={setDepartment} options={departments} />
                <FilterSelect label="Work style" value={workplace} onChange={setWorkplace} options={workplaceTypes} />
                <FilterSelect label="Employment" value={employmentType} onChange={setEmploymentType} options={employmentTypes} />

                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/12 px-5 text-sm text-white/55 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-b border-white/12 pb-5">
              <h2 className="BenzinSemibold text-2xl sm:text-3xl">Current openings</h2>
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/48">
                {filteredRoles.length} {filteredRoles.length === 1 ? 'role' : 'roles'}
              </span>
            </div>

            {filteredRoles.length > 0 ? (
              <div>
                {filteredRoles.map((role) => (
                  <article key={role.slug} className="group border-b border-white/12 py-8 sm:py-10">
                    <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F45B25]">{role.department}</p>
                        <h3 className="BenzinSemibold mt-3 text-2xl leading-tight transition group-hover:text-[#FF7544] sm:text-4xl">
                          {role.title}
                        </h3>
                        <p className="mt-4 max-w-3xl leading-7 text-white/52">{role.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <RoleMeta icon={MapPin} text={`${role.location} · ${role.workplace}`} />
                          <RoleMeta icon={Clock3} text={role.employmentType} />
                        </div>
                      </div>
                      <Link
                        href={`/contact?interest=careers&role=${encodeURIComponent(role.title)}`}
                        className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/18 text-white transition group-hover:border-[#F45B25] group-hover:bg-[#F45B25]"
                        aria-label={`Apply for ${role.title}`}
                      >
                        <ArrowUpRight className="h-6 w-6" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(120deg,rgba(244,91,37,.16),rgba(255,255,255,.025))] p-8 sm:p-12 lg:p-16">
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#F45B25]/18 blur-3xl" />
                <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="max-w-3xl">
                    <BriefcaseBusiness className="h-10 w-10 text-[#F45B25]" strokeWidth={1.6} />
                    <h3 className="BenzinSemibold mt-7 text-3xl leading-tight sm:text-5xl">
                      {hasActiveFilters ? 'No roles match those filters yet.' : 'No openings today. Stay in the conversation.'}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                      {hasActiveFilters
                        ? 'Try a broader search, or introduce yourself so we can reach out when a role fits your strengths.'
                        : 'The right role can open quickly. Share your profile, discipline, and the kind of work you want to do next.'}
                    </p>
                  </div>
                  {hasActiveFilters ? (
                    <button type="button" onClick={clearFilters} className={primaryButtonClass}>
                      <ButtonIcon />
                      <span className="px-2">Reset filters</span>
                    </button>
                  ) : (
                    <Link href="/contact?interest=careers" className={primaryButtonClass}>
                      <ButtonIcon />
                      <span className="px-2">Join talent network</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="pb-24 pt-8 lg:pb-36 lg:pt-14">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid overflow-hidden rounded-[2rem] border border-white/12 bg-[#0B0C26] lg:grid-cols-[.75fr_1.25fr]">
              <div className="flex min-h-72 flex-col justify-between bg-[#F45B25] p-8 sm:p-12">
                <Sparkles className="h-11 w-11" strokeWidth={1.5} />
                <p className="BenzinSemibold max-w-sm text-3xl leading-tight sm:text-4xl">Craft first. Titles second.</p>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">Before you apply</p>
                <h2 className="BenzinSemibold mt-5 text-3xl leading-tight sm:text-5xl">Bring the work that best represents you.</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                  A focused portfolio, a thoughtful résumé, or a clear account of what you changed matters more than polished jargon. Show us how you think and what you care about.
                </p>
                <Link href="/careers#how-we-hire" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#F45B25]">
                  See how we hire
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-xl border border-white/12 bg-[#0D0E28] px-4 text-sm text-white/75 outline-none transition focus:border-[#F45B25]/70"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function RoleMeta({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/48">
      <Icon className="h-3.5 w-3.5 text-[#F45B25]" />
      {text}
    </span>
  )
}
