'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function ContactCTA() {
  const router = useRouter()

  return (
    <section className="bg-[#11122F] py-20 overflow-x-hidden">
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-full">
        <div className="relative bg-[#15173A] rounded-3xl border-2 border-[#F45B25]/20 overflow-hidden">
          <div className="relative flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12 lg:p-16">
            {/* Left Content */}
            <div className="flex-1 z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl text-white BenzinSemibold mb-6 leading-tight"
              >
                Ready to Elevate Your Brand Beyond the Competition?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/70 text-sm md:text-base mb-8 max-w-xl"
              >
                At BMYBrand, we blend strategy, AI, design, and development to help ambitious businesses scale smarter and faster.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => router.push('/contact')}
                  className="px-8 py-4 bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white rounded-lg BenzinSemibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Contact Now
                </button>
                <button
                  onClick={() => router.push('/case-studies')}
                  className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-lg BenzinSemibold hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Explore Our Work
                </button>
              </motion.div>
            </div>

            {/* Right Image - Bear Superhero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full lg:w-auto flex justify-center z-20"
            >
              <img 
                src="/techbear.svg" 
                alt="BMYBrand Bear Superhero" 
                className="w-64 md:w-80 lg:w-96 h-auto object-contain relative z-20"
              />

              {/* Floating Tech Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                className="absolute top-8 -left-4 lg:left-0 w-12 h-12 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.5 }}
                className="absolute top-20 -left-8 lg:-left-4 w-14 h-14 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center"
              >
                <svg className="w-7 h-7 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                className="absolute top-4 right-0 lg:right-4 w-12 h-12 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.2 }}
                className="absolute top-32 -right-4 lg:right-0 w-14 h-14 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center"
              >
                <svg className="w-7 h-7 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.8 }}
                className="absolute bottom-8 left-4 lg:left-8 w-12 h-12 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3.2 }}
                className="absolute bottom-20 right-8 lg:right-12 w-14 h-14 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center"
              >
                <svg className="w-7 h-7 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
