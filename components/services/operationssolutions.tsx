'use client'

import React from 'react'

export default function OperationsSolutions() {
  const solutions = [
    {
      icon: '🔄',
      title: 'Automation & Workflows',
      description: 'Process automation, workflow design, approval systems, task management, and automated notifications that eliminate manual work.'
    },
    {
      icon: '🤝',
      title: 'Collaboration & Integration',
      description: 'Team portals, CRM integrations, document management, communication tools, and unified data systems for seamless operations.'
    },
    {
      icon: '📈',
      title: 'Analytics & Reporting',
      description: 'Business intelligence dashboards, real-time reporting, performance tracking, and data visualization for informed decision-making.'
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Process Analysis',
      description: 'Map current workflows, identify bottlenecks, and discover automation opportunities to optimize operations.'
    },
    {
      number: '02',
      title: 'System Design',
      description: 'Design integrated solutions with automated workflows, collaboration tools, and reporting systems.'
    },
    {
      number: '03',
      title: 'Implementation & Training',
      description: 'Deploy solutions, integrate with existing tools, and train your team for smooth adoption.'
    },
    {
      number: '04',
      title: 'Optimization & Support',
      description: 'Monitor performance, gather feedback, and continuously improve processes for maximum efficiency.'
    }
  ]

  return (
    <>
      {/* Operations Solutions Section */}
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Operations Solutions, End-to-End
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              From workflow automation to team collaboration, we build operational systems that drive efficiency and growth.
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
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              A Clear Process for Delivering Operations That Perform
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              Our proven methodology ensures your operations are streamlined, automated, and optimized for sustainable growth.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {process.map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#202141] group-hover:bg-[#F45B25] flex items-center justify-center relative z-10 border-4 border-[#11122F] transition-colors duration-300">
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
