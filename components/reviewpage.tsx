'use client'

import React, { useRef } from 'react'
import Navbar from './Navbar'
import RequestForm from './RequestForm'
import Footer from './Footer'
import WorkTogether from './WorkTogether'
import Herobarreview from './herobarreview'
import VerticalReviewColumns from './VerticalReviewColumns'

const Aboutpage = () => {
  const designedGrowRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobarreview />
      <VerticalReviewColumns />
      <WorkTogether />
      <RequestForm />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}

export default Aboutpage
