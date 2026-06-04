'use client'

import React from 'react'

export default function BrandSolutions() {
  const solutions = [
    {
      icon: '/bmyb-global-background1-01.svg',
      title: 'Brand Strategy & Identity',
      description: 'We define your brand direction using brand identity development services to build a strong foundation. As a digital branding agency, we ensure clear positioning, research, and strategy that help businesses seeking a branding company in Texas.'
    },
    {
      icon: '/bmyb-global-background2-01.svg',
      title: 'Logo & Visual Design',
      description: 'We design impactful logos and visuals through branding and logo design services. Our focus on brand identity development services ensures consistency and a strong visual system for businesses looking for affordable brand development agency solutions.'
    },
    {
      icon: '/bmyb-global-background3-01.svg',
      title: 'Digital Brand Experience',
      description: 'We create seamless digital experiences using brand identity development services across websites and platforms. As a digital branding agency, we help brands achieve consistency and impact for users searching for branding identity development services.'
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Discovery & Research',
      description: 'Deep dive into your business, audience, and market to understand what makes your brand unique and valuable.'
    },
    {
      number: '02',
      title: 'Strategy & Positioning',
      description: 'Define your brand architecture, messaging framework, and strategic positioning in the market.'
    },
    {
      number: '03',
      title: 'Design & Development',
      description: 'Create comprehensive visual identity systems and brand assets that resonate with your target audience.'
    },
    {
      number: '04',
      title: 'Launch & Guidelines',
      description: 'Deliver complete brand guidelines and support for successful implementation across all channels.'
    }
  ]

  return (
    <>
      {/* Brand Solutions Section */}
      <section className="py-20 px-6  bg-[#191A35]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Services That Define Your Brand Identity
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto ">
              At BmyBrand, we offer complete brand experience services designed to build strong, consistent,
              and memorable brands. From brand identity development services and branding and logo
              design services to strategy, messaging, and digital presence,
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className=" bg-[#191A35] p-8 rounded-2xl border border-white/10 hover:border-[#F45B25]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[#202141] overflow-hidden p-3">
                  <img src={solution.icon} alt="" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-white text-lg BenzinBold  border-b border-white/10 pb-8">{solution.title}</h3>
                <p className="mt-8 text-white/70  leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Approach to Brand Development
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto ">
              Our process is designed to create clarity, consistency, and impact at every stage of brand
              building. As a digital branding agency, we follow a structured approach that combines strategy,
              design, and execution
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {process.map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#202141] group-hover:bg-[#F45B25] flex items-center justify-center relative z-10 transition-colors duration-300">
                    <span className="text-white text-lg font-semibold">{step.number}</span>
                  </div>
                  <h3 className="text-white text-xl BenzinBold mb-3">{step.title}</h3>
                  <p className="text-white/70  leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center w-full flex justify-center">
              <p className="text-white/70 text-sm md:text-base lg:text-lg bg-[#202141] border-2 border-[#2A2B47] rounded-full py-3 px-5 w-fit text-center flex items-center gap-2">
                Ready to build a brand that stands out?{' '}
                <button className="text-[#F45B25] hover:text-[#FF843E] hover:-translate-y-0.5 transition-all duration-300 BenzinSemibold inline-flex items-center gap-2">
                  → LET'S TALK
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
