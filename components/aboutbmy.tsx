'use client'

import Link from 'next/link'
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
        <div className="w-full lg:w-[34%]">
          <h2 className="BenzinSemibold text-xl sm:text-2xl lg:text-3xl">
            <span className="text-[#F45B25]">About BMYBrand</span> – Built
            <br />
            to Help Brands Grow
          </h2>

          <p className="mt-5 text-base sm:text-lg text-white/70">
            BMYBrand is a creative digital agency dedicated to helping businesses build strong brands and succeed in the digital space. We specialize in branding, website design, e-commerce solutions, and digital marketing — creating experiences that connect brands with their audience and drive meaningful results.
          </p>
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/avatar${i}/44/44`}
                    alt={`avatar ${i + 1}`}
                    loading="lazy"
                    className="h-11 w-11 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="text-[#F45B25] text-lg">★★★★★</div>
                  <div className="BenzinSemibold text-xl font-semibold">4.9 Rating</div>
                </div>

                <div className="mt-2 text-sm sm:text-base text-white/60">
                  Based on feedback from clients worldwide
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER FEATURES */}
        <div className="w-full lg:w-[34%] h-fit flex flex-col gap-2 p-2 bg-[#191A35] rounded-xl">
          {[
            {
              title: 'Client-First Mindset',
              desc: 'We put clients at the center of everything we do. By understanding your goals, challenges, and vision, we create tailored solutions that deliver real value.',
            },
            {
              title: 'Results-Driven Approach',
              desc: 'We work as an extension of your team with clear communication and shared ownership.',
            },
            {
              title: 'Collaboration & Transparency',
              desc: 'We work as an extension of your team with clear communication and shared ownership.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 flex flex-col justify-center bg-[#21223F] rounded-xl"
            >
              <h3 className="BenzinSemibold text-lg text-white">{item.title}</h3>
              <p className="mt-3 text-base text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* OVERLAPPING CARDS */}
        <div className="hidden w-full lg:flex lg:w-[30%] items-center justify-end">
          <div className="relative h-[460px] w-full sm:h-115">
            <div className="relative h-full w-[80%] overflow-visible mr-6">
              {cards.map((index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) topCardsRef.current[index] = el
                  }}
                  className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-2xl"
                  style={{ zIndex: cards.length - index }}
                >
                  <img
                    src={`https://picsum.photos/300/550?random=${index + 1}`}
                    alt={`About BMYBrand ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div
                    ref={(el) => {
                      if (el) labelRefs.current[index] = el
                    }}
                    className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/10 bg-gradient-to-r from-white/15 via-white/5 to-white/10 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm backdrop-saturate-150"
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
      <div ref={servicesRef} className="relative mx-auto mt-32 w-[90%] 2xl:w-[85%]">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative z-10 max-w-[720px]">
            <h3 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4xl">
              Discover BMYBrand's
              <br />
              <span className="text-[#F45B25]">Core Services</span>
            </h3>
            <p className="mt-4 max-w-[560px] text-sm sm:text-base text-white/60 leading-relaxed">
              Your creative &amp; digital partner for premium branding, websites, <br />
              and marketing.
            </p>
          </div>
          <div className="relative z-10 lg:shrink-0">
            <Link
              href="/strategy-call"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)]"
            >
              <div className="rounded-lg bg-white p-4">
                <img src="/bmyb-logo-group1190-01.svg" alt="" className="h-4 w-4" />
              </div>
              <span className="BenzinSemibold px-2">Free strategy call</span>
            </Link>
          </div>
        </div>

        <div className="relative z-0 mt-10 grid gap-4 lg:gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                if (el) serviceCardsRef.current[index] = el
              }}
              className="group relative overflow-hidden rounded-2xl bg-[#1A1B3C] shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
            >
              <img
                src={`https://picsum.photos/520/550?random=${index + 11}`}
                alt={service.title}
                className="h-80 lg:h-[460px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
