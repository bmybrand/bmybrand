'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const paths = [
  'M95 335 V360 Q95 384 119 384 H175',
  'M302 165 V95 Q302 65 332 65 H390',
  'M610 335 V374 Q610 404 640 404 H700',
  'M916 100 V77 Q916 47 946 47 H976',
  'M916 392 V424 Q916 454 946 454 H976',
]

export default function CareerHiringPaths() {
  const svgRef = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (!svgRef.current) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 1280px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        ({ conditions }) => {
          const maskPaths = gsap.utils.toArray<SVGPathElement>('.career-hiring-path-mask')

          if (!conditions?.desktop || conditions.reduceMotion) {
            gsap.set(maskPaths, { clearProps: 'strokeDasharray,strokeDashoffset' })
            return
          }

          maskPaths.forEach((path) => {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })
          })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: svgRef.current,
              start: 'top 78%',
              once: true,
            },
          })

          maskPaths.forEach((path, index) => {
            timeline.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 0.7,
                ease: 'power2.out',
              },
              index === 0 ? 0 : '>-0.12',
            )
          })
        },
      )

      return () => media.revert()
    }, svgRef)

    return () => context.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
      viewBox="0 0 1200 430"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <marker id="hire-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 10 5 0 10Z" fill="#F45B25" />
        </marker>

        {paths.map((path, index) => (
          <mask key={path} id={`career-hiring-mask-${index}`} maskUnits="userSpaceOnUse">
            <path
              className="career-hiring-path-mask"
              d={path}
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        ))}
      </defs>

      {paths.map((path, index) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(255,255,255,.28)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#hire-arrow)"
          mask={`url(#career-hiring-mask-${index})`}
        />
      ))}
    </svg>
  )
}
