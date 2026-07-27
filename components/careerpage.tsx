import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Coffee,
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  MapPin,
  Palette,
  Search,
  Sparkles,
  Users2,
  Zap,
} from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import { openCareerRoles } from '@/data/careers'

const values = [
  {
    icon: Lightbulb,
    title: 'Own the idea',
    text: 'Bring a point of view, ask better questions, and help shape the work—not only your piece of it.',
  },
  {
    icon: HeartHandshake,
    title: 'Build with care',
    text: 'Care about the details, the people using what we make, and the teammates building it beside you.',
  },
  {
    icon: Users2,
    title: 'Share the win',
    text: 'Great work is collaborative. We communicate clearly, give credit freely, and grow together.',
  },
]

const hiringSteps = [
  {
    number: '01',
    title: 'Apply',
    text: 'Send us your profile, résumé, or portfolio for a role that fits.',
  },
  {
    number: '02',
    title: 'Initial review',
    text: 'We review your experience, strengths, and the kind of work you want to do.',
  },
  {
    number: '03',
    title: 'Meet the team',
    text: 'Have an honest conversation about the role, the team, and how we work.',
  },
  {
    number: '04',
    title: 'Skill conversation',
    text: 'Walk through relevant work or a practical exercise designed around the role.',
  },
  {
    number: '05',
    title: 'Decision',
    text: 'We share clear feedback and, when it is the right fit, the next steps to join us.',
  },
]

const benefits = [
  {
    icon: BriefcaseBusiness,
    title: 'Meaningful ownership',
    text: 'Take responsibility for outcomes, not just assigned tasks.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous learning',
    text: 'Learn across disciplines and strengthen the skills that move your career forward.',
  },
  {
    icon: Laptop,
    title: 'Flexible collaboration',
    text: 'Work arrangements are shaped around the role, the team, and the work.',
  },
  {
    icon: Zap,
    title: 'Modern tools',
    text: 'Use capable tools and thoughtful systems that help you do your best work.',
  },
  {
    icon: Sparkles,
    title: 'Room to experiment',
    text: 'Explore better approaches, test ideas, and turn learning into progress.',
  },
  {
    icon: Users2,
    title: 'Connected teams',
    text: 'Strategy, creative, growth, and engineering solve problems together.',
  },
  {
    icon: Coffee,
    title: 'Human pace',
    text: 'Clear priorities and honest communication keep urgency from becoming chaos.',
  },
  {
    icon: Compass,
    title: 'Visible impact',
    text: 'Understand why the work matters and how it supports the bigger outcome.',
  },
]

const teams = [
  {
    icon: Palette,
    title: 'Design & Brand',
    text: 'Brand systems, digital products, UI/UX, motion, and visual storytelling.',
  },
  {
    icon: Code2,
    title: 'Technology',
    text: 'Web, mobile, cloud, AI automation, and dependable digital platforms.',
  },
  {
    icon: Sparkles,
    title: 'Growth & Strategy',
    text: 'Research, content, search, campaigns, and measurable business growth.',
  },
]

const sectionLinkClass =
  'shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/55 transition hover:border-[#F45B25]/60 hover:text-white'

