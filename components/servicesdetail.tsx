'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Service = {
  id: string
  title: string
  iconSrc: string
  description: string
  items: string[]
}

const services: Service[] = [
  {
    id: 'ai-driven',
    title: 'AI-Driven Solutions',
    iconSrc: '/bmyb-services-ai-driven-01.svg',
    description: 'At BMYBrand, a leading AI automation agency in the USA, we design intelligent systems that help businesses work smarter and faster. From AI-driven automation solutions to custom AI software development solutions and company services, we build scalable tools that improve efficiency, reduce manual work, and enhance decision-making.',
    items: [
      'AI Automation Solutions',
      'Custom AI Development',
      'Smart Business Systems',
      'Workflow Automation',
      'Enterprise AI Solutions',
      'AI Integration Services',
      'Scalable AI Systems',
      'Data-Driven Intelligence',
    ],
  },
  {
    id: 'brand-experience',
    title: 'Brand Experience',
    iconSrc: '/bmyb-services-brand-experience-01.svg',
    description: 'We create powerful brand identities that define how your business looks, feels, and communicates across every touchpoint. As a digital branding agency, we build strategic and visual systems that help businesses stand out, stay consistent, and grow with confidence.',
    items: [
      'Brand strategy',
      'Logo design',
      'Visual identity',
      'Brand messaging',
      'Brand guidelines',
      'Brand positioning',
      'Brand experience design',
      'Rebranding solutions',
    ],
  },
  {
    id: 'software-development',
    title: 'Software Development',
    iconSrc: '/bmyb-services-software-development-01.svg',
    description: 'We build custom software solutions that help businesses streamline operations, improve efficiency, and scale digitally. From web applications to enterprise systems, we develop secure, high-performance software tailored to your business needs and long-term growth.',
    items: [
      'Custom software development',
      'Web applications',
      'Mobile app development',
      'API development',
      'System architecture',
      'Cloud-based solutions',
      'Enterprise software',
      'Software maintenance & support',
    ],
  },
  {
    id: 'commerce-solutions',
    title: 'E-Commerce Solutions',
    iconSrc: '/bmyb-services-commerce-solutions-01.svg',
    description: 'We build end-to-end e-commerce solutions that help businesses sell smarter, scale faster, and deliver seamless customer experiences. From online stores to integrated commerce systems, we create platforms designed to increase conversions, streamline operations, and support long-term growth.',
    items: [
      'E-commerce website development',
      'Online store design',
      'Payment gateway integration',
      'Product catalog management',
      'Shopping cart systems',
      'Order management solutions',
      'Conversion optimization',
      'Multi-platform commerce integration',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    iconSrc: '/bmyb-services-digital-marketing-01.svg',
    description: 'We help brands grow online through strategic and performance-driven marketing. Our focus is on visibility, engagement, and conversions across all digital channels. We use data-backed strategies to ensure measurable results and consistent growth. Every campaign is designed to strengthen your brand presence and maximize ROI across platforms.',
    items: [
      'SEO optimization',
      'Content strategy',
      'Social media marketing',
      'Paid advertising',
      'Email marketing',
      'Brand awareness campaigns',
      'Lead generation',
      'Performance tracking',
    ],
  },
  {
    id: 'business-operations',
    title: 'Business Operations',
    iconSrc: '/bmyb-services-business-operations-01.svg',
    description: 'We help businesses improve internal operations through structured systems, automation, and digital tools. Our solutions are designed to reduce inefficiencies, improve productivity, and support smooth day-to-day business management. We focus on creating scalable operational frameworks that align teams and processes.',
    items: [
      'Operational consulting',
      'Workflow management',
      'Process optimization',
      'Resource planning',
      'Performance tracking',
      'Business automation',
      'Internal systems setup',
      'Efficiency improvement',
    ],
  },
]

export default function ServicesDetail() {
  const [activeService, setActiveService] = useState('ai-driven')
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) return

        const nextId = visibleEntry.target.getAttribute('id')
        if (nextId) {
          setActiveService(nextId)
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    )

    for (const service of services) {
      const section = sectionRefs.current[service.id]
      if (section) observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id]
    if (section) {
      const offset = 120
      const top = window.scrollY + section.getBoundingClientRect().top - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen bg-[#11122F] pt-32 pb-20">
       <div className="text-center w-[90%] lg:w-[50%] mx-auto px-6">
        <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] BenzinSemibold mb-6">
          Everything Your <span className="text-[#F45B25]">Business Needs</span> to Build, Scale & Stand Out
        </h1>
        <p className="text-[#ADAECC] text-sm sm:text-base">
          From brand identity development services and visual design to AI-driven automation solutions and web development, we build systems that help businesses operate smarter and grow faster.
        </p>
      </div>
      <div className="w-[90%] 2xl:w-[75%] mx-auto">
        {/* Header */}
       

        <div className="flex flex-col lg:flex-row py-20 gap-8">
          {/* Left Sidebar - Fixed Navigation */}
          <div className="lg:w-[35%] shrink-0">
            <div className=" rounded-2xl p-4 sticky top-1/5">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToSection(service.id)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 mb-2 ${
                    activeService === service.id
                      ? 'bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-base md:text-lg font-medium BenzinSemibold">{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - All Services Scrollable */}
          <div className="lg:w-[65%] shrink-0 space-y-8">
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
                className="bg-[#191A35] rounded-2xl p-8 md:p-10 scroll-mt-32"
                id={service.id}
              >
                {/* Service Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#21223F] rounded-full flex items-center justify-center shrink-0 overflow-hidden p-5">
                    <img src={service.iconSrc} alt={service.title} className="w-full h-full object-contain" />
                  </div>
                  <h2 className="text-[0.9rem] sm:text-[1.0rem] md:text-[1.1rem] lg:text-[1.25rem] xl:text-[1.5rem] 2xl:text-[1.75rem] text-white BenzinSemibold">
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
                      <div className="w-5 h-5 bg-[#F45B25] rounded flex items-center justify-center shrink-0">
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
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 BenzinSemibold items-center gap-3 text-lg"
                >
                  <div className="bg-white p-4 rounded-lg">
                    <img src="/bmyb-logo-group1190-01.svg" alt="" className="w-4 h-4" />
                  </div>
                  <span className="px-2">View More</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
