'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'


export default function WorkTogether() {
  const sectionRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.2"]
  })
  
  // Center point where "hands" are closed (just above the text)
  const centerX = '20vw'
  const centerY = '-25vh'
  
  // Text animation - emerges from center between the hands
  const x = useTransform(scrollYProgress, [0, 0.5], [centerX, '0vw'])
  const y = useTransform(scrollYProgress, [0, 0.5], [centerY, '0vh'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.2, 1])
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-15, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  
  // Both images start at same position (hands closed)
  const initialImageX1 = '40vw'
  const initialImageY1 = '50vh'
  const initialImageX2 = '-40vw'
  const initialImageY2 = '40vh'
  
  // Left image animation (released by left hand going left)
  const leftImageX = useTransform(scrollYProgress, [0, 0.5], [initialImageX1, '10vw'])
  const leftImageY = useTransform(scrollYProgress, [0, 0.5], [initialImageY1, '10vh'])
  const leftImageScale = useTransform(scrollYProgress, [0, 0.5], [0.2, 1])
  const leftImageRotate = useTransform(scrollYProgress, [0, 0.5], [-25, -8])
  
  // Right image animation (released by right hand going right)
  const rightImageX = useTransform(scrollYProgress, [0, 0.5], [initialImageX2, '-10vw'])
  const rightImageY = useTransform(scrollYProgress, [0, 0.5], [initialImageY2, '10vh'])
  const rightImageScale = useTransform(scrollYProgress, [0, 0.5], [0.2, 1])
  const rightImageRotate = useTransform(scrollYProgress, [0, 0.5], [25, 8])

  // Hand animations - start together, move apart
  const handStartX1 = '-25vw'
  const handStartY1 = '0vh'

  const handStartX2 = '-15vw'
  const handStartY2 = '0vh'
  // Left hand (cta1-hand-1) - moves left
  const leftHandX = useTransform(scrollYProgress, [0, 0.5], [handStartX1, '-50vw'])
  const leftHandY = useTransform(scrollYProgress, [0, 0.5], [handStartY1, '-20vh'])
  
  // Right hand (cta1-hand-2) - moves right
  const rightHandX = useTransform(scrollYProgress, [0, 0.5], [handStartX2, '0vw'])
  const rightHandY = useTransform(scrollYProgress, [0, 0.5], [handStartY2, '10vh'])
  
  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: FaFacebook },
    { name: 'Instagram', url: 'https://instagram.com', icon: FaInstagram },
    { name: 'Twitter', url: 'https://twitter.com', icon: FaTwitter },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: FaLinkedin },
    { name: 'YouTube', url: 'https://youtube.com', icon: FaYoutube },
  ]

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden lg:h-screen  bg-[#15173A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_40%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      {/* Animated Hands - Desktop Only */}
      {/* Left Hand */}
      <motion.div
        className="hidden lg:block absolute left-[50%] top-[40%] z-30 w-170 pointer-events-none"
        style={{
          x: leftHandX,
          y: leftHandY,
          originX: 0.5,
          originY: 0.5
        }}
      >
        <img 
          src="/cta1-hand-1.svg" 
          alt="Left hand"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Right Hand */}
      <motion.div
        className="hidden lg:block absolute left-[50%] top-[40%] z-20 w-170 pointer-events-none"
        style={{
          x: rightHandX,
          y: rightHandY,
          originX: 0.5,
          originY: 0.5
        }}
      >
        <img 
          src="/cta1-hand-2.svg" 
          alt="Right hand"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Floating Images - Desktop Only */}
      <motion.div 
        className="hidden lg:block absolute left-[10%] top-[25%] z-20 w-48 h-32 rounded-lg overflow-hidden shadow-2xl border-4 border-white/20"
        style={{ 
          x: leftImageX,
          y: leftImageY,
          scale: leftImageScale,
          rotate: leftImageRotate,
          opacity: opacity
        }}
      >
        <Image 
          src="/cta1-img-2.svg" 
          alt="Work environment"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.div 
        className="hidden lg:block absolute right-[15%] top-[20%] z-20 w-56 h-36 rounded-lg overflow-hidden shadow-2xl border-4 border-white/20"
        style={{ 
          x: rightImageX,
          y: rightImageY,
          scale: rightImageScale,
          rotate: rightImageRotate,
          opacity: opacity
        }}
      >
        <Image 
          src="/cta1-img-1.svg" 
          alt="Office space"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Social Media Links */}
      <div className="relative z-10 w-[90%] 2xl:w-[75%] mx-auto pt-8">
        <div className="flex flex-row flex-wrap gap-0 md:gap-4 lg:gap-6 justify-center items-center BenzinSemibold">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r from-[#F45B25] to-[#FF843E] hover:text-white text-white/80 justify-center"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm hidden md:inline">{link.name}</span>
              </a>
            )
          })}
        </div>
      </div>
      
        <div className="flex items-end lg:items-end items-center py-20 w-[90%] 2xl:w-[75%] h-full mx-auto ">
          {/* Headline */}
          <motion.div 
            className="relative z-20"
            style={{ 
              x,
              y,
              scale,
              rotate,
              opacity
            }}
          >
            <h2 className="text-5xl BenzinSemibold text-white sm:text-7xl lg:text-[109px]">
              Let's Work
            </h2>
            <h3 className="text-5xl BenzinSemibold text-[#F45B25] sm:text-7xl lg:text-8xl">
              Together!
            </h3>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 BenzinSemibold mb-12">
  <button className="bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:bg-[#d94a1a] transition-colors duration-300 flex justify-center items-center gap-2">
    <div className="bg-white p-4 rounded-lg">
    <img src="/Group1190.svg" alt="" className="w-4 h-4" />
    </div>
    <span className="px-2">Get Started Now</span>
  </button>

  <button className="border border-white text-white px-2 py-2 rounded-lg hover:bg-[#F45B25] transition-colors duration-300 flex justify-center items-center gap-2">

     <div className="bg-white p-4 rounded-lg">
    <img src="/Group119.svg" alt="" className="w-4 h-4" />
    </div>
    <span className="px-2">Explore Our Work</span>
  </button>
</div>
          </motion.div>

          
      </div>
    </section>
  )
}
