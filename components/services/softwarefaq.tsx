'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "What technologies do you use for software development?",
    answer: "We use modern, proven technologies based on your project requirements. Our stack includes React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, AWS, and more. We select the best tools for scalability, performance, and maintainability of your specific solution."
  },
  {
    question: "How long does it take to develop custom software?",
    answer: "Timeline varies based on complexity and scope. A simple web application might take 2-3 months, while complex enterprise software can take 6-12 months. We use agile methodology with 2-week sprints, providing regular updates and working features throughout the development process."
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, we offer comprehensive maintenance and support packages including bug fixes, security updates, performance monitoring, feature enhancements, and technical support. We ensure your software stays secure, up-to-date, and continues to meet your evolving business needs."
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Absolutely. We specialize in system integration and can connect your new software with existing CRM, ERP, databases, APIs, and third-party services. We conduct thorough analysis of your tech stack to ensure seamless integration with minimal disruption to current operations."
  },
  {
    question: "How do you ensure software quality and security?",
    answer: "Quality and security are built into every phase. We implement automated testing, code reviews, security audits, penetration testing, and follow industry best practices. Our development includes unit tests, integration tests, and end-to-end testing to catch issues early and ensure robust, secure software."
  },
  {
    question: "What is your development process?",
    answer: "We follow agile methodology with iterative development cycles. The process includes: discovery and planning, architecture design, sprint-based development, continuous testing, regular client demos, deployment with CI/CD, and ongoing support. You're involved throughout with full transparency and regular communication."
  }
]

export default function SoftwareFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const logos = [
    { default: '/vector (23).svg', hover: '/vector (23)-orange.svg', alt: 'Abbott' },
    { default: '/vector (24).svg', hover: '/vector (24)-orange.svg', alt: 'London Real' },
    { default: '/vector (25).svg', hover: '/vector (25)-orange.svg', alt: 'Decathlon' },
    { default: '/vector (26).svg', hover: '/vector (26)-orange.svg', alt: 'Targus' },
    { default: '/vector (27).svg', hover: '/vector (27)-orange.svg', alt: 'Single Grain' },
    { default: '/vector (28).svg', hover: '/vector (28)-orange.svg', alt: 'York University' }
  ]

  return (
    <section className="py-20 px-6 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/servicefaq.svg" 
              alt="Software Development" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">💻</div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/servicefaq.svg" 
              alt="Custom Software" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">⚙️</div>'
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
                  <span className="text-white text-lg md:text-xl BenzinSemibold pr-8">
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
                      <div className="px-6 pb-5 text-white/70 BenzinRegular text-base md:text-lg leading-relaxed">
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
            <h3 className={`text-lg md:text-xl BenzinSemibold px-6 py-3 rounded-lg border border-white/20 bg-[#1a1a2e] inline-block transition-colors duration-300 ${isLogoBarHovered ? 'text-[#F45B25]' : 'text-white'}`}>
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
