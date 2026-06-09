'use client'

import React, { useRef } from 'react'
import Image from 'next/image'

const herobar = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const bearRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) {
      return
    }
    const rect = container.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    const maxOffset = 12
    const offsetX = x * maxOffset
    const offsetY = y * maxOffset

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = requestAnimationFrame(() => {
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.25)`
      }
      if (bearRef.current) {
        bearRef.current.style.transform = `translate3d(${-offsetX}px, ${-offsetY}px, 0)`
      }
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-[url('/bmyb-home-herobarbg-01.svg')] bg-cover bg-center h-fit lg:h-150 overflow-hidden flex justify-center items-center "
      onMouseMove={handleMove}
    >
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 bg-[url('/bmyb-global-spaceoverlay-01.svg')] bg-cover bg-center opacity-20 transition-transform duration-700 ease-out"
        />

        <div className="relative flex flex-col lg:flex-row w-[90%] 2xl:w-[85%] h-full pt-30  items-center">
        <div className="relative z-10 flex flex-col gap-4 py-10 lg:w-1/2 lg:py-0">
            <h1 className="BenzinSemibold text-4xl sm:text-5xl lg:text-6xl text-white">
              Our Case Studies
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl">
            We design and build digital solutions that combine strategy, design, and technology to create real impact. Every project is approached with a clear understanding of the business, user needs, and long-term goals. Explore how we turn complex challenges into simple, effective digital experiences across different industries.</p>
            
        </div>
        <div
          ref={bearRef}
          className="relative z-10 flex items-end justify-end lg:absolute lg:bottom-0 lg:right-0 lg:h-full lg:w-1/2"
        >
            <Image
              src="/bmyb-case-studies-hero-01.webp"
              alt="Case studies hero"
              width={606}
              height={456}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto max-h-full w-full object-contain lg:pt-30 pt-10"
            />
        </div>
        </div>
    </div> 
  )
}

export default herobar