export default function CareerPage() {
  const hasOpenRoles = openCareerRoles.length > 0

  return (
    <div className="min-h-screen overflow-x-clip bg-[#11122F] text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pb-20 pt-44 lg:pb-28 lg:pt-52">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(244,91,37,.25),transparent_31%),radial-gradient(circle_at_12%_68%,rgba(109,91,255,.15),transparent_34%)]" />
          <div className="absolute left-0 top-[28%] h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative mx-auto grid w-[90%] items-center gap-14 2xl:w-[75%] lg:grid-cols-[minmax(0,1fr)_minmax(420px,.86fr)]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/70 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#31C48D]" />
                Careers at BmyBrand
              </div>

              <h1 className="BenzinSemibold max-w-5xl text-[clamp(3.2rem,6.5vw,7.25rem)] leading-[0.94] tracking-[-0.055em]">
                Make work
                <br />
                <span className="text-[#F45B25]">worth sharing.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
                Join a curious, connected team turning ambitious ideas into brands, products, and technology that move businesses forward.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#open-roles"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F45B25] px-6 py-4 font-semibold transition hover:-translate-y-1 hover:bg-[#ff6b35]"
                >
                  View open roles
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#life-at-bmybrand"
                  className="rounded-xl border border-white/20 bg-white/[0.04] px-6 py-4 font-semibold transition hover:bg-white/10"
                >
                  Life at BmyBrand
                </a>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  ['Strategy + Creative + Tech', 'One connected team'],
                  ['Clear ownership', 'Work with purpose'],
                  ['Flexible by role', 'Remote, hybrid or on-site'],
                ].map(([title, text]) => (
                  <div key={title} className="bg-[#151634]/95 p-5">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/40">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#090A22] shadow-2xl shadow-black/25 sm:min-h-[560px]">
              <Image
                src="/bmyb-navbar-company-01.webp"
                alt="BmyBrand careers and open positions"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11122F]/75 via-transparent to-[#11122F]/10" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-[#11122F]/75 p-5 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="BenzinSemibold text-lg">Different disciplines.</p>
                  <p className="mt-1 text-sm text-white/55">One connected team.</p>
                </div>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F45B25] sm:mt-0">
                  <Users2 className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-20 mx-auto -mt-3 flex w-[90%] gap-2 overflow-x-auto pb-2 2xl:w-[75%]">
          <a href="#open-roles" className={sectionLinkClass}>Open roles</a>
          <a href="#how-we-hire" className={sectionLinkClass}>How we hire</a>
          <a href="#life-at-bmybrand" className={sectionLinkClass}>Life at BmyBrand</a>
          <a href="#benefits" className={sectionLinkClass}>Benefits</a>
          <a href="#teams" className={sectionLinkClass}>Teams</a>
        </div>

        <section id="open-roles" className="scroll-mt-36 py-20 lg:py-28">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#F45B25]">Open positions</p>
                <h2 className="BenzinSemibold text-4xl leading-tight sm:text-6xl">Find work you can care about.</h2>
                <p className="mt-6 text-lg leading-8 text-white/55">
                  Explore current opportunities across our connected strategy, creative, growth, and technology teams.
                </p>
              </div>
              <p className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-white/55">
                {openCareerRoles.length} {openCareerRoles.length === 1 ? 'role' : 'roles'} currently published
              </p>
            </div>

            {hasOpenRoles ? (
              <div className="mt-12">
                <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 lg:grid-cols-[minmax(0,1fr)_auto]">
                  <label className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#0B0C25] px-4 py-3.5">
                    <Search className="h-5 w-5 shrink-0 text-white/35" />
                    <span className="text-sm text-white/35">Search roles, disciplines, or skills</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['All teams', 'Design', 'Technology', 'Growth'].map((filter, index) => (
                      <span
                        key={filter}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold ${index === 0 ? 'bg-[#F45B25] text-white' : 'border border-white/10 bg-white/[0.04] text-white/55'}`}
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {openCareerRoles.map((role) => (
                    <article
                      key={role.slug}
                      className="group flex min-h-80 flex-col justify-between rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-7 transition hover:-translate-y-1 hover:border-[#F45B25]/55 sm:p-9"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-6">
                          <span className="rounded-full bg-[#F45B25]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#F45B25]">
                            {role.department}
                          </span>
                          <ArrowRight className="h-5 w-5 text-white/30 transition group-hover:-rotate-45 group-hover:text-[#F45B25]" />
                        </div>
                        <h3 className="BenzinSemibold mt-8 text-2xl leading-snug sm:text-3xl">{role.title}</h3>
                        <p className="mt-4 leading-7 text-white/55">{role.summary}</p>
                      </div>
                      <div className="mt-9 flex flex-wrap gap-3 border-t border-white/10 pt-5 text-sm text-white/45">
                        <span>{role.location}</span>
                        <span className="text-[#F45B25]">•</span>
                        <span>{role.workplace}</span>
                        <span className="text-[#F45B25]">•</span>
                        <span>{role.employmentType}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-8 sm:p-12 lg:p-16">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#F45B25]/15 blur-3xl" />
                <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="max-w-3xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F45B25]/15 text-[#F45B25]">
                      <BriefcaseBusiness className="h-7 w-7" />
                    </div>
                    <h3 className="BenzinSemibold mt-7 text-2xl leading-tight sm:text-4xl">No public openings right now.</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                      The right opportunity may be closer than it looks. Join our talent network and tell us where you create the most value.
                    </p>
                  </div>
                  <Link
                    href="/contact?interest=careers"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F45B25] px-6 py-4 font-semibold transition hover:-translate-y-1 hover:bg-[#ff6b35]"
                  >
                    Join our talent network
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="how-we-hire" className="scroll-mt-36 border-y border-white/8 bg-[#0D0E29] py-20 lg:py-28">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#F45B25]">How we hire</p>
                <h2 className="BenzinSemibold text-4xl leading-tight sm:text-6xl">Clear from first hello to final decision.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/55 lg:justify-self-end">
                Hiring should feel like a useful conversation, not a mystery. We keep the process relevant to the role and communicate what comes next.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {hiringSteps.map((step, index) => (
                <article
                  key={step.number}
                  className="relative min-h-72 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#F45B25]/50 hover:bg-white/[0.055]"
                >
                  <div className="flex items-center justify-between">
                    <span className="BenzinSemibold text-sm text-[#F45B25]">{step.number}</span>
                    {index < hiringSteps.length - 1 && <ArrowRight className="h-4 w-4 text-white/20" />}
                  </div>
                  <h3 className="BenzinSemibold mt-14 text-xl leading-snug">{step.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/50">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="life-at-bmybrand" className="scroll-mt-36 py-20 lg:py-28">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#F45B25]">Life at BmyBrand</p>
                <h2 className="BenzinSemibold text-4xl leading-tight sm:text-5xl">Good people make great work possible.</h2>
              </div>
              <p className="max-w-3xl self-end text-lg leading-8 text-white/60">
                We bring strategy, creativity, growth, and engineering into the same room. That means fewer handoffs, more shared context, and the freedom to solve the real problem together.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {values.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-7 sm:p-9">
                  <div className="mb-12 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F45B25]/15 text-[#F45B25]">
                      <Icon />
                    </span>
                    <span className="BenzinSemibold text-sm text-white/20">0{index + 1}</span>
                  </div>
                  <h3 className="BenzinSemibold text-2xl">{title}</h3>
                  <p className="mt-4 leading-7 text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F45B25] py-20 text-white lg:py-28">
          <div className="mx-auto grid w-[90%] gap-12 2xl:w-[75%] lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/25 sm:min-h-[540px]">
              <Image
                src="/bmyb-about-bmybrand-01.webp"
                alt="A collaborative brand and digital design session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 44vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
            <div className="lg:pl-10">
              <p className="mb-4 text-sm uppercase tracking-[0.18em] text-white/70">What you can expect</p>
              <h2 className="BenzinSemibold text-4xl leading-tight sm:text-6xl">Space to do your best work.</h2>
              <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {[
                  'Meaningful ownership',
                  'Cross-discipline learning',
                  'Clear, direct feedback',
                  'Flexible collaboration',
                  'Room to experiment',
                  'Work with real impact',
                ].map((item) => (
                  <div key={item} className="flex gap-3 border-t border-white/30 pt-4 text-lg font-semibold">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="scroll-mt-36 py-20 lg:py-28">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#F45B25]">Benefits of the work</p>
              <h2 className="BenzinSemibold text-4xl leading-tight sm:text-6xl">More than perks. A better way to contribute.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
                The details depend on the role and location, but the principles behind the experience stay consistent.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {benefits.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="min-h-72 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#F45B25]/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.07] text-[#F45B25]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="BenzinSemibold mt-10 text-xl leading-snug">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/50">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="teams" className="scroll-mt-36 border-t border-white/8 py-20 lg:py-28">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#F45B25]">Find your lane</p>
              <h2 className="BenzinSemibold text-4xl sm:text-6xl">Where could you make an impact?</h2>
              <p className="mt-6 text-lg leading-8 text-white/55">
                Our opportunities evolve with the work. These are the connected disciplines we regularly build around.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {teams.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="group rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-8 transition hover:-translate-y-1 hover:border-[#F45B25]/60 sm:p-10"
                >
                  <Icon className="h-9 w-9 text-[#F45B25]" />
                  <h3 className="BenzinSemibold mt-16 text-2xl">{title}</h3>
                  <p className="mt-4 min-h-20 leading-7 text-white/55">{text}</p>
                  <Link
                    href={`/contact?interest=careers&team=${encodeURIComponent(title)}`}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-white transition group-hover:text-[#F45B25]"
                  >
                    Introduce yourself
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(110deg,rgba(244,91,37,.22),rgba(255,255,255,.04))] p-8 sm:p-10 lg:p-14">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#F45B25]/20 blur-3xl" />
              <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#F45B25]">Stay connected</p>
                  <h3 className="BenzinSemibold mt-4 text-3xl leading-tight sm:text-5xl">Do not see your exact role?</h3>
                  <p className="mt-4 text-lg leading-8 text-white/55">
                    Send us your résumé, portfolio, or profile. Great people are always worth meeting.
                  </p>
                </div>
                <Link
                  href="/contact?interest=careers"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#181932] transition hover:-translate-y-1"
                >
                  Join our talent network
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4" />
              Opportunities may be remote, hybrid, or location-based depending on the role.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
