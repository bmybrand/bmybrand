'use client'

import React from 'react'

export default function AISolutions() {
  return (
    <>
      {/* AI Solutions Section */}
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white BenzinSemibold mb-12 text-center">
            Our AI Solutions, End-to-End
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: '🎯',
                title: 'AI Strategy &\nPlanning',
                items: ['Business Analysis', 'AI Roadmap Creation', 'Use-Case Validation']
              },
              {
                icon: '⚙️',
                title: 'AI Development\n& Automation',
                items: ['Custom AI Models', 'Workflow Automation', 'Intelligent Assistants']
              },
              {
                icon: '🚀',
                title: 'Deployment &\nScaling',
                items: ['System Integration', 'Testing & Optimization', 'Ongoing Support']
              }
            ].map((solution, index) => (
              <div 
                key={index} 
                className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10 hover:border-[#F45B25]/30 transition-all duration-300"
              >
                <div className="text-6xl mb-6 text-[#F45B25]">{solution.icon}</div>
                <h3 className="text-2xl text-white BenzinSemibold mb-6 whitespace-pre-line">
                  {solution.title}
                </h3>
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
      <section className="py-20 px-6 bg-[#15173A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white BenzinSemibold mb-16 text-center">
            A Clear Process for<br />Delivering AI That Performs
          </h2>

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
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F45B25] flex items-center justify-center">
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

          {/* CTA */}
          <div className="text-center">
            <p className="text-white/70 text-lg mb-4">
              Ready to build smarter systems with AI?{' '}
              <button className="text-[#F45B25] hover:text-[#FF843E] transition-colors BenzinSemibold inline-flex items-center gap-2">
                → LET'S TALK
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
