'use client'

import React, { useEffect, useRef, useState } from 'react'

const herobarreview = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) {
      return
    }
    const rect = container.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    const maxOffset = 12
    setOffset({ x: x * maxOffset, y: y * maxOffset })
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-[url('/bmyb-home-herobarbg-01.svg')] bg-cover bg-center h-fit lg:h-150 overflow-hidden flex justify-center items-center "
      onMouseMove={handleMove}
    >
        <img
  src="/bmyb-global-spaceoverlay-01.svg"
  alt=""
  className="absolute scale-125 inset-0 h-full w-full object-cover opacity-20 transition-transform duration-700 ease-out"
  style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
/>

        <div className="relative flex flex-col lg:flex-row w-[90%] 2xl:w-[85%] h-full pt-30  items-center">
        <div
          className={`relative z-10 flex flex-col  gap-4 py-10 lg:py-0 lg:w-1/2 transition-all duration-700 ease-out ${
            loaded ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
          }`}
        >
            <h1 className="BenzinSemibold text-2xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white">
            We&rsquo;re <span className="text-[#ff6b35]">Trusted</span> by Businesses Worldwide
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-base xl:text-lg text-white/80 max-w-2xl">
            We work with clients across different regions and industries, delivering consistent quality, clear communication, and reliable execution. Every project is built with a focus on understanding business needs and creating solutions that truly make an impact.</p>
            
        </div>
        <div
          className={`relative z-10 flex justify-end items-end lg:absolute lg:bottom-0 lg:right-0 lg:h-full lg:w-1/2 transition-all duration-1000 ease-out ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
          style={{ transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}
        >
            <img src="/bmyb-review-hero-01.webp" alt="About us" className="h-auto max-h-full w-full object-contain lg:pt-30 pt-10" />
        </div>
        </div>
    </div> 
  )
}

export default herobarreview
