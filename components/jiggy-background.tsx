'use client'

import React from 'react'
import { motion } from 'framer-motion'

const JiggyBackground = () => {
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
                BMYBrand partnered with Jiggy Jerky to design and develop a bold e-commerce experience that highlights its playful personality, sharp packaging, and crave-worthy flavors while keeping shopping friction low.
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
                Jiggy Jerky is an artisan food brand built around bold flavor, memorable packaging, and a playful personality that stands out in a crowded market. The brand needed a digital presence that could translate that energy online and support direct-to-consumer sales.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                The experience had to feel premium, energetic, and easy to shop, with clear product storytelling and a structure that encourages customers to browse, trust the product, and buy quickly on any device.
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
                Jiggy Jerky needed a website that could capture its fun, bold personality while making it easy for customers to browse and purchase artisan jerky products online. The challenge was to balance strong visual branding with a shopping experience that stayed clear and conversion-focused.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                The site also needed to showcase product quality, flavor variety, and brand credibility without feeling cluttered or generic. Packaging, photography, and messaging all had to work together to drive appetite and action.
              </p>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                In short, the challenge was to turn a distinctive physical product into a polished digital storefront that feels just as bold, memorable, and craveable as the jerky itself.
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
                src="/bmyb-case-jiggy-jerky-card-01.webp"
                alt="Jiggy Jerky screen 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-jiggy-jerky-jiggy-01.webp"
                alt="Jiggy Jerky screen 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="/bmyb-case-jiggy-jerky-card-01.webp"
                alt="Jiggy Jerky screen 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default JiggyBackground
