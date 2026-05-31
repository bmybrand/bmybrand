'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function HerobarBrand() {
  const router = useRouter()
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [shouldRenderVideo, setShouldRenderVideo] = React.useState(false)

  React.useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldRenderVideo(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0,
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#11122F]">
      <div className="absolute inset-0">
        {shouldRenderVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bmyb-global-strock-animation-1-01.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,91,37,0.16),transparent_36%),linear-gradient(180deg,#171832_0%,#11122F_100%)]" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#11122F]/50 to-[#11122F]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center pt-32 pb-20">
        <h1 className="text-white text-4xl sm:text-7xl md:text-8xl lg:text-9xl BenzinSemibold mb-8 leading-tight">
          Brand Experience
        </h1>
        
        <p className="text-[#ADAECC] text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          BMYBrand is a digital branding agency delivering strategic brand identity development services and branding and logo design services that help businesses create a clear, memorable, and consistent brand presence across digital platforms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 BenzinSemibold justify-center items-center">
          <button
            onClick={() => router.push('/request')}
            className="bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2 BenzinSemibold"
          >
            <div className="bg-white p-4 rounded-lg">
              <img src="/bmyb-logo-group1190-01.svg" alt="" className="w-4 h-4" />
            </div>
            <span className="px-2">Start Your Project</span>
          </button>
          <button
            onClick={() => router.push('/case-studies')}
            className="border border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex justify-center items-center gap-2 BenzinSemibold"
          >
            <div className="bg-white p-4 rounded-lg">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#11122F" />
              </svg>
            </div>
            <span className="px-2">View Our Work</span>
          </button>
        </div>
      </div>
    </section>
  )
}
