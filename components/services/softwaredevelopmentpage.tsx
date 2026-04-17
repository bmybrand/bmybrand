'use client'

import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import Evaluate from '../evaluatcta'
import Brandsspec from '../brandsspec'
import RequestForm from '../requestform'
import HerobarSoftware from './herobarsoftware'
import SoftwareDevelopmentHero from './softwaredevelopmenthero'
import SoftwareSolutions from './softwaresolutions'
import SoftwareFaq from './softwarefaq'

export default function SoftwareDevelopmentPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarSoftware />
      <SoftwareDevelopmentHero />
      <SoftwareSolutions />
      <SoftwareFaq />
      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
