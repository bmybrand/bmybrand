'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
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
    image: '/bmyb-case-fountain-hills-home-01.webp',
    link: '/case-studies/fountain-hills',
  },
  {
    id: '02',
    number: '02',
    title: 'PINK.ME',
    description: 'Vestibulum vehicula tempor nulla, sed hendrerit urna interdum eu. Mauris et ipsum sed enim feugiat sollicitudin at vel tortor. Nunc a viverra nibh. Aenean ligula magna.',
    image: '/bmyb-case-pink-me-slider-04.webp',
    link: '/case-studies/pink-me',
  },

  {
    id: '03',
    number: '03',
    title: 'JIGGY JERKY',
    description: 'We partnered with Jeremiahs Cigars, Inc, to build a bold, easy-to-use website that captures their fun vibe and showcases their artisan jerky.',
    image: '/bmyb-case-jiggy-jerky-slider-01.webp',
    link: '/case-studies/jiggy-jerky',
  },
  {
    id: '04',
    number: '04',
    title: 'INSTINCTIVE HEALTHCARE SOLUTIONS',
    description: 'Placeholder description for Instinctive Healthcare Solutions.',
    image: '/bmyb-case-instinctive-healthcare-slider-01.webp',
    link: '/case-studies/instinctive-healthcare-solutions',
  },
  {
    id: '05',
    number: '05',
    title: 'INSTINCTIVE HEALTH',
    description: 'Placeholder description for Instinctive Health.',
    image: '/bmyb-case-instinctive-health-slider-01.webp',
    link: '/case-studies/instinctive-health',
  },
  {
    id: '06',
    number: '06',
    title: 'LEARN AND LABEL',
    description: 'Placeholder description for learnandlabel.',
    image: '/bmyb-case-learnandlabel-slider-01.webp',
    link: '/case-studies/learnandlabel',
  },
  {
    id: '07',
    number: '07',
    title: 'VYTIS TOUR',
    description: 'Placeholder description for Vytis Tour.',
    image: '/bmyb-case-vytis-tour-slider-01.webp',
    link: '/case-studies/vytis-tour',
  },
  {
    id: '08',
    number: '08',
    title: 'JERSEY',
    description: 'Placeholder description for Jersey.',
    image: '/bmyb-case-jersey-slider-01.webp',
    link: '/case-studies/jersey',
  },
  {
    id: '09',
    number: '09',
    title: 'BHS',
    description: 'Placeholder description for BHS.',
    image: '/bmyb-case-bhs-slider-05.webp',
    link: '/case-studies/bhs',
  },
  {
    id: '10',
    number: '10',
    title: "BABA'S BURGERS",
    description: "We created a bold, food-first digital experience for Baba's Burgers that turns appetite-driven visuals into a clearer, more conversion-ready brand journey.",
    image: '/bmyb-case-babas-burgers-slider-02.webp',
    link: '/case-studies/babas-burgers',
  },
]

