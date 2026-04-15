'use client'

import { capabilityItems, growthCards } from './healthcare-data'

export default function HealthcareGrowth() {
  return (
    <section className="mx-auto w-[90%] 2xl:w-[85%] py-18 sm:py-22 lg:py-26">
      <div className="mx-auto text-center  max-w-5xl">
        <h2 className="BenzinSemibold text-white text-[2rem] leading-[1.18] sm:text-[2.6rem] lg:text-[3.1rem]">
          Turning Digital Complexity into Seamless Patient Experiences
        </h2>
        <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
          Healthcare organizations operate in a complex digital environment where trust, compliance, and
          accessibility are critical. At BMYBrand, we simplify that complexity by building cohesive digital
          ecosystems tailored specifically for healthcare providers.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
        {capabilityItems.map((item, index) => (
          <div
            key={item.title}
            className={`px-0 md:px-9 ${index < capabilityItems.length - 1 ? 'md:border-r md:border-white/10' : ''}`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="BenzinSemibold text-white text-lg sm:text-xl lg:text-2xl leading-snug">{item.title}</h3>
            <p className="mt-3 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/55">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-18">
        <div>
          <h2 className="BenzinSemibold  max-w-6xl text-white text-[2rem] leading-[1.18] sm:text-[2.6rem] lg:text-[3.05rem]">
            Helping You Turn Healthcare Digital Complexity Into Measurable Growth
          </h2>
          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60  max-w-5xl">
            We partner with healthcare providers, clinics, and medical organizations to transform complex digital
            challenges into seamless, scalable systems designed to build trust, improve patient experience, and
            drive consistent growth.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          {growthCards.map((card) => (
            <div
              key={card.number}
              className={`overflow-hidden rounded-[10px] bg-white/[0.03] ${
                card.image
                  ? 'md:col-span-7 pl-6 pr-0 pt-6 pb-0 sm:pl-8 sm:pt-7'
                  : 'md:col-span-5 min-h-[250px] px-6 py-6 sm:px-8 sm:py-7'
              }`}
            >
              {card.image ? (
                <div className="flex flex-col items-start gap-6 lg:flex-row lg:justify-between lg:gap-0">
                  <div className="flex w-full self-start flex-col lg:w-[58%] lg:pr-6 pb-6 sm:lg:pr-8 sm:pb-7">
                    <div className="text-xl tracking-[0.18em] text-white/20 BenzinSemibold">{card.number}</div>
                    <h3 className="mt-6 text-white text-[40px] leading-[1.15] BenzinSemibold">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex w-full justify-end self-end lg:w-[42%] lg:items-end">
                    <img
                      src={card.image}
                      alt=""
                      className="h-auto w-full max-w-[260px] lg:max-w-none object-contain object-right-bottom"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-xl tracking-[0.18em] text-white/20 BenzinSemibold">{card.number}</div>
                  <h3 className="mt-6 text-white text-[40px] leading-[1.15] BenzinSemibold">
                    {card.title}
                  </h3>
                  <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                    {card.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
