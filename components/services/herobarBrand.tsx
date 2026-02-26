'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function HerobarBrand() {
  const router = useRouter()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#11122F]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11122F]/50 to-[#11122F]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center pt-32 pb-20">
        <h1 className="text-white text-4xl sm:text-7xl md:text-8xl lg:text-9xl BenzinBold mb-8 leading-tight">
          Brand Experience
        </h1>
        
        <p className="text-[#ADAECC] text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
        We craft powerful brand identities and digital experiences that don’t just look good — they perform. From strategy to visual systems, we design brands that resonate, convert, and scale.</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={() => router.push('/request')}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base lg:text-lg bg-[#F45B25] text-white rounded-full BenzinSemibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 shadow-lg"
          >
            Start Your Project
          </button>
          <button
            onClick={() => router.push('/case-studies')}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base lg:text-lg bg-transparent text-white border-2 border-white/20 rounded-full BenzinSemibold hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  )
}
