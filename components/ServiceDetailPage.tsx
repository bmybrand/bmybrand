'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WorkTogether from './WorkTogether'
import RequestForm from './RequestForm'

type Service = {
  id: string
  title: string
  icon: string
  description: string
  fullDescription: string
  items: string[]
  benefits: string[]
  useCases: string[]
}

const servicesData: { [key: string]: Service } = {
  'ai-driven': {
    id: 'ai-driven',
    title: 'AI-Driven Solutions',
    icon: '🤖',
    description: 'Take your brand to the next level with AI-powered web and applications.',
    fullDescription: 'Transform your business with cutting-edge AI technology. From predictive analytics to intelligent automation, we build tools that optimize your business operations, enhance customer experiences, and drive data-driven decision-making at scale. Our AI solutions are designed to grow with your business and adapt to changing market conditions.',
    items: ['Chatbot AI', 'AI Apps', 'AI Insight', 'Chatgpt API', 'Prompt Engineering', 'AI Automation'],
    benefits: [
      'Automate repetitive tasks and save time',
      'Make data-driven decisions with AI insights',
      'Enhance customer experience with intelligent chatbots',
      'Predict trends and optimize operations',
      'Scale your business with smart automation'
    ],
    useCases: [
      'Customer service automation',
      'Predictive analytics for sales',
      'Content generation and optimization',
      'Process automation and workflow optimization'
    ]
  },
  'brand-experience': {
    id: 'brand-experience',
    title: 'Brand Experience',
    icon: '🎨',
    description: 'We help companies stand out online by forging strong brand identities.',
    fullDescription: 'Create a memorable brand that resonates with your audience. From understanding your target market to designing stunning visuals, we craft comprehensive brand experiences that tell your story, position you as an industry leader, and build lasting customer loyalty through cohesive storytelling across all touchpoints.',
    items: ['Brand Identity', 'Brand Strategy', 'UI/UX Design', 'Logo Design', 'Visual Design', 'Typography', 'Marketing Kit', 'User Research'],
    benefits: [
      'Stand out from competitors with unique branding',
      'Build emotional connections with your audience',
      'Increase brand recognition and recall',
      'Create consistent experiences across all platforms',
      'Position yourself as an industry authority'
    ],
    useCases: [
      'Complete brand identity design',
      'Brand refresh and modernization',
      'Visual identity systems',
      'Brand guidelines and style guides'
    ]
  },
  'software-development': {
    id: 'software-development',
    title: 'Software Development',
    icon: '💻',
    description: 'We build custom software that fits your business like a glove and scales as you grow.',
    fullDescription: 'From concept to launch, we develop custom software solutions tailored to your unique business needs. Our experienced team carefully plans every step, designs intuitive interfaces, and rigorously tests all functionality to ensure your product not only meets expectations but exceeds them. We build scalable, maintainable solutions that grow with your business.',
    items: ['Website Build', 'Mobile App', 'Web App', 'Custom CMS', 'Admin Dashboards', 'SaaS Platform', 'Blockchain', 'Progressive Web Apps'],
    benefits: [
      'Custom solutions built for your specific needs',
      'Scalable architecture that grows with you',
      'Intuitive user interfaces that delight users',
      'Rigorous testing for reliability and performance',
      'Ongoing support and maintenance'
    ],
    useCases: [
      'Enterprise web applications',
      'Mobile apps for iOS and Android',
      'Custom SaaS platforms',
      'Internal business tools and dashboards'
    ]
  },
  'commerce-solutions': {
    id: 'commerce-solutions',
    title: 'Commerce Solutions',
    icon: '🛒',
    description: 'Build a thriving online store with E-commerce Solutions that are fast, intuitive, and scalable.',
    fullDescription: 'Launch and grow your online business with powerful e-commerce solutions. Whether you need a plug-and-play platform or a fully customized storefront, we provide secure payments, personalized shopping experiences, inventory management, and marketing tools to help you increase sales and build customer loyalty.',
    items: ['eShop Setup', 'Custom Storefront', 'Subscription Box', 'Gateway Unified', 'Product Catalogs', 'CMS', 'Order Management', 'B2B Portals'],
    benefits: [
      'Fast, secure checkout experiences',
      'Personalized shopping recommendations',
      'Multi-channel selling capabilities',
      'Advanced inventory and order management',
      'Built-in marketing and analytics tools'
    ],
    useCases: [
      'Online retail stores',
      'Subscription box services',
      'B2B wholesale portals',
      'Multi-vendor marketplaces'
    ]
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: '📱',
    description: 'We power data-driven digital marketing campaigns that raise brand awareness, inspire, and convert.',
    fullDescription: 'Reach and engage your target audience with strategic digital marketing campaigns. From enhancing your social media presence to dominating search results and creating compelling content, we tailor every strategy to deliver measurable results aligned with your business goals. Our data-driven approach ensures every dollar spent delivers maximum ROI.',
    items: ['Social Media', 'Content Creation', 'Email Marketing', 'Media List', 'Campaigns', 'SEO'],
    benefits: [
      'Increase brand visibility and awareness',
      'Drive qualified traffic to your website',
      'Convert visitors into paying customers',
      'Build engaged communities around your brand',
      'Measure and optimize campaign performance'
    ],
    useCases: [
      'Social media management and growth',
      'Search engine optimization (SEO)',
      'Content marketing strategies',
      'Email marketing campaigns'
    ]
  },
  'business-operations': {
    id: 'business-operations',
    title: 'Business Operations',
    icon: '⚙️',
    description: 'Streamline day-to-day tasks and unlock efficiency with Business Operations services.',
    fullDescription: 'Transform your business operations with solutions that automate workflows, enhance collaboration, and boost productivity. From centralized data systems to real-time reporting and seamless internal tools, we help you eliminate inefficiencies, reduce costs, and run a smarter operation that scales effortlessly.',
    items: ['Process Automation', 'Workflow Design', 'Team Portals', 'CRM Integrations', 'Resource Scheduling', 'BI/Analytics', 'Help Desk', 'Project Management'],
    benefits: [
      'Automate repetitive manual tasks',
      'Improve team collaboration and communication',
      'Gain real-time visibility into operations',
      'Reduce errors and increase efficiency',
      'Scale operations without adding headcount'
    ],
    useCases: [
      'Business process automation',
      'Custom CRM and ERP systems',
      'Team collaboration platforms',
      'Business intelligence dashboards'
    ]
  }
}

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const router = useRouter()
  const service = servicesData[slug]

  if (!service) {
    return (
      <div className="min-h-screen bg-[#11122F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl BenzinSemibold mb-4">Service Not Found</h1>
          <button
            onClick={() => router.push('/services')}
            className="bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white px-6 py-3 rounded-lg BenzinSemibold"
          >
            Back to Services
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#11122F]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.push('/services')}
            className="text-white/60 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </button>

          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-[#5B6CFF]/20 rounded-2xl flex items-center justify-center text-4xl shrink-0">
              {service.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white BenzinSemibold mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-white/70">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-20 px-6 bg-[#15173A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white BenzinSemibold mb-6">
            What We Offer
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
            {service.fullDescription}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white BenzinSemibold mb-12">
            Our Services Include
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#1E2044] rounded-xl p-6 hover:bg-[#252852] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#F45B25] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-lg BenzinSemibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-[#15173A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white BenzinSemibold mb-12">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-[#1E2044] rounded-xl p-6"
              >
                <div className="w-8 h-8 bg-linear-to-r from-[#F45B25] to-[#FF843E] rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white BenzinSemibold mb-12">
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-[#1E2044] rounded-xl p-8 border border-[#F45B25]/20 hover:border-[#F45B25]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-[#F45B25] rounded-full" />
                  <h3 className="text-white text-xl BenzinSemibold">{useCase}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#15173A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white BenzinSemibold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Let's discuss how {service.title.toLowerCase()} can transform your business.
          </p>
          <button className="bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 BenzinSemibold flex items-center gap-3 text-lg mx-auto">
            <div className="bg-white p-3 rounded-lg">
              <img src="/Group1190.svg" alt="" className="w-5 h-5" />
            </div>
            <span>Get Started Now</span>
          </button>
        </div>
      </section>

      <WorkTogether />
      <RequestForm />
      <Footer />
    </div>
  )
}
