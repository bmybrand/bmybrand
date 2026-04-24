'use client'

import React from 'react'

export default function BrandExperienceHero() {
  const [activePrimaryCard, setActivePrimaryCard] = React.useState<'audit' | 'strategy'>('audit')

  const features = [
    { image: '/bmyb-services-brand-background-shadow-01.svg', title: 'Strategic Positioning', description: 'Define your brand\'s unique value, voice, and market advantage.' },
    { image: '/bmyb-logo-group-1597884236-01.svg', title: 'Visual Identity', description: 'Craft a cohesive visual system that reflects authority and trust.' },
    { image: '/bmyb-services-brand-background-shadow-2-01.svg', title: 'Brand Storytelling', description: 'Create narratives that connect with your audience on a deeper level.' },
    { image: '/bmyb-services-brand-background-shadow-3-01.svg', title: 'Design Systems', description: 'Develop scalable brand guidelines for consistent growth.' }
  ]

  const impactAreas = [
    { number: '01', title: 'Brand Identity & Logo Design', description: 'Memorable, scalable identities that establish credibility & recognition.' },
    { number: '02', title: 'UI/UX Design', description: 'User experiences built to guide, engage, and convert.' },
    { number: '03', title: 'Brand Messaging Framework', description: 'Clear messaging architecture that strengthens positioning.' },
    { number: '04', title: 'Visual Design & Typography', description: 'Structured design systems that ensure visual consistency.' },
    { number: '05', title: 'Marketing Kits & Assets', description: 'Complete brand assets for campaigns, social, and digital channels.' }
  ]

  const primaryCardContent =
    activePrimaryCard === 'audit'
      ? {
          heading: 'Find The Gaps In Your Digital',
          emphasis: 'Brand Experience',
          description: 'Uncover gaps in usability, messaging, and conversion.',
          cta: 'Start Website Audit'
        }
      : {
          heading: 'Book A Strategy Call',
          emphasisPrefix: 'Built Around ',
          emphasis: 'Your Goals',
          description: 'Schedule a quick strategy call for your brand & growth.',
          cta: 'Book Strategy Call'
        }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6 leading-tight">
                Build Brands That Resonate
              </h2>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                Your brand is more than a logo - it&apos;s the perception people form the moment they encounter your business. It influences trust, credibility, and buying decisions before a single word is spoken. At BMYBrand, we combine strategic positioning, visual identity systems, and user-centered design to build brands that are clear, consistent, and impossible to ignore.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="rounded-xl border-2 border-white/10 bg-[#191A35] p-6 transition-all duration-300 hover:border-[#F45B25]/50">
                  <img src={feature.image} alt="" className="mb-3 h-16 w-16 object-contain" />
                  <h3 className="text-white text-lg BenzinSemibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm BenzinRegular">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid auto-rows-[6.4rem] gap-4 md:grid-cols-12 md:auto-rows-[6.4rem]">
            <div className="group relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-5 md:row-span-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,91,37,0.18),transparent_48%)]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,rgba(244,91,37,0.28),transparent_68%)]" />
              <div className="relative z-10 flex h-full flex-col pb-32">
                <div className="flex items-center justify-between gap-3">
                  <img
                    src="/bmyb-services-brand-bmybrand-01-01.svg"
                    alt="BMYBrand"
                    className="h-10 w-auto object-contain"
                  />
                  <div className="inline-flex h-11 items-center rounded-full border border-white/25 bg-transparent px-1.5 text-[0.62rem] text-white/78">
                    <button
                      type="button"
                      onClick={() => setActivePrimaryCard('audit')}
                      className={`inline-flex h-8 items-center rounded-full px-4 transition-colors ${
                        activePrimaryCard === 'audit' ? 'bg-[#FF6A2B] text-white' : 'text-white/78'
                      }`}
                    >
                      Website Audit
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePrimaryCard('strategy')}
                      className={`inline-flex h-8 items-center rounded-full px-4 transition-colors ${
                        activePrimaryCard === 'strategy' ? 'bg-[#FF6A2B] text-white' : 'text-white/78'
                      }`}
                    >
                      Strategy Call
                    </button>
                  </div>
                </div>

                <div className="mx-auto mt-8 max-w-[29rem] text-center">
                  <h3 className="text-[25px] leading-[1.15] text-white BenzinSemibold">
                    {primaryCardContent.heading}
                    <span className="mt-2 block">
                      {primaryCardContent.emphasisPrefix ?? ''}
                      <span className="text-[#FF6A2B]">{primaryCardContent.emphasis}</span>
                    </span>
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/58">
                    {primaryCardContent.description}
                  </p>
                  <button className="mt-6 rounded-[0.45rem] bg-[#FF6A2B] px-7 py-4 text-sm text-white BenzinSemibold">
                    {primaryCardContent.cta}
                  </button>
                </div>

              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
                <div className="relative h-64 w-[20rem]">
                  <div className="absolute inset-0 flex items-end justify-center">
                    <img
                      src="/bmyb-services-brand-bento-mark-01.svg"
                      alt="BMYBrand mark"
                      className="h-auto w-[35rem] max-w-none object-contain translate-y-[14rem] transition-transform duration-300 ease-out group-hover:translate-y-[13.2rem]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-3 md:row-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
              <div className="relative z-10 flex h-full items-center justify-center">
                <img
                  src="/bmyb-services-brand-bento-icons-01.svg"
                  alt="Brand workflow icons"
                  className="h-auto w-[12rem] object-contain"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-4 md:row-span-5">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(136,73,47,0.42),rgba(28,29,61,0.96)_42%,rgba(28,29,61,1)_100%)]" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <img
                    src="/bmyb-logo-group-1597884236-01.svg"
                    alt="BMYBrand"
                    className="h-11 w-auto object-contain"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-[38px] leading-[1.15] text-white BenzinSemibold">
                    The Edge
                    <span className="block">Your Brand</span>
                    <span className="block">Needs</span>
                  </h3>
                </div>

                <div className="relative mt-8 flex-1 overflow-hidden">
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button className="flex-1 rounded-full border border-white/55 px-4 py-3 text-left text-[11px] text-white/75">
                    Send message
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85">
                    <span className="text-lg leading-none">♡</span>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85">
                    <span className="text-lg leading-none">↗</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-3 md:row-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_52%)]" />
              <div className="relative z-10 flex h-full items-center justify-center p-4">
                <img
                  src="/bmyb-services-brand-bento-mark-alt-01.svg"
                  alt="BMYBrand alternate mark"
                  className="h-auto w-[6rem] object-contain"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-8 md:row-span-1">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,91,37,0.16),rgba(255,255,255,0.03),rgba(244,91,37,0.16))]" />
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-3 md:row-span-3">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,91,37,0.2),transparent_46%)]" />
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-5 md:row-span-3">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-4 md:row-span-3">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_58%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 grid items-stretch gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl BenzinBold mb-6 leading-tight">
                Where Branding Builds Competitive Advantage
              </h2>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                <p>
                  We don&apos;t design for aesthetics alone - we design for outcomes. A strong brand should support business growth, improve customer perception, and create measurable results across every touchpoint. At BMYBrand, we build structured brand ecosystems that align strategy, messaging, and design into one cohesive system engineered for long-term performance.
                </p>
                <p>
                  From first impression to customer loyalty, every brand element we create is intentional - designed to increase clarity, strengthen trust, and drive meaningful engagement.
                </p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between">
              {impactAreas.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white BenzinSemibold">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-white text-xl BenzinSemibold mb-2">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#11122F] md:h-[500px] lg:h-[600px]">
            <img
              src="/bmyb-services-brand-brand-01.gif"
              alt="Brand Experience"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex h-full items-center justify-center text-6xl text-white/40">Brand</div>'
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
