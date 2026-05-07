'use client'

import React from 'react'
import { motion } from 'framer-motion'

const EpciBackground = () => {
  const whatWeDidItems = [
    'Web Application Architecture',
    'System Integration',
    'Project Management Tools',
    'Deployment & Optimization',
  ]

  return (
    <section className="bg-[#0D0D0D] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              className="mb-12"
            >
              <p className="text-white/60 text-sm mb-8">
                BMYBrand partnered with EPCI Engineering to design and develop a modern enterprise platform that supports complex engineering operations, improves team collaboration, and gives clients transparent project visibility.
              </p>
            </motion.div>

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
                EPCI is a UK-affiliated engineering firm delivering turnkey business solutions across strategy development, architecture, and full project delivery. As operations scaled across regions and stakeholders, the team needed a digital system that could centralize project workflows and keep execution aligned.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                The goal was to create a responsive, high-performance platform that gives internal teams faster control over projects while providing clients with clear updates, documentation access, and dependable communication.
              </p>
            </motion.div>

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
                EPCI required a comprehensive digital platform to manage complex engineering projects while coordinating teams and clients across multiple time zones. Existing processes created friction around progress tracking, document handoff, and communication consistency.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                The challenge was to unify workflows, provide real-time visibility, and reduce operational overhead without slowing down delivery quality. The system needed to be scalable, easy for cross-functional teams to use, and built for long-term growth.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                In short, we needed to transform fragmented project operations into one clear, collaborative platform that improves execution speed, transparency, and client confidence.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-32 border rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--case-accent)', borderColor: 'var(--case-accent)' }}>
              <h3 className="text-2xl md:text-3xl text-white BenzinSemibold mb-8">
                What We Did
              </h3>
              <ul className="space-y-4">
                {whatWeDidItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0 mt-1">
                      <svg className="w-3.5 h-3.5 text-(--case-accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-epci-card-01.webp"
                alt="EPCI device screen 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-epci-epci-01.webp"
                alt="EPCI device screen 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-epci-card-01.webp"
                alt="EPCI device screen 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EpciBackground
