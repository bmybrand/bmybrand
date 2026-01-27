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
          x: (i) => i * 140,
          scale: 1,
          zIndex: (i) => i
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${cards.length * 250}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1
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
      className="relative min-h-screen bg-[#0B0F2B] py-32 overflow-hidden"
    >
      {/* Heading */}
      <div className="mb-20 px-6 lg:px-20">
        <p className="text-sm uppercase tracking-widest text-orange-400">
          A Simple, Strategic Process
        </p>
        <h2 className="mt-4 text-6xl font-bold text-orange-500 lg:text-8xl">
          Steps
        </h2>
      </div>

      {/* Card stack */}
      <div className="relative flex items-center justify-center px-6 lg:px-20">
        <div className="relative h-[260px] w-full max-w-[380px]">
          {steps.map((item, i) => (
            <div
              key={i}
              ref={el => {
                if (el) cardsRef.current[i] = el
              }}
              className="absolute inset-0 rounded-2xl bg-white/5 p-6 backdrop-blur-xl"
            >
              <span className="text-sm text-orange-400">{item.step}</span>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
