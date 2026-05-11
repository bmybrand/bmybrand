'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CaseStudyData } from '../../data/case-study-data'

type Props = {
  data: CaseStudyData['solution']
}

const CaseStudySolution = ({ data }: Props) => {
  return (
    <section className="bg-[#0D0D0D] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        {/* The Solution */}
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
          {data.introParagraphs.map((paragraph, index) => (
            <p key={index} className={`text-white/70 text-base md:text-lg leading-relaxed max-w-5xl ${index !== data.introParagraphs.length - 1 ? 'mb-6' : ''}`}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* The Results */}
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
          {data.resultsParagraphs.map((paragraph, index) => (
            <p key={index} className={`text-white/70 text-base md:text-lg leading-relaxed max-w-5xl ${index !== data.resultsParagraphs.length - 1 ? 'mb-6' : ''}`}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* The Accomplishment */}
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
            {data.accomplishments.map((item, index) => (
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

      {/* Website Pages Display Mockup */}
      <div>
        <div style={{ backgroundColor: 'var(--case-accent)' }}>
          <div className="relative w-full h-full overflow-hidden">
            {data.bannerVideo ? (
              <video 
                src={data.bannerVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={data.bannerImage} alt="Website Pages" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudySolution
