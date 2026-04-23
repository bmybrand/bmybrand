'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Background = () => {
  const whatWeDidItems = [
    'UI/UX Design',
    'Website Development',
    'Responsive Design',
    'Website Deployment'
  ]

  return (
    <section className="bg-[#0D0D0D] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Content - Background & Challenge */}
          <div className="lg:col-span-8">
            {/* What We Did - Small intro text */}
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
              className="mb-12"
            >
              <p className="text-white/60 text-sm mb-8">
                BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.
              </p>
            </motion.div>

            {/* The Background Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-6">
                The Background
              </h2>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions—such as calling, getting directions, or accessing billing and patient resources—without delay.
              </p>
            </motion.div>

            {/* The Challenge Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-6">
                The Challenge
              </h2>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage—all while remaining calm, trustworthy, and easy to navigate.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources—especially during urgent moments.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.
              </p>
            </motion.div>
          </div>

          {/* Right Sidebar - What We Did */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-32 bg-[#BF212F] border border-[#d42f3d] rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl text-white BenzinSemibold mb-8">
                What We Did
              </h3>
              <ul className="space-y-4">
                {whatWeDidItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#ff4a59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Images - 3 Device Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {/* Left Image */}
          <div className="relative h-[500px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="https://picsum.photos/400/600?random=31"
                alt="Mobile Device View"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Image */}
          <div className="relative h-[500px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="https://picsum.photos/400/600?random=32"
                alt="Emergency Room Display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="https://picsum.photos/400/600?random=33"
                alt="Mobile Interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Background
