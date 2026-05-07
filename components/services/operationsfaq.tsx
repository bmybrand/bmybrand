'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "What types of business processes can you automate?",
    answer: "We can automate virtually any repetitive business process including approval workflows, data entry, invoice processing, employee onboarding, inventory management, customer support ticketing, reporting, email communications, and more. We analyze your specific operations to identify high-impact automation opportunities."
  },
  {
    question: "How long does it take to implement operational improvements?",
    answer: "Timeline varies by project scope. Simple workflow automation can be implemented in 2-4 weeks, while comprehensive operational systems may take 2-3 months. We use phased rollouts to deliver quick wins early while building toward complete transformation. You'll see measurable improvements throughout the process."
  },
  {
    question: "Will automation replace our team members?",
    answer: "No, automation enhances your team's capabilities rather than replacing them. By eliminating repetitive tasks, your team can focus on strategic, creative, and high-value work that drives growth. We help you redeploy talent to more impactful roles while improving job satisfaction and productivity."
  },
  {
    question: "Can you integrate with our existing tools and systems?",
    answer: "Yes, integration is a core part of our approach. We connect with popular CRMs (Salesforce, HubSpot), project management tools (Asana, Jira), communication platforms (Slack, Teams), accounting software, and custom systems. We create unified workflows that work seamlessly across your entire tech stack."
  },
  {
    question: "How do you measure operational improvements?",
    answer: "We establish baseline metrics before implementation and track key performance indicators like time saved, error reduction, process completion time, employee satisfaction, and cost savings. We provide dashboards with real-time metrics and regular reports showing the concrete impact of operational improvements."
  },
  {
    question: "What ongoing support do you provide?",
    answer: "We offer comprehensive support including system monitoring, performance optimization, user training, troubleshooting, updates, and continuous improvement recommendations. As your business evolves, we help scale and adapt your operations to maintain peak efficiency and support new growth initiatives."
  }
]

export default function OperationsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const logos = [
    { default: '/bmyb-logo-vector-08.svg', hover: '/bmyb-logo-vector-orange-01.svg', alt: 'Abbott' },
    { default: '/bmyb-logo-vector-09.svg', hover: '/bmyb-logo-vector-orange-02.svg', alt: 'London Real' },
    { default: '/bmyb-logo-vector-10.svg', hover: '/bmyb-logo-vector-orange-03.svg', alt: 'Decathlon' },
    { default: '/bmyb-logo-vector-11.svg', hover: '/bmyb-logo-vector-orange-04.svg', alt: 'Targus' },
    { default: '/bmyb-logo-vector-12.svg', hover: '/bmyb-logo-vector-orange-05.svg', alt: 'Single Grain' },
    { default: '/bmyb-logo-vector-13.svg', hover: '/bmyb-logo-vector-orange-06.svg', alt: 'York University' }
  ]

  return (
    <section className="py-20 px-6 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-servicefaq-01.webp" 
              alt="Business Operations" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">⚙️</div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-servicefaq-01.webp" 
              alt="Process Automation" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">🔄</div>'
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
