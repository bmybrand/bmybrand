import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Coffee,
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  MapPin,
  Sparkles,
  Users2,
  Zap,
} from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import { openCareerRoles } from '@/data/careers'

const hiringSteps = [
  {
    number: '01',
    icon: BriefcaseBusiness,
    tone: 'bg-[#F45B25]',
    title: 'Apply',
    text: 'Share your profile, résumé, or portfolio for a role that feels right.',
  },
  {
    number: '02',
    icon: Coffee,
    tone: 'bg-[#6558E8]',
    title: 'Let’s talk',
    text: 'A relaxed first conversation about your experience and what you want next.',
  },
  {
    number: '03',
    icon: Users2,
    tone: 'bg-[#269D85]',
    title: 'Meet the team',
    text: 'Explore the work, the people, and the way we solve problems together.',
  },
  {
    number: '04',
    icon: Sparkles,
    tone: 'bg-[#D8922B]',
    title: 'Show your craft',
    text: 'Walk us through relevant work or a focused exercise built around the role.',
  },
  {
    number: '05',
    icon: HeartHandshake,
    tone: 'bg-[#F45B25]',
    title: 'Join BmyBrand',
    text: 'Get a clear decision, thoughtful feedback, and a supported start.',
  },
]

const benefits = [
  {
    icon: BriefcaseBusiness,
    title: 'Real ownership',
    text: 'Own outcomes and help shape the work from the beginning.',
  },
  {
    icon: GraduationCap,
    title: 'Keep learning',
    text: 'Grow across disciplines through feedback, mentoring, and practice.',
  },
  {
    icon: Laptop,
    title: 'Flexible by design',
    text: 'Work arrangements reflect the role, team, and work—not a rigid formula.',
  },
  {
    icon: Zap,
    title: 'Modern tools',
    text: 'Use capable technology and clear systems that remove unnecessary friction.',
  },
  {
    icon: Sparkles,
    title: 'Room to explore',
    text: 'Test ideas, challenge assumptions, and turn learning into better work.',
  },
  {
    icon: Users2,
    title: 'One connected team',
    text: 'Strategy, design, growth, and engineering work side by side.',
  },
  {
    icon: Coffee,
    title: 'A human pace',
    text: 'Clear priorities and honest communication keep urgency healthy.',
  },
  {
    icon: Compass,
    title: 'Visible impact',
    text: 'Know why your work matters and see what it changes for the client.',
  },
]

const principles = [
  {
    icon: Lightbulb,
    title: 'Curiosity before certainty',
    text: 'We ask better questions, stay open, and keep looking until the real problem becomes clear.',
  },
  {
    icon: HeartHandshake,
    title: 'Care in every detail',
    text: 'We care about the people using what we make and the people building it beside us.',
  },
  {
    icon: Users2,
    title: 'Shared success',
    text: 'Great work is collaborative. We communicate directly, give credit freely, and grow together.',
  },
]

