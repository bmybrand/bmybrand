'use client'

import React from 'react'

export default function MarketingSolutions() {
  const solutions = [
    {
      icon: '🎯',
      title: 'Strategy & Planning',
      description: 'Comprehensive marketing strategies with audience research, competitor analysis, channel selection, and campaign planning for maximum ROI.'
    },
    {
      icon: '📢',
      title: 'Content & Social Media',
      description: 'Engaging content creation, social media management, influencer partnerships, and community building across all major platforms.'
    },
    {
      icon: '📈',
      title: 'Growth & Optimization',
      description: 'Performance marketing, conversion optimization, marketing automation, analytics tracking, and continuous campaign improvement.'
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Research & Strategy',
      description: 'Analyze your market, audience, and competitors to develop a data-driven marketing strategy aligned with your goals.'
    },
    {
      number: '02',
      title: 'Campaign Creation',
      description: 'Design and launch multi-channel campaigns with compelling content, creative assets, and targeted messaging.'
    },
    {
      number: '03',
      title: 'Execution & Management',
      description: 'Implement campaigns across channels with active monitoring, community engagement, and real-time adjustments.'
    },
    {
      number: '04',
      title: 'Analysis & Optimization',
      description: 'Track performance metrics, analyze results, and continuously optimize campaigns for better results and ROI.'
    }
  ]

  return (
    <>
      {/* Marketing Solutions Section */}
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Marketing Solutions, End-to-End
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              From strategy to execution, we deliver marketing campaigns that drive awareness, engagement, and conversions.
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
              A Clear Process for Delivering Marketing That Performs
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              Our proven marketing process ensures campaigns are strategic, targeted, and continuously optimized for maximum impact.
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
