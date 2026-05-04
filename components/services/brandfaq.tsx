'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "What is included in a brand identity package?",
    answer: "A complete brand identity package includes logo design (primary, secondary, and icon variations), color palette, typography system, brand guidelines, business card designs, letterheads, email signatures, social media templates, and comprehensive usage instructions to ensure consistency across all applications."
  },
  {
    question: "How long does a brand identity project take?",
    answer: "A typical brand identity project takes 6-8 weeks from kickoff to final delivery. This includes discovery and research (1-2 weeks), strategy development (1 week), design exploration (2-3 weeks), refinement (1-2 weeks), and final delivery with brand guidelines."
  },
  {
    question: "Do I need a rebrand or just a refresh?",
    answer: "A rebrand is recommended when your business has fundamentally changed, you're targeting a new audience, or your current brand no longer reflects your values. A refresh updates your existing brand to feel more modern and relevant while maintaining brand equity. We assess your needs during discovery to recommend the best approach."
  },
  {
    question: "Can you help with brand strategy as well as design?",
    answer: "Absolutely. We believe great design stems from solid strategy. Our brand strategy services include market research, competitor analysis, audience personas, brand positioning, messaging frameworks, and tone of voice development—all integrated into the visual identity design process."
  },
  {
    question: "What if I already have a logo but need other brand materials?",
    answer: "We can work with your existing logo to develop complementary brand elements like color palettes, typography systems, brand patterns, templates, and guidelines. We ensure all new materials align with and enhance your current logo while creating a cohesive brand system."
  },
  {
    question: "How do you ensure the brand works across different platforms?",
    answer: "We design with versatility in mind, creating responsive logos and flexible brand systems that adapt to digital, print, and physical applications. Our deliverables include multiple file formats, size variations, and clear guidelines for implementation across websites, social media, packaging, signage, and more."
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
    { default: '/bmyb-logo-vector-08.svg', hover: '/bmyb-logo-vector-orange-02.svg', alt: 'Abbott' },
    { default: '/bmyb-logo-vector-09.svg', hover: '/bmyb-logo-vector-orange-04.svg', alt: 'London Real' },
    { default: '/bmyb-logo-vector-10.svg', hover: '/bmyb-logo-vector-orange-03.svg', alt: 'Decathlon' },
    { default: '/bmyb-logo-vector-11.svg', hover: '/bmyb-logo-vector-orange-06.svg', alt: 'Targus' },
    { default: '/bmyb-logo-vector-12.svg', hover: '/bmyb-logo-vector-orange-01.svg', alt: 'Single Grain' },
    { default: '/bmyb-logo-vector-13.svg', hover: '/bmyb-logo-vector-orange-05.svg', alt: 'York University' }
  ]
  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-servicefaq-01.svg" 
              alt="Brand Design" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">🎨</div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-servicefaq-01.svg" 
              alt="Brand Strategy" 
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
