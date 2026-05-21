'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../navbar'
import Footer from '../footer'
import EvaluatCTA from '../evaluatcta'
import Brandsspec from '../brandsspec'
import type { ServicePageData } from '@/data/service-pages/types'

const clientLogos = [
  { default: '/bmyb-logo-vector-08.svg', hover: '/bmyb-logo-vector-orange-02.svg', alt: 'Abbott' },
  { default: '/bmyb-logo-vector-09.svg', hover: '/bmyb-logo-vector-orange-04.svg', alt: 'London Real' },
  { default: '/bmyb-logo-vector-10.svg', hover: '/bmyb-logo-vector-orange-03.svg', alt: 'Decathlon' },
  { default: '/bmyb-logo-vector-11.svg', hover: '/bmyb-logo-vector-orange-06.svg', alt: 'Targus' },
  { default: '/bmyb-logo-vector-12.svg', hover: '/bmyb-logo-vector-orange-01.svg', alt: 'Single Grain' },
  { default: '/bmyb-logo-vector-13.svg', hover: '/bmyb-logo-vector-orange-05.svg', alt: 'York University' },
]

type SharedServicePageProps = {
  data: ServicePageData
}

export default function SharedServicePage({ data }: SharedServicePageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false)

  return (
    <div className="bg-[#11122F]">
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-40 lg:pt-50">
        <div className="absolute inset-0 bg-linear-to-br" />
        <div className="relative z-10 mx-auto w-[90%] 2xl:w-[75%]">
          <div className="mb-4 flex items-center gap-2">
            <span className="BenzinSemibold text-sm tracking-wider text-[#F45B25]">{data.eyebrow}</span>
            <div className="h-0.5 w-16 bg-[#F45B25]/30" />
          </div>

          <h1 className="BenzinSemibold mb-6 text-3xl leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            {data.heroTitle}
          </h1>

          <p className="mb-12 text-sm leading-relaxed text-white/70 md:text-base lg:text-lg">
            {data.heroDescription}
          </p>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.heroList.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#F45B25]">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <img src={data.bannerImage} alt={data.bannerAlt} className="h-auto w-full object-cover" />
      </section>

      <section className="py-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <h2 className="BenzinSemibold mb-8 text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl">
            {data.overviewTitle}
          </h2>

          <div className="grid items-stretch gap-12 lg:grid-cols-2">
            <div className="h-full">
              <p className="mb-8 text-sm leading-relaxed text-white/60 md:text-base">
                {data.overviewDescription}
              </p>

              <h3 className="BenzinSemibold mb-8 text-xl text-[#F45B25] md:text-2xl lg:text-3xl xl:text-4xl">
                {data.overviewAccentTitle}
              </h3>

              <div className="space-y-6">
                {data.overviewItems.map((item) => (
                  <div key={item.number} className="flex gap-4">
                    <div className="BenzinSemibold flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#21223F] text-[16px] leading-none text-white">
                      {item.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="BenzinSemibold mb-2 text-base text-white md:text-lg">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-2xl lg:h-full lg:min-h-0">
              <img
                src={data.overviewImage}
                alt={data.overviewImageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <h2 className="BenzinSemibold mb-12 text-center text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl">
            {data.benefitsTitle}
          </h2>

          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.benefitsCards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-white/10 p-8 transition-all duration-300 hover:border-[#F45B25]/30"
              >
                <div className="mb-6 text-[#F45B25]">
                  <img src={card.icon} alt="" className="h-14 w-14 object-contain" />
                </div>
                <h3 className="BenzinSemibold mb-6 text-lg text-white md:text-xl lg:text-2xl">
                  {card.title}
                </h3>
                <hr className="my-4 border-white/10" />
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/60">
                      <svg className="h-4 w-4 shrink-0 text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto w-[90%] 2xl:w-[75%]">
          <h2 className="BenzinSemibold mb-16 text-center text-xl text-white md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {data.processTitle}
          </h2>

          <div className="relative">
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-white/10 lg:block">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {data.processSteps.map((step) => (
                <div key={step.number} className="group relative text-center">
                  <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#202141] transition-colors duration-300 group-hover:bg-[#F45B25]">
                    <span className="text-lg font-semibold text-white">{step.number}</span>
                  </div>
                  <h3 className="BenzinSemibold mb-4 text-xl text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full justify-center text-center">
            <p className="flex w-fit items-center gap-2 rounded-full border-2 border-[#2A2B47] bg-[#202141] px-5 py-3 text-center text-sm text-white/70 md:text-base lg:text-lg">
              {data.ctaText ?? 'Give Your Business a Brain Upgrade.'}
              <Link
                href="/strategy-call"
                className="BenzinSemibold inline-flex items-center gap-2 text-[#F45B25] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FF843E]"
              >
                {data.ctaLinkLabel ?? "LET'S TALK"}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 md:flex-row">
            {data.faqImages.map((image) => (
              <div key={image.alt} className="h-64 flex-1 overflow-hidden rounded-2xl md:h-80">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start lg:flex-row">
            <div className="w-full lg:max-w-140 lg:flex-none">
              <h2 className="BenzinBold leading-tight text-white text-[42px] sm:text-[54px] lg:text-[70px]">
                {data.faqTitle}
              </h2>
            </div>

            <div className="w-full space-y-4 lg:flex-1">
              {data.faqs.map((faq, index) => {
                const number = String(index + 1).padStart(2, '0')

                return (
                  <div key={faq.question} className="w-full overflow-hidden rounded-md border border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                      className={`flex w-full items-stretch border-b border-white/10 text-left transition-all duration-300 hover:bg-white/5 ${
                        openIndex === index ? 'border-b border-white/10' : 'border-b-0'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3 p-5">
                        <span className="BenzinRegular shrink-0 text-[18px] font-semibold text-white">{number}</span>
                        <h3 className="BenzinRegular text-[18px] font-semibold text-white">{faq.question}</h3>
                      </div>
                      <span
                        className={`flex w-12 shrink-0 items-center justify-center text-2xl transition-colors duration-300 md:w-16 ${
                          openIndex === index ? 'bg-[#F45B25] text-white' : 'bg-white/10 text-white/80'
                        }`}
                      >
                        {openIndex === index ? '-' : '+'}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIndex === index ? (
                        <motion.div
                          className="overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: 'easeOut', delay: 0.2 },
                            opacity: { duration: 0.2, ease: 'easeOut' },
                          }}
                        >
                          <p className="mt-3 pb-5 pl-10 pr-5 text-sm leading-6 text-white/70 sm:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="relative mt-20"
            onMouseEnter={() => setIsLogoBarHovered(true)}
            onMouseLeave={() => setIsLogoBarHovered(false)}
          >
            <div className="relative z-10 -mb-5 flex justify-center">
              <h3
                className={`BenzinSemibold inline-block rounded-lg border border-white/20 bg-[#11122F] px-6 py-3 text-base transition-colors duration-300 md:text-lg lg:text-xl ${
                  isLogoBarHovered ? 'text-[#F45B25]' : 'text-white'
                }`}
              >
                Our Globally 20K+ Clients.
              </h3>
            </div>

            <div className="rounded-xl border border-white/20 py-8 pt-8 md:py-12 md:pt-12">
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
                {clientLogos.map((logo, index) => (
                  <img
                    key={logo.alt}
                    src={hoveredLogo === index ? logo.hover : logo.default}
                    alt={logo.alt}
                    onMouseEnter={() => setHoveredLogo(index)}
                    onMouseLeave={() => setHoveredLogo(null)}
                    className="h-auto w-24 cursor-pointer transition-all duration-300 hover:opacity-100 md:w-32"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EvaluatCTA
        title={data.evaluateCtaTitle}
        description={data.evaluateCtaDescription}
      />
      <Brandsspec />
      <Footer />
    </div>
  )
}
