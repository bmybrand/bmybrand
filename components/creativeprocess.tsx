'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { step: 'Step-1', title: 'Discover & Understand', desc: 'We learn about your brand, goals, audience, and vision.' },
  { step: 'Step-2', title: 'Plan & Align', desc: 'We define scope, timelines, and a clear roadmap.' },
  { step: 'Step-3', title: 'Design & Build', desc: 'We design the experience and develop it cleanly.' },
  { step: 'Step-4', title: 'Launch & Improve', desc: 'We launch, monitor, and iterate for growth.' },
]

export default function CreativeProcess() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const pathLineRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const pathEndDotRef = useRef<HTMLDivElement | null>(null)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])
  const dottedLineRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!headingRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform',
        }
      )
    }, headingRef.current)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current || !trackRef.current || !pathLineRef.current || !progressRef.current || !pathEndDotRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1280px)', () => {
      const ctx = gsap.context(() => {
        const viewport = viewportRef.current!
        const track = trackRef.current!
        const pathLine = pathLineRef.current!
        const progress = progressRef.current!
        const pathEndDot = pathEndDotRef.current!

        let maxX = 0
        let trackW = 0
        let pathReachThresholds: number[] = []

        const updateMetrics = () => {
          const viewportW = viewport.clientWidth
          trackW = track.scrollWidth
          maxX = Math.max(0, trackW - viewportW)
          pathLine.style.width = `${trackW}px`
          progress.style.width = `${trackW}px`
          pathReachThresholds = stepRefs.current.map((el) => {
            if (!el || trackW === 0) return 0
            return Math.min(1, Math.max(0, el.offsetLeft / trackW))
          })
        }

        // Initial states
        gsap.set(track, { x: 0 })
        gsap.set(stepRefs.current, { opacity: 0.25 })
        gsap.set(stepRefs.current[0], { opacity: 1 })
        dottedLineRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { borderLeftColor: i === 0 ? '#F45B25' : 'rgba(255,255,255,0.2)' })
        })

        updateMetrics()

        const initialPathScale = 0.05
        gsap.set(progress, { x: 0, scaleX: initialPathScale, transformOrigin: 'left center' })
        gsap.set(pathEndDot, { x: trackW * initialPathScale })

        const st = ScrollTrigger.create({
          trigger: viewportRef.current,
          start: 'top 42%',
          end: () => `+=${Math.max(800, maxX)}`, // enough scroll distance
          scrub: true,
          pin: sectionRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: updateMetrics,
          onUpdate: (self) => {
            const p = self.progress
            const pathX = -maxX * p
            const scaleX = initialPathScale + p * (1 - initialPathScale)
            gsap.set(track, { x: pathX })
            gsap.set(progress, { x: pathX, scaleX, transformOrigin: 'left center' })
            gsap.set(pathEndDot, { x: pathX + trackW * scaleX })

            const reachOffset = 0.1
            let activeIndex = 0
            for (let i = 0; i < pathReachThresholds.length; i += 1) {
              if (p >= Math.max(0, pathReachThresholds[i] - reachOffset)) activeIndex = i
            }

            stepRefs.current.forEach((el, i) => {
              if (!el) return
              gsap.set(el, { opacity: i === activeIndex ? 1 : 0.25 })
            })
            dottedLineRefs.current.forEach((el, i) => {
              if (el) gsap.set(el, { borderLeftColor: i === activeIndex ? '#F45B25' : 'rgba(255,255,255,0.2)' })
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
      className="w-full xl:h-screen flex flex-col justify-center overflow-hidden bg-[#11122F] pt-20 lg:pt-24"
    >
      {/* Heading */}
      <div ref={headingRef} className="w-full flex flex-col justify-center items-center ">
        <h1 className="mb-10 w-[90%] xl:w-[60%] text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
        A <span className="text-[#F45B25]">Creative Process</span> That Works 
        </h1>
        <p className="w-[90%] 2xl:w-[60%] text-base sm:text-lg text-[#ADAECC] text-center">
        We follow a clear, collaborative process that keeps every step smooth and aligned with your goals, from the first conversation to the final launch.
        </p>
      </div>

      {/* Timeline viewport (xl+) */}
      <div
        ref={viewportRef}
        className="relative mt-30 hidden w-full overflow-hidden pt-16 xl:block"
      >
        {/* Fixed gray track - width set to track width in JS so path reaches Step 4 */}
        <div
          ref={pathLineRef}
          className="absolute left-[11.25rem] top-35 h-1 origin-left bg-white/10"
        />

        {/* Expanding orange path - width set to track width in JS, on top of gray */}
        <div
          ref={progressRef}
          className="absolute left-[11.25rem] top-35 h-1 origin-left bg-[#F45B25]"
        />

        {/* Small dot at the end of the expanding path */}
        <div
          ref={pathEndDotRef}
          className="absolute left-[11.25rem] top-35.5 z-10 -translate-y-1/2 pointer-events-none"
        >
          <div className="h-3 w-3 rounded-full bg-[#F45B25]" />
        </div>

        {/* Track that moves horizontally */}
        <div
          ref={trackRef}
          className="relative flex gap-40 px-45 pb-28"
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
              {/* Big step label (pulled up so it’s distant from the line) */}
              <div className="-mt-10 mb-2 text-5xl sm:text-6xl font-semibold text-white BenzinSemibold">
                {s.step}
              </div>

              {/* Dot on the line: top-20 from card + viewport pt-16 = 9rem, same as line top-36 */}
              <div className="absolute left-0 top-19.5 -translate-y-1/2">
                <div className="h-4 w-4 rounded-full bg-[#F45B25]" />
                <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-[#F45B25]/20" />
              </div>

              {/* Step text - mt-20 clears the dot; ml-20 pushes content well forward from dot */}
              <div className="ml-42 mt-20 flex flex-col gap-2 max-w-sm relative px-6 py-6">
                {/* Vertical dotted line behind text - stretched dashes; turns orange when highlighted */}
                <div
                  ref={(el) => { dottedLineRefs.current[i] = el }}
                  className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dashed -ml-4 transition-colors duration-300"
                  style={{ borderLeftColor: 'rgba(255,255,255,0.2)' }}
                />
                <h3 className="text-white font-semibold text-xl relative z-10 BenzinSemibold ">{s.title}</h3>
                <p className=" text-base leading-7 text-white/60 relative z-10">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple list (below xl) */}
      <div className="mx-auto mt-12 w-full max-w-5xl px-6 pb-16 xl:hidden">
        <div className="mb-8 flex justify-center">
          <Image
            src="/bmyb-global-character-2-1-01.png"
            alt="Creative process illustration"
            width={1669}
            height={1556}
            sizes="(min-width: 640px) 224px, 192px"
            className="h-auto w-48 animate-bounceRocket sm:w-56"
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10" />
          {STEPS.map((s) => (
            <div key={s.step} className="relative flex flex-col gap-2 pl-10">
              <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F45B25]" />
              <div className="relative">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/40">
                  {s.step}
                </div>
                {/* Vertical dotted line behind text */}
                <div className="absolute left-0 top-8 bottom-0 w-px border-l-2 border-dotted border-white/20 -ml-10" />
                <h3 className="mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold relative z-10">
                  {s.title}
                </h3>
                <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-8 text-white/60 relative z-10">
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
