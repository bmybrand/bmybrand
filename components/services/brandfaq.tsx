'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "What is Brand Experience?",
    answer: "Brand Experience is how people see, feel, and interact with your brand across every touchpoint, including visuals, messaging, and digital presence."
  },
  {
    question: "How is Brand Experience different from branding?",
    answer: "Branding focuses on identity creation, while Brand Experience ensures that identity feels consistent and meaningful across all platforms and customer interactions."
  },
  {
    question: "What services are included in Brand Experience?",
    answer: "It includes brand strategy, logo design, visual identity systems, messaging, and digital brand consistency across websites, social media, and marketing materials."
  },
  {
    question: "Why is Brand Experience important for my business?",
    answer: "A strong Brand Experience builds trust, improves recognition, and helps your business stand out in competitive markets with a clear and consistent identity."
  },
  {
    question: "Do you work with startups or only established brands?",
    answer: "We work with both startups and established businesses, creating tailored brand systems that fit each stage of growth and business need."
  },
  {
    question: "Can you help rebrand an existing business?",
    answer: "Yes, we specialize in rebranding by improving identity, messaging, and visual systems to create a stronger and more modern brand presence."
  }
]

export default function BrandFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const logos = [
    { default: '/bmyb-logo-abboott-fill-01.webp', hover: '/bmyb-logo-abboott-fill-hover-01.webp', alt: 'Client Logo 1' },
    { default: '/bmyb-logo-abboott-fill-03.webp', hover: '/bmyb-logo-abboott-fill-hover-03.webp', alt: 'Client Logo 2' },
    { default: '/bmyb-logo-abboott-fill-04.webp', hover: '/bmyb-logo-abboott-fill-hover-04.webp', alt: 'Client Logo 3' },
    { default: '/bmyb-logo-abboott-fill-08.webp', hover: '/bmyb-logo-abboott-fill-hover-08.webp', alt: 'Client Logo 4' },
    { default: '/bmyb-logo-abboott-fill-09.webp', hover: '/bmyb-logo-abboott-fill-hover-09.webp', alt: 'Client Logo 5' },
    { default: '/bmyb-logo-abboott-fill-10.webp', hover: '/bmyb-logo-abboott-fill-hover-10.webp', alt: 'Client Logo 6' }
  ]
  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-brand-faq-01.webp" 
              alt="Brand Design" 
              width={900}
              height={640}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">🎨</div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-brand-faq-02.jpg" 
              alt="Brand Strategy" 
              width={900}
              height={640}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">✨</div>'
              }}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col lg:flex-row items-start">
          {/* Left - Heading */}
          <div className="w-full lg:flex-none lg:max-w-140">
            <h2 className="BenzinBold leading-tight text-[70px] text-white">
              Frequently <br />
              Asked <br />
              Questions
            </h2>
          </div>

          {/* Right - FAQ Accordion */}
          <div className="w-full lg:flex-1 space-y-4">
            {FAQS.map((faq, index) => {
              const number = String(index + 1).padStart(2, '0')

              return (
                <div key={index} className="border border-white/10 rounded-md overflow-hidden w-full bg-[#11122F]/50">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={`flex w-full items-stretch text-left hover:bg-white/5 border-b border-white/10 transition-all duration-300 ${
                      openIndex === index ? 'border-b border-white/10' : 'border-b-0 border-white/10'
                    }`}
                  >
                    <div className="flex gap-3 p-5 flex-1 min-w-0 items-center">
                      <span className="text-white text-[18px] font-semibold BenzinRegular shrink-0">
                        {number}
                      </span>
                      <h3 className="text-white text-[18px] font-semibold BenzinRegular">
                        {faq.question}
                      </h3>
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
                        <p className="mt-3 text-sm sm:text-base text-white/70 leading-6 pl-10 pr-5 pb-5">
                          {faq.answer}
                        </p>
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
            <h3 className={`text-base md:text-lg lg:text-xl BenzinSemibold px-6 py-3 rounded-lg border border-white/20 bg-[#11122F] inline-block transition-colors duration-300 ${isLogoBarHovered ? 'text-[#F45B25]' : 'text-white'}`}>
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
                  width={128}
                  height={64}
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
