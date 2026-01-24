'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { step: 'Step-1', title: 'Discover & Understand', desc: 'We learn about your brand, goals, audience, and vision.' },
  { step: 'Step-2', title: 'Plan & Align', desc: 'We define scope, timelines, and a clear roadmap.' },
  { step: 'Step-3', title: 'Design & Build', desc: 'We design the experience and develop it cleanly.' },
  { step: 'Step-4', title: 'Launch & Improve', desc: 'We launch, monitor, and iterate for growth.' },
]

export default function CreativeProcess() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current || !trackRef.current || !progressRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1280px)', () => {
      const ctx = gsap.context(() => {
        const viewport = viewportRef.current!
        const track = trackRef.current!
        const progress = progressRef.current!

        let maxX = 0
        let stepPositions: number[] = []

        const updateMetrics = () => {
          const viewportW = viewport.clientWidth
          const trackW = track.scrollWidth
          maxX = Math.max(0, trackW - viewportW)
          stepPositions = stepRefs.current.map((el, i) => {
            if (!el || trackW === 0) return i / Math.max(1, STEPS.length - 1)
            const raw = el.offsetLeft / trackW
            return Math.min(1, Math.max(0, raw))
          })
        }

        // Initial states
        gsap.set(track, { x: 0 })
        gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(stepRefs.current, { opacity: 0.25 })
        gsap.set(stepRefs.current[0], { opacity: 1 })

        updateMetrics()

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${Math.max(1200, maxX * 1.5)}`, // enough scroll distance
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: updateMetrics,
          onUpdate: (self) => {
            const p = self.progress
            gsap.set(track, { x: -maxX * p })
            gsap.set(progress, { scaleX: p, transformOrigin: 'left center' })

            let activeIndex = 0
            for (let i = 0; i < stepPositions.length; i += 1) {
              if (p >= stepPositions[i]) activeIndex = i
            }

            stepRefs.current.forEach((el, i) => {
              if (!el) return
              gsap.set(el, { opacity: i === activeIndex ? 1 : 0.25 })
            })
          },
          // markers: true, // enable to debug
        })

        ScrollTrigger.refresh()

        return () => {
          st.kill()
        }
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full lg:h-screen flex flex-col justify-center overflow-hidden bg-[#11122F] "
    >
      {/* Heading */}
      <div className="w-full flex flex-col justify-center items-center ">
        <h1 className="mb-10 w-[90%] xl:w-[60%] text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
          Built to Create. <span className="text-[#F45B25]">Designed to Grow</span>
        </h1>
        <p className="w-[90%] 2xl:w-[60%] text-base sm:text-lg text-[#ADAECC] text-center">
          At BMYBrand, we help businesses grow with powerful design, high-performing websites, and strategic digital experiences.
        </p>
      </div>

      {/* Timeline viewport (xl+) */}
      <div
        ref={viewportRef}
        className="relative mt-16 hidden w-full overflow-hidden xl:block"
      >
        {/* Base gray line */}
        <div className="absolute left-0 right-0 top-16 h-0.5 bg-white/10" />

        {/* Expanding orange line */}
        <div
          ref={progressRef}
          className="absolute left-0 top-16 h-0.5 w-full bg-[#F45B25]"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Track that moves horizontally */}
        <div
          ref={trackRef}
          className="relative flex gap-16 px-6 pb-28"
          style={{ width: 'max-content' }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.step}
              ref={(el) => {
                stepRefs.current[i] = el
              }}
              className="relative min-w-[320px] sm:min-w-95 md:min-w-110"
            >
              {/* Big step label (over the dot) */}
              <div className="mb-6 text-4xl sm:text-5xl font-semibold text-white/15">
                {s.step}
              </div>

              {/* Dot aligned on the line */}
              <div className="absolute left-0 top-16 -translate-y-1/2">
                <div className="h-4 w-4 rounded-full bg-[#F45B25]" />
                <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-[#F45B25]/20" />
              </div>

              {/* Step text */}
              <div className="ml-10 mt-10 max-w-sm">
                <h3 className="text-white font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple list (below xl) */}
      <div className="mx-auto mt-12 w-full max-w-5xl px-6 pb-16 xl:hidden">
        <div className="mb-8 flex justify-center">
          <img
            src="/Character-2%201.svg"
            alt="Creative process illustration"
            className="h-auto w-48 animate-bounceRocket sm:w-56"
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10" />
          {STEPS.map((s) => (
            <div key={s.step} className="relative flex flex-col gap-2 pl-10">
              <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F45B25]" />
              <div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/40">
                  {s.step}
                </div>
                <h3 className="mt-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-7 text-white/60">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
