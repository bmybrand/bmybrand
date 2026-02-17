'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function AIDrivenHero() {
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20  overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br" />
        <div className="w-[90%] 2xl:w-[75%] mx-auto relative z-10">

          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#F45B25] text-sm tracking-wider uppercase BenzinSemibold">AI-SOLUTIONS</span>
            <div className="h-[2px] w-16 bg-[#F45B25]/30"></div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl text-white BenzinSemibold mb-8 leading-tight">
            AI-Driven<br />Solutions
          </h1>

          <p className="text-base md:text-lg text-white/70 mb-12  leading-relaxed">
            We help businesses work smarter by integrating AI into everyday operations. From automation and intelligent analytics to advanced 
            system integrations, our AI-driven solutions are designed to reduce manual effort, improve accuracy, and speed up decision-making. Every 
            solution is tailored to your workflows—optimizing resources, saving costs today and scalability for the future.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '☑', text: '3D Process Automation' },
              { icon: '☑', text: 'Smart Workforce Systesm' },
              { icon: '☑', text: 'AI Framework for Scalion' },
              { icon: '☑', text: 'AI Solutions for Teams' },
              { icon: '☑', text: 'AI Powered Documentation' },
              { icon: '☑', text: 'Real-time Data Inference' },
              { icon: '☑', text: 'Integrated Analytics' },
              { icon: '☑', text: 'Automated Report Gen' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[rgba(191,33,47,1)] rounded flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="">
        <div className="">
          <img 
              src="/service-banner.svg" 
              alt="AI Solutions in Action" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-96 text-white/40 text-6xl">🤖</div>'
              }}
            />
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 ">
        <div className="w-[90%] 2xl:w-[75%] mx-auto">
          <h2 className="text-4xl md:text-5xl text-white BenzinSemibold mb-12">
            Service Overview
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-white/60 text-base leading-relaxed mb-12">
                AI-Driven Solutions focus on integrating intelligent systems into your business to automate processes, improve decision-making, and unlock new growth opportunities. From smart automation and AI assistants to advanced integrations and personalization, our solutions are designed to work seamlessly within your operations while scaling with your business needs.
              </p>
              
              <h3 className="text-3xl md:text-4xl text-[#F45B25] BenzinSemibold mb-8">
                Where AI Creates Business Impact
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    number: '01',
                    title: 'Operations & Productivity',
                    desc: 'Reduce manual workload and speed up execution with smarter internal workflows.'
                  },
                  {
                    number: '02',
                    title: 'Customer Support & Experience',
                    desc: 'Handle requests faster, improve satisfaction, and support customers anytime with AI-powered help.'
                  },
                  {
                    number: '03',
                    title: 'Sales Enablement & Lead Flow',
                    desc: 'Qualify leads, respond faster, and guide customers toward action with intelligent assistance.'
                  },
                  {
                    number: '04',
                    title: 'Marketing Personalization',
                    desc: 'Deliver more relevant messaging and experiences with AI-driven personalization and segmentation.'
                  },
                  {
                    number: '05',
                    title: 'Data & Decision Intelligence',
                    desc: 'Make better business calls using insights, forecasting, and performance reporting powered by AI.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#21223F] flex items-center justify-center text-lg text-white BenzinBold shrink-0">
                      {item.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg text-white BenzinSemibold mb-2">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden ">
              <img 
                src="/aioverview.svg" 
                alt="AI Smart Assistant Interface" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full min-h-[600px] bg-linear-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl text-white/40 text-6xl">🤖</div>'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
