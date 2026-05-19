'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: 'What are AI automation services in the USA?',
    answer:
      'AI automation services in the USA help businesses streamline workflows, reduce manual tasks, and improve efficiency using intelligent systems and machine learning.',
  },
  {
    question: 'What does an AI automation agency in the USA do?',
    answer:
      'An AI automation agency in the USA designs and builds smart systems that automate business processes, improve productivity, and enhance decision-making.',
  },
  {
    question: 'What is an AI software development solutions company?',
    answer:
      'An AI software development solutions company creates custom AI tools, applications, and systems tailored to solve specific business challenges and improve operations.',
  },
  {
    question: 'Do you offer AI development services and custom business solutions?',
    answer:
      'Yes, we provide AI development services and custom business solutions designed to meet unique business needs, workflows, and automation requirements.',
  },
  {
    question: 'What are AI-driven automation solutions?',
    answer:
      'AI-driven automation solutions use artificial intelligence to automate repetitive tasks, optimize workflows, and improve overall business performance.',
  },
  {
    question: 'Do you provide AI customer service solutions for small businesses?',
    answer:
      'Yes, we build AI customer service solutions for small businesses that improve response time, handle queries, and enhance customer experience 24/7.',
  },
]

export default function AIFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  const logos = [
    { default: '/bmyb-logo-vector-08.svg', hover: '/bmyb-logo-vector-orange-02.svg', alt: 'Abbott' },
    { default: '/bmyb-logo-vector-09.svg', hover: '/bmyb-logo-vector-orange-04.svg', alt: 'London Real' },
    { default: '/bmyb-logo-vector-10.svg', hover: '/bmyb-logo-vector-orange-03.svg', alt: 'Decathlon' },
    { default: '/bmyb-logo-vector-11.svg', hover: '/bmyb-logo-vector-orange-06.svg', alt: 'Targus' },
    { default: '/bmyb-logo-vector-12.svg', hover: '/bmyb-logo-vector-orange-01.svg', alt: 'Single Grain' },
    { default: '/bmyb-logo-vector-13.svg', hover: '/bmyb-logo-vector-orange-05.svg', alt: 'York University' },
  ]

  return (
    <section className="py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Images Row (flex, not grid) */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80 flex-1">
            <img
              src="/bmyb-services-servicefaq-01.webp"
              alt="AI VR Experience"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML =
                  '<div class="flex items-center justify-center h-full text-white/40 text-6xl"><img src="/bmyb-services-servicefaq-01.webp" alt="" /></div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80 flex-1">
            <img
              src="/bmyb-services-servicefaq2-01.webp"
              alt="AI Business Meeting"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML =
                  '<div class="flex items-center justify-center h-full text-white/40 text-6xl"><img src="/bmyb-services-servicefaq2-01.webp" alt="" /></div>'
              }}
            />
          </div>
        </div>

        {/* FAQ Section (two-column flex: 50/50) */}
        <div className="flex flex-col lg:flex-row  items-start">
          {/* Left - Heading (fits content) */}
          <div className="w-full lg:flex-none lg:max-w-140">
            <h2 className="BenzinBold leading-tight text-[70px]">Frequently <br /> Asked <br /> Questions</h2>
          </div>

          {/* Right - FAQ Accordion (fills remaining) */}
          <div className="w-full lg:flex-1 space-y-4">
            {FAQS.map((faq, index) => {
              const number = String(index + 1).padStart(2, '0')
              return (
                <div key={index} className="border border-white/10 rounded-md overflow-hidden w-full">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={`flex w-full items-stretch text-left hover:bg-white/5 border-b border-white/10 transition-all duration-300 ${
                      openIndex === index ? 'border-b border-white/10' : 'border-b-0 border-white/10'
                    }`}
                  >
                    <div className="flex gap-3 p-5 flex-1 min-w-0 items-center">
                      <span className="text-white text-[18px] font-semibold BenzinRegular shrink-0">{number}</span>
                      <h3 className="text-white text-[18px] font-semibold BenzinRegular">{faq.question}</h3>
                    </div>
                    <span
                      className={`flex shrink-0 w-12 md:w-16 items-center justify-center text-2xl transition-colors duration-300 ${
                        openIndex === index ? 'bg-[#F45B25] text-white' : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {openIndex === index ? '-' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && faq.answer && (
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
                        <p className="mt-3 text-sm sm:text-base text-white/70 leading-6 pl-10 pr-5 pb-5">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Client Logo Bar */}
        <div
          className="mt-20 relative"
          onMouseEnter={() => setIsLogoBarHovered(true)}
          onMouseLeave={() => setIsLogoBarHovered(false)}
        >
          <div className="flex justify-center -mb-5 relative z-10">
            <h3
              className={`text-base md:text-lg lg:text-xl BenzinSemibold px-6 py-3 rounded-lg border border-white/20 bg-[#11122F] inline-block transition-colors duration-300 ${
                isLogoBarHovered ? 'text-[#F45B25]' : 'text-white'
              }`}
            >
              Our Globally 20K+ Clients.
            </h3>
          </div>

          <div className="border border-white/20 rounded-xl py-8 md:py-12 pt-8 md:pt-12">
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={hoveredLogo === index ? logo.hover : logo.default}
                  alt={logo.alt}
                  onMouseEnter={() => setHoveredLogo(index)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  className="w-24 md:w-32 h-auto hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
