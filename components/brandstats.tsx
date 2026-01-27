'use client'

import React from 'react'

const stats = [
  { value: '50+', label: 'Team Members' },
  { value: '6.5K+', label: 'Clients Served Worldwide' },
  { value: '128K+', label: 'Project Completed Worldwide' },
  { value: '60+', label: 'Countries Served' },
]

const BrandStats = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0f2a] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.05),transparent_55%)]" />
      <img
        src="/spaceoverlay.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />

      <div className="relative mx-auto w-[90%] 2xl:w-[85%]">
        <div className="text-center">
          <h3 className="BenzinSemibold text-2xl sm:text-3xl lg:text-4xl">
            Making Brands <span className="text-[#F45B25]">Shine</span> Worldwide
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/70">
            Our clients and creative team work across the globe â€” delivering branding, websites,
            and marketing that drive real growth.
          </p>
        </div>

        <div className="mt-10 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 py-6">
              <div className="BenzinSemibold text-3xl sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none relative mt-10 flex justify-center">
          <img
            src="/getskeebear.svg"
            alt="BMY Brand character"
            className="w-[260px] sm:w-[320px] lg:w-[420px]"
          />
        </div>
      </div>
    </section>
  )
}

export default BrandStats
