'use client'

import React from 'react'
import { motion } from 'framer-motion'

const JiggySolution = () => {
  const accomplishments = [
    {
      title: 'Bold brand translation',
      desc: 'The playful packaging and flavor-first personality were translated into a digital experience that feels unmistakably Jiggy Jerky.',
    },
    {
      title: 'Cleaner shopping flow',
      desc: 'The user experience keeps product browsing and purchase paths simple, direct, and easy to follow.',
    },
    {
      title: 'Stronger product storytelling',
      desc: 'Flavor details, product imagery, and brand voice work together to increase appetite and trust.',
    },
    {
      title: 'Responsive storefront',
      desc: 'A mobile-friendly e-commerce platform built to look sharp and perform smoothly on every device.',
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
            Understanding the need for a bold, flavor-forward experience, we delivered a comprehensive digital solution tailored to Jiggy Jerky’s unique brand energy.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            BMYBrand led the full website design and development process, creating a visually striking storefront built around product presentation, clear hierarchy, and conversion-focused CTAs. The new experience makes it easy for customers to explore flavors, understand the brand, and shop with confidence.
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
            The redesigned website gives Jiggy Jerky a stronger online presence that better reflects the quality and personality of the brand. Product discovery feels easier, the visual story is more compelling, and the shopping path is clearer.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            The result is a storefront that feels premium, fun, and ready to support direct-to-consumer growth.
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
            <img src="/bmyb-case-jiggy-jerky-jiggybg-01.svg" alt="Jiggy Jerky Website Pages" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default JiggySolution
