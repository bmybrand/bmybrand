'use client'

import React from 'react'

export default function BusinessOperationsHero() {
  const features = [
    { icon: '⚙️', title: 'Process Automation', description: 'Automate repetitive tasks' },
    { icon: '📋', title: 'Workflow Design', description: 'Optimize business processes' },
    { icon: '👥', title: 'Team Collaboration', description: 'Enhance teamwork efficiency' },
    { icon: '📊', title: 'Real-time Analytics', description: 'Data-driven insights' }
  ]

  const impactAreas = [
    { number: '01', title: 'Process Automation & Workflow Design', description: 'Eliminate repetitive tasks and optimize business processes with intelligent automation that saves time and reduces errors' },
    { number: '02', title: 'Team Portals & Collaboration Tools', description: 'Build centralized platforms for team communication, document sharing, and project collaboration that boost productivity' },
    { number: '03', title: 'CRM Integrations & Data Systems', description: 'Connect your tools and centralize data with seamless CRM integrations and unified business intelligence systems' },
    { number: '04', title: 'Resource Scheduling & Project Management', description: 'Streamline resource allocation, project tracking, and timeline management with custom scheduling and PM solutions' },
    { number: '05', title: 'Help Desk & BI Analytics', description: 'Implement support ticket systems and business intelligence dashboards for better customer service and decision-making' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6 leading-tight">
                Build Operations That Scale
              </h2>
              <p className="text-white/70 text-lg md:text-xl BenzinRegular leading-relaxed">
                Transform your business operations with automated workflows, integrated systems, and intelligent tools that drive efficiency and enable growth.
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
              src="/service-operations-hero.svg" 
              alt="Business Operations" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">⚙️</div>'
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
                Where Operations Create Business Impact
              </h2>
              <p className="text-white/70 text-lg BenzinRegular leading-relaxed">
                Efficient operations are the foundation of scalable growth. We build systems that eliminate bottlenecks, automate workflows, and empower teams to do their best work.
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
