'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import Evaluate from '../evaluatcta'
import Brandsspec from '../brandsspec'
import RequestForm from '../requestform'

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
