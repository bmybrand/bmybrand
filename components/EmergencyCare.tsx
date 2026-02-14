'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const EmergencyCare = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current) return

    const slider = sliderRef.current
    
    // Wait for next frame to get accurate width
    requestAnimationFrame(() => {
      const slideWidth = slider.scrollWidth / 2 // Half because we duplicated the content
      
      // Set initial position
      gsap.set(slider, { x: 0 })
      
      // GSAP infinite scroll with seamless loop
      gsap.to(slider, {
        x: -slideWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % slideWidth)
        }
      })
    })
  }, [])
  return (
    <section className="bg-[#100203] py-16 md:py-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto">
        {/* Header with Logo and Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/FH-EmergencyRoom-Logo-ERClinic-1 2.svg" 
                alt="Fountain Hills Logo" 
                className="h-12 w-auto"
              />
            </div>
            
            {/* Tags */}
            <div className="flex gap-2 ml-auto">
              <span className="px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                Healthcare
              </span>
              <span className="px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                UI/UX + Development
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl  text-white BenzinSemibold leading-tight mb-12">
            Building a Patient-First Digital<br />
            Experience for 24/7 Emergency Care
          </h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div>
              <p className="text-white/60 text-sm mb-2">Care Availability</p>
              <p className="text-white text-2xl md:text-3xl BenzinSemibold">24/7 ER</p>
            </div>
            
            <div>
              <p className="text-white/60 text-sm mb-2">Key Pages Delivered</p>
              <p className="text-white text-2xl md:text-2xl BenzinSemibold">15+ Pages</p>
            </div>
            
            <div>
              <p className="text-white/60 text-sm mb-2">Industry</p>
              <p className="text-white text-2xl md:text-2xl BenzinSemibold">Healthcare / ER</p>
            </div>
            
            <div>
              <p className="text-white/60 text-sm mb-2">Check it out</p>
              <a 
                href="#" 
                className="text-white text-xl md:text-2xl BenzinSemibold hover:text-[#F45B25] transition-colors inline-flex items-center gap-2"
              >
                Visit Website
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Device Mockups Infinite Slider */}
        
      </div>
      
      {/* Overflow container with infinite scroll */}
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate the set twice for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {/* Left - Mobile View */}
              <div className="relative h-[350px] md:h-[400px] lg:h-[450px] w-[550px] md:w-[650px] lg:w-[750px] flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-pink-50">
                <img
                  src="https://picsum.photos/400/600?random=11"
                  alt="Mobile View"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center - Desktop View */}
              <div className="relative h-[350px] md:h-[400px] lg:h-[450px] w-[550px] md:w-[650px] lg:w-[750px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#1A1B2E]">
                <img
                  src="https://picsum.photos/800/500?random=12"
                  alt="Desktop View"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right - Tablet/Multiple Views */}
              <div className="relative h-[350px] md:h-[400px] lg:h-[450px] w-[550px] md:w-[650px] lg:w-[750px] flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-pink-50">
                <img
                  src="https://picsum.photos/400/600?random=13"
                  alt="Tablet View"
                  className="w-full h-full object-cover"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmergencyCare
