'use client'

import React from 'react'

export default function CommerceSolutionsHero() {
  const features = [
    { icon: '🛒', title: 'Seamless Shopping', description: 'Intuitive checkout experiences' },
    { icon: '💳', title: 'Secure Payments', description: 'Multiple payment gateways' },
    { icon: '📦', title: 'Order Management', description: 'Streamlined fulfillment process' },
    { icon: '📊', title: 'Sales Analytics', description: 'Data-driven insights' }
  ]

  const impactAreas = [
    { number: '01', title: 'eShop Setup & Custom Storefronts', description: 'Launch beautiful online stores with custom designs that reflect your brand and provide seamless shopping experiences' },
    { number: '02', title: 'Payment Gateway Integration', description: 'Implement secure payment processing with multiple gateways, supporting various payment methods and currencies' },
    { number: '03', title: 'Product Catalogs & CMS', description: 'Build flexible product management systems with advanced filtering, search, and inventory management capabilities' },
    { number: '04', title: 'Subscription & B2B Portals', description: 'Create recurring revenue models with subscription boxes and dedicated B2B platforms for wholesale customers' },
    { number: '05', title: 'Order & Customer Management', description: 'Streamline operations with comprehensive order tracking, customer accounts, and automated fulfillment systems' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl BenzinBold mb-6 leading-tight">
                Build Commerce That Converts
              </h2>
              <p className="text-white/70 text-lg md:text-xl BenzinRegular leading-relaxed">
                Transform your online store into a revenue-generating powerhouse with commerce solutions designed for growth, conversions, and exceptional customer experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#1a1a2e] p-6 rounded-2xl border border-white/10 hover:border-[#F45B25]/50 transition-all duration-300">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-white text-lg BenzinSemibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm BenzinRegular">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#1a1a2e] to-[#11122F] border border-white/10">
            <img 
              src="/service-commerce-hero.svg" 
              alt="Commerce Solutions" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-white/40 text-6xl">🛒</div>'
              }}
            />
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 px-6 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl BenzinBold mb-6 leading-tight">
                Where Commerce Creates Business Impact
              </h2>
              <p className="text-white/70 text-lg BenzinRegular leading-relaxed">
                E-commerce is more than just selling online—it's creating frictionless experiences that turn browsers into buyers and customers into loyal advocates.
              </p>
            </div>

            <div className="space-y-6">
              {impactAreas.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <img
                    src={`https://i.pravatar.cc/96?img=${index + 41}`}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white text-xl BenzinSemibold mb-2">{item.title}</h3>
                    <p className="text-white/60 BenzinRegular leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
