'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Service = {
  id: string
  title: string
  icon: string
  description: string
  items: string[]
}

const services: Service[] = [
  {
    id: 'ai-driven',
    title: 'AI-Driven Solutions',
    icon: '🤖',
    description: 'Take your brand to the next level with AI-powered AI Drive web and applications. From predictive analytics to intelligent automation, we build tools that optimize your business operations, enhance customer experiences, and drive data-driven decision-making at scale.',
    items: ['Chatbot AI', 'AI Apps', 'AI Insight', 'Chatgpt API', 'Prompt Engineering', 'AI Automation'],
  },
  {
    id: 'brand-experience',
    title: 'Brand Experience',
    icon: '🎨',
    description: 'We help companies stand out online by forging strong brand identities. From understanding your audience to designing memorable visuals, we create experiences that resonate emotionally, position you as an industry leader, and cultivate lasting loyalty through cohesive brand storytelling.',
    items: ['Brand Identity', 'Brand Strategy', 'UI/UX Design', 'Logo Design', 'Visual Design', 'Typography', 'Marketing Kit', 'User Research'],
  },
  {
    id: 'software-development',
    title: 'Software Development',
    icon: '💻',
    description: 'We build custom software that fits your business like a glove and scales as you grow. From idea to launch, we carefully plan every step, design intuitive interfaces, and rigorously test all functionality so that your product not only meets expectations but exceeds them.',
    items: ['Website Build', 'Mobile App', 'Web App', 'Custom CMS', 'Admin Dashboards', 'SaaS Platform', 'Blockchain', 'Progressive'],
  },
  {
    id: 'commerce-solutions',
    title: 'Commerce Solutions',
    icon: '🛒',
    description: 'Build a thriving online store with E-commerce Solutions that are fast, intuitive, and scalable. From plug-and-play platforms to fully customized storefronts, we provide secure payments, personalized shopping experiences, and tools to help you grow your sales and keep customers coming back.',
    items: ['eShop Setup', 'Custom Storefront', 'Subscription Box', 'Gateway Unified', 'Product Catalogs', 'CMS', 'Order Management', 'B2B Portals'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: '📱',
    description: 'We power data-driven digital marketing campaigns that raise brand awareness, inspire, and convert. Whether you want to enhance your social presence, appear at the top of search results, or engage audiences with high-quality content, we tailor every strategy to deliver measurable outcomes aligned with your business goals.',
    items: ['Social Media', 'Content Creation', 'Email Marketing', 'Media List', 'Campaigns', 'SEO'],
  },
  {
    id: 'business-operations',
    title: 'Business Operations',
    icon: '⚙️',
    description: 'Streamline day-to-day tasks and unlock efficiency with Business Operations services. We provide solutions that automate repetitive workflows, enhance team collaboration, and improve overall productivity. From centralized data systems to real-time reporting and seamless internal tools, we help you run a leaner, smarter operation.',
    items: ['Process Automation', 'Workflow Design', 'Team Portals', 'CRM Integrations', 'Resource Scheduling', 'BI/Analytics', 'Help Desk', 'Project Management'],
  },
]

export default function ServicesDetail() {
  const [activeService, setActiveService] = useState('ai-driven')
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Scroll spy functionality - activates when section is in center
  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.scrollY + window.innerHeight / 2

      for (const service of services) {
        const section = sectionRefs.current[service.id]
        if (section) {
          const top = section.offsetTop
          const bottom = top + section.offsetHeight

          if (centerY >= top && centerY < bottom) {
            setActiveService(service.id)
            break
          }
        }
      }
    }

    handleScroll() 
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id]
    if (section) {
      const offset = 120
      const top = section.offsetTop - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen bg-[#15173A] pt-32 pb-20">
       <div className="text-center w-[90%] lg:w-[50%] mx-auto px-6">
        <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] BenzinSemibold mb-6">
          Modern <span className="text-[#F45B25]">Tools & Technologies</span>
          <br />
          That Power Your Brand
        </h1>
        <p className="text-[#ADAECC] text-sm sm:text-base">
          We use industry-leading tools and technologies to build powerful, scalable,
          and visually stunning digital experiences.
        </p>
      </div>
      <div className="w-[90%] 2xl:w-[75%] mx-auto">
        {/* Header */}
       

        <div className="flex flex-col lg:flex-row py-20 gap-8">
          {/* Left Sidebar - Fixed Navigation */}
          <div className="lg:w-[35%] flex-shrink-0">
            <div className=" rounded-2xl p-4 sticky top-1/5">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToSection(service.id)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 mb-2 ${
                    activeService === service.id
                      ? 'bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-base md:text-lg font-medium BenzinSemibold">{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - All Services Scrollable */}
          <div className="lg:w-[65%] flex-shrink-0 space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                ref={(el) => {
                  sectionRefs.current[service.id] = el
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1E2044] rounded-2xl p-8 md:p-10 scroll-mt-32"
                id={service.id}
              >
                {/* Service Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#5B6CFF]/20 rounded-xl flex items-center justify-center text-xl text-white font-bold flex-shrink-0">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-white BenzinSemibold">
                    {service.title}
                  </h2>
                </div>

                {/* Service Description */}
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Service Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {service.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 bg-[#F45B25] rounded flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
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
                      <span className="text-white/80 text-xs md:text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:opacity-90 transition-all duration-300 BenzinSemibold flex items-center gap-2 text-base">
    <div className="bg-white p-4 rounded-lg">
    <img src="/Group1190.svg" alt="" className="w-4 h-4" />
    </div>
    <span className="px-2">Get Started Now</span>
  </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