export default function CareerPage() {
  const hasOpenRoles = openCareerRoles.length > 0

  return (
    <div className="min-h-screen overflow-x-clip bg-[#11122F] text-white">
      <Navbar />

      <main>
        <section className="relative min-h-[760px] overflow-hidden lg:min-h-[900px]">
          <Image
            src="/bmyb-careers-hero-v1.png"
            alt="A creative technology team collaborating in the BmyBrand studio"
            fill
            priority
            className="object-cover object-[64%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,31,.98)_0%,rgba(8,9,31,.88)_30%,rgba(8,9,31,.36)_64%,rgba(8,9,31,.18)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11122F] via-transparent to-[#11122F]/25" />

          <div className="relative mx-auto flex min-h-[760px] w-[90%] items-center pb-20 pt-40 2xl:w-[75%] lg:min-h-[900px] lg:pt-48">
            <div className="max-w-[1100px]">
              <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6A35]">
                <span className="h-px w-10 bg-[#FF6A35]" />
                Careers at BmyBrand
              </p>
              <h1 className="BenzinSemibold text-[clamp(3rem,5.8vw,7rem)] leading-[0.94] tracking-[-0.045em]">
                Make your
                <br />
                mark with us.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Join the people bringing strategy, creativity, growth, and technology together to make ambitious ideas real.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#opportunities"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#F45B25] px-7 py-4 font-semibold transition hover:-translate-y-1 hover:bg-[#ff6b35]"
                >
                  Browse opportunities
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#how-we-hire"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-black/10 px-7 py-4 font-semibold backdrop-blur-sm transition hover:bg-white/10"
                >
                  How we hire
                  <ArrowDown className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 right-[5%] hidden items-center gap-3 text-sm text-white/50 lg:flex 2xl:right-[12.5%]">
            <span className="h-px w-16 bg-white/30" />
            Strategy · Creative · Growth · Technology
          </div>
        </section>

        <section id="how-we-hire" className="scroll-mt-28 border-y border-white/10 bg-[#0B0C26] py-24 text-white lg:py-36">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">How we hire</p>
              <h2 className="BenzinSemibold text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                A clear path from hello to welcome.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/60">
                Our process is open, focused, and designed to help both sides make a confident decision.
              </p>
            </div>

            <div className="relative mt-20 pt-12">
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
                viewBox="0 0 1200 430"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <marker id="hire-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#F45B25" />
                  </marker>
                </defs>
                <path d="M95 335 V360 Q95 384 119 384 H175" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeDasharray="5 7" markerEnd="url(#hire-arrow)" />
                <path d="M302 195 V125 Q302 95 332 95 H390" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeDasharray="5 7" markerEnd="url(#hire-arrow)" />
                <path d="M610 335 V374 Q610 404 640 404 H700" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeDasharray="5 7" markerEnd="url(#hire-arrow)" />
                <path d="M916 120 V97 Q916 67 946 67 H975" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeDasharray="5 7" markerEnd="url(#hire-arrow)" />
                <path d="M916 404 V429 Q916 439 926 439 H960" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeDasharray="5 7" markerEnd="url(#hire-arrow)" />
              </svg>

              <div className="relative grid items-center gap-x-4 gap-y-20 md:grid-cols-2 xl:grid-cols-[1fr_1fr_2.05fr_1fr_.92fr]">
                <article className="relative min-h-[270px] rounded-[1.75rem] border border-white/18 bg-[#151632] px-6 pb-8 pt-20 text-center">
                  <div className={`absolute -top-12 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-[1.5rem] border-4 border-[#0B0C26] ${hiringSteps[0].tone} shadow-xl shadow-black/25`}>
                    <BriefcaseBusiness className="h-11 w-11 text-white" strokeWidth={1.6} />
                  </div>
                  <span className="BenzinSemibold absolute right-5 top-5 text-xs text-white/25">01</span>
                  <h3 className="BenzinSemibold mt-5 text-xl">{hiringSteps[0].title}</h3>
                  <p className="mx-auto mt-4 max-w-[220px] text-sm leading-6 text-white/52">{hiringSteps[0].text}</p>
                </article>

                <article className="relative min-h-[270px] rounded-[1.75rem] border border-white/18 bg-[#151632] px-6 pb-8 pt-20 text-center xl:translate-y-16">
                  <div className={`absolute -top-12 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-[1.5rem] border-4 border-[#0B0C26] ${hiringSteps[1].tone} shadow-xl shadow-black/25`}>
                    <Coffee className="h-11 w-11 text-white" strokeWidth={1.6} />
                  </div>
                  <span className="BenzinSemibold absolute right-5 top-5 text-xs text-white/25">02</span>
                  <h3 className="BenzinSemibold mt-5 text-xl">{hiringSteps[1].title}</h3>
                  <p className="mx-auto mt-4 max-w-[220px] text-sm leading-6 text-white/52">{hiringSteps[1].text}</p>
                </article>

                <article className="relative min-h-[270px] rounded-[1.75rem] border border-white/18 bg-[#151632] px-6 pb-8 pt-20 md:col-span-2 xl:col-span-1">
                  <span className="BenzinSemibold absolute right-5 top-5 text-xs text-white/25">03—04</span>
                  <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                    <div className="relative">
                      <div className={`absolute -top-28 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-[1.5rem] border-4 border-[#0B0C26] ${hiringSteps[2].tone} shadow-xl shadow-black/25`}>
                        <Users2 className="h-11 w-11 text-white" strokeWidth={1.6} />
                      </div>
                      <h3 className="BenzinSemibold text-lg leading-snug">{hiringSteps[2].title}</h3>
                      <p className="mx-auto mt-3 max-w-[170px] text-xs leading-5 text-white/50">{hiringSteps[2].text}</p>
                    </div>
                    <ArrowRight className="h-6 w-6 shrink-0 -translate-y-8 text-[#F45B25]" />
                    <div className="relative">
                      <div className={`absolute -top-28 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-[1.5rem] border-4 border-[#0B0C26] ${hiringSteps[3].tone} shadow-xl shadow-black/25`}>
                        <Sparkles className="h-11 w-11 text-white" strokeWidth={1.6} />
                      </div>
                      <h3 className="BenzinSemibold text-lg leading-snug">{hiringSteps[3].title}</h3>
                      <p className="mx-auto mt-3 max-w-[170px] text-xs leading-5 text-white/50">{hiringSteps[3].text}</p>
                    </div>
                  </div>
                </article>

                <article className="relative min-h-[270px] rounded-[1.75rem] border border-white/18 bg-[#151632] px-6 pb-8 pt-20 text-center xl:top-12">
                  <div className="absolute -top-12 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-[1.5rem] border-4 border-[#0B0C26] bg-[#314F59] shadow-xl shadow-black/25">
                    <Compass className="h-11 w-11 text-white" strokeWidth={1.6} />
                  </div>
                  <span className="BenzinSemibold absolute right-5 top-5 text-xs text-white/25">05</span>
                  <h3 className="BenzinSemibold mt-5 text-xl">Decision</h3>
                  <p className="mx-auto mt-4 max-w-[220px] text-sm leading-6 text-white/52">
                    Get a clear decision, thoughtful feedback, and the next step.
                  </p>
                </article>

                <div className="relative grid gap-5 md:col-span-2 md:grid-cols-2 xl:top-8 xl:col-span-1 xl:grid-cols-1">
                  <article className="relative min-h-[190px] rounded-[1.6rem] border border-[#F45B25]/60 bg-[linear-gradient(145deg,#28162D,#151632)] px-5 pb-6 pt-16 text-center">
                    <div className={`absolute -top-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-[1.3rem] border-4 border-[#0B0C26] ${hiringSteps[4].tone} shadow-xl shadow-black/25`}>
                      <HeartHandshake className="h-9 w-9 text-white" strokeWidth={1.6} />
                    </div>
                    <h3 className="BenzinSemibold mt-3 text-lg leading-snug">{hiringSteps[4].title}</h3>
                    <p className="mx-auto mt-3 max-w-[190px] text-xs leading-5 text-white/52">Begin with a clear, supported start.</p>
                  </article>

                  <article className="relative min-h-[190px] rounded-[1.6rem] border border-white/18 bg-[#151632] px-5 pb-6 pt-16 text-center">
                    <div className="absolute -top-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-[1.3rem] border-4 border-[#0B0C26] bg-white/15 shadow-xl shadow-black/25">
                      <Users2 className="h-9 w-9 text-white" strokeWidth={1.6} />
                    </div>
                    <h3 className="BenzinSemibold mt-3 text-lg leading-snug">Stay connected</h3>
                    <p className="mx-auto mt-3 max-w-[190px] text-xs leading-5 text-white/52">
                      If another role fits better, we can reconnect when it opens.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-36">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid items-end gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">Life at BmyBrand</p>
                <h2 className="BenzinSemibold text-4xl leading-[1.05] sm:text-6xl">
                  Different minds.
                  <br />
                  One shared ambition.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/60 lg:justify-self-end">
                The best work happens when talented people have context, trust, and room to contribute. We bring every discipline into the conversation early and solve the whole problem together.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
              <article className="group relative min-h-[520px] overflow-hidden rounded-[2rem]">
                <Image
                  src="/bmyb-careers-culture-v1.png"
                  alt="BmyBrand team members sharing ideas in an informal studio session"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  sizes="(max-width: 1024px) 90vw, 52vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A22]/95 via-[#090A22]/10 to-transparent" />
                <div className="absolute bottom-0 max-w-2xl p-8 sm:p-11">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#FF7544]">How we work</p>
                  <h3 className="BenzinSemibold mt-3 text-3xl leading-tight sm:text-4xl">Ideas get better when everyone can shape them.</h3>
                </div>
              </article>

              <article className="flex min-h-[520px] flex-col justify-between rounded-[2rem] bg-[#F45B25] p-8 sm:p-11">
                <Sparkles className="h-11 w-11" />
                <div>
                  <p className="max-w-sm text-xl leading-8 text-white/85">
                    “Bring a point of view, stay curious, and care deeply about the outcome.”
                  </p>
                  <div className="mt-9 border-t border-white/30 pt-6">
                    <p className="BenzinSemibold text-xl">Make it meaningful.</p>
                    <p className="mt-2 text-sm text-white/65">Our standard for the work—and the experience of making it.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0B0C26] py-24 lg:py-36">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-4xl">
                <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">
                  <span className="h-px w-10 bg-[#F45B25]" />
                  What makes us BmyBrand
                </p>
                <h2 className="BenzinSemibold text-4xl leading-[1.05] sm:text-6xl">
                The values show up in how we work.
                </h2>
              </div>
              <p className="hidden max-w-xs text-right leading-7 text-white/45 lg:block">
                Simple principles that guide the way we think, collaborate, and create.
              </p>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {principles.map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className="group relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.025))] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#F45B25]/45 sm:p-9"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F45B25]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="BenzinSemibold absolute -right-2 -top-5 text-[7rem] leading-none text-white/[0.035] transition-colors duration-300 group-hover:text-[#F45B25]/[0.07]">
                    0{index + 1}
                  </span>

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-[#F45B25] transition-colors duration-300 group-hover:bg-[#F45B25] group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="BenzinSemibold text-xs tracking-[0.16em] text-white/25">0{index + 1}</span>
                    </div>

                    <div className="mt-auto pt-14">
                      <h3 className="BenzinSemibold text-2xl leading-snug">{title}</h3>
                      <p className="mt-4 max-w-sm leading-7 text-white/52">{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17183B] py-24 text-white lg:py-36">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="grid items-start gap-14 lg:grid-cols-[minmax(320px,.82fr)_minmax(0,1.18fr)] lg:gap-16 xl:gap-24">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#F45B25] p-8 text-[#11122F] sm:p-11 lg:sticky lg:top-32 xl:p-14">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[28px] border-[#11122F]/10" />
                <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full border-[34px] border-white/12" />

                <div className="relative">
                  <div className="mb-16 flex items-center justify-between sm:mb-24">
                    <p className="text-sm font-bold uppercase tracking-[0.2em]">The experience</p>
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h2 className="BenzinSemibold max-w-2xl text-4xl leading-[1.03] sm:text-5xl xl:text-6xl">
                    Do your best work. Keep becoming better.
                  </h2>
                  <p className="mt-7 max-w-lg text-base leading-7 text-[#11122F]/70 sm:text-lg sm:leading-8">
                    Benefits vary by role and location. The principles behind them stay the same.
                  </p>
                </div>
              </div>

              <div className="grid gap-x-10 sm:grid-cols-2 xl:gap-x-14">
                {benefits.map(({ icon: Icon, title, text }, index) => (
                  <article
                    key={title}
                    className="group border-t border-white/16 py-8 sm:min-h-[220px] sm:py-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-[#F45B25] transition-colors duration-300 group-hover:bg-[#F45B25] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="BenzinSemibold text-sm tracking-[0.15em] text-white/24">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="BenzinSemibold mt-8 text-xl leading-snug sm:text-2xl">{title}</h3>
                    <p className="mt-3 max-w-sm leading-7 text-white/52">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="opportunities" className="scroll-mt-28 py-24 lg:py-36">
          <div className="mx-auto w-[90%] 2xl:w-[75%]">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-4xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#F45B25]">Opportunities</p>
                <h2 className="BenzinSemibold text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  Find the role that moves you forward.
                </h2>
              </div>
              <p className="text-sm text-white/45">
                {openCareerRoles.length} {openCareerRoles.length === 1 ? 'open role' : 'open roles'}
              </p>
            </div>

            {hasOpenRoles ? (
              <div className="mt-16 border-t border-white/15">
                {openCareerRoles.map((role) => (
                  <article
                    key={role.slug}
                    className="group grid gap-6 border-b border-white/15 py-9 transition lg:grid-cols-[1fr_auto] lg:items-center"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F45B25]">{role.department}</p>
                      <h3 className="BenzinSemibold mt-3 text-2xl sm:text-3xl">{role.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/45">
                        <span>{role.location}</span>
                        <span>·</span>
                        <span>{role.workplace}</span>
                        <span>·</span>
                        <span>{role.employmentType}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-7 w-7 text-white/35 transition group-hover:translate-x-2 group-hover:text-[#F45B25]" />
                  </article>
                ))}
              </div>
            ) : (
              <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(115deg,rgba(244,91,37,.2),rgba(255,255,255,.035))] p-8 sm:p-12 lg:p-16">
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#F45B25]/20 blur-3xl" />
                <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="max-w-3xl">
                    <BriefcaseBusiness className="h-9 w-9 text-[#F45B25]" />
                    <h3 className="BenzinSemibold mt-7 text-3xl leading-tight sm:text-5xl">Nothing open today. Your timing may still be right.</h3>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">
                      Tell us where you do your best work. When the right opportunity opens, we will already know who you are.
                    </p>
                  </div>
                  <Link
                    href="/contact?interest=careers"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#F45B25] px-7 py-4 font-semibold transition hover:-translate-y-1 hover:bg-[#ff6b35]"
                  >
                    Join our talent network
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}

            <p className="mt-7 flex items-center gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4" />
              Roles may be remote, hybrid, or location-based depending on the team.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
