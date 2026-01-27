'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    step: 'Step 01',
    title: 'Discover & Understand',
    desc: 'We learn about your brand, goals, audience, and vision.'
  },
  {
    step: 'Step 02',
    title: 'Design & Build',
    desc: 'We create visuals, websites, and campaigns that perform.'
  },
  {
    step: 'Step 03',
    title: 'Launch & Optimize',
    desc: 'We refine, test, and scale for maximum impact.'
  }
]

export default function StaticProcess() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || cardsRef.current.length === 0) return

    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const cards = cardsRef.current

        // initial stacked position (off to the right)
        gsap.set(cards, {
          x: (i) => i * 390,
          scale: 1,
          zIndex: (i) => i
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${cards.length * 250}`,
            scrub: 1,
            pin: true,
            anticipatePin: 0.6
          }
        })

        // stack cards one by one
        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              x: 0,
              duration: 1
            },
            i
          )
        })
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0F2B] py-24 overflow-hidden"
    >
      <div className="mx-auto w-[92%] 2xl:w-[85%]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr] lg:items-start">
          {/* Left copy */}
          <div className="pt-4">
            <p className="text-sm uppercase tracking-widest text-[#FF843E]">
              A Simple, Strategic
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
              Process That <span className="text-[#FF843E]">Works</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
              From planning to launch, we keep the process smooth,
              collaborative, and results-driven.
            </p>
          </div>

          {/* Card stack */}
          <div className="relative flex items-start justify-start lg:pl-6">
            <div className="relative h-[190px] w-full max-w-[360px]">
              {steps.map((item, i) => (
                <div
                  key={i}
                  ref={el => {
                    if (el) cardsRef.current[i] = el
                  }}
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-[#17183A] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                >
                  <span className="text-xs text-white/70">
                    {item.step}{' '}
                    <span className="text-[#FF843E]">+</span>
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-[88px] leading-none font-black text-[#FF843E] sm:text-[120px] lg:text-[160px]">
          Steps
        </div>
      </div>
    </section>
  )
}
