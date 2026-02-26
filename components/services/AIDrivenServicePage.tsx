'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import Evaluate from '../evaluatCTA'
import Brandsspec from '../Brandsspec'
import RequestForm from '../RequestForm'

export default function AIDrivenServicePage() {
  const router = useRouter()

  return (
    <div className="bg-[#11122F]">
      <Navbar />
      
      


      <WorkTogether />
      <Evaluate />
      <Brandsspec />
      <RequestForm />
      <Footer />
    </div>
  )
}
