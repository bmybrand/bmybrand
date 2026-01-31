'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Project = {
  id: string
  number: string
  title: string
  description: string
  image: string
  link: string
}

const projects: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'FOUNTAIN HILLS',
    description: 'We are proud to have partnered with Golden Meadows Nursing & Rehabilitation Center (GMNRC) to create a modern, user-friendly website that empowers families and residents.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '#',
  },
  {
    id: '02',
    number: '02',
    title: 'PINK.ME',
    description: 'Vestibulum vehicula tempor nulla, sed hendrerit urna interdum eu. Mauris et ipsum sed enim feugiat sollicitudin at vel tortor. Nunc a viverra nibh. Aenean ligula magna.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '#',
  },
  {
    id: '03',
    number: '03',
    title: 'EPCI',
    description: 'EPCI is a UK-affiliated engineering firm providing turnkey business solutions that span strategy development, architecture, and comprehensive project delivery.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '#',
  },
  {
    id: '04',
    number: '04',
    title: 'JIGGY JERKY',
    description: 'We partnered with Jeremiahs Cigars, Inc, to build a bold, easy-to-use website that captures their fun vibe and showcases their artisan jerky.',
    image: 'https://picsum.photos/500/300?grayscale',
    link: '#',
  },
]

function ProjectCard({ 
  project, 
  index
}: { 
  project: Project; 
  index: number;
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
        <button className="group bg-transparent border-2 border-white text-white px-2 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#F45B25] hover:to-[#FF843E] hover:border-transparent transition-all duration-300 flex justify-center items-center gap-2">
          <div className="bg-white p-4 rounded-lg">
            <img 
              src="/Group119.svg" 
              alt="" 
              className="w-4 h-4 group-hover:hidden" 
            />
            <img 
              src="/Group1190.svg" 
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
  return (
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}
