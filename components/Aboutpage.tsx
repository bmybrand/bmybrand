'use client'

import React, { useRef } from 'react'
import Navbar from './Navbar'
import Herobar from './herobar'
import Aboutbmy from './aboutbmy'
import BrandStats from './brandstats'
import DesignedGrow from './DesignedGrow'
import BottomCTA from './BottomCTA'
import CreativeProcess from './CreativeProcess'
import Brandsspec from './Brandsspec'
import RequestForm from './RequestForm'
import Footer from './Footer'
import StaticProcess from './staticprocess'
import WorkTogether from './WorkTogether'

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
