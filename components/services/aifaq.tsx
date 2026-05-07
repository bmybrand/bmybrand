'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "What is AI-driven marketing?",
    answer:
      "AI-driven marketing uses artificial intelligence and machine learning to analyze data, predict customer behavior, and automate marketing decisions. It helps businesses deliver personalized experiences at scale, optimize campaigns in real-time, and achieve better ROI through data-driven insights.",
  },
  {
    question: "How long does it take to implement AI solutions?",
    answer:
      "Implementation timelines vary based on project complexity and scope. Simple AI integrations can take 4-6 weeks, while comprehensive AI transformations may require 3-6 months. We work closely with your team to ensure smooth deployment and minimal disruption to your operations.",
  },
  {
    question: "Do I need technical expertise to use your AI solutions?",
    answer:
      "No technical expertise is required. Our AI solutions are designed with user-friendly interfaces and intuitive controls. We provide comprehensive training and ongoing support to ensure your team can leverage AI capabilities effectively, regardless of their technical background.",
  },
  {
    question: "What kind of data do I need for AI implementation?",
    answer:
      "The data requirements depend on your specific use case. Generally, we work with customer data, behavioral data, transaction history, and engagement metrics. We help you assess your current data infrastructure and identify any gaps that need to be filled for optimal AI performance.",
  },
  {
    question: "How do you ensure data privacy and security?",
    answer:
      "Data security is our top priority. We implement enterprise-grade encryption, comply with GDPR and other data protection regulations, and follow industry best practices. All data is processed securely, and we provide transparent documentation of our security measures and compliance certifications.",
  },
  {
    question: "Can AI solutions integrate with our existing systems?",
    answer:
      "Yes, our AI solutions are designed to integrate seamlessly with popular CRM, marketing automation, analytics, and business intelligence platforms. We conduct a thorough assessment of your tech stack and ensure smooth integration with minimal disruption to your existing workflows.",
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
          <div className="w-full lg:flex-none lg:max-w-[560px]">
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
