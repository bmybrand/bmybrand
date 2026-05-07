'use client'

import React from 'react'
import { motion } from 'framer-motion'

const PinkSolution = () => {
  const accomplishments = [
    {
      title: 'Bold brand translation',
      desc: 'The website feels true to Pink.Me’s visual identity while giving the brand a polished digital storefront.',
    },
    {
      title: 'Cleaner shopping flow',
      desc: 'Browsing and purchase paths were simplified so customers can move from discovery to checkout more easily.',
    },
    {
      title: 'Stronger product storytelling',
      desc: 'Product imagery, messaging, and layout work together to help items stand out and feel more desirable.',
    },
    {
      title: 'Responsive storefront',
      desc: 'A mobile-first e-commerce experience designed to look sharp and perform smoothly across devices.',
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
            Understanding the need for a vibrant, conversion-friendly storefront, we delivered a comprehensive digital solution tailored to Pink.Me’s fashion and retail audience.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            BMYBrand led the full website design and development process, creating a visually striking e-commerce experience built around trust, fast access, and clarity. Through a strong content structure, clear hierarchy, and conversion-focused CTAs, the website now makes it easy to discover products and shop with confidence.
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
            The redesigned website successfully elevated Pink.Me’s online presence, giving the brand a stronger digital identity and a clearer shopping experience. Product discovery is easier, the story feels more cohesive, and the experience feels more premium overall.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-5xl">
            As a result, the store is better positioned to convert visitors into customers while supporting future brand growth.
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
            <img src="/bmyb-case-pink-me-pinkmebg-01.svg" alt="Pink.Me Website Pages" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PinkSolution
