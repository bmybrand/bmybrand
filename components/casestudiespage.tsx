'use client'

import React, { useRef } from 'react'
import Navbar from './navbar'
import Herobar from './herobar'
import Evaluate from './evaluatcta'
import Brandsspec from './brandsspec'
import RequestForm from './requestform'
import Footer from './footer'
import WorkTogether from './worktogether'
import ServicesDetail from './servicesdetail'
import Herobarcase from './herobarcase'
import RecentProjects from './recentprojects'

const CaseStudiespage = () => {
  const designedGrowRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobarcase />
      <RecentProjects />
      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm /> 
      <Footer />
    </div>
  )
}

export default CaseStudiespage
