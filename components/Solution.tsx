'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Solution = () => {
  const accomplishments = [
    {
      title: 'Clear emergency positioning',
      desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.'
    },
    {
      title: 'Stronger trust and credibility',
      desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.'
    },
    {
      title: 'Simplified patient experience',
      desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.'
    },
    {
      title: 'Modern, responsive platform',
      desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.'
    }
  ]

  return (
    <section className="bg-[#100203] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        {/* The Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl  text-white BenzinSemibold mb-6">
            The Solution
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-5xl">
            Understanding the urgent nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            BMYBrand led the full website design and development process, creating a clean, responsive experience built around trust, fast access, and clarity. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and navigate—even in high-stress moments.
          </p>
        </motion.div>

        {/* The Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl  text-white BenzinSemibold mb-6">
            The Results
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-5xl">
            The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions like calling the ER, getting directions, booking appointments, or accessing billing and patient portals.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            As a result, the site improved accessibility, user confidence, and patient-first care delivery—all achieved on-site—strengthening confidence before patients even arrive at the facility.
          </p>
        </motion.div>

        {/* The Accomplishment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl  text-white BenzinSemibold mb-8">
            The Accomplishment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accomplishments.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-2 h-2 bg-[rgba(191,33,47,1)] rounded-full shrink-0 mt-2"></div>
                <div>
                  <h3 className="text-white text-lg md:text-xl BenzinSemibold mb-2">
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

        {/* Website Pages Display Mockup */}
        
      </div>
      <div>
          {/* Monitor/Desktop Display */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img src="/BackgroundFh.svg" alt="Website Pages" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
    </section>
  )
}

export default Solution
