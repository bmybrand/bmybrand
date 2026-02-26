'use client'

import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import Evaluate from '../evaluatCTA'
import Brandsspec from '../Brandsspec'
import RequestForm from '../RequestForm'
import HerobarMarketing from './herobarMarketing'
import DigitalMarketingHero from './DigitalMarketingHero'
import MarketingSolutions from './MarketingSolutions'
import MarketingFaq from './MarketingFaq'

export default function DigitalMarketingPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarMarketing />
      <DigitalMarketingHero />
      <MarketingSolutions />
      <MarketingFaq />
      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
