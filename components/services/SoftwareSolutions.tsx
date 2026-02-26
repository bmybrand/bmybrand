'use client'

import React from 'react'

export default function SoftwareSolutions() {
  const solutions = [
    {
      icon: '🌐',
      title: 'Web & Mobile Apps',
      description: 'Full-stack development of responsive web applications and native mobile apps with seamless user experiences and robust backend infrastructure.'
    },
    {
      icon: '⚙️',
      title: 'Custom Software Solutions',
      description: 'Bespoke software tailored to your unique business processes, including CMS platforms, internal tools, and specialized business applications.'
    },
    {
      icon: '☁️',
      title: 'Cloud & SaaS Platforms',
      description: 'Scalable cloud-based solutions and SaaS platforms with multi-tenancy, subscription management, and enterprise-grade infrastructure.'
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Planning & Architecture',
      description: 'Define requirements, design system architecture, and create detailed technical specifications for development.'
    },
    {
      number: '02',
      title: 'Development & Testing',
      description: 'Build your solution using agile methodology with continuous testing, code reviews, and quality assurance.'
    },
    {
      number: '03',
      title: 'Deployment & Integration',
      description: 'Deploy to production with CI/CD pipelines and integrate with your existing systems and third-party services.'
    },
    {
      number: '04',
      title: 'Support & Maintenance',
      description: 'Ongoing monitoring, updates, bug fixes, and feature enhancements to ensure optimal performance.'
    }
  ]

  return (
    <>
      {/* Software Solutions Section */}
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Software Solutions, End-to-End
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              From concept to deployment, we deliver custom software that drives efficiency and business growth.
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
              A Clear Process for Delivering Software That Performs
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              Our proven development process ensures your software is built right, deployed smoothly, and maintained reliably.
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
