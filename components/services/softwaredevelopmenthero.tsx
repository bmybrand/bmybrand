'use client'

import React from 'react'

export default function SoftwareDevelopmentHero() {
  const features = [
    { icon: '💻', title: 'Custom Development', description: 'Tailored solutions for your needs' },
    { icon: '🚀', title: 'Scalable Architecture', description: 'Built to grow with your business' },
    { icon: '🔒', title: 'Secure & Reliable', description: 'Enterprise-grade security standards' },
    { icon: '⚡', title: 'Fast Performance', description: 'Optimized for speed and efficiency' }
  ]

  const impactAreas = [
    { number: '01', title: 'Web & Mobile Applications', description: 'Build responsive websites, mobile apps, and progressive web applications that deliver seamless experiences across all devices' },
    { number: '02', title: 'Custom Software & CMS', description: 'Develop bespoke software solutions and content management systems tailored to your specific business processes' },
    { number: '03', title: 'SaaS Platforms', description: 'Create scalable Software-as-a-Service platforms with robust architecture, multi-tenancy, and subscription management' },
    { number: '04', title: 'Admin Dashboards & Analytics', description: 'Design powerful admin panels and data visualization tools that provide actionable insights for better decision-making' },
    { number: '05', title: 'Blockchain & Web3', description: 'Leverage cutting-edge blockchain technology for secure, decentralized applications and smart contract development' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6 leading-tight">
                Build Software That Scales
              </h2>
              <p className="text-white/70 text-lg md:text-xl BenzinRegular leading-relaxed">
                Transform your ideas into powerful software solutions that drive efficiency, enhance user experience, and fuel business growth through modern technology and best practices.
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
              src="/service-software-hero.svg" 
              alt="Software Development" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">💻</div>'
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
                Where Software Creates Business Impact
              </h2>
              <p className="text-white/70 text-lg BenzinRegular leading-relaxed">
                Custom software is the backbone of modern business. We build solutions that automate processes, improve efficiency, and unlock new revenue opportunities.
              </p>
            </div>

            <div className="space-y-6">
              {impactAreas.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <img
                    src={`https://i.pravatar.cc/96?img=${index + 31}`}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
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
