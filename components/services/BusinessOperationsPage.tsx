'use client'

import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import RequestForm from '../RequestForm'
import HerobarOperations from './herobarOperations'
import BusinessOperationsHero from './BusinessOperationsHero'
import OperationsSolutions from './OperationsSolutions'
import OperationsFaq from './OperationsFaq'

export default function BusinessOperationsPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <HerobarOperations />
      <BusinessOperationsHero />
      <OperationsSolutions />
      <OperationsFaq />
      <WorkTogether />
      <RequestForm />
      <Footer />
    </div>
  )
}
