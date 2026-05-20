'use client'

import React, { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '50+', label: 'Countries Served' },
  { value: '200+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects Completed' },
  { value: '24/7', label: 'Support Available' },
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
          src="/bmyb-global-flybearbg-01.svg"
          alt=""
          className="absolute inset-0 h-full w-full scale-125 object-cover transition-transform duration-1400 ease-out"
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        />
      </div>

      <div className="relative mx-auto w-[90%] 2xl:w-[85%]">
        <div className="text-center">
          <h3 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4xl">
            A Track Record of <span className="text-[#F45B25]">Impact</span>
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            From startups to established brands, our work spans across industries and regions. These numbers reflect the trust we&apos;ve built, the projects we&apos;ve delivered, and the consistent support we provide to clients worldwide.
          </p>
        </div>

        <div className="mt-10 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 py-6">
              <div className="BenzinSemibold text-3xl sm:text-4xl">{stat.value}</div>
              <div className="mt-2 text-xs text-white/70 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none relative mt-10 flex justify-center">
          <img
            src="/bmyb-global-superherobearsky-01.svg"
            alt="BMY Brand character"
            className={`relative z-50 lg:-bottom-8 lg:w-2/5 lg:scale-140 ${bearIn ? 'animate-bearFlyIn' : 'opacity-0 -translate-x-12 translate-y-10'}`}
          />
        </div>
      </div>
    </section>
  )
}

export default BrandStats
