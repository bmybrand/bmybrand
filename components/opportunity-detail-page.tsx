import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Clock3, MapPin, Sparkles } from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import type { CareerOpening } from '@/data/careers'

export default function OpportunityDetailPage({
  job,
  similarJobs,
}: {
  job: CareerOpening
  similarJobs: CareerOpening[]
}) {
  const description = (job.description || '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const hasDistinctDescription =
    description.length > 0 &&
    description.join('\n\n').toLocaleLowerCase() !== job.summary.trim().toLocaleLowerCase()
  const applyHref =
    job.applyUrl && job.applyUrl !== '/contact?interest=careers'
      ? job.applyUrl
      : `/contact?interest=careers&role=${encodeURIComponent(job.title)}`

  return (
    <div className="min-h-screen overflow-hidden bg-[#11122F] text-white">
      <Navbar />

      <main>
        <section className="relative min-h-[520px] overflow-hidden pt-32">
          <Image
            src="/bmyb-careers-hero-v1.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,28,.97)_0%,rgba(8,9,34,.8)_48%,rgba(8,9,34,.48)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11122F]/70 via-transparent to-[#11122F]/30" />

          <div className="relative mx-auto flex min-h-[388px] w-[90%] flex-col items-center justify-center text-center 2xl:w-[75%]">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">{job.department} opportunity</p>
            <h1 className="BenzinSemibold max-w-6xl text-[clamp(2.5rem,5.4vw,5.2rem)] leading-[1.02] tracking-[-0.035em]">
              {job.title}
            </h1>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white/65">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#11122F]/45 px-4 py-2 backdrop-blur-md">
                <MapPin className="h-4 w-4 text-[#F45B25]" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#11122F]/45 px-4 py-2 backdrop-blur-md">
                <BriefcaseBusiness className="h-4 w-4 text-[#F45B25]" />
                {job.workplace}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#11122F]/45 px-4 py-2 backdrop-blur-md">
                <Clock3 className="h-4 w-4 text-[#F45B25]" />
                {job.employmentType}
              </span>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <Link href="/opportunities" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-[#F45B25]">
              <ArrowLeft className="h-4 w-4" />
              Back to all opportunities
            </Link>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:gap-16">
              <article className="min-w-0">
                <header className="border-b border-white/12 pb-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F45B25]">The position</p>
                  <h2 className="BenzinSemibold mt-4 text-3xl leading-tight sm:text-5xl">{job.title}</h2>
                  <p className="mt-5 max-w-4xl text-lg leading-8 text-white/58">{job.summary}</p>
                </header>

                <JobSection title="About BmyBrand">
                  <p>
                    BmyBrand brings strategy, design, growth, and technology together to create connected brand and digital experiences. Our teams work closely from the beginning, share ownership of the outcome, and build with both ambition and care.
                  </p>
                </JobSection>

                {hasDistinctDescription && (
                  <JobSection title="About the role">
                    {description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </JobSection>
                )}

                {Boolean(job.responsibilities?.length) && (
                  <JobSection title="What you’ll do">
                    <BulletList items={job.responsibilities ?? []} />
                  </JobSection>
                )}

                {Boolean(job.requirements?.length) && (
                  <JobSection title="What you’ll bring">
                    <BulletList items={job.requirements ?? []} />
                  </JobSection>
                )}

                {Boolean(job.benefits?.length) && (
                  <JobSection title="What you can expect">
                    <BulletList items={job.benefits ?? []} />
                  </JobSection>
                )}

                <div className="mt-12 rounded-[2rem] border border-[#F45B25]/45 bg-[linear-gradient(120deg,rgba(244,91,37,.16),rgba(255,255,255,.025))] p-8 sm:p-11">
                  <Sparkles className="h-9 w-9 text-[#F45B25]" strokeWidth={1.5} />
                  <h2 className="BenzinSemibold mt-6 text-3xl leading-tight sm:text-4xl">Think this could be your next move?</h2>
                  <p className="mt-4 max-w-2xl leading-7 text-white/55">
                    Send us the work and experience that best represent you. We care about how you think, what you changed, and what you want to build next.
                  </p>
                  <Link
                    href={applyHref}
                    className="BenzinSemibold mt-7 inline-flex items-center gap-3 rounded-full bg-[#F45B25] px-7 py-4 text-xs transition hover:-translate-y-0.5 hover:bg-[#FF7544] hover:shadow-[0_0_24px_rgba(244,91,37,.35)]"
                  >
                    Apply for this role
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>

              <aside className="space-y-6 lg:sticky lg:top-32">
                <div className="rounded-[1.75rem] border border-white/12 bg-[#171835] p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F45B25]">Role at a glance</p>
                  <dl className="mt-6 divide-y divide-white/10">
                    <MetaRow label="Department" value={job.department} />
                    <MetaRow label="Location" value={job.location} />
                    <MetaRow label="Work style" value={job.workplace} />
                    <MetaRow label="Employment" value={job.employmentType} />
                  </dl>
                  <Link
                    href={applyHref}
                    className="BenzinSemibold mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-5 py-4 text-xs transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(244,91,37,.35)]"
                  >
                    Apply now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="rounded-[1.75rem] border border-white/12 bg-[#171835] p-7">
                  <h2 className="BenzinSemibold text-xl">Similar opportunities</h2>
                  {similarJobs.length ? (
                    <div className="mt-5 divide-y divide-white/10">
                      {similarJobs.map((similarJob) => (
                        <Link key={similarJob.slug} href={`/opportunities/${similarJob.slug}`} className="group block py-5 first:pt-1">
                          <p className="BenzinSemibold text-sm leading-6 transition group-hover:text-[#F45B25]">{similarJob.title}</p>
                          <p className="mt-2 text-xs text-white/42">{similarJob.location} · {similarJob.workplace}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm leading-6 text-white/45">No similar roles to show right now.</p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function JobSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-white/10 py-10 last:border-b-0">
      <h2 className="BenzinSemibold text-2xl leading-tight sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-white/58">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F45B25]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 text-sm">
      <dt className="text-white/42">{label}</dt>
      <dd className="text-right font-semibold text-white/82">{value}</dd>
    </div>
  )
}
