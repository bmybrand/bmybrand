'use client'

import React, { useEffect, useRef, useState } from 'react'

const herobar = () => {
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
      className="relative bg-[url('/herobarbg.svg')] bg-cover bg-center h-fit lg:h-[65vh] overflow-hidden flex justify-center items-center "
      onMouseMove={handleMove}
    >
        <img
          src="/spaceoverlay.svg"
          alt=""
          className="absolute inset-0 opacity-20 scale-125 transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        />
        <div className="flex flex-col lg:flex-row w-[90%] 2xl:w-[85%] h-full pt-30 justify-center items-center">
        <div
          className={`relative z-10 flex flex-col justify-center gap-4 py-10 lg:py-0 lg:w-1/2 transition-all duration-700 ease-out ${
            loaded ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
          }`}
        >
            <h1 className="BenzinSemibold text-4xl sm:text-5xl lg:text-6xl text-white">
              ABOUT US
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl">
              At BMYBrand, we transform ideas into high-performing brands. Our team blends creativity, strategy, and technology to help businesses stand out, connect with their audience, and achieve long-term growth in an ever-evolving digital world.
            </p>
        </div>
        <div
          className={`relative z-10 flex justify-end items-end lg:w-1/2 transition-all duration-1000 ease-out ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
          style={{ transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}
        >
            <img src="/about-hero.svg" alt="About us" className="h-full " />
        </div>
        </div>
    </div> 
  )
}

export default herobar
