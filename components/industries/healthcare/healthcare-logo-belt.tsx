'use client'

import { trustLogos } from './healthcare-data'

export default function HealthcareLogoBelt() {
  return (
    <div className="mx-auto mt-14 w-full overflow-hidden sm:mt-16 lg:mt-18">
      <div className="animate-belt-left flex w-max min-w-max items-center gap-14 whitespace-nowrap opacity-90 sm:gap-18 lg:gap-22">
        {[...trustLogos, ...trustLogos].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex h-18 min-w-[150px] shrink-0 items-center justify-center sm:min-w-[170px] lg:min-w-[200px]"
          >
            <img
              src={logo}
              alt="trusted brand"
              width={176}
              height={64}
              className="h-11 w-auto max-w-[170px] object-contain brightness-0 invert sm:h-13 sm:max-w-[190px] lg:h-16 lg:max-w-[220px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
