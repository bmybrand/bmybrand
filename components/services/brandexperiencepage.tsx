'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../navbar'
import HerobarBrand from './herobarbrand'
import BrandExperienceHero from './brandexperiencehero'
import BrandSolutions from './brandsolutions'
const BrandFaq = dynamic(() => import('./brandfaq'))
const Evaluate = dynamic(() => import('../evaluatcta'))
const Brandsspec = dynamic(() => import('../brandsspec'))
const RequestForm = dynamic(() => import('../requestform'))
const Footer = dynamic(() => import('../footer'))

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
