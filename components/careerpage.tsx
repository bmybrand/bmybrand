import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code2, HeartHandshake, Lightbulb, MapPin, Palette, Sparkles, Users2 } from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'

const values = [
  { icon: Lightbulb, title: 'Own the idea', text: 'Bring a point of view, ask better questions, and help shape the work—not just your part of it.' },
  { icon: HeartHandshake, title: 'Build with care', text: 'Care about the details, the people using what we make, and the teammates building it beside you.' },
  { icon: Users2, title: 'Share the win', text: 'Great work is collaborative. We communicate clearly, give credit freely, and grow together.' },
]

const teams = [
  { icon: Palette, title: 'Design & Brand', text: 'Brand systems, digital products, UI/UX, motion, and visual storytelling.' },
  { icon: Code2, title: 'Technology', text: 'Web, mobile, cloud, AI automation, and dependable digital platforms.' },
  { icon: Sparkles, title: 'Growth & Strategy', text: 'Research, content, search, campaigns, and measurable business growth.' },
]

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#11122F] text-white">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-[5%] pb-20 pt-44 lg:px-[7.5%] lg:pb-28 lg:pt-52">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(244,91,37,.22),transparent_32%),radial-gradient(circle_at_15%_70%,rgba(109,91,255,.14),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[1fr_.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/70"><span className="h-2 w-2 rounded-full bg-[#31C48D]" />Careers at BmyBrand</div>
              <h1 className="BenzinSemibold text-[clamp(3rem,7.3vw,7.6rem)] leading-[.92] tracking-[-.06em]">Make work<br /><span className="text-[#F45B25]">worth sharing.</span></h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">Join a curious, collaborative team turning ambitious ideas into brands, products, and technology that move businesses forward.</p>
              <div className="mt-9 flex flex-wrap gap-4"><a href="#opportunities" className="inline-flex items-center gap-2 rounded-xl bg-[#F45B25] px-6 py-4 font-semibold transition hover:-translate-y-1">Explore opportunities <ArrowRight className="h-5 w-5" /></a><a href="#life-at-bmybrand" className="rounded-xl border border-white/20 bg-white/[.04] px-6 py-4 font-semibold transition hover:bg-white/10">Life at BmyBrand</a></div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[.05] sm:min-h-[560px]">
              <Image src="/bmyb-navbar-company-01.webp" alt="The BmyBrand team collaborating" fill priority className="object-cover" sizes="(max-width: 1024px) 90vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11122F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/15 bg-[#11122F]/65 p-5 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8"><div><p className="BenzinSemibold text-lg">Different disciplines.</p><p className="mt-1 text-sm text-white/55">One connected team.</p></div><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F45B25]"><Users2 className="h-5 w-5" /></div></div>
            </div>
          </div>
        </section>

        <section id="life-at-bmybrand" className="px-[5%] py-20 lg:px-[7.5%] lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20"><div><p className="mb-4 text-sm uppercase tracking-[.18em] text-[#F45B25]">How we work</p><h2 className="BenzinSemibold text-4xl leading-tight sm:text-5xl">Good people make great work possible.</h2></div><p className="max-w-3xl self-end text-lg leading-8 text-white/60">We bring strategy, creativity, and engineering into the same room. That means fewer handoffs, more shared context, and the freedom to solve the real problem together.</p></div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">{values.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-[1.75rem] border border-white/12 bg-white/[.045] p-7 sm:p-9"><div className="mb-12 flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F45B25]/15 text-[#F45B25]"><Icon /></span><span className="BenzinSemibold text-sm text-white/20">0{index + 1}</span></div><h3 className="BenzinSemibold text-2xl">{title}</h3><p className="mt-4 leading-7 text-white/55">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#F45B25] px-[5%] py-20 text-white lg:px-[7.5%] lg:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] sm:min-h-[520px]"><Image src="/bmyb-about-bmybrand-02.webp" alt="Creative collaboration at BmyBrand" fill className="object-cover" sizes="(max-width: 1024px) 90vw, 45vw" /></div>
            <div className="lg:pl-10"><p className="mb-4 text-sm uppercase tracking-[.18em] text-white/70">What you can expect</p><h2 className="BenzinSemibold text-4xl leading-tight sm:text-6xl">Space to do your best work.</h2><div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">{['Meaningful ownership', 'Cross-discipline learning', 'Clear, direct feedback', 'Flexible collaboration', 'Room to experiment', 'Work with real impact'].map((item) => <div key={item} className="border-t border-white/30 pt-4 text-lg font-semibold">{item}</div>)}</div></div>
          </div>
        </section>

        <section id="opportunities" className="px-[5%] py-20 lg:px-[7.5%] lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 max-w-3xl"><p className="mb-4 text-sm uppercase tracking-[.18em] text-[#F45B25]">Find your lane</p><h2 className="BenzinSemibold text-4xl sm:text-6xl">Where could you make an impact?</h2><p className="mt-6 text-lg leading-8 text-white/55">Our opportunities evolve with the work. Explore the disciplines we regularly hire across, then introduce yourself.</p></div>
            <div className="grid gap-5 lg:grid-cols-3">{teams.map(({ icon: Icon, title, text }) => <article key={title} className="group rounded-[1.75rem] border border-white/12 bg-white/[.045] p-8 transition hover:-translate-y-1 hover:border-[#F45B25]/60 sm:p-10"><Icon className="h-9 w-9 text-[#F45B25]" /><h3 className="BenzinSemibold mt-16 text-2xl">{title}</h3><p className="mt-4 min-h-20 leading-7 text-white/55">{text}</p><Link href={`/contact?interest=careers&team=${encodeURIComponent(title)}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-white transition group-hover:text-[#F45B25]">Introduce yourself <ArrowRight className="h-4 w-4" /></Link></article>)}</div>
            <div className="mt-6 flex flex-col justify-between gap-7 rounded-[1.75rem] border border-white/12 bg-[linear-gradient(110deg,rgba(244,91,37,.18),rgba(255,255,255,.04))] p-8 sm:flex-row sm:items-center sm:p-10"><div><h3 className="BenzinSemibold text-2xl sm:text-3xl">Don’t see your exact role?</h3><p className="mt-3 text-white/55">Send us your portfolio or profile. Great people are always worth meeting.</p></div><Link href="/contact?interest=careers" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#181932] transition hover:-translate-y-1">Join our talent network <ArrowRight className="h-5 w-5" /></Link></div>
            <p className="mt-7 flex items-center gap-2 text-sm text-white/40"><MapPin className="h-4 w-4" />Opportunities may be remote, hybrid, or location-based depending on the role.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
