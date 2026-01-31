'use client'

import React, { useRef } from 'react'
import Navbar from './Navbar'
import Herobar from './herobar'
import Brandsspec from './Brandsspec'
import RequestForm from './RequestForm'
import Footer from './Footer'
import WorkTogether from './WorkTogether'
import ServicesDetail from './ServicesDetail'
import Herobarcase from './herobarcase'
import RecentProjects from './RecentProjects'

const CaseStudiespage = () => {
  const designedGrowRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobarcase />
      <RecentProjects />
      <WorkTogether />
      
      <Brandsspec />
      <RequestForm /> 
      <Footer />
    </div>
  )
}

export default CaseStudiespage
