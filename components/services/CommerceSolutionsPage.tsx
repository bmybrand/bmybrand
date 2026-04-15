'use client'

import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import Evaluate from '../evaluatcta'
import Brandsspec from '../brandsspec'
import RequestForm from '../requestform'
import HerobarCommerce from './herobarcommerce'
import CommerceSolutionsHero from './commercesolutionshero'
import CommerceSolutions from './commercesolutions'
import CommerceFaq from './commercefaq'

export default function CommerceSolutionsPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarCommerce />
      <CommerceSolutionsHero />
      <CommerceSolutions />
      <CommerceFaq />
      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
