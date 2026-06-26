'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Battery, Clapperboard, Heart, Home, MessageCircle, MoreHorizontal, Music2, Search, Send, Signal, SquarePlus, UserCircle, Wifi } from 'lucide-react'
import Navbar from '../navbar'
import Footer from '../footer'
import Brandsspec from '../brandsspec'

const serviceFormats = [
  'Motion graphics',
  'Explainer videos',
  'Reels and shorts',
  'Website hero videos',
  'Product videos',
  'Brand story edits',
]

const productionSteps = [
  {
    number: '01',
    title: 'Creative Direction',
    desc: 'We define the story, mood, platform, timing, visual style, and key message before editing begins.',
  },
  {
    number: '02',
    title: 'Script & Storyboard',
    desc: 'We map the scenes, copy, captions, transitions, audio moments, and visual rhythm so the edit has structure.',
  },
  {
    number: '03',
    title: 'Edit & Animate',
    desc: 'We cut footage, add motion graphics, build title systems, refine pacing, color, sound, and branded details.',
  },
  {
    number: '04',
    title: 'Export for Every Channel',
    desc: 'We deliver clean versions for websites, ads, social platforms, presentations, launches, and campaigns.',
  },
]

const deliverables = [
  {
    title: 'Social Campaign Cuts',
    desc: 'Vertical, square, and widescreen edits built for Instagram, TikTok, YouTube, LinkedIn, and paid campaigns.',
  },
  {
    title: 'Website Motion Assets',
    desc: 'Hero loops, service visuals, product animations, and background videos that make pages feel more alive.',
  },
  {
    title: 'Explainer Systems',
    desc: 'Animated videos that simplify offers, product flows, onboarding steps, and complex business ideas.',
  },
  {
    title: 'Brand Video Polish',
    desc: 'Clean edits with pacing, music, captions, color correction, and motion details that feel on-brand.',
  },
]

const outcomes = [
  'Sharper message retention',
  'More engaging landing pages',
  'Reusable campaign assets',
  'Platform-ready exports',
]

const reelShowcase = [
  {
    title: 'Launch Teaser Edit',
    desc: 'Fast cuts, captions, hooks, and branded motion for campaign launches.',
    video: '/1 (1) (1) (1).webm',
  },
  {
    title: 'Product Highlight Short',
    desc: 'Vertical edits made for quick product education and social discovery.',
    video: '/2 (1) (1) (1).webm',
  },
  {
    title: 'Brand Story Reel',
    desc: 'Motion-led storytelling with music, pacing, and clean visual rhythm.',
    video: '/3 (1) (1) (1).webm',
  },
  {
    title: 'Service Explainer Short',
    desc: 'Short-form explainers that simplify the offer in seconds.',
    video: '/4 (1) (1) (1).webm',
  },
  {
    title: 'Social Proof Edit',
    desc: 'Short testimonial-style edits with strong pacing and clear takeaway moments.',
    video: '/5 (1) (1) (1).webm',
  },
  {
    title: 'Motion Brand Moment',
    desc: 'Quick animated brand beats designed for repeated social and campaign use.',
    video: '/6 (1) (1) (1).webm',
  },
  {
    title: 'Campaign Reel Cut',
    desc: 'High-energy vertical edits built around hooks, rhythm, and branded detail.',
    video: '/7 (1) (1) (1).webm',
  },
  {
    title: 'Offer Explainer Short',
    desc: 'Compact edits that clarify the offer and keep the viewer moving.',
    video: '/8 (1) (1) (1).webm',
  },
]

const reelStats = [
  { likes: '23K', comments: '652', shares: '15.1K' },
  { likes: '18K', comments: '421', shares: '9.8K' },
  { likes: '31K', comments: '884', shares: '18.6K' },
  { likes: '14K', comments: '337', shares: '7.2K' },
  { likes: '27K', comments: '719', shares: '12.4K' },
  { likes: '19K', comments: '508', shares: '10.3K' },
  { likes: '35K', comments: '941', shares: '21.7K' },
  { likes: '16K', comments: '398', shares: '8.4K' },
]

