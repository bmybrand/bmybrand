'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { CaseStudyData } from '../../data/case-study-data'

type Props = {
  data: CaseStudyData['hero']
}

const CaseStudyHero = ({ data }: Props) => {
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

      const slideWidth = slider.scrollWidth / 2 // Half because content is duplicated
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
    <section className="py-16 md:py-20" style={{ background: 'var(--case-accent-gradient)' }}>
      <div className="w-[90%] lg:w-[90%] 2xl:w-[75%] mx-auto mt-40">
        {/* Header with Logo and Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-y-4 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={data.logo} 
                alt={data.logoAlt} 
                className="h-16 md:h-20 w-auto max-w-[220px] md:max-w-[280px]"
              />
            </div>
            
            {/* Tags */}
            <div className="ml-4 md:ml-6 flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white BenzinSemibold leading-tight mb-12 whitespace-pre-line">
            {data.title}
          </h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.metrics.map((metric, index) => (
              <div key={index}>
                <p className="text-white/60 text-sm mb-2">{metric.label}</p>
                <p className="text-white text-2xl md:text-3xl BenzinSemibold">{metric.value}</p>
              </div>
            ))}
            
            <div>
              <p className="text-white/60 text-sm mb-2">Check it out</p>
              <a 
                href={data.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl md:text-2xl BenzinSemibold transition-opacity inline-flex items-center gap-2 hover:opacity-75"
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
      
      {/* Overflow container with infinite scroll */}
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate the set twice for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {data.sliderImages.map((src, index) => (
                <div key={index} className="relative h-87.5 md:h-100 lg:h-112.5 w-150 md:w-180 lg:w-210 shrink-0 overflow-hidden border-4 border-white rounded-xl">
                  <img
                    src={src}
                    alt={`Slider Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudyHero
