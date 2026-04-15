'use client'

import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import Evaluate from '../evaluatcta'
import Brandsspec from '../brandsspec'
import RequestForm from '../requestform'
import HerobarMarketing from './herobarmarketing'
import DigitalMarketingHero from './digitalmarketinghero'
import MarketingSolutions from './marketingsolutions'
import MarketingFaq from './marketingfaq'

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
