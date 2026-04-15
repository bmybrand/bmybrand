'use client'

import { trustLogos } from './healthcare-data'

export default function HealthcareLogoBelt() {
  return (
    <div className="mx-auto mt-14 w-full overflow-hidden sm:mt-16 lg:mt-18">
      <div className="animate-belt-left flex w-max min-w-max items-center gap-14 whitespace-nowrap opacity-90 sm:gap-18 lg:gap-22">
        {[...trustLogos, ...trustLogos].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex h-12 min-w-[108px] shrink-0 items-center justify-center sm:min-w-[132px] lg:min-w-[148px]"
          >
            <img
              src={logo}
              alt="trusted brand"
              className="h-6 w-auto max-w-[140px] object-contain brightness-0 invert sm:h-7 sm:max-w-[156px] lg:h-8 lg:max-w-[172px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
