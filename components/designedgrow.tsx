'use client'

import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    title: "Create Faster. Anywhere.",
    desc: "Bring your ideas to life with clean branding, modern UI/UX, and fast-loading design. We create intuitive visuals that engage your audience instantly—on every device, anywhere.",
    image: "/bmyb-global-getskeebear-01.webp"
  },
  {
    title: "Keep Your Brand Safe. Always.",
    desc: "We keep your brand secure, stable, and worry-free with clean builds and reliable support.",
    image: "/bmyb-global-technlogicalbear-01.webp"
  },
  {
    title: "Launch Smarter. Everywhere.",
    desc: "From branding to ecommerce, we create scalable digital experiences built for real growth.",
    image: "/bmyb-global-getskeebear-01.webp"
  }
]

const checklist = [
  "Fast delivery",
  "Clean branding",
  "Modern UI/UX",
  "Mobile-ready",
  "Smooth loading",
  "High engagement",
  "Quick updates",
  "Creative flexibility"
]

const DesignedGrow = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const checklistRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !leftColRef.current || !rightColRef.current || !checklistRef.current) return

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
    <div ref={sectionRef} className="flex flex-col items-center mb-30 overflow-hidden w-full">
      {/* Heading */}
      <div ref={headingRef} className="w-full flex flex-col justify-center items-center mt-30 ">
        <h1 className="mb-4 w-[90%] xl:w-[60%] text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
          Built to Create. <span className="text-[#F45B25]">Designed to Grow</span>
        </h1>
        <p className="w-[90%] 2xl:w-[60%] text-base text-[#ADAECC] text-center">
          At BMYBrand, we help businesses grow with powerful design, high-performing websites,<br />and strategic digital experiences.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-[90%] 2xl:w-[75%] gap-12 mt-12 overflow-x-hidden max-w-full">
        {/* LEFT - Text (items slide in from left) */}
        <div ref={leftColRef} className="flex flex-col justify-center lg:w-1/2 gap-6 text-white w-full min-w-0">
          {items.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                activeIndex === index ? 'border-l-4 border-[#F45B25]' : 'border-l-2 border-[#F45B25]'
              }`}
            >
              {/* Fade gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-500 ease-out ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="relative p-5">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-[#ADAECC]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Image (slides in from right) */}
        <div ref={rightColRef} className="flex flex-col gap-6 lg:w-1/2 justify-center items-center relative w-full min-w-0">
          {items.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.title}
              className={`object-contain absolute max-h-[82%] w-auto max-w-[82%] transition-all duration-500 ${
                activeIndex === index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            />
          ))}
          {/* Spacer to maintain height */}
          <div className="w-full pb-[100%]"></div>
        </div>

      </div>
      {/* Checklist */}
      <div
        ref={checklistRef}
        className="flex flex-wrap justify-center gap-y-4 w-[90%] 2xl:w-[70%] mt-10 max-w-full"
      >
  {checklist.map((point, index) => (
    <div
      key={index}
      className="flex items-center gap-3
                 basis-1/2 sm:basis-1/4
                 text-white"
    >
      {/* Checked box */}
      <div className="w-5 h-5 flex items-center justify-center
                      rounded bg-[#F45B25] text-white text-sm font-bold">
        ✓
      </div>
      <span className="text-[#ADAECC] text-sm">
        {point}
      </span>
    </div>
  ))}
      </div>
    </div>
  )
}

export default DesignedGrow
