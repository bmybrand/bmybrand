'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    title: 'Create Faster. Anywhere.',
    desc: 'Bring your ideas to life with clean branding, modern UI/UX, and fast-loading design. We create intuitive visuals that engage your audience instantly-on every device, anywhere.',
    image: '/bmyb-global-getskeebear-01.webp',
  },
  {
    title: 'Keep Your Brand Safe. Always.',
    desc: 'We keep your brand secure, stable, and worry-free with clean builds and reliable support.',
    image: '/bmyb-global-designedgrow-brand-safe-01.webp',
  },
  {
    title: 'Launch Smarter. Everywhere.',
    desc: 'From branding to ecommerce, we create scalable digital experiences built for real growth.',
    image: '/bmyb-global-designedgrow-launch-smarter-01.webp',
  },
]

const checklist = [
  'Fast delivery',
  'Clean branding',
  'Modern UI/UX',
  'Mobile-ready',
  'Smooth loading',
  'High engagement',
  'Quick updates',
  'Creative flexibility',
]

const DesignedGrow = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const checklistRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !leftColRef.current || !rightColRef.current || !checklistRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      const leftItems = leftColRef.current?.querySelectorAll(':scope > div') ?? []
      const checklistItems = checklistRef.current?.querySelectorAll(':scope > div') ?? []

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.05, ease: 'sine.out', clearProps: 'transform' }
      )
        .fromTo(
          leftItems,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.95,
            stagger: 0.14,
            ease: 'sine.out',
            clearProps: 'transform',
          },
          '-=0.5'
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'sine.out',
            clearProps: 'transform',
          },
          '-=0.85'
        )
        .fromTo(
          checklistItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'sine.out',
            clearProps: 'transform',
          },
          '-=0.6'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="mb-30 flex w-full flex-col items-center overflow-hidden">
      <div ref={headingRef} className="mt-30 flex w-full flex-col items-center justify-center">
        <h1 className="BenzinSemibold mb-4 w-[90%] text-center text-sm text-white sm:text-lg md:text-xl lg:text-2xl xl:w-[60%] xl:text-3xl 2xl:text-4xl">
          Built to Create. <span className="text-[#F45B25]">Designed to Grow</span>
        </h1>
        <p className="w-[90%] text-center text-base text-[#ADAECC] 2xl:w-[60%]">
          At BMYBrand, we help businesses grow with powerful design, high-performing websites,
          <br />
          and strategic digital experiences.
        </p>
      </div>

      <div className="mt-12 flex max-w-full w-[90%] flex-col gap-12 overflow-x-hidden lg:flex-row 2xl:w-[75%]">
        <div ref={leftColRef} className="flex w-full min-w-0 flex-col justify-center gap-6 text-white lg:w-1/2">
          {items.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`relative cursor-pointer overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'border-l-4 border-[#F45B25]' : 'border-l-2 border-[#F45B25]'
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-500 ease-out ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="relative p-5">
                <h2 className="mb-2 text-xl font-semibold lg:text-2xl">{item.title}</h2>
                <p className="text-[#ADAECC]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={rightColRef}
          className="relative flex w-full min-w-0 flex-col items-center justify-center gap-6 lg:w-1/2"
        >
          {items.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.title}
              className={`absolute max-h-[82%] w-auto max-w-[82%] object-contain transition-all duration-500 ${
                activeIndex === index ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
              }`}
            />
          ))}
          <div className="w-full pb-[100%]"></div>
        </div>
      </div>

      <div
        ref={checklistRef}
        className="mt-10 flex max-w-full w-[90%] flex-wrap justify-center gap-y-4 2xl:w-[70%]"
      >
        {checklist.map((point, index) => (
          <div key={index} className="flex basis-1/2 items-center gap-3 text-white sm:basis-1/4">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#F45B25] text-sm font-bold text-white">
              &#10003;
            </div>
            <span className="text-sm text-[#ADAECC]">{point}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DesignedGrow