const youtubeEditingShowcase = [
  {
    title: 'YouTube Intro Editing',
    desc: 'Openers with clean pacing, animated titles, logo moments, and branded sound cues.',
    video: '/bmyb-services-brand-hero-video-01.mp4',
  },
  {
    title: 'Long-Form Video Polish',
    desc: 'Cuts, captions, transitions, color cleanup, b-roll timing, and final export formatting.',
    video: '/bmyb-global-strock-animation-1-01.mp4',
  },
  {
    title: 'YouTube Ad Editing',
    desc: 'Hook-first ads built for retention, product clarity, and platform-ready delivery.',
    video: '/bmyb-services-brand-hero-video-01.mp4',
  },
]

export default function AnimationVideoEditingPage() {
  const volumeFadeTimers = useRef(new WeakMap<HTMLVideoElement, number>())

  const fadeReelVolume = (video: HTMLVideoElement, targetVolume: number) => {
    const timers = volumeFadeTimers.current
    const activeTimer = timers.get(video)

    if (activeTimer) {
      window.clearInterval(activeTimer)
    }

    if (targetVolume > 0) {
      video.muted = false
      void video.play().catch(() => {})
    }

    const step = targetVolume > video.volume ? 0.04 : -0.04
    const timer = window.setInterval(() => {
      const nextVolume = video.volume + step
      const isComplete = step > 0 ? nextVolume >= targetVolume : nextVolume <= targetVolume

      if (isComplete) {
        video.volume = targetVolume
        if (targetVolume === 0) {
          video.muted = true
        }
        window.clearInterval(timer)
        timers.delete(video)
        return
      }

      video.volume = Math.max(0, Math.min(1, nextVolume))
    }, 80)

    timers.set(video, timer)
  }

  return (
    <div className="bg-[#11122F] text-white">
      <style>
        {`
          @keyframes reelAutoScroll {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(-50% - 0.875rem));
            }
          }

          .reel-auto-track {
            --reel-gap: 1.75rem;
            width: max-content;
            animation: reelAutoScroll 30s linear infinite;
            gap: var(--reel-gap);
          }

          .reel-auto-track:hover {
            animation-play-state: paused;
          }

        `}
      </style>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden pt-32">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/Bmybrand (1)_compressed (1).webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-[#11122F]/90 via-[#11122F]/62 to-[#11122F]/25" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-[90%] flex-col justify-center pb-16 2xl:w-[75%]">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="BenzinSemibold text-sm tracking-wider text-[#F45B25]">Animation & Video Editing</span>
              <span className="h-px w-16 bg-[#F45B25]/50" />
            </div>

            <h1 className="BenzinSemibold max-w-6xl text-2xl leading-tight text-white md:text-3xl lg:text-4xl 2xl:text-5xl">
              Motion Content That Makes Your Brand Easier to Watch, Understand, and Remember
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              We create scroll-stopping edits, animated explainers, website motion assets, and polished brand videos
              that turn ideas into clear visual stories for every digital channel.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {serviceFormats.map((format) => (
                <span key={format} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
                  {format}
                </span>
              ))}
            </div>

            <Link
              href="/strategy-call"
              className="BenzinSemibold mt-12 inline-flex items-center rounded-full bg-[#F45B25] px-7 py-4 text-sm text-white transition hover:bg-[#ff7438]"
            >
              Create Video Content
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-[90%] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] 2xl:w-[75%]">
          <div>
            <p className="BenzinSemibold mb-4 text-sm text-[#F45B25]">Built for pace, clarity, and recall</p>
            <h2 className="BenzinSemibold text-3xl leading-tight md:text-4xl lg:text-5xl">
              Every frame should help the viewer get the point faster.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-[#F45B25]"
              >
                <h3 className="BenzinSemibold mb-3 text-lg text-white">{item.title}</h3>
                <p className="text-sm leading-7 text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-16 lg:py-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div>
              <p className="BenzinSemibold mb-4 text-sm text-[#F45B25]">Short-Form Video Edits</p>
              <h2 className="BenzinSemibold max-w-3xl text-3xl leading-tight md:text-4xl lg:text-5xl">
                Short-form edits built to move fast and keep attention.
              </h2>
            </div>
          </div>

          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="reel-auto-track flex">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="flex shrink-0 gap-7">
                  {reelShowcase.map((reel, index) => (
                    <div
                      key={`${groupIndex}-${reel.title}-${index}`}
                      className="group w-[270px] shrink-0 sm:w-[316px]"
                      onMouseEnter={(event) => {
                        const video = event.currentTarget.querySelector('video')
                        if (video) fadeReelVolume(video, 0.85)
                      }}
                      onMouseLeave={(event) => {
                        const video = event.currentTarget.querySelector('video')
                        if (video) fadeReelVolume(video, 0)
                      }}
                    >
                      <div className="rounded-[2rem] border border-white/12 bg-[#202141] p-2 shadow-2xl shadow-black/25 transition duration-500 group-hover:-translate-y-2 group-hover:border-[#F45B25]/40">
                        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#11122F]">
                          <video
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            <source src={reel.video} type="video/webm" />
                          </video>
                          <div className="absolute inset-0 z-[1] bg-black/12 backdrop-blur-[3px] transition-opacity duration-500 group-hover:opacity-0" />
                          <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/8 to-black/46" />
                          <div className="absolute left-1/2 top-3 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80 shadow-lg shadow-black/35" />
                          <div className="absolute inset-x-0 top-0 z-10 px-4 pt-3 text-white">
                            <div className="flex items-center justify-between text-[11px] font-semibold leading-none drop-shadow">
                              <span>9:41</span>
                              <div className="flex items-center gap-1">
                                <Signal className="h-3.5 w-3.5 fill-white/80" strokeWidth={2.6} />
                                <Wifi className="h-3.5 w-3.5" strokeWidth={2.6} />
                                <Battery className="h-4 w-4" strokeWidth={2.4} />
                              </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between">
                              <div className="h-4" />
                            </div>
                          </div>
                          <div className="absolute bottom-[96px] right-3 z-10 flex flex-col items-center gap-2.5 text-white drop-shadow">
                            <div className="text-center">
                              <Heart className="mx-auto h-5 w-5 fill-transparent" strokeWidth={2.4} />
                              <span className="mt-1 block text-[10px] font-bold">{reelStats[index].likes}</span>
                            </div>
                            <div className="text-center">
                              <MessageCircle className="mx-auto h-5 w-5" strokeWidth={2.4} />
                              <span className="mt-1 block text-[10px] font-bold">{reelStats[index].comments}</span>
                            </div>
                            <div className="text-center">
                              <Send className="mx-auto h-5 w-5" strokeWidth={2.4} />
                              <span className="mt-1 block text-[10px] font-bold">{reelStats[index].shares}</span>
                            </div>
                            <MoreHorizontal className="h-5 w-5" strokeWidth={2.4} />
                            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/45 bg-black/35 backdrop-blur">
                              <Music2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                            </div>
                          </div>
                          <div className="absolute inset-x-0 bottom-[76px] z-10 px-4 text-white drop-shadow">
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/75 bg-[#11122F]">
                                <Image src="/bmybrand-B.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                              </span>
                              <span className="max-w-[104px] truncate text-xs font-bold">bmybrand</span>
                              <span className="rounded-md border border-white/70 px-2 py-1 text-[10px] font-bold leading-none">Follow</span>
                            </div>
                            <p className="mt-2 max-w-[190px] truncate text-[11px] font-semibold leading-4">
                              {reel.desc}
                            </p>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/68 px-5 pb-3 pt-2 text-white backdrop-blur">
                            <div className="flex items-center justify-between">
                              <Home className="h-[18px] w-[18px]" strokeWidth={2.2} />
                              <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
                              <SquarePlus className="h-[18px] w-[18px]" strokeWidth={2.2} />
                              <Clapperboard className="h-[18px] w-[18px] fill-white/20" strokeWidth={2.2} />
                              <UserCircle className="h-[18px] w-[18px]" strokeWidth={2.2} />
                            </div>
                            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-white/85" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-[#11122F]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/bmyb-global-strock-animation-1-01.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-linear-to-t from-[#11122F] via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="BenzinSemibold text-3xl leading-tight md:text-4xl lg:text-5xl">What You Get</h2>
              <div className="mt-8 space-y-4">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F45B25]">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-base text-white/80">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <h2 className="BenzinSemibold mb-14 text-center text-3xl md:text-4xl lg:text-5xl">
            Production Process
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productionSteps.map((step) => (
              <div
                key={step.number}
                className="group relative rounded-lg border border-white/10 bg-[#11122F] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#F45B25]/45 hover:bg-[#202141] hover:shadow-2xl hover:shadow-black/25"
              >
                <span className="BenzinSemibold text-5xl text-[#F45B25]/30 transition duration-300 group-hover:text-[#F45B25]/70">{step.number}</span>
                <h3 className="BenzinSemibold mt-8 text-xl text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto w-[90%] rounded-lg border border-[#F45B25]/25 bg-[#11122F] p-8 text-center md:p-12 2xl:w-[75%]">
          <p className="BenzinSemibold text-sm text-[#F45B25]">Ready for motion?</p>
          <h2 className="BenzinSemibold mx-auto mt-4 max-w-3xl text-3xl leading-tight md:text-4xl lg:text-5xl">
            Turn your message into a video people actually finish watching.
          </h2>
          <Link
            href="/strategy-call"
            className="BenzinSemibold mt-8 inline-flex rounded-full border border-white/20 px-7 py-4 text-sm text-white transition hover:border-[#F45B25] hover:text-[#F45B25]"
          >
            Start a Video Project
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div>
              <p className="BenzinSemibold mb-4 text-sm text-[#F45B25]">YouTube Video Editing</p>
              <h2 className="BenzinSemibold max-w-3xl text-3xl leading-tight md:text-4xl lg:text-5xl">
                Longer edits, ads, and branded YouTube videos.
              </h2>
            </div>
            <Link
              href="https://www.youtube.com/@BMyBrandofficial"
              target="_blank"
              rel="noreferrer"
              className="BenzinSemibold rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:border-[#F45B25] hover:text-[#F45B25]"
            >
              View YouTube
            </Link>
          </div>

          <div className="grid gap-4 lg:gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <div className="group overflow-hidden rounded-lg border border-white/10 bg-[#202141]">
              <div className="relative overflow-hidden">
                <video
                  className="block h-auto w-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={youtubeEditingShowcase[0].video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-linear-to-t from-[#11122F] via-[#11122F]/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F45B25] shadow-2xl shadow-black/30 transition duration-300 group-hover:scale-110 md:h-20 md:w-20">
                    <svg className="ml-1 h-6 w-6 text-white md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#11122F]/80 px-3 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur md:left-6 md:top-6 md:px-4 md:py-2 md:text-xs">
                  Featured Edit
                </div>
              </div>
              <div className="p-5 md:p-8">
                <h3 className="BenzinSemibold text-xl text-white md:text-2xl">{youtubeEditingShowcase[0].title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 md:mt-4 md:leading-7">{youtubeEditingShowcase[0].desc}</p>
              </div>
            </div>

            <div className="grid auto-rows-max content-start gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-1 xl:grid-rows-2 xl:content-stretch">
              {youtubeEditingShowcase.slice(1).map((video) => (
                <div key={video.title} className="group h-fit overflow-hidden rounded-lg border border-white/10 bg-[#11122F] xl:flex xl:h-full">
                  <div className="relative overflow-hidden xl:flex xl:h-full xl:w-full xl:items-center">
                    <video
                      className="block h-auto w-full object-cover xl:h-full"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={video.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F45B25] transition duration-300 group-hover:scale-110">
                        <svg className="ml-0.5 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 hidden translate-y-6 bg-linear-to-t from-[#11122F] via-[#11122F]/85 to-transparent p-5 opacity-0 transition duration-500 lg:block lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      <h3 className="BenzinSemibold text-lg text-white">{video.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-white/70">{video.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Brandsspec />
      <Footer />
    </div>
  )
}
