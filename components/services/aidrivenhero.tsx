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
            <span className="text-sm tracking-wider text-[#F45B25] BenzinSemibold">
              AI-Driven Solutions
            </span>
            <div className="h-0.5 w-16 bg-[#F45B25]/30" />
          </div>

          <h1 className="mb-6 text-3xl leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl BenzinSemibold">
            Power Your Business with Intelligent Automation
          </h1>

          <p className="mb-12 text-sm leading-relaxed text-white/70 md:text-base lg:text-lg">
            At BMYBrand, a leading AI automation agency in the USA, we design intelligent systems that help businesses work smarter and faster. From AI-driven automation solutions to custom AI software development solutions and company services, we build scalable tools that improve efficiency, reduce manual work, and enhance decision-making.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              'AI Automation Solutions',
              'Custom AI Development',
              'Smart Business Systems',
              'Workflow Automation',
              'Enterprise AI Solutions',
              'AI Integration Services',
              'Scalable AI Systems',
              'Data-Driven Intelligence',
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
          <h2 className="mb-8 text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl BenzinSemibold">AI Solutions We Build <br /> for Modern Businesses</h2>

          <div className="grid items-stretch gap-12 lg:grid-cols-2">
            <div className="h-full">
              <p className="mb-8 text-sm leading-relaxed text-white/60 md:text-base">
                We deliver advanced AI automation services in the USA designed to help businesses work smarter and scale faster. As a trusted AI automation agency in the USA and an AI software development solutions company, we build intelligent systems that streamline operations, improve efficiency, and enhance decision-making. From AI-driven automation solutions to custom AI development services and custom business solutions, our focus is on creating practical, real-world AI-driven digital solutions that transform how businesses operate.
              </p>

              <h3 className="mb-8 text-xl text-[#F45B25] md:text-2xl lg:text-3xl xl:text-4xl BenzinSemibold">
                Move Forward Your Businesses With AI
              </h3>

              <div className="space-y-6">
                {[
                  {
                    number: '1',
                    title: 'AI Automation Solutions',
                    desc: "We build automation systems that streamline workflows, reduce manual tasks, and improve overall business efficiency.",
                  },
                  {
                    number: '2',
                    title: 'Custom AI Development',
                    desc: "We create tailored AI solutions designed specifically for your business needs, goals, and operational challenges.",
                  },
                  {
                    number: '3',
                    title: 'AI Integration Services',
                    desc: "We integrate AI capabilities into existing platforms and systems to enhance performance, automation, and usability.",
                  },
                  {
                    number: '4',
                    title: 'Enterprise AI Solutions',
                    desc: "We deliver scalable AI systems for large organizations to optimize operations, data processing, and decision-making.",
                  },
                  {
                    number: '5',
                    title: 'AI Customer Service Solutions',
                    desc: "We develop AI-powered support tools that improve response time, customer satisfaction, and service availability.",
                  },
                ].map((item) => (
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
