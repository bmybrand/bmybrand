'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ---------- DESKTOP TOOL ---------- */
const ToolItem = ({
  name,
  icon,
  position,
  side,
  hoverColor,
}: {
  name: string
  icon: string
  position: React.CSSProperties
  side: 'left' | 'right'
  hoverColor: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldDarkenIcon = icon === '/bmyb-tech-next-01.png' && isHovered
  
  return (
    <div
      data-side={side}
      className={`tool-item absolute flex items-center gap-3 cursor-pointer z-20 ${
        side === 'right' ? 'flex-row-reverse' : ''
      }`}
      style={position}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ICON */}
      <div
        className="w-12 h-12 rounded-xl backdrop-blur-md
        flex items-center justify-center shadow-lg
        transition-all duration-300"
        style={{
          backgroundColor: isHovered ? hoverColor : 'rgba(255, 255, 255, 0.15)',
          borderColor: isHovered ? hoverColor : 'rgba(255, 255, 255, 0.2)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: isHovered ? `0 0 25px ${hoverColor}CC` : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        }}
      >
        <img
          src={icon}
          alt=""
          className={`w-5 h-5 object-contain transition-all duration-300 ${
            shouldDarkenIcon ? 'brightness-0' : ''
          }`}
        />
      </div>

      {/* LABEL */}
      <div
        className="w-44 px-4 py-3 rounded-xl backdrop-blur-md
        text-white text-sm font-medium text-center shadow-md
        transition-all duration-300 truncate"
        style={{
          backgroundColor: isHovered ? `${hoverColor}4D` : 'rgba(255, 255, 255, 0.1)',
          borderColor: isHovered ? hoverColor : 'rgba(255, 255, 255, 0.2)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: isHovered ? `0 0 20px ${hoverColor}99` : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
      >
        {name}
      </div>
    </div>
  )
}

/* ---------- MOBILE TOOL ---------- */
const MobileTool = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-3 mx-6 shrink-0 group cursor-pointer pointer-events-auto">
    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#F45B25] group-hover:border-[#F45B25] group-hover:shadow-[0_0_20px_rgba(244,91,37,0.8)]">
      <img src={icon} alt="" className="w-5 h-5 object-contain" />
    </div>

    <div className="w-45 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm text-center truncate transition-all duration-300 group-hover:bg-[#F45B25]/30 group-hover:border-[#F45B25] group-hover:shadow-[0_0_15px_rgba(244,91,37,0.6)]">
      {name}
    </div>
  </div>
)

/* ---------- FOOTER ---------- */
const Footer = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (!headingRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform',
        }
      )
    }, headingRef.current)
    return () => ctx.revert()
  }, [])

  const leftTools = [
    { name: 'Adobe Photoshop', icon: '/bmyb-tech-ps-01.png', top: '6%', left: '12%', hoverColor: '#31A8FF' },
    { name: 'Adobe Illustrator', icon: '/bmyb-global-ai-01.png', top: '20%', left: '8%', hoverColor: '#FF9A00' },
    { name: 'Adobe XD', icon: '/bmyb-tech-xd-01.png', top: '34%', left: '6%', hoverColor: '#FF61F6' },
    { name: 'Figma', icon: '/bmyb-tech-figma-01.png', top: '48%', left: '5%', hoverColor: '#F24E1E' },
    { name: 'Adobe InDesign', icon: '/bmyb-tech-id-01.png', top: '62%', left: '6%', hoverColor: '#FF3366' },
    { name: 'Premiere Pro', icon: '/bmyb-tech-pr-01.png', top: '76%', left: '8%', hoverColor: '#9999FF' },
    { name: 'After Effects', icon: '/bmyb-tech-ae-01.png', top: '90%', left: '12%', hoverColor: '#9999FF' },
  ]

  const rightTools = [
    { name: 'WordPress', icon: '/bmyb-tech-wordpress-01.png', top: '6%', right: '12%', hoverColor: '#21759B' },
    { name: 'React', icon: '/bmyb-tech-react-01.png', top: '20%', right: '8%', hoverColor: '#61DAFB' },
    { name: 'Node JS', icon: '/bmyb-tech-node-js-01.png', top: '34%', right: '6%', hoverColor: '#339933' },
    { name: 'Next JS', icon: '/bmyb-tech-next-01.png', top: '48%', right: '5%', hoverColor: '#FFFFFF' },
    { name: 'Flutter', icon: '/bmyb-tech-flutter-01.png', top: '62%', right: '6%', hoverColor: '#02569B' },
    { name: 'Android', icon: '/bmyb-tech-android-01.png', top: '76%', right: '8%', hoverColor: '#3DDC84' },
    { name: 'Shopify', icon: '/bmyb-logo-spotify-01.png', top: '90%', right: '12%', hoverColor: '#1DB954' },
  ]

  /* ---------- SCROLL + HOVER ANIMATION ---------- */
  useLayoutEffect(() => {
    if (!sectionRef.current || window.innerWidth < 1024) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.tool-item')

      /* ENTRY ANIMATION */
      items.forEach((item, i) => {
        const side = item.dataset.side
        const fromX = side === 'left' ? -220 : 220
        const fromRotate = side === 'left' ? -14 : 14

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: fromX,
            y: 160,
            rotate: fromRotate,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 1.15,
            delay: i * 0.08, // 👈 assembling illusion
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true, // 🚨 prevents DOM errors
            },
            onComplete: i === items.length - 1 ? () => {
              // Enable hover after last item animates in
              setAnimationComplete(true)
              
              /* HOVER MICRO-ORBIT */
              items.forEach((hoverItem) => {
                const hoverSide = hoverItem.dataset.side

                const hoverTl = gsap.timeline({ paused: true })
                hoverTl.to(hoverItem, {
                  x: hoverSide === 'left' ? 6 : -6,
                  rotate: hoverSide === 'left' ? 2 : -2,
                  duration: 0.25,
                  ease: 'power2.out',
                })

                hoverItem.addEventListener('mouseenter', () => hoverTl.play())
                hoverItem.addEventListener('mouseleave', () => hoverTl.reverse())
              })
            } : undefined,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-fit lg:h-screen bg-[url('/bmyb-global-technologybg-01.svg')] bg-cover bg-center overflow-hidden"
    >
      {/* DESKTOP */}
      <div className="hidden lg:block">
        {leftTools.map((tool, i) => (
          <ToolItem
            key={i}
            name={tool.name}
            icon={tool.icon}
            position={{ top: tool.top, left: tool.left }}
            side="left"
            hoverColor={tool.hoverColor}
          />
        ))}

        {rightTools.map((tool, i) => (
          <ToolItem
            key={i}
            name={tool.name}
            icon={tool.icon}
            position={{ top: tool.top, right: tool.right }}
            side="right"
            hoverColor={tool.hoverColor}
          />
        ))}
      </div>

      {/* MOBILE BELTS */}
      <div className="lg:hidden absolute inset-0 flex flex-col justify-between py-16 pointer-events-none">
        <div className="overflow-hidden">
          <div className="flex w-max animate-belt-right">
            {[...leftTools, ...leftTools].map((tool, i) => (
              <MobileTool key={`lt-${i}`} name={tool.name} icon={tool.icon} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex w-max animate-belt-left">
            {[...rightTools, ...rightTools].map((tool, i) => (
              <MobileTool key={`rt-${i}`} name={tool.name} icon={tool.icon} />
            ))}
          </div>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center ">
        <div ref={headingRef} className="text-center w-[90%] lg:w-[50%] px-6">
          <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] BenzinSemibold mb-6">
            The <span className="text-[#F45B25]">Stack</span> We Work With
          </h1>
          <p className="text-[#ADAECC] text-sm sm:text-base">
            Our technology stack is carefully chosen to ensure performance, flexibility, and long-term
            stability across all projects
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
