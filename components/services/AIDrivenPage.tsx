'use client'

import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import RequestForm from '../RequestForm'
import Herobarai from './herobarai'
import AIDrivenHero from './AIDrivenHero'
import AISolutions from './AISolutions'

export default function AIDrivenPage() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <Herobarai />
      <AIDrivenHero />
      <AISolutions />
      <WorkTogether />
      <RequestForm />
      <Footer />
    </div>
  )
}
