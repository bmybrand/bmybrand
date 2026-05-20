'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: 'Step 1',
    title: 'Understand Requirements',
    desc: 'We carefully analyze your needs, goals, and expectations before starting any project.',
    bg: '#191A35',
  },
  {
    step: 'Step 2',
    title: 'Create Strategy',
    desc: 'We design a clear, structured plan that aligns with your business objectives effectively.',
    bg: '#21223F',
  },
  {
    step: 'Step 3',
    title: 'Develop Solution',
    desc: 'We build functional, scalable digital solutions using modern tools and technologies.',
    bg: '#2C2D4B',
  },
  {
    step: 'Step 4',
    title: 'Deliver Results',
    desc: 'We ensure final output meets expectations, performs well, and supports long-term success.',
    bg: '#343557',
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
        let overlapSpacing = 0
        let scrollDistance = 0

        const updateMetrics = () => {
          const cards = Array.from(track.children) as HTMLDivElement[]
          if (!cards.length) return

          baseX = cards.map((card) => card.offsetLeft)

          const cardWidth = cards[0].offsetWidth
          const containerWidth = track.parentElement?.offsetWidth ?? track.offsetWidth

          const availableWidth = containerWidth * 0.96
          overlapSpacing =
            cards.length > 1
              ? Math.max(12, Math.min(92, (availableWidth - cardWidth) / (cards.length - 1)))
              : 0

          leftStackX = baseX[0] ?? 0
          spacing = cards.length > 1 ? Math.max(0, baseX[1] - baseX[0]) : cardWidth
          maxX = Math.max(0, spacing * (cards.length - 1))
          scrollDistance = Math.max(1600, maxX + cardWidth * 0.9 + cards.length * 120)
        }

        const applyPositions = (progress: number) => {
          const trackX = -maxX * progress
          gsap.set(track, { x: trackX })

          const cards = Array.from(track.children) as HTMLDivElement[]
          cards.forEach((card, i) => {
            const targetStackX = leftStackX + i * overlapSpacing
            const clamp = Math.max(0, targetStackX - (baseX[i] + trackX))
            gsap.set(card, { x: clamp, zIndex: i + 1 })
          })
        }

        updateMetrics()
        applyPositions(0)

        const st = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 0.7,
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
    <div className="overflow-hidden bg-[#0B0F2B]">
      <section ref={containerRef} className="relative flex w-full items-center bg-[#0B0F2B] pt-40">
        <div className="mx-auto w-[90%] 2xl:w-[85%]">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.8fr] lg:items-center">
            <div className="max-w-xl pt-4 lg:text-right">
              <h2 className="BenzinSemibold mt-2 text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                Work That <span className="text-[#F45B25]">Follows</span> a Clear Flow
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60 sm:text-base lg:text-lg lg:leading-7">
                We follow a clear and structured process from understanding your needs to delivering a complete digital solution with precision, clarity, and consistency.
              </p>
            </div>

            <div className="relative flex items-start justify-start lg:pl-2">
              <div
                ref={trackRef}
                className="relative flex w-full flex-col items-stretch gap-6 lg:max-w-120 lg:flex-row lg:gap-8"
              >
                {steps.map((item, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: item.bg }}
                    className="group relative flex w-full flex-col gap-6 rounded-xl p-8 lg:min-w-140 lg:max-w-170"
                  >
                    <span className="flex items-center gap-1 text-base text-white sm:text-3xl">
                      {item.step}{' '}
                      <img
                        src="/bmyb-services-ai-aiicon-01.svg"
                        alt=""
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </span>
                    <h3 className="BenzinSemibold mt-3 text-lg text-white sm:text-3xl">
                      {item.title}
                    </h3>
                    <hr className="text-[#DCDCDC]/10" />
                    <p className="mt-auto text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="BenzinSemibold mx-auto w-[92%] pb-16 text-[88px] leading-none font-black text-[#F45B25] sm:text-[120px] lg:text-[260px] xl:text-[305px] 2xl:w-[85%]">
        Steps
      </div>
    </div>
  )
}
