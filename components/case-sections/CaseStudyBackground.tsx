'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CaseStudyData } from '../../data/case-study-data'

type Props = {
  data: CaseStudyData['background']
}

const CaseStudyBackground = ({ data }: Props) => {
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
                {data.introText}
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
              {data.backgroundParagraphs.map((paragraph, index) => (
                <p key={index} className={`text-white/70 text-sm md:text-base lg:text-lg leading-relaxed ${index !== data.backgroundParagraphs.length - 1 ? 'mb-6' : ''}`}>
                  {paragraph}
                </p>
              ))}
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
              {data.challengeParagraphs.map((paragraph, index) => (
                <p key={index} className={`text-white/70 text-sm md:text-base lg:text-lg leading-relaxed ${index !== data.challengeParagraphs.length - 1 ? 'mb-6' : ''}`}>
                  {paragraph}
                </p>
              ))}
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
            <div className="lg:sticky lg:top-32 border rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--case-accent)', borderColor: 'var(--case-accent)' }}>
              <h3 className="text-2xl md:text-3xl text-white BenzinSemibold mb-8">
                What We Did
              </h3>
              <ul className="space-y-4">
                {data.whatWeDidItems.map((item, index) => (
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

        {/* Bottom Images - Device Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {data.galleryImages.map((src, index) => (
            <div key={index} className="relative h-125 md:h-137.5 lg:h-150 rounded-2xl overflow-hidden">
              {data.galleryBgColor ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ backgroundColor: data.galleryBgColor }}>
                  <img
                    src={src}
                    alt={`Gallery screen ${index + 1}`}
                    className={`w-full h-full object-${data.galleryImageFit || 'cover'}`}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={src}
                    alt={`Gallery screen ${index + 1}`}
                    className={`w-full h-full object-${data.galleryImageFit || 'cover'}`}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudyBackground
