'use client'

import React from 'react'

export default function BrandExperienceHero() {
  const features = [
    { icon: '🎯', title: 'Strategic Positioning', description: 'Define your unique market position' },
    { icon: '✨', title: 'Visual Identity', description: 'Create memorable brand aesthetics' },
    { icon: '💬', title: 'Brand Storytelling', description: 'Craft compelling narratives' },
    { icon: '🎨', title: 'Design Systems', description: 'Build cohesive brand guidelines' }
  ]

  const impactAreas = [
    { number: '01', title: 'Brand Identity & Logo Design', description: 'Create a distinctive visual identity that captures your essence and stands out in the market' },
    { number: '02', title: 'UI/UX Design', description: 'Design intuitive interfaces that provide seamless user experiences across all touchpoints' },
    { number: '03', title: 'Brand Strategy', description: 'Develop comprehensive strategies that align with your business goals and resonate with your audience' },
    { number: '04', title: 'Visual Design & Typography', description: 'Craft beautiful visual systems with carefully selected typography that enhances brand recognition' },
    { number: '05', title: 'Marketing Kits & User Research', description: 'Deliver complete brand toolkits backed by deep user insights and research-driven decisions' }
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
              <p className="text-white/70 text-lg md:text-xl BenzinRegular leading-relaxed">
                Transform your vision into a powerful brand identity that connects with your audience and drives business growth through strategic design and compelling storytelling.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#1a1a2e] p-6 rounded-2xl border border-white/10 hover:border-[#F45B25]/50 transition-all duration-300">
                  <div className="text-4xl mb-3">{feature.icon}</div>
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
              src="/service-brand-hero.svg" 
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
      <section className="py-20 px-6 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl BenzinBold mb-6 leading-tight">
                Where Brand Creates Business Impact
              </h2>
              <p className="text-white/70 text-lg BenzinRegular leading-relaxed">
                Your brand is more than just a logo—it's the complete experience your customers have with your business. We create brand identities that drive recognition, build trust, and inspire loyalty.
              </p>
            </div>

            <div className="space-y-6">
              {impactAreas.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-lg text-white/60 BenzinBold shrink-0">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-white text-xl BenzinSemibold mb-2">{item.title}</h3>
                    <p className="text-white/60 BenzinRegular leading-relaxed">{item.description}</p>
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
