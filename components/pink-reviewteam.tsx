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

const PinkReviewTeam = () => {
  const [[page, direction], setPageState] = useState<[number, number]>([0, 0])
  const [isExpanded, setIsExpanded] = useState(false)

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Pink.Me Founder',
      position: 'Brand Lead',
      image: 'https://i.pravatar.cc/150?img=12',
      testimonial:
        'BMYBrand helped us turn our brand style into a digital experience that feels vibrant, polished, and easy to shop. The site feels much more aligned with who we are.',
    },
    {
      id: 2,
      name: 'Operations Team',
      position: 'E-commerce Management',
      image: 'https://i.pravatar.cc/150?img=5',
      testimonial:
        'The new storefront made the shopping journey much clearer for customers. It is easier to navigate and feels a lot more premium than before.',
    },
    {
      id: 3,
      name: 'Customer Feedback',
      position: 'Online Shoppers',
      image: 'https://i.pravatar.cc/150?img=8',
      testimonial:
        'The website now feels fun, stylish, and easy to use. It is much more enjoyable to browse and buy from the brand online.',
    },
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
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white BenzinSemibold mb-6 leading-tight">
                REVIEWS FROM<br />
                PINK.ME TEAM
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-8 max-w-md">
                We partnered closely with the Pink.Me team to deliver a bold, modern e-commerce experience. Here is their feedback on the final outcome.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={prevReview}
                  className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-(--case-accent) hover:bg-(--case-accent) hover:shadow-[0_0_20px_rgba(var(--case-accent-rgb),0.5)] flex items-center justify-center text-white transition-all duration-300"
                  aria-label="Previous review"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextReview}
                  className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-(--case-accent) hover:bg-(--case-accent) hover:shadow-[0_0_20px_rgba(var(--case-accent-rgb),0.5)] flex items-center justify-center text-white transition-all duration-300"
                  aria-label="Next review"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

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
                className="bg-[#1B1B1B] rounded-2xl p-8 md:p-10 relative min-h-100 md:min-h-95 lg:min-h-87.5 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: 'rgb(var(--case-accent-rgb) / 0.1)' }}></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col items-center md:items-start w-full md:w-[30%]">
                    <div className="lg:w-full w-48 h-32 md:h-40 rounded-2xl overflow-hidden border-4 mb-4" style={{ borderColor: 'var(--case-accent)' }}>
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

                  <div className="flex flex-col px-4 border-l-2 w-full md:w-[70%]" style={{ borderColor: 'rgb(var(--case-accent-rgb) / 0.25)' }}>
                    <div className={`${isExpanded ? 'max-h-none overflow-auto' : 'max-h-24 overflow-hidden'} md:max-h-none transition-all duration-300`}>
                      <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed">
                        {reviews[currentIndex].testimonial}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="md:hidden text-(--case-accent) text-sm mt-2 hover:underline self-start"
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                </div>

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
                        index === currentIndex ? 'w-8 bg-(--case-accent)' : 'w-2 bg-white/20 hover:bg-white/40'
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

export default PinkReviewTeam
