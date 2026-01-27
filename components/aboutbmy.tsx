'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  {
    title: 'Brand Experience',
    desc: 'Logos and brand identities that stand out.',
  },
  {
    title: 'AI-Driven Solutions',
    desc: 'Intelligent AI workflows that drive growth.',
  },
  {
    title: 'Digital Marketing',
    desc: 'We grow your reach, audience, and results.',
  },
  {
    title: 'Software Development',
    desc: 'Websites and software that fit your brand.',
  },
]

const AboutBmy = () => {
  const cards = [0, 1, 2, 3]
  const overlapX = 22
  const overlapY = -28
  const sectionRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const topCardsRef = useRef<HTMLDivElement[]>([])
  const labelRefs = useRef<HTMLDivElement[]>([])
  const serviceCardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const topCards = topCardsRef.current
      const serviceCards = serviceCardsRef.current
      if (serviceCards.length === 0) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (topCards.length === 0) return
        gsap.set(topCards, {
          x: (index) => index * overlapX,
        })
        gsap.set(serviceCards, { opacity: 0 })
        gsap.set(labelRefs.current, { opacity: 0, y: 10 })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current ?? sectionRef.current,
            start: 'top 70%',
            end: 'top 25%',
            scrub: 2,
            invalidateOnRefresh: true,
          },
        })

        timeline.to(topCards, {
          x: (index, el) => {
            const target = serviceCards[index]
            if (!target) return 0
            const from = (el as HTMLElement).getBoundingClientRect()
            const to = target.getBoundingClientRect()
            return to.left - from.left
          },
          y: (index, el) => {
            const target = serviceCards[index]
            if (!target) return 0
            const from = (el as HTMLElement).getBoundingClientRect()
            const to = target.getBoundingClientRect()
            return to.top - from.top
          },
          ease: 'power2.out',
          stagger: 0.18,
        }, 0)

        timeline.to(labelRefs.current, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.12,
        }, 0.9)
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.set(serviceCards, { opacity: 0, y: 12 })
        gsap.set(labelRefs.current, { opacity: 1, y: 0 })
        gsap.fromTo(serviceCards, {
          opacity: 0,
          y: 12,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: servicesRef.current ?? sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [overlapX, overlapY])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0e1033] py-16 text-white "
    >
      {/* TOP SECTION */}
      <div className="mx-auto flex w-[90%] flex-col gap-6 lg:flex-row lg:gap-6 2xl:w-[85%]">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[30%]">
          <h2 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4xl">
            <span className="text-[#F45B25]">About BMYBrand</span> – Built
            <br />
            to Help Brands Grow
          </h2>

          <p className="mt-5 text-base sm:text-lg text-white/70">
            BMYBrand is a creative digital agency dedicated to helping businesses
            build strong brands and succeed in the digital space.
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

        {/* CENTER FEATURES */}
        <div className="w-full lg:w-[30%] space-y-5 p-5 h-fit bg-white/5 rounded-xl">
          {[
            'Client-First Mindset',
            'Results-Driven Approach',
            'Collaboration & Transparency',
          ].map((title) => (
            <div
              key={title}
              className="rounded-xl bg-[#21223F] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <h3 className="BenzinSemibold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-white/70">
                We focus on long-term value and meaningful results.
              </p>
            </div>
          ))}
        </div>

        {/* OVERLAPPING CARDS */}
<div className="hidden w-full lg:flex lg:w-[30%] items-center justify-center">
  {/* Increased container height to fit full cards stack */}
  <div className="relative h-[330px] w-full sm:h-100">
    <div className="relative mx-auto h-full w-[80%] overflow-visible">
      {cards.map((index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) topCardsRef.current[index] = el
          }}
          className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          style={{ zIndex: cards.length - index }}
        >
          <img
            src={`https://picsum.photos/300/420?random=${index + 1}`}
            alt={`About BMYBrand ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div
            ref={(el) => {
              if (el) labelRefs.current[index] = el
            }}
             className="absolute inset-x-4 bottom-4 rounded-2xl  bg-white/10 bg-gradient-to-r from-white/15 via-white/5 to-white/10 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm backdrop-saturate-150"
          >
            <h4 className="text-base BenzinSemibold">{services[index]?.title}</h4>
            <p className="mt-1 text-sm text-white/70">
              {services[index]?.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>

      {/* CORE SERVICES */}
      <div ref={servicesRef} className="relative mx-auto mt-24 w-[90%] 2xl:w-[85%]">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative z-10">
            <h3 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4x">
              Discover BMYBrand's
              <br />
              <span className="text-[#F45B25]">Core Services</span>
            </h3>
          </div>
        </div>

        <div className="relative z-0 mt-10 grid gap-4 lg:gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                if (el) serviceCardsRef.current[index] = el
              }}
              className="group relative  overflow-hidden rounded-2xl bg-[#1A1B3C] shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
            >
              <img
                src={`https://picsum.photos/520/420?random=${index + 11}`}
                alt={service.title}
                className="h-55 lg:h-122 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[linear-gradient(0deg,rgba(0,0,0,0.35),rgba(0,0,0,0.08)_55%,rgba(255,255,255,0.10)_100%)] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150">
                <h4 className="text-base BenzinSemibold">{service.title}</h4>
                <p className="mt-1 text-sm text-white/70">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutBmy
