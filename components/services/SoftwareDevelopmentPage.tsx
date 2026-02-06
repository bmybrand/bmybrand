'use client'

import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import RequestForm from '../RequestForm'
import HerobarSoftware from './herobarSoftware'
import SoftwareDevelopmentHero from './SoftwareDevelopmentHero'
import SoftwareSolutions from './SoftwareSolutions'
import SoftwareFaq from './SoftwareFaq'

export default function SoftwareDevelopmentPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarSoftware />
      <SoftwareDevelopmentHero />
      <SoftwareSolutions />
      <SoftwareFaq />
      <WorkTogether />
      <RequestForm />
      <Footer />
    </div>
  )
}
