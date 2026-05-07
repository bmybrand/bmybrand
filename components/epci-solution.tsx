'use client'

import React from 'react'
import { motion } from 'framer-motion'

const EpciSolution = () => {
  const accomplishments = [
    {
      title: 'Faster project delivery',
      desc: 'Workflow automation and centralized tracking reduced project delivery time by 30%.',
    },
    {
      title: 'Higher client confidence',
      desc: 'Transparent reporting and communication tools helped achieve a 4.8/5 client satisfaction score.',
    },
    {
      title: 'Lower operational overhead',
      desc: 'Integrated systems and cleaner processes reduced operational costs by 25% across teams.',
    },
    {
      title: 'Stronger team productivity',
      desc: 'Real-time collaboration and document control increased internal productivity by 40%.',
    },
  ]

  return (
    <section className="bg-[#0D0D0D] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-6">
            The Solution
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-5xl">
            We built a robust web application for EPCI with project tracking, document management, and real-time collaboration tools designed for enterprise engineering operations.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            The platform was integrated with existing software systems and structured around role-based workflows, clear dashboards, and actionable analytics. This gave both internal teams and clients a single, reliable view of project progress and performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-6">
            The Results
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-5xl">
            The final system improved delivery speed, collaboration quality, and operational visibility across the entire engineering lifecycle. Teams can now coordinate more efficiently, and clients receive clearer updates throughout execution.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            With stronger process consistency and better decision data, EPCI gained a platform that supports long-term scale while maintaining quality and accountability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-8">
            The Accomplishment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accomplishments.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ backgroundColor: 'var(--case-accent)' }}></div>
                <div>
                  <h3 className="text-white text-base md:text-lg lg:text-xl BenzinSemibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div>
        <div style={{ backgroundColor: 'var(--case-accent)' }}>
          <div className="relative w-full h-full overflow-hidden">
            <img src="/bmyb-case-epci-epci-01.webp" alt="EPCI Website Pages" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpciSolution
