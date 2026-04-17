'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "What is AI-driven marketing?",
    answer: "AI-driven marketing uses artificial intelligence and machine learning to analyze data, predict customer behavior, and automate marketing decisions. It helps businesses deliver personalized experiences at scale, optimize campaigns in real-time, and achieve better ROI through data-driven insights."
  },
  {
    question: "How long does it take to implement AI solutions?",
    answer: "Implementation timelines vary based on project complexity and scope. Simple AI integrations can take 4-6 weeks, while comprehensive AI transformations may require 3-6 months. We work closely with your team to ensure smooth deployment and minimal disruption to your operations."
  },
  {
    question: "Do I need technical expertise to use your AI solutions?",
    answer: "No technical expertise is required. Our AI solutions are designed with user-friendly interfaces and intuitive controls. We provide comprehensive training and ongoing support to ensure your team can leverage AI capabilities effectively, regardless of their technical background."
  },
  {
    question: "What kind of data do I need for AI implementation?",
    answer: "The data requirements depend on your specific use case. Generally, we work with customer data, behavioral data, transaction history, and engagement metrics. We help you assess your current data infrastructure and identify any gaps that need to be filled for optimal AI performance."
  },
  {
    question: "How do you ensure data privacy and security?",
    answer: "Data security is our top priority. We implement enterprise-grade encryption, comply with GDPR and other data protection regulations, and follow industry best practices. All data is processed securely, and we provide transparent documentation of our security measures and compliance certifications."
  },
  {
    question: "Can AI solutions integrate with our existing systems?",
    answer: "Yes, our AI solutions are designed to integrate seamlessly with popular CRM, marketing automation, analytics, and business intelligence platforms. We conduct a thorough assessment of your tech stack and ensure smooth integration with minimal disruption to your existing workflows."
  }
]

export default function AIFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const logos = [
    { default: '/vector (23).svg', hover: '/vector (24)-orange.svg', alt: 'Abbott' },
    { default: '/vector (24).svg', hover: '/vector (26)-orange.svg', alt: 'London Real' },
    { default: '/vector (25).svg', hover: '/vector (25)-orange.svg', alt: 'Decathlon' },
    { default: '/vector (26).svg', hover: '/vector (28)-orange.svg', alt: 'Targus' },
    { default: '/vector (27).svg', hover: '/vector (23)-orange.svg', alt: 'Single Grain' },
    { default: '/vector (28).svg', hover: '/vector (27)-orange.svg', alt: 'York University' }
  ]

  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/servicefaq.svg" 
              alt="AI VR Experience" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl"><img src="/servicefaq.svg" alt="" /></div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/servicefaq.svg" 
              alt="AI Business Meeting" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl"><img src="/servicefaq.svg" alt="" /></div>'
              }}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left - Heading */}
          <div className="lg:col-span-1">
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl BenzinBold leading-tight">
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
