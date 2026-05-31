'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Stack, { type StackHandle } from '@/components/stack'

type SpotlightItem = {
  title: string
  description: string
  name: string
  role: string
}

type HealthcareSpotlightProps = {
  title?: string
  description?: string
  items?: SpotlightItem[]
}

export default function HealthcareSpotlight({ title, description, items }: HealthcareSpotlightProps) {
  const spotlightItems = useMemo(
    () => [
      {
        video: '/bmyb-case-fountain-hills-01.mp4',
        logo: '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg',
        logoAlt: 'Fountain Hills Emergency Room and Medical Center',
        title: 'Strengthening Healthcare Brands With Precision, Trust, And Innovation',
        description:
          'From the beginning, it was clear that BMYBrand understood the urgency and trust required in healthcare. They delivered a fast, patient-focused website that makes it easier for people to find care, access services, and take action when it matters most.',
        name: 'Fountain Hills',
        role: 'Healthcare Brand',
        avatar: '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-01.svg',
      },
      {
        video: '/bmyb-case-pink-me-01.mp4',
        logo: '/bmyb-case-pink-me-pm-logo-01.svg',
        logoAlt: 'Pink.Me',
        title: 'Strengthening Breast Cancer Support With Compassion, Clarity, And Empowerment',
        description:
          'A compassionate, women-centered website designed to support and uplift those affected by breast cancer, making it easy to find resources, access programs, and connect with a caring community.',
        name: 'Pink.Me',
        role: 'Breast Cancer Support',
        avatar: '/bmyb-case-pink-me-pm-logo-01.svg',
      },
      {
        video: '/bmyb-case-jiggy-jerky-01.mp4',
        logo: '/bmyb-case-jiggy-jerky-jiggylogo-01.svg',
        logoAlt: 'Jiggy Jerky',
        title: 'Delivering Clean-Ingredient, Bold-Flavor Experiences For Jerky Fans',
        description:
          'Built to translate the brand’s playful energy online, the experience makes product discovery simple, appetizing, and conversion-focused for customers shopping bold artisan jerky.',
        name: 'Jiggy Jerky',
        role: 'Food Brand',
        avatar: '/bmyb-case-jiggy-jerky-jiggylogo-01.svg',
      },
      {
        video: '/bmyb-global-preloader-01.mp4',
        logo: '/bmyb-case-learnandlabel-learnandlabellogo-01.svg',
        logoAlt: 'Learn and Label',
        title: 'Creating AI-Powered Labels And Newsletters For Smarter Communication',
        description:
          'Built to simplify content creation, enhance productivity, and deliver personalized results, the platform helps businesses and individuals communicate smarter and faster.',
        name: 'Learn and Label',
        role: 'AI Product',
        avatar: '/bmyb-case-learnandlabel-learnandlabellogo-01.svg',
      },
    ],
    []
  )
  const contentItems = items ?? spotlightItems
  const videos = useMemo(() => spotlightItems.map((item) => item.video), [spotlightItems])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const stackRef = useRef<StackHandle>(null)
  const activeContent = contentItems[activeIndex] ?? contentItems[0]
  const activeMedia = spotlightItems[activeIndex] ?? spotlightItems[0]
  const stackCards = useMemo(
    () =>
      videos.map((src, index) => (
        <video
          key={index}
          ref={(el) => {
            videoRefs.current[index] = el
          }}
          src={src}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )),
    [isMuted, videos]
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
      {(title || description) && (
        <div className="mx-auto w-[90%] pt-14 sm:pt-18 xl:w-[75%] xl:pt-22">
          <div className="max-w-5xl">
            {title ? (
              <h2 className="BenzinSemibold text-white text-[1.0rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.9rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.12]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      )}
      <div className="mx-auto grid w-[90%] gap-12 py-14 sm:gap-16 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 lg:py-22 xl:w-[75%] xl:gap-24 2xl:gap-12">
        <div className="group relative mx-auto flex w-full max-w-[430px] items-center justify-center py-8 lg:mx-0 xl:-translate-x-10 xl:max-w-[470px] 2xl:translate-x-14">
          <div className="relative" style={{ width: 380, height: 500 }}>
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
              onClick={() => setIsMuted((prev) => !prev)}
              className="absolute right-0 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#17183B]/88 text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#FF7A32] sm:right-[-8px] sm:top-4"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => stackRef.current?.prev()}
              className="group/btn absolute left-[-22px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF7A32] text-white shadow-[0_12px_30px_rgba(255,122,50,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-white"
              aria-label="Previous card"
            >
              <img src="/bmyb-logo-group119-01.svg" alt="" className="h-[15px] w-[15px] rotate-[-135deg] brightness-0 invert transition-all duration-200 group-hover/btn:brightness-0 group-hover/btn:invert-0" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className={`absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-all duration-200 group-hover:opacity-100 hover:scale-[1.03] ${
                isPaused ? "h-16 w-16" : "h-14 w-14 border-[3px] border-[#17183B]"
              }`}
              aria-label={isPaused ? "Play video" : "Pause video"}
            >
              {isPaused ? (
                <svg className="h-8 w-8 translate-x-[2px] text-[#17183B]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              ) : (
                <svg className="h-7 w-7 text-[#17183B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 6h3v12H7zM14 6h3v12h-3z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => stackRef.current?.next()}
              className="group/btn absolute right-[-22px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF7A32] text-white shadow-[0_12px_30px_rgba(255,122,50,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-white"
              aria-label="Next card"
            >
              <img src="/bmyb-logo-group119-01.svg" alt="" className="h-[15px] w-[15px] rotate-[45deg] brightness-0 invert transition-all duration-200 group-hover/btn:brightness-0 group-hover/btn:invert-0" />
            </button>
          </div>
        </div>

        <div className="max-w-[560px]">
          <img
            src={activeMedia.logo}
            alt={activeMedia.logoAlt}
            className="h-16 w-auto object-contain"
          />

          <h3 className="mt-6 max-w-[34rem] text-[1rem] leading-[1.18] text-white BenzinSemibold sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]">
            {activeContent?.title}
          </h3>

          <blockquote className="mt-5 max-w-[34rem] text-[0.95rem] leading-[1.6] text-white/72 sm:text-[1rem] md:text-[1.08rem] lg:text-[1.12rem]">
            {activeContent?.description}
          </blockquote>

          <div className="mt-10 flex items-center gap-3">
            <img
              src={activeMedia.avatar}
              alt={activeContent?.name}
              className="h-14 w-14 rounded-full object-contain"
            />
            <div>
              <div className="text-[1.1rem] sm:text-[1.25rem] text-white BenzinSemibold">{activeContent?.name}</div>
              <div className="text-[0.8rem] sm:text-base text-white/48">{activeContent?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
