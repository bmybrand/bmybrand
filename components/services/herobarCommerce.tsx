'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function HerobarCommerce() {
  const router = useRouter()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#11122F]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11122F]/50 to-[#11122F]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center pt-32 pb-20">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl BenzinBold mb-8 leading-tight">
          Commerce Solutions
        </h1>
        
        <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-12 BenzinRegular leading-relaxed">
          Build a thriving online store with E-commerce Solutions that are fast, intuitive, and scalable. From plug-and-play platforms to fully customized storefronts, we help you grow your sales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push('/request')}
            className="px-8 py-4 bg-[#F45B25] text-white rounded-full BenzinSemibold text-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 shadow-lg"
          >
            Start Your Project
          </button>
          <button
            onClick={() => router.push('/case-studies')}
            className="px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full BenzinSemibold text-lg hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  )
}
