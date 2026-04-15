'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import CaseStudyModal from './casestudymodal'

type Project = {
  id: string
  number: string
  title: string
  description: string
  image: string
  link: string
}

type CaseStudy = {
  id: string
  number: string
  title: string
  subtitle: string
  client: string
  industry: string
  services: string[]
  challenge: string
  solution: string
  results: string[]
  image: string
  stats: {
    label: string
    value: string
  }[]
  slug: string
}

const projects: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'FOUNTAIN HILLS',
    description: 'We are proud to have partnered with Golden Meadows Nursing & Rehabilitation Center (GMNRC) to create a modern, user-friendly website that empowers families and residents.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '/case-studies/fountain-hills',
  },
  {
    id: '02',
    number: '02',
    title: 'PINK.ME',
    description: 'Vestibulum vehicula tempor nulla, sed hendrerit urna interdum eu. Mauris et ipsum sed enim feugiat sollicitudin at vel tortor. Nunc a viverra nibh. Aenean ligula magna.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '/case-studies/pink-me',
  },
  {
    id: '03',
    number: '03',
    title: 'EPCI',
    description: 'EPCI is a UK-affiliated engineering firm providing turnkey business solutions that span strategy development, architecture, and comprehensive project delivery.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '/case-studies/epci',
  },
  {
    id: '04',
    number: '04',
    title: 'JIGGY JERKY',
    description: 'We partnered with Jeremiahs Cigars, Inc, to build a bold, easy-to-use website that captures their fun vibe and showcases their artisan jerky.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '/case-studies/jiggy-jerky',
  },
]

const caseStudies: CaseStudy[] = [
  {
    id: 'fountain-hills',
    number: '01',
    title: 'FOUNTAIN HILLS',
    subtitle: 'Modern Digital Experience for Healthcare',
    client: 'Golden Meadows Nursing & Rehabilitation Center',
    industry: 'Healthcare',
    services: ['Website Design', 'UI/UX', 'Brand Strategy'],
    challenge: 'GMNRC needed a modern, user-friendly website that would empower families and residents while maintaining accessibility standards for healthcare facilities.',
    solution: 'We designed and developed a clean, intuitive website with easy navigation, family resources, and virtual tour capabilities. The design prioritized accessibility and mobile responsiveness while reflecting the caring nature of the facility.',
    results: [
      'Increased online inquiries by 65%',
      'Improved user engagement time by 120%',
      'Enhanced mobile accessibility for families',
      '98% positive feedback from residents and families'
    ],
    image: 'https://picsum.photos/800/600?random=1',
    stats: [
      { label: 'Increase in Inquiries', value: '65%' },
      { label: 'User Engagement', value: '120%' },
      { label: 'Mobile Traffic', value: '85%' }
    ],
    slug: 'fountain-hills'
  },
  {
    id: 'pink-me',
    number: '02',
    title: 'PINK.ME',
    subtitle: 'E-commerce Platform for Fashion Brand',
    client: 'Pink.Me Fashion',
    industry: 'Fashion & Retail',
    services: ['E-commerce Development', 'Brand Identity', 'Digital Marketing'],
    challenge: 'Pink.Me needed a vibrant online presence that would capture their unique brand personality and convert visitors into customers through an engaging shopping experience.',
    solution: 'We created a bold, visually stunning e-commerce platform with advanced filtering, personalized recommendations, and seamless checkout. The design showcased products beautifully while maintaining fast load times.',
    results: [
      'Online sales increased by 180%',
      'Cart abandonment reduced by 45%',
      'Average order value up by 35%',
      'Customer retention improved by 60%'
    ],
    image: 'https://picsum.photos/800/600?random=2',
    stats: [
      { label: 'Sales Growth', value: '180%' },
      { label: 'Order Value', value: '+35%' },
      { label: 'Retention Rate', value: '60%' }
    ],
    slug: 'pink-me'
  },
  {
    id: 'epci',
    number: '03',
    title: 'EPCI',
    subtitle: 'Enterprise Platform for Engineering Solutions',
    client: 'EPCI Engineering',
    industry: 'Engineering & Construction',
    services: ['Web Application', 'System Integration', 'Project Management Tools'],
    challenge: 'EPCI required a comprehensive digital platform to manage complex engineering projects while providing transparent communication with clients across multiple time zones.',
    solution: 'We built a robust web application with project tracking, document management, and real-time collaboration tools. The system integrated with existing enterprise software and provided detailed analytics.',
    results: [
      'Project delivery time reduced by 30%',
      'Client satisfaction score: 4.8/5',
      'Operational costs reduced by 25%',
      'Team productivity increased by 40%'
    ],
    image: 'https://picsum.photos/800/600?random=3',
    stats: [
      { label: 'Time Saved', value: '30%' },
      { label: 'Client Score', value: '4.8/5' },
      { label: 'Cost Reduction', value: '25%' }
    ],
    slug: 'epci'
  },
  {
    id: 'jiggy-jerky',
    number: '04',
    title: 'JIGGY JERKY',
    subtitle: 'Bold Brand Experience for Artisan Jerky',
    client: 'Jeremiahs Cigars, Inc',
    industry: 'Food & Beverage',
    services: ['Brand Identity', 'E-commerce', 'Content Strategy'],
    challenge: 'Jiggy Jerky needed a website that captured their fun, bold personality while making it easy for customers to browse and purchase their artisan jerky products online.',
    solution: 'We designed a vibrant, personality-driven e-commerce site with playful animations, mouthwatering product photography, and a subscription service for regular customers. The site reflected the brand\'s unique character while driving sales.',
    results: [
      'Online revenue up by 210%',
      'Subscription sign-ups: 1,200+ in 3 months',
      'Social media engagement increased by 150%',
      'Average session time up by 95%'
    ],
    image: 'https://picsum.photos/800/600?random=4',
    stats: [
      { label: 'Revenue Growth', value: '210%' },
      { label: 'Subscribers', value: '1,200+' },
      { label: 'Engagement', value: '150%' }
    ],
    slug: 'jiggy-jerky'
  },
]

