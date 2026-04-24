'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Stack, { type StackHandle } from '@/components/stack'

export default function HealthcareSpotlight() {
  const videoPool = ["/bmyb-global-rickroll-01.mp4", "/bmyb-global-strock-animation-1-01.mp4"]
  const videos = useMemo(
    () => Array.from({ length: 10 }, (_, index) => videoPool[index % videoPool.length]),
    []
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const stackRef = useRef<StackHandle>(null)
  const stackCards = useMemo(
    () =>
      videos.map((src, index) => (
        <video
          key={index}
          ref={(el) => {
            videoRefs.current[index] = el
          }}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )),
    [videos]
  )

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (index === activeIndex) {
        if (isPaused) {
          video.pause()
        } else {
          void video.play().catch(() => {})
        }
      } else {
        video.pause()
      }
    })
  }, [activeIndex, isPaused])

  return (
    <section className="bg-[#11122F]">
      <div className="mx-auto grid w-[90%] 2xl:w-[85%] gap-12 py-14 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-22">
        <div className="group relative mx-auto flex w-full max-w-[430px] items-center justify-center py-8 lg:mx-0 lg:max-w-[470px]">
          <div className="relative" style={{ width: 280, height: 380 }}>
            <Stack
              ref={stackRef}
              randomRotation={false}
              sensitivity={200}
              sendToBackOnClick={true}
              autoplay={false}
              autoplayDelay={3000}
              pauseOnHover={false}
              onActiveIndexChange={setActiveIndex}
              cards={stackCards}
            />

            <button
              type="button"
              onClick={() => stackRef.current?.prev()}
              className="absolute left-[-14px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#17183B] bg-white text-[#17183B] shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-[1.03]"
              aria-label="Previous card"
            >
              <img src="/bmyb-logo-group119-01.svg" alt="" className="h-[15px] w-[15px] rotate-[-135deg]" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#17183B] bg-white text-[#17183B] opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-all duration-200 group-hover:opacity-100 hover:scale-[1.03]"
              aria-label={isPaused ? "Play video" : "Pause video"}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#2589D0]">
                {isPaused ? (
                  <svg className="ml-0.5 h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 6.5v11l8-5.5-8-5.5z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 6h3v12H8zM13 6h3v12h-3z" />
                  </svg>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => stackRef.current?.next()}
              className="absolute right-[-14px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF7A32] text-white shadow-[0_12px_30px_rgba(255,122,50,0.35)] transition-transform duration-200 hover:scale-[1.03]"
              aria-label="Next card"
            >
              <img src="/bmyb-logo-group119-01.svg" alt="" className="h-[15px] w-[15px] rotate-[45deg] brightness-0 invert" />
            </button>
          </div>
        </div>

        <div className="max-w-[560px]">
          <img
            src="/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg"
            alt="Fountain Hills Emergency Room and Medical Center"
            className="h-12 w-auto object-contain"
          />

          <blockquote className="mt-6 max-w-[34rem] text-lg leading-8 text-white/88 sm:text-[1.45rem] sm:leading-[1.7]">
            From the beginning, it was clear that BMYBrand understood the urgency and trust required in
            healthcare. They delivered a fast, patient-focused website that makes it easier for people to
            find care, access services, and take action when it matters most.
          </blockquote>

          <div className="mt-10 flex items-center gap-3">
            <img
              src="/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-01.svg"
              alt=""
              className="h-12 w-12 rounded-full object-contain"
            />
            <div>
              <div className="text-white BenzinSemibold">Fountain Hills</div>
              <div className="text-sm text-white/48">Operations Team</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
