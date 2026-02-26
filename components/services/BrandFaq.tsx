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
    { default: '/Vector (23).svg', hover: '/Vector (24)-orange.svg', alt: 'Abbott' },
    { default: '/Vector (24).svg', hover: '/Vector (26)-orange.svg', alt: 'London Real' },
    { default: '/Vector (25).svg', hover: '/Vector (25)-orange.svg', alt: 'Decathlon' },
    { default: '/Vector (26).svg', hover: '/Vector (28)-orange.svg', alt: 'Targus' },
    { default: '/Vector (27).svg', hover: '/Vector (23)-orange.svg', alt: 'Single Grain' },
    { default: '/Vector (28).svg', hover: '/Vector (27)-orange.svg', alt: 'York University' }
  ]
  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/servicefaq.svg" 
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
              src="/servicefaq.svg" 
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
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left - Heading */}
          <div className="lg:col-span-1">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl BenzinBold leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right - FAQ Accordion */}
          <div className="lg:col-span-2 space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/10 rounded-xl overflow-hidden bg-[#11122F]/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-white text-base md:text-lg lg:text-xl BenzinSemibold pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <svg 
                      className="w-6 h-6 text-[#F45B25]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 4v16m8-8H4" 
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-white/70  text-sm md:text-base lg:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logo Bar */}
        <div 
          className="mt-20 relative"
          onMouseEnter={() => setIsLogoBarHovered(true)}
          onMouseLeave={() => setIsLogoBarHovered(false)}
        >
          <div className="flex justify-center mb-[-20px] relative z-10">
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
