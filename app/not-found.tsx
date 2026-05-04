'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window

    const x = (e.clientX - innerWidth / 2) / innerWidth
    const y = (e.clientY - innerHeight / 2) / innerHeight

    // Background (slower movement)
    setOffset({
      x: x * 8,
      y: y * 8,
    })

    // Text (slightly faster, subtle movement)
    setTextOffset({
      x: x * 4,
      y: y * 4,
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
          backgroundImage: "url('/404.svg')",
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      />

      {/* Center 404 Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none translate-y-18 text-center">

        {/* Top Text */}
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 opacity-90">
          oops! this page went off-orbit
        </h2>

        {/* 404 Image */}
        <img
          src="/404text.svg"
          alt="404"
          className="w-[clamp(260px,55vw,900px)] h-auto transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${textOffset.x}px, ${textOffset.y}px, 0)`,
          }}
        />

        {/* Bottom Text */}
        <p className="text-white/80 text-sm md:text-base max-w-md mt-4 leading-relaxed">
          Something interrupted your journey. The page may have moved, become unavailable, or the route may no longer be active.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="mt-6 pointer-events-auto inline-flex items-center px-6 py-3 rounded-lg text-sm md:text-base font-medium hover:opacity-90 transition bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white"
        >
          Take Me Home
        </Link>

      </div>

      {/* Header */}
      <div className="relative z-20">
        <header className="fixed top-7 left-1/2 -translate-x-1/2 w-[90%] xl:w-[85%] z-50 bg-[#FFFFFF]/5 backdrop-blur border-2 border-white/20 rounded-2xl">
          <nav className="mx-auto flex items-center justify-between px-6 md:px-10 py-4">
            <Link href="/" className="text-white font-bold text-xl">
              <img
                src="/bmyb-services-brand-bmybrand-01-01.svg"
                alt="BMYBrand"
                className="h-9 sm:h-10 lg:h-11 xl:h-12 2xl:h-14 w-auto"
              />
            </Link>

            <Link
              href="/"
              className="hidden xl:inline-flex items-center px-6 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition BenzinSemibold bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white"
            >
              Back to Home
            </Link>
          </nav>
        </header>

        <main className="min-h-screen" />
      </div>
    </div>
  )
}