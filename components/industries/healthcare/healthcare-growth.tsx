'use client'

import { capabilityItems, growthCards } from './healthcare-data'
import type { IndustryFeature, IndustryMetricCard } from '@/data/industries/types'

type HealthcareGrowthProps = {
  title?: string
  description?: string
  capabilities?: IndustryFeature[]
  metricTitle?: string
  metricDescription?: string
  metrics?: IndustryMetricCard[]
}

export default function HealthcareGrowth({
  title = 'Turning Digital Complexity into Seamless Patient Experiences',
  description = 'Healthcare organizations operate in a complex digital environment where trust, compliance, and accessibility are critical. At BMYBrand, we simplify that complexity by building cohesive digital ecosystems tailored specifically for healthcare providers.',
  capabilities,
  metricTitle = 'Helping You Turn Healthcare Digital Complexity Into Measurable Growth',
  metricDescription = 'We partner with healthcare providers, clinics, and medical organizations to transform complex digital challenges into seamless, scalable systems designed to build trust, improve patient experience, and drive consistent growth.',
  metrics,
}: HealthcareGrowthProps) {
  const capabilityContent = (capabilities ?? capabilityItems).map((item, index) => ({
    ...item,
    icon: 'icon' in item ? item.icon : capabilityItems[index]?.icon,
  }))
  const metricContent = (metrics ?? growthCards).map((card, index) => ({
    ...card,
    image: 'image' in card ? card.image : growthCards[index]?.image,
  }))

  return (
    <section className="mx-auto w-[90%] 2xl:w-[75%] py-18 sm:py-22 lg:py-26">
      <div className="mx-auto text-center  max-w-5xl">
        <h2 className="BenzinSemibold text-white text-[1.0rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.9rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.18]">
          {title}
        </h2>
        <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
          {description}
        </p>
      </div>

      <div className="mt-12 py-8 sm:py-10 md:py-12 grid gap-8 md:grid-cols-3 md:gap-0">
        {capabilityContent.map((item, index) => (
          <div
            key={item.title}
            className={`px-0 md:px-5 ${index < capabilityContent.length - 1 ? 'md:border-r md:border-white/10' : ''}`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="BenzinSemibold text-white text-[0.9rem] sm:text-[1.0rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.25rem] leading-snug">{item.title}</h3>
            <p className="mt-3 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/55">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-18">
        <div>
          <h2 className="BenzinSemibold  max-w-6xl text-white text-[1.0rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.9rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.18]">
            {metricTitle}
          </h2>
          <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60  max-w-5xl">
            {metricDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:auto-rows-fr md:grid-cols-12">
          {metricContent.map((card) => (
            <div
              key={card.number}
              className={`h-full overflow-hidden rounded-[10px] bg-white/[0.03] ${
                card.image
                  ? 'md:col-span-7'
                  : 'md:col-span-5 min-h-[250px] px-6 py-6 sm:px-8 sm:py-7'
              }`}
            >
              {card.image ? (
                <div className="grid h-full gap-0 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-stretch">
                  <div className="flex min-w-0 flex-col px-6 py-6 sm:px-8 sm:py-7">
                    <div className="text-xl tracking-[0.18em] text-white/20 BenzinSemibold">{card.number}</div>
                    <h3 className="mt-6 text-white text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.9rem] 2xl:text-[2.1875rem] leading-[1.15] BenzinSemibold">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex min-h-[180px] w-full items-end justify-center lg:min-h-0 lg:justify-end">
                    <img
                      src={card.image}
                      alt=""
                      className="h-full max-h-[240px] w-full object-contain object-right-bottom"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col">
                  <div className="text-xl tracking-[0.18em] text-white/20 BenzinSemibold">{card.number}</div>
                  <h3 className="mt-6 text-white text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.9rem] 2xl:text-[2.1875rem] leading-[1.15] BenzinSemibold">
                    {card.title}
                  </h3>
                  <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/60">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
