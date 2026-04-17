'use client'

import React from 'react'

export default function DigitalMarketingHero() {
  const features = [
    { icon: '📱', title: 'Social Media', description: 'Engage and grow your audience' },
    { icon: '🔍', title: 'SEO Optimization', description: 'Rank higher in search results' },
    { icon: '✉️', title: 'Email Marketing', description: 'Nurture leads and conversions' },
    { icon: '📊', title: 'Analytics & Insights', description: 'Data-driven decision making' }
  ]

  const impactAreas = [
    { number: '01', title: 'Social Media Marketing', description: 'Build engaged communities and amplify your brand voice across all social platforms with strategic content and community management' },
    { number: '02', title: 'Search Engine Optimization', description: 'Improve your search rankings and organic visibility with technical SEO, content optimization, and link-building strategies' },
    { number: '03', title: 'Content Creation & Strategy', description: 'Create compelling content that resonates with your audience, from blog posts and videos to infographics and podcasts' },
    { number: '04', title: 'Email Marketing & Automation', description: 'Design targeted email campaigns with marketing automation that nurture leads and drive conversions at scale' },
    { number: '05', title: 'Campaign Management & Analytics', description: 'Execute multi-channel campaigns with comprehensive tracking, A/B testing, and performance analytics for continuous optimization' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6 leading-tight">
                Build Marketing That Drives Results
              </h2>
              <p className="text-white/70 text-lg md:text-xl BenzinRegular leading-relaxed">
                Transform your marketing strategy with data-driven campaigns that attract, engage, and convert your ideal customers across all digital channels.
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
              src="/service-marketing-hero.svg" 
              alt="Digital Marketing" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">📱</div>'
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
                Where Marketing Creates Business Impact
              </h2>
              <p className="text-white/70 text-lg BenzinRegular leading-relaxed">
                Digital marketing is the engine of modern growth. We create strategies that attract the right audience, build lasting relationships, and drive measurable business results.
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
