'use client'

import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import Evaluate from '../evaluatcta'
import Brandsspec from '../brandsspec'
import RequestForm from '../requestform'
import HerobarBrand from './herobarbrand'
import BrandExperienceHero from './brandexperiencehero'
import BrandSolutions from './brandsolutions'
import BrandFaq from './brandfaq'

export default function BrandExperiencePage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarBrand />
      <BrandExperienceHero />
      <BrandSolutions />
      <BrandFaq />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
