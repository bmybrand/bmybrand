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

const reviewCardVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
  }),
}

const ReviewTeam = () => {
  const [[page, direction], setPageState] = useState<[number, number]>([0, 0])
  const [isExpanded, setIsExpanded] = useState(false)

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

  const currentIndex = ((page % reviews.length) + reviews.length) % reviews.length

  const nextReview = () => {
    setPageState(([prevPage]) => [prevPage + 1, 1])
    setIsExpanded(false)
  }

  const prevReview = () => {
    setPageState(([prevPage]) => [prevPage - 1, -1])
    setIsExpanded(false)
  }

  return (
    <section className="bg-[#0D0D0D] py-16 md:py-20">
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
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-6 leading-tight">
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
                  className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-[#BF212F] hover:bg-[#BF212F] hover:shadow-[0_0_20px_rgba(191,33,47,0.5)] flex items-center justify-center text-white transition-all duration-300"
                  aria-label="Previous review"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextReview}
                  className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-[#BF212F] hover:bg-[#BF212F] hover:shadow-[0_0_20px_rgba(191,33,47,0.5)] flex items-center justify-center text-white transition-all duration-300"
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
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={reviewCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8 }}
                className="bg-[#1B1B1B] rounded-2xl p-8 md:p-10 relative min-h-[400px] md:min-h-[380px] lg:min-h-[350px] flex flex-col justify-between"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#BF212F]/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-4">
                  {/* Profile Image and Name */}
                  <div className="flex flex-col items-center md:items-start w-full md:w-[30%]">
                    <div className="lg:w-full w-48 h-32 md:h-40 rounded-2xl overflow-hidden border-4 border-[#BF212F] mb-4">
                      <img
                        src={reviews[currentIndex].image}
                        alt={reviews[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white text-lg md:text-xl lg:text-2xl BenzinSemibold mb-1">
                      {reviews[currentIndex].name}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base">
                      {reviews[currentIndex].position}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col px-4 border-l-2 border-[#3A2426] w-full md:w-[70%]">
                    <div className={`${isExpanded ? 'max-h-none overflow-auto' : 'max-h-24 overflow-hidden'} md:max-h-none transition-all duration-300`}>
                      <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed">
                        {reviews[currentIndex].testimonial}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="md:hidden text-[#BF212F] text-sm mt-2 hover:underline self-start"
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex gap-2 mt-6 justify-center md:justify-start">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === currentIndex) return
                        setPageState(([prevPage]) => [
                          prevPage + (index > currentIndex ? 1 : -1),
                          index > currentIndex ? 1 : -1,
                        ])
                        setIsExpanded(false)
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-[#BF212F]'
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
