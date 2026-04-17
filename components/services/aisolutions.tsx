'use client'

import React from 'react'

export default function AISolutions() {
  return (
    <>
      {/* AI Solutions Section */}
      <section className="py-20 ">
        <div className="w-[90%] 2xl:w-[75%] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white BenzinSemibold mb-12 text-center">
            Our AI Solutions, End-to-End
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: '/solutionsicon.svg',
                title: 'AI Strategy &\nPlanning',
                items: ['Business Analysis', 'AI Roadmap Creation', 'Use-Case Validation']
              },
              {
                icon: '/solutionsicon2.svg',
                title: 'AI Development\n& Automation',
                items: ['Custom AI Models', 'Workflow Automation', 'Intelligent Assistants']
              },
              {
                icon: '/solutionsicon3.svg',
                title: 'Deployment &\nScaling',
                items: ['System Integration', 'Testing & Optimization', 'Ongoing Support']
              }
            ].map((solution, index) => (
              <div 
                key={index} 
                className=" rounded-lg p-8 border border-white/10 hover:border-[#F45B25]/30 transition-all duration-300"
              >
                <div className="text-6xl mb-6 text-[#F45B25]"><img src={solution.icon} alt="" /></div>
                <h3 className="text-lg md:text-xl lg:text-2xl text-white BenzinSemibold mb-6 whitespace-pre-line">
                  {solution.title}
                </h3>
                <hr className="border-white/10 my-4" />
                <ul className="space-y-3">
                  {solution.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/60">
                      <svg className="w-4 h-4 text-[#F45B25] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-20 ">
        <div className="w-[90%] 2xl:w-[75%] mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white BenzinSemibold mb-16 text-center">
            A Clear Process for<br />Delivering AI That Performs
          </h2>

          <div className="relative">
            {/* Connecting line - hidden on mobile, visible on large screens */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  number: '01',
                  title: 'Operations &\nProductivity',
                  desc: 'Assess goals, workflows, and data to identify the right AI opportunities.'
                },
                {
                  number: '02',
                  title: 'Solution Design &\nPlanning',
                  desc: 'Design AI workflows and automation tailored to your business systems.'
                },
                {
                  number: '03',
                  title: 'Develop, Integrate\n& Validate',
                  desc: 'Build AI solutions, integrate tools, and test real-world performance.'
                },
                {
                  number: '04',
                  title: 'Launch, Monitor\n& Optimize',
                  desc: 'Deploy, monitor, and optimize for long-term performance.'
                }
              ].map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#202141] group-hover:bg-[#F45B25] flex items-center justify-center relative z-10 border-4 border-[#15173A] transition-colors duration-300">
                    <span className="text-white text-xl BenzinBold">{step.number}</span>
                  </div>
                  <h3 className="text-xl text-white BenzinSemibold mb-4 whitespace-pre-line">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */} 
          <div className="text-center w-full flex justify-center">
            <p className="text-white/70 text-sm md:text-base lg:text-lg bg-[#202141] border-2 border-[#2A2B47] rounded-full py-3 px-5 w-fit text-center flex items-center gap-2">
              Ready to build smarter systems with AI?{' '}
              <button className="text-[#F45B25] hover:text-[#FF843E] hover:-translate-y-0.5 transition-all duration-300 BenzinSemibold inline-flex items-center gap-2">
                → LET'S TALK
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
