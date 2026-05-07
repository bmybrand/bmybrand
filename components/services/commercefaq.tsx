'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: "Which e-commerce platform should I use?",
    answer: "The best platform depends on your needs. Shopify is great for quick setup and ease of use. WooCommerce offers flexibility for WordPress users. For complex requirements, we recommend custom solutions built on modern frameworks like Next.js with headless commerce APIs for maximum control and scalability."
  },
  {
    question: "How long does it take to launch an online store?",
    answer: "A basic e-commerce store can be launched in 4-6 weeks, including design, product setup, and payment integration. Custom storefronts with unique features may take 8-12 weeks. We provide a detailed timeline during the planning phase based on your specific requirements and complexity."
  },
  {
    question: "What payment methods can you integrate?",
    answer: "We integrate all major payment gateways including Stripe, PayPal, Square, and regional providers. We support credit/debit cards, digital wallets (Apple Pay, Google Pay), buy-now-pay-later options, and cryptocurrency. We help you choose the right mix based on your target market and customer preferences."
  },
  {
    question: "How do you handle inventory management?",
    answer: "We implement robust inventory management systems that track stock levels in real-time, automate low-stock alerts, manage variants and SKUs, support multiple warehouses, and integrate with fulfillment services. For advanced needs, we can connect your store with ERP systems for centralized inventory control."
  },
  {
    question: "Can you help with existing store migration?",
    answer: "Yes, we specialize in seamless store migrations. We transfer your products, customer data, order history, and SEO settings without losing rankings or customer information. We plan migrations carefully to minimize downtime and ensure all data integrity is maintained throughout the process."
  },
  {
    question: "What about marketing and customer retention?",
    answer: "We build stores with growth features like email marketing integration, abandoned cart recovery, customer accounts, loyalty programs, product recommendations, and analytics tracking. We can also help implement marketing automation, customer segmentation, and personalization strategies to boost repeat purchases."
  }
]

export default function CommerceFaq() {
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
              alt="E-Commerce Store" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">🛒</div>'
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img 
              src="/bmyb-services-servicefaq-01.webp" 
              alt="Online Shopping" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">💳</div>'
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
