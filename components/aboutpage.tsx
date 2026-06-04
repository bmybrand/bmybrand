'use client'

import React, { useRef } from 'react'
import Navbar from './navbar'
import Herobar from './herobar'
import Aboutbmy from './aboutbmy'
import BrandStats from './brandstats'
import DesignedGrow from './designedgrow'
import BottomCTA from './bottomcta'
import CreativeProcess from './creativeprocess'
import Brandsspec from './brandsspec'
import RequestForm from './requestform'
import Footer from './footer'
import StaticProcess from './staticprocess'
import WorkTogether from './worktogether'

const Aboutpage = () => {
  const designedGrowRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobar />
      <Aboutbmy />
      <BrandStats />
      <StaticProcess />
      <DesignedGrow
        heading={
          <>
            We Deliver Digital Solutions Built for Real-
            <br />
            <span className="text-[#F45B25]">World Impact</span>
          </>
        }
        intro="At BmyBrand, we combine 10+ years of experience with strategy, design, and technology to build digital solutions that are clear, functional, and results-driven."
        items={[
          {
            title: 'Clear Strategic Planning',
            desc: 'We begin every project with structured research and planning to understand business needs, user behavior, and goals. This ensures every solution is purposeful, aligned, and outcome-focused from the start.',
            image: '/bmyb-global-getskeebear-01.webp',
          },
          {
            title: 'User-Centered Design Approach',
            desc: 'Our design process prioritizes simplicity, clarity, and usability. We create intuitive interfaces that enhance user experience while maintaining strong visual identity and brand consistency across all platforms.',
            image: '/bmyb-global-designedgrow-brand-safe-01.webp',
          },
          {
            title: 'Scalable Technology Development',
            desc: 'We develop fast, secure, and scalable digital systems using modern technologies. Each solution is built to perform reliably and adapt easily as business needs grow over time.',
            image: '/bmyb-global-designedgrow-launch-smarter-01.webp',
          },
        ]}
        checklist={[
          'Strategy First',
          'Design Focused',
          'Tech Driven',
          'Result Oriented',
          'Scalable Systems',
          'User Centric',
          'Process Clear',
          'Quality Assured',
        ]}
      />

      <WorkTogether
        headingTop={
          <>
            Let&apos;s <span className="text-[#F45B25]">Talk</span>
            <br />
            <span className="block text-4xl sm:text-6xl lg:text-[72px]">
              <span className="text-[#F45B25]">About</span> Your Idea
            </span>
          </>
        }
      />
      <Brandsspec />
      <RequestForm />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}

export default Aboutpage
