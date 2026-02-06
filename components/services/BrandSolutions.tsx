'use client'

import React from 'react'

export default function BrandSolutions() {
  const solutions = [
    {
      icon: '🎨',
      title: 'Brand Identity Design',
      description: 'Complete visual identity systems including logos, color palettes, typography, and brand guidelines that ensure consistency across all touchpoints.'
    },
    {
      icon: '💎',
      title: 'Brand Strategy & Positioning',
      description: 'Strategic frameworks that define your brand purpose, values, voice, and market positioning to differentiate you from competitors.'
    },
    {
      icon: '✨',
      title: 'UI/UX & Visual Design',
      description: 'Beautiful, user-centric interfaces with comprehensive design systems, style guides, and marketing materials that bring your brand to life.'
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
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Brand Solutions, End-to-End
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              From initial strategy to final implementation, we provide comprehensive brand solutions that drive business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="bg-[#1a1a2e] p-8 rounded-2xl border border-white/10 hover:border-[#F45B25]/50 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{solution.icon}</div>
                <h3 className="text-white text-2xl BenzinBold mb-4">{solution.title}</h3>
                <p className="text-white/70 BenzinRegular leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#15173A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              A Clear Process for Delivering Brands That Perform
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              Our proven methodology ensures your brand not only looks great but drives measurable business results.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {process.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F45B25] flex items-center justify-center relative z-10 border-4 border-[#15173A]">
                    <span className="text-white text-xl BenzinBold">{step.number}</span>
                  </div>
                  <h3 className="text-white text-xl BenzinBold mb-3">{step.title}</h3>
                  <p className="text-white/70 BenzinRegular leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
