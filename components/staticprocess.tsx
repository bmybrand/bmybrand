'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: 'Step 01',
    title: 'Discover & Understand',
    desc: 'We learn about your brand, goals, audience, and vision.',
  },
  {
    step: 'Step 02',
    title: 'Design & Build',
    desc: 'We create visuals, websites, and campaigns that perform.',
  },
  {
    step: 'Step 03',
    title: 'Launch & Optimize',
    desc: 'We refine, test, and scale for maximum impact.',
  },
]

export default function StaticProcess() {
  const containerRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const track = trackRef.current

    if (!container || !track) return

    const ctx = gsap.context(() => {
      let maxX = 0
      let leftStackX = 0
      let baseX: number[] = []
      let spacing = 0

      const updateMetrics = () => {
        const cards = Array.from(track.children) as HTMLDivElement[]
        if (!cards.length) return
        baseX = cards.map((card) => card.offsetLeft)
        leftStackX = baseX[0] ?? 0
        spacing =
          cards.length > 1
            ? Math.max(0, baseX[1] - baseX[0])
            : cards[0].offsetWidth
        maxX = Math.max(0, spacing * (cards.length - 1))
      }

      const applyPositions = (progress: number) => {
        const trackX = -maxX * progress
        gsap.set(track, { x: trackX })
        const cards = Array.from(track.children) as HTMLDivElement[]
        cards.forEach((card, i) => {
          const clamp = Math.max(0, leftStackX - (baseX[i] + trackX))
          gsap.set(card, { x: clamp, zIndex: i + 1 })
        })
      }

      updateMetrics()
      applyPositions(0)

      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.max(1200, maxX)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          updateMetrics()
          applyPositions(self.progress)
        },
        onUpdate: (self) => {
          applyPositions(self.progress)
        },
      })

      ScrollTrigger.refresh()

      return () => {
        st.kill()
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#0B0F2B] overflow-hidden">
      <section
        ref={containerRef}
        className="relative flex  w-full pt-40 items-center bg-[#0B0F2B] "
      >
        <div className="mx-auto w-[92%]  2xl:w-[85%]">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_2fr] lg:items-center">
            {/* Left copy */}
            <div className="pt-4">
             
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                A Simple, Strategic
                Process That <span className="text-[#FF843E]">Works</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                From planning to launch, we keep the process smooth,
                collaborative, and results-driven.
              </p>
            </div>

            {/* Card stack */}
            <div className="relative flex items-start justify-start lg:pl-6">
              <div
                ref={trackRef}
                className="relative flex h-[190px] w-full max-w-[360px] items-stretch gap-6"
              >
                {steps.map((item, i) => (
                  <div
                    key={i}
                    className="w-full min-w-[280px] max-w-[360px] rounded-2xl border border-white/10 bg-[#17183A] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
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
        </div>
      </section>

      {/* Big Steps label (scrolls normally) */}
      <div className="mx-auto w-[92%] pb-16 text-[88px] leading-none font-black text-[#FF843E] sm:text-[120px] lg:text-[160px] 2xl:w-[85%]">
        Steps
      </div>
    </div>
  )
}
