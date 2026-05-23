'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function UnderConstructionPage() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window

    const x = (e.clientX - innerWidth / 2) / innerWidth
    const y = (e.clientY - innerHeight / 2) / innerHeight

    setOffset({
      x: x * 8,
      y: y * 8,
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#11122F] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/Under Development.webp')",
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      />

      <div className="absolute inset-0 bg-[#11122F]/55" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-24 z-10 transition-transform duration-700 ease-out will-change-transform sm:top-28"
        style={{
          transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`,
        }}
      >
        <div className="mx-auto flex h-full w-[92%] max-w-6xl flex-col items-center justify-end text-center sm:w-[90%]">
          <div className="relative z-[12] mb-[-12px] flex flex-col items-center sm:mb-[-16px] lg:mb-[-20px]">
            <h1 className="BenzinSemibold max-w-4xl text-2xl leading-tight text-white sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] 2xl:text-[3.15rem]">
              Something Awesome Is under Development
            </h1>
          </div>
          <div className="relative mb-14 w-full max-w-4xl sm:mb-16 lg:mb-18">
            <Image
              src="/ChatGPT Image May 2, 2026, 03_45_21 AM 1.webp"
              alt="Under development visual"
              width={1400}
              height={800}
              priority
              className="mx-auto h-auto max-h-[42vh] w-full object-contain sm:max-h-[48vh] lg:max-h-[56vh]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[11] h-32 bg-gradient-to-t from-[#11122F] via-[#11122F]/82 to-transparent sm:h-40 lg:h-48" />
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[12] flex justify-center px-4 sm:bottom-6 lg:bottom-8">
        <p className="max-w-2xl text-center text-xs leading-relaxed text-white/78 sm:text-sm md:text-base">
          We&apos;re currently Developing this part of the Website. Once This part is complete, it will be fully integrated into the experience.
        </p>
      </div>

      <div className="relative z-20 pointer-events-none">
        <header className="pointer-events-auto fixed left-1/2 top-7 z-50 w-[92%] -translate-x-1/2 rounded-2xl border-2 border-white/20 bg-[#FFFFFF]/5 backdrop-blur sm:w-[90%] xl:w-[85%]">
          <nav className="mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 md:px-10">
            <Link href="/" className="text-xl font-bold text-white">
              <img
                src="/bmyb-services-brand-bmybrand-01-01.svg"
                alt="BMYBrand"
                className="h-8 w-auto sm:h-10 lg:h-11 xl:h-12 2xl:h-14"
              />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-linear-to-r from-[#F45B25] to-[#FF843E] px-3 py-2 text-[11px] font-medium whitespace-nowrap text-white transition hover:opacity-90 sm:px-4 sm:py-3 sm:text-sm md:text-base lg:px-5 lg:py-4 lg:text-lg BenzinSemibold"
            >
              Back to Home
            </Link>
          </nav>
        </header>
      </div>
    </div>
  )
}
