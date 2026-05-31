'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { mockupSlides } from './healthcare-data'
import type { IndustrySliderImage } from '@/data/industries/types'

type HealthcareSliderProps = {
  slides?: IndustrySliderImage[]
}

export default function HealthcareSlider({ slides = mockupSlides }: HealthcareSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current) return

    const slider = sliderRef.current

    requestAnimationFrame(() => {
      const slideWidth = slider.scrollWidth / 2

      gsap.set(slider, { x: 0 })

      gsap.to(slider, {
        x: -slideWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % slideWidth),
        },
      })
    })
  }, [])

  return (
    <div className="relative overflow-hidden mt-14 sm:mt-16 lg:mt-20">
      <div
        ref={sliderRef}
        className="flex gap-6"
        style={{ width: 'max-content' }}
      >
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-6">
            {slides.map((slide) => (
              <div
                key={`${slide.alt}-${setIndex}`}
                className={`relative h-[350px] md:h-[400px] lg:h-[450px] w-[550px] md:w-[650px] lg:w-[750px] flex-shrink-0 rounded-2xl overflow-hidden ${slide.className}`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={`w-full h-full object-cover ${slide.imageClassName}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
