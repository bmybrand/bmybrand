'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AboutBmy = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const cards = cardRefs.current
    if (!sectionRef.current || !wrapperRef.current || cards.length === 0) {
      return
    }

    gsap.set(cards, {
      x: (index, target) => {
        const width = (target as HTMLElement).getBoundingClientRect().width
        return -index * Math.max(30, Math.round(width * 0.12))
      },
      rotation: 0,
      transformOrigin: 'center center',
    })

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=60%',
      pin: wrapperRef.current,
      scrub: true,
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=60%',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    })

    timeline.to(cards, {
      y: 120,
      x: (index, target) => {
        const wrapperWidth = wrapperRef.current?.getBoundingClientRect().width ?? 0
        const width = (target as HTMLElement).getBoundingClientRect().width
        const totalSpan = Math.max(0, wrapperWidth * 0.9 - width)
        const spacing = totalSpan / (cards.length - 1 || 1)
        return -index * spacing
      },
      rotation: 0,
      ease: 'power2.inOut',
    }, 0)

    timeline.to(cards, {
      scale: 1.03,
      duration: 0.4,
    }, 0.7)

    return () => {
      pinTrigger.kill()
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [])
  return (
    <section ref={sectionRef} className="w-full bg-[#0e1033] py-16 text-white min-h-[150vh]">
      <div className="mx-auto flex w-[90%] flex-col gap-6 lg:flex-row lg:gap-6 2xl:w-[85%]">
        <div className="flex-1 ">
          <h2 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4xl">
            <span className="text-[#F45B25]">About BMYBrand</span> - Built
            <br />
            to Help Brands Grow
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/70">
            BMYBrand is a creative digital agency dedicated to helping businesses build strong
            brands and succeed in the digital space. We specialize in branding, website design,
            e-commerce solutions, and digital marketing -- creating experiences that connect
            brands with their audience and drive meaningful results.
          </p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-9 w-9 rounded-full border-2 border-[#0e1033] bg-[#F45B25]" />
                <div className="h-9 w-9 rounded-full border-2 border-[#0e1033] bg-[#ff8e3c]" />
                <div className="h-9 w-9 rounded-full border-2 border-[#0e1033] bg-[#ffd07a]" />
                <div className="h-9 w-9 rounded-full border-2 border-[#0e1033] bg-white" />
              </div>
              <div className="flex items-center gap-3">
                <div className="text-[#F45B25] text-lg">★★★★★</div>
                <div className="text-xl font-semibold">4.9 Rating</div>
              </div>
            </div>
            <div className="mt-2 text-sm sm:text-base text-white/60">
              Based on feedback from clients worldwide
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5 p-5 h-fit bg-white/5 rounded-xl ">
          <div className="rounded-xl bg-[#21223F] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h3 className="BenzinSemibold text-lg">Client-First Mindset</h3>
            <p className="mt-2 text-sm text-white/70">
              We put clients at the center of everything we do. By understanding your goals,
              challenges, and vision, we create tailored solutions that deliver real value.
            </p>
          </div>
          <div className="rounded-xl bg-[#21223F] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h3 className="BenzinSemibold text-lg">Results-Driven Approach</h3>
            <p className="mt-2 text-sm text-white/70">
              We work as an extension of your team with clear communication and shared ownership.
            </p>
          </div>
          <div className="rounded-xl bg-[#21223F] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h3 className="BenzinSemibold text-lg">Collaboration & Transparency</h3>
            <p className="mt-2 text-sm text-white/70">
              We work as an extension of your team with clear communication and shared ownership.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div ref={wrapperRef} className="relative h-[320px] w-full max-w-[520px] sm:h-[360px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) {
                    cardRefs.current[index] = el
                  }
                }}
                className="absolute right-0 top-0 h-[320px] w-[220px] overflow-hidden rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] sm:h-[360px] sm:w-[240px]"
                style={{ zIndex: 4 - index }}
              >
                <img
                  src="/about-bmy.svg"
                  alt={`About BMYBrand ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBmy
