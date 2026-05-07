'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function AIDrivenHero() {
  const router = useRouter()

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 lg:pt-50">
        <div className="absolute inset-0 bg-linear-to-br" />
        <div className="relative z-10 mx-auto w-[90%] 2xl:w-[75%]">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm tracking-wider text-[#F45B25] uppercase BenzinSemibold">
              AI-SOLUTIONS
            </span>
            <div className="h-0.5 w-16 bg-[#F45B25]/30" />
          </div>

          <h1 className="mb-8 text-3xl leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl BenzinSemibold">
            AI-Driven
            <br />
            Solutions
          </h1>

          <p className="mb-12 text-sm leading-relaxed text-white/70 md:text-base lg:text-lg">
            We help businesses work smarter by integrating AI into everyday operations. From automation and
            intelligent analytics to advanced system integrations, our AI-driven solutions are designed to
            reduce manual effort, improve accuracy, and speed up decision-making. Every solution is tailored
            to your workflows, optimizing resources, saving costs today and scalability for the future.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              '3D Process Automation',
              'Smart Workforce Systesm',
              'AI Framework for Scalion',
              'AI Solutions for Teams',
              'AI Powered Documentation',
              'Real-time Data Inference',
              'Integrated Analytics',
              'Automated Report Gen',
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#F45B25]">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div>
          <img
            src="/bmyb-services-service-banner-01.webp"
            alt="AI Solutions in Action"
            className="h-auto w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement!.innerHTML =
                '<div class="flex h-96 items-center justify-center text-6xl text-white/40">AI</div>'
            }}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <h2 className="mb-12 text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl BenzinSemibold">
            Service Overview
          </h2>

          <div className="grid items-stretch gap-12 lg:grid-cols-2">
            <div className="h-full">
              <p className="mb-12 text-sm leading-relaxed text-white/60 md:text-base">
                AI-Driven Solutions focus on integrating intelligent systems into your business to automate
                processes, improve decision-making, and unlock new growth opportunities. From smart automation
                and AI assistants to advanced integrations and personalization, our solutions are designed to
                work seamlessly within your operations while scaling with your business needs.
              </p>

              <h3 className="mb-8 text-xl text-[#F45B25] md:text-2xl lg:text-3xl xl:text-4xl BenzinSemibold">
                Where AI Creates Business Impact
              </h3>

              <div className="space-y-6">
                {[
                  {
                    number: '01',
                    title: 'Operations & Productivity',
                    desc: 'Reduce manual workload and speed up execution with smarter internal workflows.',
                  },
                  {
                    number: '02',
                    title: 'Customer Support & Experience',
                    desc: 'Handle requests faster, improve satisfaction, and support customers anytime with AI-powered help.',
                  },
                  {
                    number: '03',
                    title: 'Sales Enablement & Lead Flow',
                    desc: 'Qualify leads, respond faster, and guide customers toward action with intelligent assistance.',
                  },
                  {
                    number: '04',
                    title: 'Marketing Personalization',
                    desc: 'Deliver more relevant messaging and experiences with AI-driven personalization and segmentation.',
                  },
                  {
                    number: '05',
                    title: 'Data & Decision Intelligence',
                    desc: 'Make better business calls using insights, forecasting, and performance reporting powered by AI.',
                  },
                ].map((item, index) => (
                  <div key={item.number} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#21223F] text-[16px] leading-none font-semibold text-white BenzinSemibold">
                        {item.number}
                      </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-base text-white md:text-lg BenzinSemibold">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-2xl lg:h-full lg:min-h-0">
              <img
                src="/bmyb-services-ai-aioverview-01.webp"
                alt="AI Smart Assistant Interface"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
