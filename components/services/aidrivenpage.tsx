'use client'
 
import Navbar from '../navbar'
import Footer from '../footer'
import EvaluatCTA from '../evaluatcta'
import Brandsspec from '../brandsspec'
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
      <EvaluatCTA />
      <Brandsspec />
      <Footer />
    </div>
  )
}
