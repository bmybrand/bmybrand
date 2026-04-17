'use client'

import React from 'react'

export default function BrandSolutions() {
  const solutions = [
    {
      icon: '/Background1.svg',
      title: 'Brand Identity Design',
      description: 'Complete visual identity systems that reflect your brand\'s purpose and personality. From logo architecture and color palettes to typography and brand guidelines, we create cohesive identities that ensure clarity and consistency across every touchpoint.'
    },
    {
      icon: '/Background2.svg',
      title: 'Brand Strategy & Direction',
      description: 'Strategic brand foundations built on research, competitive insight, and market clarity. We define your positioning, value proposition, and messaging framework to clearly differentiate your brand, strengthen credibility, & establish long-term authority within your industry.'
    },
    {
      icon: '/Background3.svg',
      title: 'UI/UX & Visual Design',
      description: 'User-centered digital experiences designed to drive engagement and meaningful conversions. Through intuitive interfaces, mobile-first layouts, and scalable design systems, we transform brand strategy into seamless, high-performing digital interactions.'
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
              Our Brand Solutions, End-to-End
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto ">
              At BMYBrand, we deliver complete brand ecosystems — not just visual updates. From defining your strategic positioning to designing scalable identity systems and high-performing digital experiences, we build brands with purpose and precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className=" bg-[#191A35] p-8 rounded-2xl border border-white/10 hover:border-[#F45B25]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
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
              A Clear Process for Delivering Brands That Perform
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto ">
              Our proven methodology ensures your brand not only looks great but drives measurable business results.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {process.map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#202141] group-hover:bg-[#F45B25] flex items-center justify-center relative z-10 border-4 border-[#15173A] transition-colors duration-300">
                    <span className="text-white text-xl BenzinBold">{step.number}</span>
                  </div>
                  <h3 className="text-white text-xl BenzinBold mb-3">{step.title}</h3>
                  <p className="text-white/70  leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
