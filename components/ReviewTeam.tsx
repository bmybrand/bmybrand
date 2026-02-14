'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Review = {
  id: number
  name: string
  position: string
  image: string
  testimonial: string
}

const ReviewTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Jonathan Reed',
      position: 'CEO & Founder',
      image: 'https://i.pravatar.cc/150?img=12',
      testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.'
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      position: 'Medical Director',
      image: 'https://i.pravatar.cc/150?img=5',
      testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Operations Manager',
      image: 'https://i.pravatar.cc/150?img=8',
      testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.'
    }
  ]

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="bg-[#100203] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side - Title and Navigation */}
          <div className="lg:col-span-5">
            <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
            >
              <h2 className="text-3xl md:text-4xl  text-white BenzinSemibold mb-6 leading-tight">
                REVIEWS FROM<br />
                FHMCAZ TEAM
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-8 max-w-md">
                We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here's their feedback on the final outcome.
              </p>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevReview}
                  className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-[#F45B25] hover:bg-[#F45B25]/10 flex items-center justify-center text-white transition-all duration-300"
                  aria-label="Previous review"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextReview}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] hover:shadow-[0_0_20px_rgba(244,91,37,0.5)] flex items-center justify-center text-white transition-all duration-300"
                  aria-label="Next review"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Review Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="bg-[#1C0F10] rounded-2xl p-8 md:p-10 relative min-h-[400px] md:min-h-[380px] lg:min-h-[350px] flex flex-col justify-between"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F45B25]/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#F45B25] to-[#FF843E] p-1">
                      <img
                        src={reviews[currentIndex].image}
                        alt={reviews[currentIndex].name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-white text-xl md:text-2xl BenzinSemibold mb-1">
                        {reviews[currentIndex].name}
                      </h3>
                      <p className="text-white/60 text-sm md:text-base">
                        {reviews[currentIndex].position}
                      </p>
                    </div>

                    <p className="text-white/80 text-base md:text-lg leading-relaxed">
                      {reviews[currentIndex].testimonial}
                    </p>
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex gap-2 mt-6 justify-center md:justify-start">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-gradient-to-r from-[#F45B25] to-[#FF843E]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewTeam
