'use client'

import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import Evaluate from '../evaluatCTA'
import Brandsspec from '../Brandsspec'
import RequestForm from '../RequestForm'
import HerobarBrand from './herobarBrand'
import BrandExperienceHero from './BrandExperienceHero'
import BrandSolutions from './BrandSolutions'
import BrandFaq from './BrandFaq'

export default function BrandExperiencePage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarBrand />
      <BrandExperienceHero />
      <BrandSolutions />
      <BrandFaq />
      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
