'use client'

import { useMemo, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, ChevronDown, MapPin, Search, X } from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import { openCareerRoles, type CareerOpening } from '@/data/careers'

const departments: Array<CareerOpening['department']> = ['Design', 'Technology', 'Growth', 'Operations']
const employmentTypes: Array<CareerOpening['employmentType']> = ['Full-time', 'Part-time', 'Contract', 'Internship']
const workplaceTypes: Array<CareerOpening['workplace']> = ['Remote', 'Hybrid', 'On-site']

export default function OpportunitiesPage() {
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [department, setDepartment] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [workplace, setWorkplace] = useState('')

  const locations = useMemo(
    () => Array.from(new Set(openCareerRoles.map((role) => role.location))).sort(),
    [],
  )

  const filteredRoles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return openCareerRoles.filter((role) => {
      const searchableText = `${role.title} ${role.summary} ${role.department} ${role.location}`.toLowerCase()

      return (
        (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
        (!location || role.location === location) &&
        (!department || role.department === department) &&
        (!employmentType || role.employmentType === employmentType) &&
        (!workplace || role.workplace === workplace)
      )
    })
  }, [department, employmentType, location, query, workplace])

  const hasActiveFilters = Boolean(query || location || department || employmentType || workplace)

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQuery(searchInput)
  }

  const clearFilters = () => {
    setSearchInput('')
    setQuery('')
    setLocation('')
    setDepartment('')
    setEmploymentType('')
    setWorkplace('')
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#11122F] text-white">
      <Navbar />

      <main>
        <section className="relative min-h-[530px] overflow-hidden pt-32 sm:min-h-[590px] lg:pt-40">
          <Image
            src="/bmyb-careers-hero-v1.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,28,.97)_0%,rgba(8,9,34,.85)_42%,rgba(8,9,34,.42)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11122F]/55 via-transparent to-[#11122F]/30" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#F45B25]/18 blur-[100px]" />

          <div className="relative mx-auto flex min-h-[390px] w-[90%] flex-col justify-center pb-16 pt-20 2xl:w-[75%]">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-4 text-sm font-semibold text-white/65 sm:text-base">
              <Link href="/" className="transition hover:text-[#F45B25]">Home</Link>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F45B25]" />
              <span className="text-white">Job listings</span>
            </nav>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">Build what matters</p>
            <h1 className="BenzinSemibold max-w-5xl text-[clamp(2.65rem,5.6vw,5.5rem)] leading-[1.02] tracking-[-0.035em]">
              Let us recognize, grow, and reward your craft.
            </h1>
          </div>
        </section>

        <section className="relative z-10 pb-24 lg:pb-36">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="-mt-10 rounded-[2rem] border border-white/12 bg-[#171835] px-5 py-7 shadow-[0_30px_80px_rgba(0,0,0,.35)] sm:px-8 sm:py-9 lg:px-12 lg:py-11">
              <form onSubmit={submitSearch} className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <span className="sr-only">Search jobs or keywords</span>
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/38" />
                  <input
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search for jobs or keywords"
                    className="h-16 w-full rounded-full border border-white/10 bg-[#0D0E28] pl-14 pr-6 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#F45B25]/70"
                  />
                </label>
                <button
                  type="submit"
                  className="BenzinSemibold h-16 rounded-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-10 text-sm transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(244,91,37,.4)]"
                >
                  Search
                </button>
              </form>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <PillSelect label="Location" value={location} onChange={setLocation} options={locations} />
                <PillSelect label="Employment type" value={employmentType} onChange={setEmploymentType} options={employmentTypes} />
                <PillSelect label="Job category" value={department} onChange={setDepartment} options={departments} />
                <PillSelect label="Work style" value={workplace} onChange={setWorkplace} options={workplaceTypes} />
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-xs font-semibold text-white/58 transition hover:border-[#F45B25] hover:text-white"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="mb-8 mt-16 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F45B25]">Join the team</p>
                <h2 className="BenzinSemibold text-3xl sm:text-5xl">Current opportunities</h2>
              </div>
              <p className="shrink-0 text-sm text-white/45">
                {filteredRoles.length} {filteredRoles.length === 1 ? 'open role' : 'open roles'}
              </p>
            </div>

            {filteredRoles.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredRoles.map((role) => (
                  <article
                    key={role.slug}
                    className="group flex min-h-[360px] flex-col rounded-[1.5rem] border border-white/12 bg-[#171835] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#F45B25]/55 hover:bg-[#1B1C3D] sm:p-8"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-[#F45B25]/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF7544]">
                        {role.department}
                      </span>
                      <BriefcaseBusiness className="h-5 w-5 text-white/28" strokeWidth={1.6} />
                    </div>

                    <h3 className="BenzinSemibold mt-7 text-2xl leading-snug">{role.title}</h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/50">{role.summary}</p>

                    <dl className="mt-6 space-y-2 text-sm text-white/52">
                      <div className="flex gap-2">
                        <dt className="font-semibold text-white/82">Location:</dt>
                        <dd>{role.location}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-white/82">Work style:</dt>
                        <dd>{role.workplace}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-white/82">Type:</dt>
                        <dd>{role.employmentType}</dd>
                      </div>
                    </dl>

                    <Link
                      href={`/contact?interest=careers&role=${encodeURIComponent(role.title)}`}
                      className="BenzinSemibold mt-auto inline-flex w-fit items-center gap-3 rounded-full bg-[#F45B25] px-6 py-3 text-xs transition hover:bg-[#FF7544]"
                    >
                      View role
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#171835]">
                <div className="grid lg:grid-cols-[.72fr_1.28fr]">
                  <div className="relative min-h-72 overflow-hidden bg-[#F45B25] p-8 sm:p-11">
                    <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[46px] border-white/10" />
                    <BriefcaseBusiness className="relative h-11 w-11" strokeWidth={1.5} />
                    <p className="BenzinSemibold relative mt-28 max-w-sm text-3xl leading-tight sm:text-4xl">
                      The right opening may be next.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">
                      {hasActiveFilters ? 'No matching roles' : 'Nothing open today'}
                    </p>
                    <h3 className="BenzinSemibold mt-5 max-w-3xl text-3xl leading-tight sm:text-5xl">
                      {hasActiveFilters ? 'Try a broader search.' : 'Stay close to what comes next.'}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/55">
                      {hasActiveFilters
                        ? 'Reset the filters to see every current opportunity, or send us your profile for future roles.'
                        : 'Share your profile and the kind of work you want to do. When an opportunity fits your strengths, we will already know where to find you.'}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="BenzinSemibold inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs transition hover:border-white hover:bg-white/5"
                        >
                          Reset filters
                        </button>
                      )}
                      <Link
                        href="/contact?interest=careers"
                        className="BenzinSemibold inline-flex items-center gap-3 rounded-full bg-[#F45B25] px-6 py-3 text-xs transition hover:bg-[#FF7544]"
                      >
                        Join talent network
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-7 flex items-center justify-center gap-2 text-center text-sm text-white/40">
              <MapPin className="h-4 w-4 text-[#F45B25]" />
              Roles may be remote, hybrid, or location-based depending on the team.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function PillSelect({
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
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 min-w-40 appearance-none rounded-full border border-white/22 bg-transparent py-0 pl-5 pr-11 text-xs font-semibold text-white outline-none transition hover:border-[#F45B25] focus:border-[#F45B25]"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#171835]">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F45B25]" />
    </label>
  )
}
