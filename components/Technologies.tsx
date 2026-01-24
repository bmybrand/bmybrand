'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ---------- DESKTOP TOOL ---------- */
const ToolItem = ({
  name,
  icon,
  position,
  side,
}: {
  name: string
  icon: string
  position: React.CSSProperties
  side: 'left' | 'right'
}) => (
  <div
    data-side={side}
    className="tool-item absolute flex items-center gap-3 group"
    style={position}
  >
    {/* ICON */}
    <div
      className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md
      border border-white/20 flex items-center justify-center shadow-lg
      transition-all duration-300
      group-hover:scale-110
      group-hover:-translate-y-1
      group-hover:shadow-[0_0_25px_rgba(244,91,37,0.75)]"
    >
      <img src={icon} className="w-5 h-5" />
    </div>

    {/* LABEL */}
    <div
      className="w-44 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md
      border border-white/20 text-white text-sm font-medium text-center shadow-md
      transition-all duration-300 truncate"
    >
      {name}
    </div>
  </div>
)

/* ---------- MOBILE TOOL ---------- */
const MobileTool = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-3 mx-6 shrink-0">
    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
      <img src={icon} className="w-5 h-5" />
    </div>

    <div className="w-45 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm text-center truncate">
      {name}
    </div>
  </div>
)

/* ---------- FOOTER ---------- */
const Footer = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const leftTools = [
    { name: 'Adobe Photoshop', icon: '/next.svg', top: '6%', left: '12%' },
    { name: 'Adobe Illustrator', icon: '/next.svg', top: '20%', left: '8%' },
    { name: 'Adobe XD', icon: '/next.svg', top: '34%', left: '6%' },
    { name: 'Figma', icon: '/next.svg', top: '48%', left: '5%' },
    { name: 'Adobe InDesign', icon: '/next.svg', top: '62%', left: '6%' },
    { name: 'Premiere Pro', icon: '/next.svg', top: '76%', left: '8%' },
    { name: 'After Effects', icon: '/next.svg', top: '90%', left: '12%' },
  ]

  const rightTools = [
    { name: 'WordPress', icon: '/next.svg', top: '6%', right: '12%' },
    { name: 'React', icon: '/next.svg', top: '20%', right: '8%' },
    { name: 'Node JS', icon: '/next.svg', top: '34%', right: '6%' },
    { name: 'Next JS', icon: '/next.svg', top: '48%', right: '5%' },
    { name: 'Flutter', icon: '/next.svg', top: '62%', right: '6%' },
    { name: 'Android', icon: '/next.svg', top: '76%', right: '8%' },
    { name: 'Shopify', icon: '/next.svg', top: '90%', right: '12%' },
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
          }
        )
      })

      /* HOVER MICRO-ORBIT */
      items.forEach((item) => {
        const side = item.dataset.side

        const hoverTl = gsap.timeline({ paused: true })
        hoverTl.to(item, {
          x: side === 'left' ? 6 : -6,
          rotate: side === 'left' ? 2 : -2,
          duration: 0.25,
          ease: 'power2.out',
        })

        item.addEventListener('mouseenter', () => hoverTl.play())
        item.addEventListener('mouseleave', () => hoverTl.reverse())
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-fit lg:h-screen bg-[url('/technologybg.svg')] bg-cover bg-center overflow-hidden"
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
          />
        ))}

        {rightTools.map((tool, i) => (
          <ToolItem
            key={i}
            name={tool.name}
            icon={tool.icon}
            position={{ top: tool.top, right: tool.right }}
            side="right"
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
        <div className="text-center w-[90%] lg:w-[50%] px-6">
          <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] BenzinSemibold mb-6">
            Modern <span className="text-[#F45B25]">Tools & Technologies</span>
            <br />
            That Power Your Brand
          </h1>

          <p className="text-[#ADAECC] text-sm sm:text-base">
            We use industry-leading tools and technologies to build powerful,
            scalable, and visually stunning digital experiences.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
