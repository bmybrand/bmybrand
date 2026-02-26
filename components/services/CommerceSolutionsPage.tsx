'use client'

import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import Evaluate from '../evaluatCTA'
import Brandsspec from '../Brandsspec'
import RequestForm from '../RequestForm'
import HerobarCommerce from './herobarCommerce'
import CommerceSolutionsHero from './CommerceSolutionsHero'
import CommerceSolutions from './CommerceSolutions'
import CommerceFaq from './CommerceFaq'

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
