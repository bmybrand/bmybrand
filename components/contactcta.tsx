'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function ContactCTA({ compact = false }: { compact?: boolean }) {
  const router = useRouter()

  return (
    <section className={`mt-12 md:mt-16 bg-[#11122F] overflow-x-hidden ${compact ? 'py-8 md:py-10' : 'py-20'}`}>
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-360">
        <div className="relative bg-[#15173A] rounded-3xl border-2 border-[#F45B25]/20 overflow-hidden">
          <div className="relative flex flex-col lg:flex-row items-center gap-12 ">
            {/* Left Content */}
            <div className={`flex-1 z-10 ${compact ? 'p-8 md:p-10 lg:p-10' : 'p-8 md:p-12 lg:p-8 xl:p-16'}`}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl text-white BenzinSemibold mb-6 leading-tight"
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
                  className="bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2 BenzinSemibold text-sm sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-base whitespace-nowrap"
                >
                  <div className="bg-white p-4 rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                      <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#FF7A32" />
                    </svg>
                  </div>
                  <span className="px-2 whitespace-nowrap">Contact Now</span>
                </button>
                <button
                  onClick={() => router.push('/case-studies')}
                  className="border border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex justify-center items-center gap-2 BenzinSemibold text-sm sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-base whitespace-nowrap"
                >
                  <div className="bg-white p-4 rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                      <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#11122F" />
                    </svg>
                  </div>
                  <span className="px-2 whitespace-nowrap">Explore Our Work</span>
                </button>
              </motion.div>
            </div>

            {/* Right Image - Bear Superhero (hidden below lg) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex relative w-full lg:w-auto justify-center z-20 lg:pr-10"
            >
              <img 
                src="/bmyb-global-cta-character-1-01.webp" 
                alt="BMYBrand Bear Superhero" 
                className="w-64 md:w-80 lg:w-96 h-auto object-contain relative z-20"
              />

              {/* Floating Tech Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                className="absolute top-8 -left-4 lg:left-0 w-12 h-12 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center z-30"
              >
                <svg className="w-6 h-6 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.5 }}
                className="absolute top-20 -left-8 lg:-left-4 w-14 h-14 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center z-30"
              >
                <svg className="w-7 h-7 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                className="absolute top-4 right-0 lg:right-4 w-12 h-12 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center z-30"
              >
                <svg className="w-6 h-6 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: -40 }}
                transition={{ duration: 0.8, delay: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.2 }}
                className="absolute top-22 -right-4 lg:right-0 w-14 h-14 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center z-30"
              >
                <svg className="w-7 h-7 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.8 }}
                className="absolute bottom-8 left-4 lg:left-8 w-12 h-12 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center z-30"
              >
                <svg className="w-6 h-6 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3.2 }}
                className="absolute bottom-20 right-8 lg:right-12 w-14 h-14 bg-[#F45B25]/20 border-2 border-[#F45B25] rounded-lg flex items-center justify-center z-30"
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
