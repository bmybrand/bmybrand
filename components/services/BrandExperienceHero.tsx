'use client'

import React from 'react'

export default function BrandExperienceHero() {
  const features = [
    { image: '/Background+Shadow.svg', title: 'Strategic Positioning', description: 'Define your brand\'s unique value, voice, and market advantage.' },
    { image: '/Background+Shadow-1.svg', title: 'Visual Identity', description: 'Craft a cohesive visual system that reflects authority and trust.' },
    { image: '/Background+Shadow-2.svg', title: 'Brand Storytelling', description: 'Create narratives that connect with your audience on a deeper level.' },
    { image: '/Background+Shadow-3.svg', title: 'Design Systems', description: 'Develop scalable brand guidelines for consistent growth.' }
  ]

  const impactAreas = [
    { number: '01', title: 'Brand Identity & Logo Design', description: 'Memorable, scalable identities that establish credibility & recognition.' },
    { number: '02', title: 'UI/UX Design', description: 'User experiences built to guide, engage, and convert.' },
    { number: '03', title: 'Brand Messaging Framework', description: 'Clear messaging architecture that strengthens positioning.' },
    { number: '04', title: 'Visual Design & Typography', description: 'Structured design systems that ensure visual consistency.' },
    { number: '05', title: 'Marketing Kits & Assets', description: 'Complete brand assets for campaigns, social, and digital channels.' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6 leading-tight">
                Build Brands That Resonate
              </h2>
              <p className="text-white/70 text-lg md:text-xl  leading-relaxed">
                Your brand is more than a logo — it&apos;s the perception people form the moment they encounter your business. It influences trust, credibility, and buying decisions before a single word is spoken. At BMYBrand, we combine strategic positioning, visual identity systems, and user-centered design to build brands that are clear, consistent, and impossible to ignore.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#191A35] p-6 rounded-xl border-2 border-white/10 hover:border-[#F45B25]/50 transition-all duration-300">
                  <img src={feature.image} alt="" className="w-16 h-16 mb-3 object-contain" />
                  <h3 className="text-white text-lg BenzinSemibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm BenzinRegular">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#1a1a2e] to-[#11122F] border border-white/10">
            <img 
              src="/brand.gif" 
              alt="Brand Experience" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">🎨</div>'
              }}
            />
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-20">
            <div>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl BenzinBold mb-6 leading-tight">
                Where Branding Builds Competitive Advantage
              </h2>
              <div className="space-y-4 text-white/70 text-lg  leading-relaxed">
                <p>
                  We don&apos;t design for aesthetics alone — we design for outcomes. A strong brand should support business growth, improve customer perception, and create measurable results across every touchpoint. At BMYBrand, we build structured brand ecosystems that align strategy, messaging, and design into one cohesive system engineered for long-term performance.
                </p>
                <p>
                  From first impression to customer loyalty, every brand element we create is intentional — designed to increase clarity, strengthen trust, and drive meaningful engagement.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full">
              {impactAreas.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg text-white BenzinBold shrink-0">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-white text-xl BenzinSemibold mb-2">{item.title}</h3>
                    <p className="text-white/60  leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
