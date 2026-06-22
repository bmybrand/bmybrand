import Link from 'next/link'
import Navbar from '../navbar'
import Footer from '../footer'
import EvaluatCTA from '../evaluatcta'
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
    platform: 'Instagram Reel',
    title: 'Launch Teaser Edit',
    desc: 'Fast cuts, captions, hooks, and branded motion for campaign launches.',
    href: 'https://www.instagram.com/bmybrand_official/',
    video: '/bmyb-services-brand-hero-video-01.mp4',
  },
  {
    platform: 'YouTube Shorts',
    title: 'Product Highlight Short',
    desc: 'Vertical edits made for quick product education and social discovery.',
    href: 'https://www.youtube.com/@BMyBrandofficial',
    video: '/bmyb-global-strock-animation-1-01.mp4',
  },
  {
    platform: 'Instagram Reel',
    title: 'Brand Story Reel',
    desc: 'Motion-led storytelling with music, pacing, and clean visual rhythm.',
    href: 'https://www.instagram.com/bmybrand_official/',
    video: '/bmyb-services-brand-hero-video-01.mp4',
  },
  {
    platform: 'YouTube Shorts',
    title: 'Service Explainer Short',
    desc: 'Short-form explainers that simplify the offer in seconds.',
    href: 'https://www.youtube.com/@BMyBrandofficial',
    video: '/bmyb-global-strock-animation-1-01.mp4',
  },
]

const reelLoop = [...reelShowcase, ...reelShowcase]

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
          poster="/bmyb-services-brand-banner-01.jpg"
        >
          <source src="/bmyb-services-brand-hero-video-01.mp4" type="video/mp4" />
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
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
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
              <p className="BenzinSemibold mb-4 text-sm text-[#F45B25]">Instagram Reels & YouTube Shorts</p>
              <h2 className="BenzinSemibold max-w-3xl text-3xl leading-tight md:text-4xl lg:text-5xl">
                Short-form edits built to move fast and keep attention.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              Desktop showcase for social cuts, platform versions, captions, pacing, and motion treatments.
            </p>
          </div>

          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="reel-auto-track flex">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="flex shrink-0 gap-7">
                  {reelLoop.map((reel, index) => (
                    <Link
                      key={`${groupIndex}-${reel.platform}-${reel.title}-${index}`}
                      href={reel.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group w-[252px] shrink-0 sm:w-[292px]"
                      aria-label={`View ${reel.title} on ${reel.platform}`}
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
                            <source src={reel.video} type="video/mp4" />
                          </video>
                          <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/75 shadow-lg shadow-black/30" />
                          <div className="absolute inset-0 bg-linear-to-t from-[#11122F] via-[#11122F]/18 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 translate-y-0 p-5 opacity-100 transition duration-500 lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                            <span className="mb-3 inline-flex rounded-full bg-[#F45B25] px-3 py-1 text-xs font-semibold text-white">
                              {reel.platform}
                            </span>
                            <div>
                              <h3 className="BenzinSemibold text-xl text-white">{reel.title}</h3>
                              <p className="mt-3 text-sm leading-6 text-white/70">{reel.desc}</p>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/45" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
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
        <div className="mx-auto max-w-6xl rounded-lg border border-[#F45B25]/25 bg-[#11122F] p-8 text-center md:p-12">
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

      <EvaluatCTA
        title="Turn Your Message into Motion!"
        description="Animation and video editing that helps your brand explain, sell, and stay memorable."
      />
      <Brandsspec />
      <Footer />
    </div>
  )
}
