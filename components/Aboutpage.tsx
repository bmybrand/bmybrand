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
      {/* DesignedGrow section with ref */}
      <div ref={designedGrowRef}>
        <DesignedGrow />
      </div>

      {/* Bottom CTA appears after DesignedGrow */}
      <BottomCTA targetRef={designedGrowRef} footerRef={footerRef} />
      <WorkTogether />
      <Brandsspec />
      <RequestForm />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}

export default Aboutpage