const caseStudies: CaseStudy[] = [
  {
    id: 'fountain-hills',
    number: '01',
    title: 'FOUNTAIN HILLS',
    subtitle: 'Modern Digital Experience for Healthcare',
    client: 'Fountain Hills Emergency Room & Medical Center',
    industry: 'Healthcare / Emergency Care',
    services: ['UI/UX Design', 'Web Development', 'Patient Accessibility'],
    challenge: 'The facility needed a fast, reliable, and easy-to-navigate digital platform that allows patients in urgent situations to quickly access emergency care information without confusion or delay.',
    solution: 'We designed and developed a high-performance healthcare website focused on speed, clarity, and accessibility. The interface was structured to support high-stress decision-making, ensuring patients can instantly find services, locations, and care options when needed.',
    results: [
      'Ensured uninterrupted access to emergency care information with 100% uptime',
      'Improved page speed by 35% for faster patient response time',
      'Created a patient-first digital experience focused on clarity and trust'
    ],
    image: '/bmyb-case-fountain-hills-home-01.webp',
    stats: [
      { label: 'Site Uptime', value: '100%' },
      { label: 'Faster Load Speed', value: '+35%' },
      { label: 'Accessibility Compliance', value: 'WCAG 2.1' }
    ],
    slug: 'fountain-hills'
  },
  {
    id: 'pink-me',
    number: '02',
    title: 'PINK.ME',
    subtitle: 'Nonprofit Healthcare Digital Experience',
    client: 'PINK "ME"',
    industry: 'Nonprofit Healthcare',
    services: ['UI/UX Design', 'Web Development', 'Donor & Patient Accessibility'],
    challenge: 'PINK "ME" needed a digital platform that could clearly communicate breast cancer support programs while maintaining emotional sensitivity, accessibility, and ease of use for patients, survivors, donors, and families.',
    solution: 'We designed a compassionate, user-friendly platform that highlights financial aid, wellness programs, screening access, and community support while keeping the experience warm, clear, and dignity-focused.',
    results: [
      'Improved clarity of financial assistance and support programs',
      'Increased engagement from donors and community users',
      'Enhanced accessibility for patients and families in need'
    ],
    image: '/bmyb-case-pink-me-slider-04.webp',
    stats: [
      { label: 'Program Clarity', value: '100%' },
      { label: 'User Engagement', value: '+45%' },
      { label: 'Accessibility Compliance', value: 'WCAG 2.1' }
    ],
    slug: 'pink-me'
  },

  {
    id: 'jiggy-jerky',
    number: '03',
    title: 'JIGGY JERKY',
    subtitle: 'Bold Brand Experience for Artisan Jerky',
    client: 'Jiggy Jerky',
    industry: 'Food & E-commerce',
    services: ['UI/UX Design', 'E-commerce Development', 'Brand Experience Design'],
    challenge: 'Jiggy Jerky needed an engaging e-commerce experience that reflected its bold, playful brand personality while clearly showcasing premium Angus beef jerky products.',
    solution: 'We created a flavor-driven, conversion-focused online store with a strong visual identity, product storytelling, and a smooth shopping experience optimized for mobile and desktop users.',
    results: [
      'Improved product visibility and user engagement',
      'Higher conversion rates across all product pages',
      'Faster, smoother shopping experience for users'
    ],
    image: '/bmyb-case-jiggy-jerky-slider-01.webp',
    stats: [
      { label: 'Product Engagement', value: '+60%' },
      { label: 'Conversion Rate', value: '+40%' },
      { label: 'Load Speed', value: '2.5s' }
    ],
    slug: 'jiggy-jerky'
  },
  {
    id: 'instinctive-healthcare-solutions',
    number: '04',
    title: 'INSTINCTIVE HEALTHCARE SOLUTIONS',
    subtitle: 'Instinctive Healthcare Solutions',
    client: 'Instinctive Healthcare Solutions',
    industry: 'Healthcare',
    services: ['UI/UX Design', 'Web Development', 'Patient Accessibility'],
    challenge: 'Instinctive Healthcare Solutions needed a streamlined digital platform to provide critical healthcare information and emergency service access with zero downtime, ensuring patients could quickly find care in urgent situations.',
    solution: 'We built a high-performance, accessibility-focused website with clear navigation, fast loading speeds, and a structured interface designed for high-stress emergency scenarios.',
    results: [
      '100% uptime, ensuring uninterrupted access to emergency information',
      '35% improvement in website performance and speed',
      'Improved navigation for faster urgent care decision-making'
    ],
    image: '/bmyb-case-instinctive-healthcare-slider-01.webp',
    stats: [
      { label: 'Site Uptime', value: '100%' },
      { label: 'Faster Load Speed', value: '+35%' },
      { label: 'Accessibility Compliance', value: 'WCAG 2.1' }
    ],
    slug: 'instinctive-healthcare-solutions'
  },
  {
    id: 'instinctive-health',
    number: '05',
    title: 'INSTINCTIVE HEALTHPASS',
    subtitle: 'Instinctive HealthPass',
    client: 'Instinctive HealthPass',
    industry: 'Healthcare Membership Platform',
    services: ['UI/UX Design', 'Web Development', 'Patient Experience Design'],
    challenge: 'Patients struggled with unpredictable healthcare costs, confusing insurance systems, and lack of clarity around out-of-pocket expenses.',
    solution: 'We designed a simplified membership-based healthcare platform that explains benefits clearly and helps users understand care access, participating providers, and cost predictability.',
    results: [
      'Simplified understanding of healthcare costs and access',
      'Improved patient confidence in healthcare decisions',
      'Increased engagement with participating providers'
    ],
    image: '/bmyb-case-instinctive-health-slider-01.webp',
    stats: [
      { label: 'Clarity in Structure', value: '100%' },
      { label: 'User Sign-ups', value: '+42%' },
      { label: 'User Confusion', value: '-30%' }
    ],
    slug: 'instinctive-health'
  },
  {
    id: 'learnandlabel',
    number: '06',
    title: 'LABEL N LEARN',
    subtitle: 'Label N Learn',
    client: 'Label N Learn',
    industry: 'EdTech / Productivity',
    services: ['UI/UX Design', 'Mobile App Design', 'Workflow Optimization'],
    challenge: 'Teachers needed a simple tool to reduce classroom workload, improve organization, and streamline parent communication without complex or time-consuming software.',
    solution: 'We designed an intuitive mobile-first platform that allows teachers to create labels, newsletters, and classroom materials quickly using templates and AI-assisted tools.',
    results: [
      'Reduced time spent on classroom organization tasks',
      'Improved communication between teachers and parents',
      'High user satisfaction from educators'
    ],
    image: '/bmyb-case-learnandlabel-slider-01.webp',
    stats: [
      { label: 'Time Saved', value: '+50%' },
      { label: 'Teacher Productivity', value: '+38%' },
      { label: 'User Rating', value: '4.8★' }
    ],
    slug: 'learnandlabel'
  },
  {
    id: 'vytis-tour',
    number: '07',
    title: 'VYTIS TOURS',
    subtitle: 'Vytis Tours',
    client: 'Vytis Tours',
    industry: 'Travel & Tourism',
    services: ['UI/UX Design', 'Web Development', 'Content Structuring'],
    challenge: 'Travelers needed a clear and inspiring way to explore complex Baltic tour packages while understanding destinations, itineraries, and travel options easily.',
    solution: 'We designed a storytelling-driven travel platform showcasing Baltic destinations with structured tour details, making planning and exploration simple and engaging.',
    results: [
      'Improved tour discovery and user engagement',
      'Higher travel inquiries and bookings',
      'Simplified navigation across destinations'
    ],
    image: '/bmyb-case-vytis-tour-slider-01.webp',
    stats: [
      { label: 'Tour Engagement', value: '+55%' },
      { label: 'Inquiry Rate', value: '+40%' },
      { label: 'Page Load Speed', value: '3s' }
    ],
    slug: 'vytis-tour'
  },
  {
    id: 'jersey',
    number: '08',
    title: 'JERSEY RECREATIONAL TENNIS',
    subtitle: 'Jersey Recreational Tennis',
    client: 'Jersey Recreational Tennis',
    industry: 'Sports Community Platform',
    services: ['UI/UX Design', 'Web Development', 'Community Platform Design'],
    challenge: 'Players needed a simple way to connect, find matches, join tournaments, and participate in local tennis events across New Jersey.',
    solution: 'We built a community-driven platform that supports player profiles, challenge matches, tournaments, score tracking, and social tennis events.',
    results: [
      'Improved player connectivity and match discovery',
      'Increased participation in tournaments and events',
      'Stronger local tennis community engagement'
    ],
    image: '/bmyb-case-jersey-slider-01.webp',
    stats: [
      { label: 'Player Engagement', value: '+60%' },
      { label: 'Match Participation', value: '+45%' },
      { label: 'Load Speed', value: '2.8s' }
    ],
    slug: 'jersey'
  },
  {
    id: 'bhs',
    number: '09',
    title: 'BROWARD HOUSING SOLUTIONS (BHS)',
    subtitle: 'Broward Housing Solutions (BHS)',
    client: 'Broward Housing Solutions (BHS)',
    industry: 'Nonprofit / Housing & Community Support',
    services: ['UI/UX Design', 'Web Development', 'Dashboard Development', 'Brand Identity Design'],
    challenge: 'Broward Housing Solutions needed a compassionate yet professional digital platform to communicate its mission, strengthen donor trust, and support housing-focused community initiatives effectively.',
    solution: 'We designed and developed a mission-driven nonprofit platform with accessible navigation, emotional storytelling, impact-focused visuals, and a custom dashboard system to improve operational workflows and community engagement.',
    results: [
      'Improved campaign visibility and donor engagement across the platform',
      'Streamlined internal workflows through a custom dashboard system',
      'Strengthened community awareness around housing and mental health support'
    ],
    image: '/bmyb-case-bhs-slider-05.webp',
    stats: [
      { label: 'Community Engagement', value: '+45%' },
      { label: 'Operational Workflow', value: 'Improved' },
      { label: 'Digital Experience', value: 'Mission-Driven' }
    ],
    slug: 'bhs'
  },
  {
    id: 'babas-burgers',
    number: '10',
    title: "BABA’S BURGERS",
    subtitle: 'Baba’s Burgers',
    client: "Baba’s Burgers",
    industry: 'Food & Restaurant',
    services: ['UI/UX Design', 'Web Development', 'Brand Identity Design', 'Marketing Visuals'],
    challenge: "Baba’s Burgers needed a bold digital presence that matched the energy of its brand while showcasing fresh halal burgers, signature menu items, and promotional offers in a visually engaging way.",
    solution: 'We designed and developed a modern, food-focused website experience with bold visuals, interactive menu sections, and high-impact branding that highlights freshness, flavor, and customer trust across every touchpoint.',
    results: [
      'Created a bold and recognizable digital identity for the restaurant',
      'Strengthened trust through clean halal-focused brand presentation',
      'Delivered a modern fast-food experience with strong visual impact'
    ],
    image: '/bmyb-case-babas-burgers-slider-02.webp',
    stats: [
      { label: 'Menu Engagement', value: '+50%' },
      { label: 'Customer Interaction', value: '+40%' },
      { label: 'Brand Experience', value: 'Modern' }
    ],
    slug: 'babas-burgers'
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
          className="group bg-transparent border-2 border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-gradient-to-r hover:from-[#F45B25] hover:to-[#FF843E] hover:border-transparent hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] transition-all duration-300 flex justify-center items-center gap-2 BenzinSemibold"
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src="/bmyb-logo-group119-01.svg"
              alt=""
              className="w-4 h-4 group-hover:hidden"
            />
            <img
              src="/bmyb-logo-group1190-01.svg"
              alt=""
              className="hidden w-4 h-4 group-hover:block"
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
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
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
                <h3 className="text-white text-lg md:text-xl BenzinSemibold">Selected Work</h3>
                <h3 className="text-white text-lg md:text-xl BenzinSemibold">Across Industries</h3>
              </div>
              <div className="hidden lg:block h-[2px] flex-1 bg-white/30"></div>
            </div>
            
            {/* Right side - OUR RECENT PROJECTS (65%) */}
            <div className="w-full lg:w-[65%]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#F45B25] BenzinSemibold leading-tight">
                Projects <br /> That Define <br /> Our Approach
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
