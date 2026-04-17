'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const FHFooter = () => {
  const router = useRouter()

  return (
    <footer className="relative bg-[url('/footerbg.svg')] bg-cover bg-center bg-no-repeat">
      {/* Main CTA Section */}
      <div className="relative py-20 md:py-32 text-center">
        {/* Small top text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="text-white/50 text-xs md:text-sm uppercase tracking-widest mb-6"
        >
          HAVE A PROJECT IN MIND?
        </motion.p>

        {/* Large Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl text-white BenzinSemibold mb-12 leading-tight"
        >
          Let's Talk About<br />
          Your Project
        </motion.h2>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => router.push('/contact')}
          className="inline-flex items-center gap-2 text-white text-sm md:text-base uppercase tracking-wider border-b-2 border-white/40 hover:border-white pb-1 transition-all duration-300 group"
        >
          BOOK A FREE DISCOVERY CALL
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </div>

      {/* Footer Bottom */}
      <div className="relative border-t border-white/10 bg-[#242424]">
        <div className="w-[90%] lg:w-[90%] 2xl:w-[85%] mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/bmylogo.svg" alt="BMYBrand Logo" className="h-8 brightness-0 invert" />
            </div>

            {/* Copyright and Links */}
            <div className="flex flex-wrap items-center justify-center gap-1 text-xs text-white">
              <span>Copyright © 2026 BMYBrand | All Rights Reserved.</span>
              <a href="#" className="text-white hover:underline"> Terms of Use </a>
              <span> | </span>
              <a href="#" className="text-white hover:underline"> Privacy Policy </a>
              <span> | </span>
              <a href="#" className="text-white hover:underline"> Cookie Policy </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FHFooter
