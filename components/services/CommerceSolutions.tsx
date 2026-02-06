'use client'

import React from 'react'

export default function CommerceSolutions() {
  const solutions = [
    {
      icon: '🏪',
      title: 'E-Commerce Platforms',
      description: 'Complete online store solutions with shopping carts, product catalogs, secure checkout, and inventory management systems.'
    },
    {
      icon: '🔐',
      title: 'Payment & Security',
      description: 'Integrated payment gateways, SSL certificates, PCI compliance, fraud detection, and secure transaction processing.'
    },
    {
      icon: '🚀',
      title: 'Growth & Optimization',
      description: 'Conversion optimization, abandoned cart recovery, personalized recommendations, and marketing automation tools.'
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Store Planning & Design',
      description: 'Define your products, customer journey, and create a user-friendly store design that maximizes conversions.'
    },
    {
      number: '02',
      title: 'Platform Development',
      description: 'Build your store with product catalogs, checkout flows, payment integration, and order management systems.'
    },
    {
      number: '03',
      title: 'Testing & Launch',
      description: 'Comprehensive testing of payment flows, security, and user experience before launching to customers.'
    },
    {
      number: '04',
      title: 'Growth & Optimization',
      description: 'Ongoing optimization, A/B testing, analytics review, and feature enhancements to increase sales.'
    }
  ]

  return (
    <>
      {/* Commerce Solutions Section */}
      <section className="py-20 px-6 bg-[#11122F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              Our Commerce Solutions, End-to-End
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              From storefront to checkout, we build commerce experiences that drive sales and customer loyalty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="bg-[#1a1a2e] p-8 rounded-2xl border border-white/10 hover:border-[#F45B25]/50 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{solution.icon}</div>
                <h3 className="text-white text-2xl BenzinBold mb-4">{solution.title}</h3>
                <p className="text-white/70 BenzinRegular leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#15173A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6">
              A Clear Process for Delivering Commerce That Performs
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto BenzinRegular">
              Our proven e-commerce process ensures your store is built for growth, security, and exceptional customer experiences.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F45B25]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {process.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F45B25] flex items-center justify-center relative z-10 border-4 border-[#15173A]">
                    <span className="text-white text-xl BenzinBold">{step.number}</span>
                  </div>
                  <h3 className="text-white text-xl BenzinBold mb-3">{step.title}</h3>
                  <p className="text-white/70 BenzinRegular leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
