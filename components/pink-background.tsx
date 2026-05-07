'use client'

import React from 'react'
import { motion } from 'framer-motion'

const PinkBackground = () => {
  const whatWeDidItems = [
    'UI/UX Design',
    'Website Development',
    'Responsive Design',
    'Website Deployment',
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
                BMYBrand partnered with Pink.Me to design and develop a fashion-forward e-commerce experience that captures the brand’s playful identity and makes product discovery and checkout feel effortless.
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
                Pink.Me is a fashion and retail brand that needed a digital presence capable of translating its vibrant personality into a modern shopping experience. The goal was to create a storefront that feels stylish, energetic, and easy to navigate.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                The site needed to support product discovery, brand storytelling, and smooth conversion while reflecting the bold visual language of the brand across every screen size.
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
                Pink.Me needed a vibrant online presence that would capture their unique brand personality and convert visitors into customers through an engaging shopping experience. The challenge was to create a storefront that felt premium and playful without becoming cluttered.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                Product presentation, navigation, and checkout needed to stay simple so the brand story could shine while still driving purchases efficiently.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                In short, the challenge was to transform a distinctive fashion brand into a digital experience that feels modern, expressive, and ready to convert.
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
                src="/bmyb-case-pink-me-card-01.webp"
                alt="Pink.Me screen 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-pink-me-pinkme-01.webp"
                alt="Pink.Me screen 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-pink-me-card-01.webp"
                alt="Pink.Me screen 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PinkBackground
