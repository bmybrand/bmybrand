'use client'

import React, { useRef } from 'react'
import Navbar from './navbar'
import RequestForm from './requestform'
import Footer from './footer'
import WorkTogether from './worktogether'
import Herobarreview from './herobarreview'
import VerticalReviewColumns from './verticalreviewcolumns'

const Aboutpage = () => {
  const designedGrowRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobarreview />
      <VerticalReviewColumns />
      <WorkTogether />
      <RequestForm
        title={
          <>
            <span className="text-[#F45B25]">Let&apos;s Talk</span> About Your Idea
          </>
        }
      />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}

export default Aboutpage
