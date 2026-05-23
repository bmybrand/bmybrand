'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Gravity, { MatterBody } from '@/components/fancy/physics/gravity'

export default function BrandExperienceHero() {
  const [activePrimaryCard, setActivePrimaryCard] = React.useState<'audit' | 'strategy'>('audit')
  const [bentoInView, setBentoInView] = React.useState(false)
  const [physicsReady, setPhysicsReady] = React.useState(false)
  const [heroVideoInView, setHeroVideoInView] = React.useState(false)
  const [activeEdgeStory, setActiveEdgeStory] = React.useState(0)
  const [isEdgeStoryPaused, setIsEdgeStoryPaused] = React.useState(false)
  const [edgeStoryProgress, setEdgeStoryProgress] = React.useState(0)
  const bentoGridRef = React.useRef<HTMLDivElement | null>(null)
  const heroVideoSectionRef = React.useRef<HTMLDivElement | null>(null)
  const edgeStoryFrameRef = React.useRef<number | null>(null)
  const edgeStoryStartTimeRef = React.useRef<number | null>(null)
  const edgeStoryCount = 3
  const edgeStoryDuration = 2600

  const goToEdgeStory = React.useCallback((index: number) => {
    setActiveEdgeStory(index)
    setEdgeStoryProgress(0)
  }, [])

  const goToPreviousEdgeStory = React.useCallback(() => {
    goToEdgeStory((activeEdgeStory - 1 + edgeStoryCount) % edgeStoryCount)
  }, [activeEdgeStory, edgeStoryCount, goToEdgeStory])

  const goToNextEdgeStory = React.useCallback(() => {
    goToEdgeStory((activeEdgeStory + 1) % edgeStoryCount)
  }, [activeEdgeStory, edgeStoryCount, goToEdgeStory])

  const features = [
    { image: '/bmyb-services-brand-card-icon-1-01.svg', title: 'Visual Identity System', description: 'We design logos, colors, and typography for branding and logo design services.' },
    { image: '/bmyb-services-brand-card-icon-2-01.svg', title: 'Unified Brand Messaging', description: 'We create consistent messaging for business branding services in Texas.' },
    { image: '/bmyb-services-brand-card-icon-3-01.svg', title: 'Cross-Platform Consistency', description: 'We keep brand identity consistent through branding identity development services.' },
    { image: '/bmyb-services-brand-card-icon-4-01.svg', title: 'Experience-Driven Design', description: 'We design smooth experiences that improve brand experience and trust.' }
  ]

  const impactAreas = [
    { number: '01', title: 'Brand Research', description: 'We analyze the market, audience, and competitors to build informed and effective brand experience strategies.' },
    { number: '02', title: 'Brand Positioning', description: 'We define how your brand stands out clearly in competitive markets with a strong differentiation strategy.' },
    { number: '03', title: 'Tone of Voice', description: 'We establish a consistent communication style that reflects personality and builds an emotional connection with the audience.' },
    { number: '04', title: 'Creative Direction', description: 'We guide visual and conceptual direction to ensure all brand elements stay aligned and impactful.' },
    { number: '05', title: 'Brand Guidelines', description: 'We create structured rules for visuals and messaging to maintain consistency across all platforms.' },
    { number: '06', title: 'Digital Presence', description: 'We shape how your brand appears across websites, social media, and digital platforms consistently.' }
  ]
  const edgeStoryImageByIndex: Record<number, string> = {
    1: '/bmyb-services-brand-story-card-2-01.webp',
    2: '/bmyb-services-brand-story-card-3-01.webp',
  }
  const activeEdgeStoryImage = edgeStoryImageByIndex[activeEdgeStory]
  const isImageEdgeStory = Boolean(activeEdgeStoryImage)

  const primaryCardContent =
    activePrimaryCard === 'audit'
      ? {
          heading: 'Find The Gaps In Your Digital',
          emphasis: 'Brand Experience',
          description: 'Uncover gaps in usability, messaging, and conversion.',
          cta: 'Start Website Audit'
        }
      : {
          heading: 'Book A Strategy Call',
          emphasisPrefix: 'Built Around ',
          emphasis: 'Your Goals',
          description: 'Schedule a quick strategy call for your brand & growth.',
          cta: 'Book Strategy Call'
        }

  React.useEffect(() => {
    const node = bentoGridRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBentoInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const node = heroVideoSectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVideoInView(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0,
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!bentoInView) return

    let frameOne: number | null = null
    let frameTwo: number | null = null

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        setPhysicsReady(true)
      })
    })

    return () => {
      if (frameOne !== null) cancelAnimationFrame(frameOne)
      if (frameTwo !== null) cancelAnimationFrame(frameTwo)
    }
  }, [bentoInView])

  React.useEffect(() => {
    if (isEdgeStoryPaused) {
      if (edgeStoryFrameRef.current !== null) {
        cancelAnimationFrame(edgeStoryFrameRef.current)
        edgeStoryFrameRef.current = null
      }
      edgeStoryStartTimeRef.current = null
      return
    }

    const initialElapsed = edgeStoryProgress * edgeStoryDuration

    const tick = (timestamp: number) => {
      if (edgeStoryStartTimeRef.current === null) {
        edgeStoryStartTimeRef.current = timestamp - initialElapsed
      }

      const elapsed = timestamp - edgeStoryStartTimeRef.current
      const progress = Math.min(elapsed / edgeStoryDuration, 1)
      setEdgeStoryProgress(progress)

      if (progress >= 1) {
        setActiveEdgeStory((current) => (current + 1) % edgeStoryCount)
        setEdgeStoryProgress(0)
        edgeStoryStartTimeRef.current = null
        return
      }

      edgeStoryFrameRef.current = requestAnimationFrame(tick)
    }

    edgeStoryFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (edgeStoryFrameRef.current !== null) {
        cancelAnimationFrame(edgeStoryFrameRef.current)
        edgeStoryFrameRef.current = null
      }
      edgeStoryStartTimeRef.current = null
    }
  }, [activeEdgeStory, edgeStoryCount, edgeStoryDuration, edgeStoryProgress, isEdgeStoryPaused])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="pb-30 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-white text-2xl md:text-3xl lg:text-[45px] BenzinBold mb-8 leading-tight ">
                We Build Brands That Feel Consistent Everywhere
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                At BMYBrand, a leading digital branding agency, we specialize in creating powerful and consistent brand experience systems that help businesses stand out across every platform. Our focus on brand identity development services ensures that your visuals, messaging, and overall presence work together as one unified system. From strategy to execution, we build brands that feel cohesive, recognizable, and memorable at every customer touchpoint, whether digital or physical. This consistency strengthens trust, improves recognition, and positions your business as a professional and reliable brand in competitive markets like the USA and Texas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="rounded-xl border-2 border-white/10 bg-[#191A35] p-7 transition-all duration-300 hover:border-[#F45B25]/50">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#21223F]">
                    <img src={feature.image} alt="" className="h-10 w-10 object-contain" />
                  </div>
                  <h3 className="text-white text-lg BenzinSemibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div ref={bentoGridRef} className="grid auto-rows-[6.4rem] gap-4 md:grid-cols-12 md:auto-rows-[6.4rem]">
            <div className="group relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] px-7 py-5 md:col-span-5 md:row-span-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,132,62,0.34),transparent_46%)]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,rgba(244,91,37,0.4),transparent_66%)]" />
              <div className="relative z-10 flex h-full flex-col pb-32">
                <div className="flex items-center justify-between gap-3">
                  <img
                    src="/bmyb-services-brand-bmybrand-01-01.svg"
                    alt="BMYBrand"
                    className="h-10 w-auto object-contain"
                  />
                  <div className="inline-flex h-11 items-center rounded-full border border-white/25 bg-transparent px-1.5 text-[0.62rem] text-white/78">
                    <button
                      type="button"
                      onClick={() => setActivePrimaryCard('audit')}
                      className={`inline-flex h-8 items-center rounded-full px-4 transition-colors BenzinRegular ${
                        activePrimaryCard === 'audit' ? 'bg-[#FF6A2B] text-white' : 'text-white/78'
                      }`}
                    >
                      Website Audit
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePrimaryCard('strategy')}
                      className={`inline-flex h-8 items-center rounded-full px-4 transition-colors BenzinRegular ${
                        activePrimaryCard === 'strategy' ? 'bg-[#FF6A2B] text-white' : 'text-white/78'
                      }`}
                    >
                      Strategy Call
                    </button>
                  </div>
                </div>

                <div className="mx-auto mt-8 max-w-[29rem] text-center">
                  <h3 className="text-[25px] leading-[1.15] text-white BenzinSemibold">
                    {primaryCardContent.heading}
                    <span className="mt-2 block">
                      {primaryCardContent.emphasisPrefix ?? ''}
                      <span className="text-[#FF6A2B]">{primaryCardContent.emphasis}</span>
                    </span>
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/58">
                    {primaryCardContent.description}
                  </p>
                  <button className="mt-6 rounded-[0.45rem] bg-[#FF6A2B] px-7 py-4 text-sm text-white BenzinSemibold">
                    {primaryCardContent.cta}
                  </button>
                </div>

              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
                <div className="relative h-64 w-[20rem]">
                  <div className="absolute inset-0 flex items-end justify-center">
                    <img
                      src="/bmyb-services-brand-bento-mark-01.svg"
                      alt="BMYBrand mark"
                      className="h-auto w-[35rem] max-w-none object-contain translate-y-[14rem] transition-transform duration-300 ease-out group-hover:translate-y-[13.2rem]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-3 md:row-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,132,62,0.2),transparent_60%)]" />
              <div className="relative z-10 flex h-full items-center justify-center">

                <div className="grid grid-cols-4 gap-6">
                  {[
                    { src: "/bmyb-services-brand-icon-01.svg", alt: "Mail" },
                    { src: "/bmyb-services-brand-icon-02.svg", alt: "Stars" },
                    { src: "/bmyb-services-brand-icon-03.svg", alt: "Exchange" },
                    { src: "/bmyb-services-brand-icon-04.svg", alt: "Archive" },
                    { src: "/bmyb-services-brand-icon-05.svg", alt: "Trash" },
                    { src: "/bmyb-services-brand-icon-06.svg", alt: "Search" },
                    { src: "/bmyb-services-brand-icon-07.svg", alt: "Terminal" },
                    { src: "/bmyb-services-brand-icon-08.svg", alt: "Undo" }
                  ].map((icon, index) => (
                    <motion.img
                      key={index}
                      src={icon.src}
                      alt={icon.alt}
                      className="h-9 w-9 object-contain cursor-pointer"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          delay: 0.1 + index * 0.05,
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 8,
                        transition: { duration: 0.2 } 
                      }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>

              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] px-8 py-6 md:col-span-4 md:row-span-5"
              onMouseEnter={() => setIsEdgeStoryPaused(true)}
              onMouseLeave={() => setIsEdgeStoryPaused(false)}
            >
              <button
                type="button"
                aria-label="Previous story"
                className="absolute inset-y-0 left-0 z-10 w-1/2"
                onClick={goToPreviousEdgeStory}
              />
              <button
                type="button"
                aria-label="Next story"
                className="absolute inset-y-0 right-0 z-10 w-1/2"
                onClick={goToNextEdgeStory}
              />
              {isImageEdgeStory ? (
                <>
                  <img
                    src={activeEdgeStoryImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,18,40,0.08),rgba(15,18,40,0.12)_36%,rgba(15,18,40,0.28)_100%)]" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,132,62,0.45),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(244,91,37,0.3),transparent_40%)]" />
                </>
              )}
              <div className="relative z-20 flex h-full flex-col">
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {Array.from({ length: edgeStoryCount }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to story ${index + 1}`}
                      className="h-[3px] overflow-hidden rounded-full bg-white/18"
                      onClick={() => goToEdgeStory(index)}
                    >
                      {index < activeEdgeStory ? (
                        <div className="h-full w-full rounded-full bg-white/80" />
                      ) : index === activeEdgeStory ? (
                        <div
                          className="h-full rounded-full bg-white/85"
                          style={{ width: `${edgeStoryProgress * 100}%` }}
                        />
                      ) : null}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                    <>
                      <img
                        src="/bmyb-logo-group-1597884236-01.svg"
                        alt="BMYBrand"
                        className="h-11 w-auto object-contain"
                      />
                      <div className="text-sm text-white/78">5h ago</div>
                    </>
                </div>

                {isImageEdgeStory ? (
                  <div className="flex-1" />
                ) : (
                  <>
                    <div className="mt-6">
                      <h3 className="text-[38px] leading-[1.15] text-white BenzinSemibold">
                        The Edge
                        <span className="block">Your Brand</span>
                        <span className="block">Needs</span>
                      </h3>
                    </div>

                    <div className="relative mt-8 min-h-[13rem] flex-1 overflow-hidden pb-2">
                      {physicsReady ? (
                        <Gravity gravity={{ x: 0, y: 1 }} draggable={true} className="h-[calc(100%_-_0.35rem)] w-full px-4 py-2">
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="12%" y="2%" angle={-70}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Brand Strategy
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="24%" y="8%" angle={-26}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Experience-Led Design
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="54%" y="6%" angle={24}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Expertise Design
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="88%" y="2%" angle={90}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Identity Design
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="10%" y="18%" angle={-18}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Design Systems
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="57%" y="20%" angle={30}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Creative Direction
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="23%" y="30%" angle={-18}>
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Brand Guidelines
                              </div>
                            </div>
                          </MatterBody>
                          <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="57%" y="34%">
                            <div>
                              <div className="inline-flex items-center justify-center rounded-full border border-[#FF5A2F] px-[22px] py-[10px] text-[14px] leading-none text-white whitespace-nowrap bg-transparent select-none">
                                Creative Systems
                              </div>
                            </div>
                          </MatterBody>
                        </Gravity>
                      ) : null}
                    </div>
                  </>
                )}

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <input
                    type="text"
                    placeholder="Send message"
                    className="flex-1 rounded-full border border-white/55 bg-transparent px-4 py-3 text-[11px] text-white placeholder:text-white/55 outline-none transition-colors focus:border-white/80"
                  />
                  <button
                    type="button"
                    aria-label="Like"
                    className="flex h-10 w-10 items-center justify-center"
                  >
                    <img
                      src="/bmyb-services-brand-bento-like-01.svg"
                      alt=""
                      className="h-5 w-5 object-contain"
                      style={{ filter: 'brightness(0) saturate(100%) invert(86%) opacity(0.9)' }}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Share"
                    className="flex h-10 w-10 items-center justify-center"
                  >
                    <img
                      src="/bmyb-services-brand-bento-share-01.svg"
                      alt=""
                      className="h-5 w-5 object-contain"
                      style={{ filter: 'brightness(0) saturate(100%) invert(86%) opacity(0.9)' }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-3 md:row-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_52%)]" />
              <div className="relative z-10 flex h-full items-center justify-center p-4">
                <img
                  src="/bmyb-services-brand-bento-mark-alt-01.svg"
                  alt="BMYBrand alternate mark"
                  className="h-auto w-[6rem] object-contain"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-8 md:row-span-1">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(244,91,37,0.38),transparent_55%)] mix-blend-plus-lighter" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_50%,rgba(244,91,37,0.22),transparent_45%)] mix-blend-plus-lighter" />
              <div className="relative z-10 flex h-full items-center justify-between gap-6 px-2">
                <div className="text-[24px] leading-none text-white BenzinSemibold">
                  Benzin
                </div>
                <div className="text-[24px] leading-none text-white BenzinSemibold tracking-[0.02em]">
                  #F45B25
                </div>
                <div className="flex items-center">
                  <span className="h-[3.3rem] w-[3.3rem] rounded-full bg-[linear-gradient(180deg,#FF843E_0%,#F45B25_100%)] shadow-[0_0_30px_rgba(244,91,37,0.4)]" />
                  <span className="-ml-3 h-[3.3rem] w-[3.3rem] rounded-full bg-[linear-gradient(180deg,#F45B25_0%,#FF843E_100%)] shadow-[0_0_30px_rgba(255,132,62,0.35)]" />
                  <span className="-ml-3 h-[3.3rem] w-[3.3rem] rounded-full bg-[linear-gradient(180deg,#FFF8F0_0%,#FFFFFF_58%,#F1E8DE_100%)]" />
                  <span className="-ml-3 h-[3.3rem] w-[3.3rem] rounded-full bg-[linear-gradient(180deg,#353777_0%,#27295E_58%,#1E204B_100%)]" />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-[#1C1D3D] p-6 md:col-span-3 md:row-span-3">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,91,37,0.25),transparent_70%)]" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="text-center text-[1.15rem] text-white/92 BenzinSemibold mb-0 pb-0">
                  Notification Center
                </div>
                <div className="relative flex flex-1 items-center justify-center mt-0 pt-0 pb-0">
                  <motion.div
                    className="absolute left-1/2 top-[36%] h-[8.2rem] w-[18rem] rounded-l-[1.1rem] bg-white/70"
                    initial={{ opacity: 0, x: "-15%", y: "12%" }}
                    whileInView={{ opacity: 1, x: "-35%", y: "-8%" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-[41%] h-[8.2rem] w-[18rem] rounded-l-[1.1rem] bg-white/70"
                    initial={{ opacity: 0, x: "-4%", y: "22%" }}
                    whileInView={{ opacity: 1, x: "-24%", y: "2%" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />

                  <motion.div
                    className="relative flex w-[18rem] bg-[#E9E6E8]/70 max-w-none shrink-0 items-center gap-3 rounded-l-[1.1rem] px-6 py-6 shadow-[0_22px_44px_rgba(10,12,30,0.28)] ml-[1.8rem]"
                    style={{ top: '-0.9rem' }}
                    initial={{ opacity: 0, x: 60, y: 60 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="flex h-[90px] w-[90px] items-center justify-center rounded-[1.2rem] bg-[linear-gradient(180deg,#FF843E_0%,#F45B25_100%)] shadow-[0_0_30px_rgba(244,91,37,0.24)]">
                      <img
                        src="/bmyb-tech-whitelogo-01.svg"
                        alt="BMYBrand mark"
                        className="h-[48px] w-[48px] object-contain brightness-0 invert"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[18px] leading-none text-[#1A1A2C] BenzinSemibold">
                        Bmybrand
                      </div>
                      <p className="mt-2 text-[16px] leading-[1.5] text-[#2B2B41]">
                        Boost Brands with
                        <br />
                        AI Power!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D]  md:col-span-5 md:row-span-3">
            <img
  src="/bmyb-tech-logodimen-01.svg"
  alt=""
  className="w-full h-full object-cover"
/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
            </div>

            <div className="relative overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] p-5 md:col-span-4 md:row-span-3 flex items-center justify-center">
  
  <img
    src="/bmyb-tech-bentologobox-01.svg"
    alt="Brand workflow icons"
    className="max-w-full max-h-full object-contain"
  />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_58%)]" />
</div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 grid items-stretch gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl BenzinBold mb-6 leading-tight">
                Key Aspects of Our Strong Brand
                <span className="block">Experience</span>
              </h2>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                <p>
                  We focus on building complete brand experience systems that help businesses create lasting impact. Our approach to brand identity development services ensures every element, from visuals to messaging, works together seamlessly to build recognition, trust, and consistency. We combine strategy, creativity, and design to deliver strong branding solutions for businesses searching for branding and logo design services near me, branding company in Texas, and the best branding services in the USA.
                </p>
                <p>
                  A strong brand is more than just visuals; it is the full experience people have at every interaction. Through structured brand identity development services, we ensure your business communicates clearly across all platforms. Whether it is business branding services in Texas or logo design and branding services near me, we create unified brand systems that feel professional, memorable, and consistent everywhere your audience connects with you.
                </p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between">
              {impactAreas.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white BenzinSemibold">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-white text-xl BenzinSemibold mb-2">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Hero Image Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div
            ref={heroVideoSectionRef}
            className="h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#11122F] md:h-[500px] lg:h-[600px]"
          >
            {heroVideoInView ? (
              <video
                src="/bmyb-services-brand-hero-video-01.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(244,91,37,0.14),transparent_30%),linear-gradient(135deg,#1a1a2e_0%,#11122F_100%)]" />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
