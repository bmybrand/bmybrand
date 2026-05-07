'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window

    const x = (e.clientX - innerWidth / 2) / innerWidth
    const y = (e.clientY - innerHeight / 2) / innerHeight

    // Background (slower movement)
    setOffset({
      x: x * 8,
      y: y * 8,
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#11122F] text-white overflow-hidden"
    >
      {/* Background Parallax */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover pointer-events-none will-change-transform transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/404.webp')",
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <div
          className="hidden absolute left-1/2 top-[60%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)]"
        />
      </div>

      {/* Center 404 Content */}
      <div className="absolute inset-0 z-10 text-center px-4 sm:px-6">
        <div
          className="absolute left-1/2 top-[68%] min-[1440px]:top-[60%]"
          style={{
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
          }}
        >
          {/* Top Text */}
          <h2 className="pointer-events-none absolute bottom-full left-1/2 mb-2 min-[1440px]:mb-4 w-max -translate-x-1/2 text-white text-xs min-[1440px]:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold opacity-90">
            oops! this page went off-orbit
          </h2>

          {/* Keep the SVG constrained to its wrapper bounds. */}
          <div className="relative w-[90vw] lg:w-[55vw]">
            <img
              src="/404text.svg"
              alt="404"
              className="pointer-events-none block h-auto w-full max-w-full"
            />
            <p className="pointer-events-none hidden min-[1440px]:block absolute left-1/2 bottom-20 w-max -translate-x-1/2 text-center text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              Something interrupted your journey. The page may have moved, become
              <br />
              unavailable, or the route may no longer be active.
            </p>
            <Link
              href="/"
              className="pointer-events-auto hidden min-[1440px]:inline-flex absolute left-1/2 bottom-2 -translate-x-1/2 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] BenzinRegular"
            >
              <div className="rounded-lg bg-white p-4">
                <img
                  src="/bmyb-logo-group1190-01.svg"
                  alt=""
                  className="h-4 w-4"
                />
              </div>
              <span className="px-2">Take Me Home</span>
            </Link>
          </div>

          <div className="mt-3 flex flex-col items-center gap-3 min-[1440px]:hidden">
            <p className="pointer-events-none max-w-[calc(100vw-2rem)] px-2 text-center text-white/80 text-[10px] leading-relaxed">
              Something interrupted your journey. The page may have moved, become <br /> unavailable, or the route may no longer be active.
            </p>
            <Link
              href="/"
              className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-2 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] BenzinRegular"
            >
              <div className="rounded-lg bg-white p-4">
                <img
                  src="/bmyb-logo-group1190-01.svg"
                  alt=""
                  className="h-4 w-4"
                />
              </div>
              <span className="px-2">Take Me Home</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Header */}
      <div className="relative z-20 pointer-events-none">
        <header className="pointer-events-auto fixed top-7 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] xl:w-[85%] z-50 bg-[#FFFFFF]/5 backdrop-blur border-2 border-white/20 rounded-2xl">
          <nav className="mx-auto flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 md:px-10 py-3 sm:py-4">
            <Link href="/" className="text-white font-bold text-xl">
              <img
                src="/bmyb-services-brand-bmybrand-01-01.svg"
                alt="BMYBrand"
                className="h-8 sm:h-10 lg:h-11 xl:h-12 2xl:h-14 w-auto"
              />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg text-[11px] sm:text-sm md:text-base lg:text-lg font-medium hover:opacity-90 transition BenzinSemibold bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white whitespace-nowrap"
            >
              Back to Home
            </Link>
          </nav>
        </header>

      </div>
    </div>
  )
}