function ProjectCard({ 
  project, 
  index,
  onViewMore
}: { 
  project: Project; 
  index: number;
  onViewMore: () => void;
}) {
  const cardRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  // Tilt from -30deg (forward) through 0deg (center) to 30deg (backward)
  const rotateX = useTransform(scrollYProgress, [0, 0.55, 1], [60, 0, -10])
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
    >
      {/* Left Content */}
      <div className="w-full lg:w-[35%] space-y-6">
        {/* Number with line */}
        <div className="flex items-center gap-4">
          <span className="text-white text-2xl md:text-3xl BenzinSemibold">
            {project.number}
          </span>
          <div className="h-[2px] w-16 bg-white/30"></div>
          <h3 className="text-white text-xl md:text-2xl BenzinSemibold">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>

        {/* CTA Button */}
        <button 
          onClick={onViewMore}
          className="group bg-transparent border-2 border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-gradient-to-r hover:from-[#F45B25] hover:to-[#FF843E] hover:border-transparent hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] transition-all duration-300 flex justify-center items-center gap-2"
        >
          <div className="bg-white p-4 rounded-lg">
            <img 
              src="/group119.svg" 
              alt="" 
              className="w-4 h-4 group-hover:hidden" 
            />
            <img 
              src="/group1190.svg" 
              alt="" 
              className="w-4 h-4 hidden group-hover:block" 
            />
          </div>
          <span className="px-2">View Full Case Study</span>
        </button>
      </div>

      {/* Right Image with 3D Tilt */}
      <div className="w-full lg:w-[65%]" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
          style={{ rotateX }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F45B25]/10 to-transparent z-10"></div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function RecentProjects() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewMore = (projectId: string) => {
    const caseStudy = caseStudies.find(cs => cs.number === projectId)
    if (caseStudy) {
      setSelectedCaseStudy(caseStudy)
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <section className="min-h-screen bg-[#15173A] py-20">
        <div className="w-[90%] lg:w-[85%] 2xl:w-[80%] mx-auto">
          {/* Header */}
          <div className="mb-16 flex flex-col lg:flex-row gap-8">
            {/* Left side - OUR CASE STUDIES with line (35%) */}
            <div className="w-full lg:w-[35%] flex items-center gap-4">
              <div>
                <h3 className="text-white text-lg md:text-xl BenzinSemibold">OUR</h3>
                <h3 className="text-white text-lg md:text-xl BenzinSemibold">CASE STUDIES</h3>
              </div>
              <div className="hidden lg:block h-[2px] flex-1 bg-white/30"></div>
            </div>
            
            {/* Right side - OUR RECENT PROJECTS (65%) */}
            <div className="w-full lg:w-[65%]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#F45B25] BenzinSemibold leading-tight">
                OUR<br />RECENT<br />PROJECTS
              </h1>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-20 md:space-y-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onViewMore={() => handleViewMore(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <CaseStudyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseStudy={selectedCaseStudy}
      />
    </>
  )
}
