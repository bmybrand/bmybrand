'use client'

import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import WorkTogether from '../worktogether'
import RequestForm from '../requestform'
import AIDrivenHero from './aidrivenhero'
import AISolutions from './aisolutions'
import AIFaq from './aifaq'

export default function AIDrivenPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <AIDrivenHero />
      <AISolutions />
      <AIFaq />
      <WorkTogether />
      <RequestForm />
      <Footer />
    </div>
  )
}
