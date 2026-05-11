'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const EpciEmergencyCare = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current) return

    const slider = sliderRef.current

    let tween: gsap.core.Tween | null = null
    let rafId: number | null = null

    const restartAnimation = () => {
      if (tween) {
        tween.kill()
      }

      const slideWidth = slider.scrollWidth / 2
      if (!slideWidth) return

      const wrapX = gsap.utils.wrap(-slideWidth, 0)
      gsap.set(slider, { x: 0, force3D: true })

      tween = gsap.to(slider, {
        x: -slideWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
        force3D: true,
        modifiers: {
          x: (value: string) => `${wrapX(parseFloat(value))}px`,
        },
      })
    }

    rafId = requestAnimationFrame(restartAnimation)

    const resizeObserver = new ResizeObserver(() => {
      restartAnimation()
    })
    resizeObserver.observe(slider)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      resizeObserver.disconnect()
      if (tween) {
        tween.kill()
      }
    }
  }, [])

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--case-accent)' }}>
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto mt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img
                src="/bmyb-case-epci-ecpi-01.svg"
                alt="EPCI Logo"
                className="h-12 w-auto"
              />
            </div>

            <div className="flex gap-2 ml-auto">
              <span className="px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                Engineering
              </span>
              <span className="px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                Web Application + Integration
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white BenzinSemibold leading-tight mb-12">
            Building a High-Performance Digital Platform<br />
            for Enterprise Engineering Teams
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div>
              <p className="text-white/60 text-sm mb-2">Project Coverage</p>
              <p className="text-white text-2xl md:text-3xl BenzinSemibold">Global Teams</p>
            </div>

            <div>
              <p className="text-white/60 text-sm mb-2">Modules Delivered</p>
              <p className="text-white text-2xl md:text-2xl BenzinSemibold">12+ Modules</p>
            </div>

            <div>
              <p className="text-white/60 text-sm mb-2">Industry</p>
              <p className="text-white text-2xl md:text-2xl BenzinSemibold">Engineering &amp; Construction</p>
            </div>

            <div>
              <p className="text-white/60 text-sm mb-2">Check it out</p>
              <a
                href="#"
                className="text-white text-xl md:text-2xl BenzinSemibold transition-colors inline-flex items-center gap-2 hover:text-(--case-accent)"
              >
                Visit Website
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {(() => {
            const slides = [
              '/bmyb-case-epci-epci-01.webp',
              '/bmyb-case-epci-card-01.webp',
              '/bmyb-case-epci-epci-01.webp',
              '/bmyb-case-epci-card-01.webp',
              '/bmyb-case-epci-epci-01.webp',
            ];

            return [0, 1].map((rep) => (
              <React.Fragment key={rep}>
                {slides.map((src, i) => (
                  <div key={i} className="relative h-87.5 md:h-100 lg:h-112.5 w-137.5 md:w-162.5 lg:w-187.5 shrink-0 overflow-hidden border-4 border-white rounded-xl">
                    <img src={src} alt={`EPCI slide ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </React.Fragment>
            ));
          })()}
        </div>
      </div>
    </section>
  )
}

export default EpciEmergencyCare
