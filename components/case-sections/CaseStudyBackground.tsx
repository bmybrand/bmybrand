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
            <div className="lg:sticky lg:top-32 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl text-white BenzinSemibold mb-8">
                What We Did
              </h3>
              <div className="mt-0 mb-8">
                <div
                  className="w-full rounded-full"
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--case-accent), transparent)'
                  }}
                />
              </div>
              <ul className="space-y-4">
                {data.whatWeDidItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 overflow-hidden" style={{ backgroundColor: 'var(--case-accent)' }}>
                      <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                        <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#FFFFFF" />
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
                <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ background: data.galleryBgColor }}>
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
