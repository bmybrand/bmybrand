'use client'

import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import Evaluate from '../evaluatcta'
import Brandsspec from '../brandsspec'
import RequestForm from '../requestform'
import HerobarOperations from './herobaroperations'
import BusinessOperationsHero from './businessoperationshero'
import OperationsSolutions from './operationssolutions'
import OperationsFaq from './operationsfaq'

export default function BusinessOperationsPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarOperations />
      <BusinessOperationsHero />
      <OperationsSolutions />
      <OperationsFaq />
      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
