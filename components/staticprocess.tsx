'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: 'Step 01',
    title: 'Discover & Understand',
    desc: 'We learn about your brand, goals, audience, and vision—so we know exactly what you need.',
    bg: '#191A35',
    accent: '#F45B25',
  },
  {
    step: 'Step 02',
    title: 'Design & Build',
    desc: 'We create brand visuals, websites, and campaigns that look premium and perform better.',
    bg: '#21223F',
    accent: '#FF4BCB',
  },
  {
    step: 'Step 03',
    title: 'Launch & Optimize',
    desc: 'We launch, refine, and improve results over time for consistent growth.',
    bg: '#2C2D4B',
    accent: '#4BD6FF',
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
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
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
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.set(track, { x: 0, clearProps: 'transform' })
        const cards = Array.from(track.children) as HTMLDivElement[]
        cards.forEach((card) => {
          gsap.set(card, { x: 0, clearProps: 'transform' })
        })
        if (container) {
          gsap.set(container, { clearProps: 'position,top,left,width,height,transform' })
        }
      })

      return () => mm.revert()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#0B0F2B] overflow-hidden">
      <section
        ref={containerRef}
        className="relative flex w-full pt-40 items-center bg-[#0B0F2B]"
      >
        <div className="mx-auto w-[90%] 2xl:w-[85%]">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.8fr] lg:items-center">
            {/* Left copy */}
            <div className="pt-4 lg:text-right max-w-xl">
              <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-semibold text-white BenzinSemibold">
                A Simple,{' '}
                <span className="text-[#F45B25]">
                  Strategic
                  <br className="hidden lg:block" />
                  Process
                </span>{' '}
                That Works
              </h2>
              <p className="mt-3 text-sm sm:text-base lg:text-lg leading-6 lg:leading-7 text-white/60">
                From planning to launch, we keep the process smooth, collaborative, and results-driven - so your project stays on track and your brand moves forward.
              </p>
            </div>

            {/* Card stack */}
            <div className="relative flex items-start justify-start lg:pl-2">
              <div
                ref={trackRef}
                className="relative flex w-full flex-col items-stretch gap-6  lg:max-w-120 lg:flex-row lg:gap-8"
              >
                {steps.map((item, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: item.bg }}
                    className="group relative flex gap-6 flex-col w-full rounded-xl p-8 lg:min-w-140 lg:max-w-170"
                  >
                    <span className="text-base sm:text-3xl text-white  flex items-center gap-1">
                      {item.step}{' '}
                      <img
                        src="/aiicon.svg"
                        alt=""
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </span>
                    <h3 className="mt-3 text-lg sm:text-3xl BenzinSemibold text-white">
                      {item.title}
                    </h3>
                    <hr className="text-[#DCDCDC]/10" />
                    <p className="mt-auto text-sm sm:text-base leading-6 sm:leading-7 text-white/60">
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
      <div className="BenzinSemibold mx-auto w-[92%] pb-16 text-[88px] leading-none font-black text-[#F45B25] sm:text-[120px] lg:text-[260px] xl:text-[305px] 2xl:w-[85%]">
        Steps
      </div>
    </div>
  )
}
