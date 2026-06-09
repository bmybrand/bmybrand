import Link from 'next/link'

export default function BrandSolutions() {
  const solutions = [
    {
      icon: '/bmyb-global-background1-01.svg',
      title: 'Brand Strategy & Identity',
      description:
        'We define your brand direction using brand identity development services to build a strong foundation. As a digital branding agency, we ensure clear positioning, research, and strategy that help businesses seeking a branding company in Texas.',
    },
    {
      icon: '/bmyb-global-background2-01.svg',
      title: 'Logo & Visual Design',
      description:
        'We design impactful logos and visuals through branding and logo design services. Our focus on brand identity development services ensures consistency and a strong visual system for businesses looking for affordable brand development agency solutions.',
    },
    {
      icon: '/bmyb-global-background3-01.svg',
      title: 'Digital Brand Experience',
      description:
        'We create seamless digital experiences using brand identity development services across websites and platforms. As a digital branding agency, we help brands achieve consistency and impact for users searching for branding identity development services.',
    },
  ]

  const process = [
    {
      number: '01',
      title: 'Discovery & Research',
      description:
        'Deep dive into your business, audience, and market to understand what makes your brand unique and valuable.',
    },
    {
      number: '02',
      title: 'Strategy & Positioning',
      description:
        'Define your brand architecture, messaging framework, and strategic positioning in the market.',
    },
    {
      number: '03',
      title: 'Design & Development',
      description:
        'Create comprehensive visual identity systems and brand assets that resonate with your target audience.',
    },
    {
      number: '04',
      title: 'Launch & Guidelines',
      description:
        'Deliver complete brand guidelines and support for successful implementation across all channels.',
    },
  ]

  return (
    <>
      <section className="bg-[#191A35] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl text-white BenzinBold md:text-5xl lg:text-6xl">
              Our Services That Define Your Brand Identity
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl">
              At BmyBrand, we offer complete brand experience services designed to build strong, consistent,
              and memorable brands. From brand identity development services and branding and logo design
              services to strategy, messaging, and digital presence,
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="rounded-2xl border border-white/10 bg-[#191A35] p-8 transition-all duration-300 hover:border-[#F45B25]/50"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#202141] p-3">
                  <img src={solution.icon} alt="" width={40} height={40} className="h-full w-full object-contain" />
                </div>
                <h3 className="border-b border-white/10 pb-8 text-lg text-white BenzinBold">{solution.title}</h3>
                <p className="mt-8 leading-relaxed text-white/70">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl text-white BenzinBold md:text-5xl lg:text-6xl">
              Our Approach to Brand Development
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl">
              Our process is designed to create clarity, consistency, and impact at every stage of brand
              building. As a digital branding agency, we follow a structured approach that combines strategy,
              design, and execution
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-8 hidden h-[2px] bg-white/10 lg:block">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {process.map((step) => (
                <div key={step.number} className="group relative text-center">
                  <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#202141] transition-colors duration-300 group-hover:bg-[#F45B25]">
                    <span className="text-lg font-semibold text-white">{step.number}</span>
                  </div>
                  <h3 className="mb-3 text-xl text-white BenzinBold">{step.title}</h3>
                  <p className="leading-relaxed text-white/70">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="flex w-full justify-center text-center">
              <p className="flex w-fit items-center gap-2 rounded-full border-2 border-[#2A2B47] bg-[#202141] px-5 py-3 text-center text-sm text-white/70 md:text-base lg:text-lg">
                Ready to build a brand that stands out?{' '}
                <Link
                  href="/strategy-call"
                  className="BenzinSemibold inline-flex min-h-11 items-center gap-2 text-[#F45B25] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FF843E]"
                >
                  {String.fromCharCode(8594)} LET&apos;S TALK
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
