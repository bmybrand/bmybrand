'use client'

import React, { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '50+', label: 'Team Members' },
  { value: '6.5K+', label: 'Clients Served Worldwide' },
  { value: '128K+', label: 'Project Completed Worldwide' },
  { value: '60+', label: 'Countries Served' },
]

const BrandStats = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [bearIn, setBearIn] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBearIn(true)
          observer.disconnect()
        }
      },
      { threshold: 1 }
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (event.clientX / innerWidth - 0.5) * 20
      const y = (event.clientY / innerHeight - 0.5) * 16
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050A22] pt-30 text-white ">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/spaceoverlay.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-1400 scale-125 ease-out"
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        />
      </div>

      <div className="relative mx-auto w-[90%] 2xl:w-[85%]">
        <div className="text-center">
          <h3 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4xl">
            Making Brands <span className="text-[#F45B25]">Shine</span> Worldwide
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/70">
            Our clients and creative team work across the globe — delivering branding, websites,
            and marketing that drive real growth.
          </p>
        </div>

        <div className="mt-10 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 py-6">
              <div className="BenzinSemibold text-3xl sm:text-4xl">
                {stat.value.replace('+', '')}
                <span className="text-[#FF843E]">+</span>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="  pointer-events-none relative mt-10 flex justify-center">
          <img
            src="/Superherobearsky.svg"
            alt="BMY Brand character"
            className={`relative lg:-bottom-8 lg:w-2/5 lg:scale-140 ${bearIn ? 'animate-bearFlyIn' : 'opacity-0 -translate-x-12 translate-y-10'}`}
          />
        </div>
      </div>
    </section>
  )
}

export default BrandStats
