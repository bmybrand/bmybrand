'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HealthcareGrowth from './healthcare/healthcare-growth'
import HealthcareHero from './healthcare/healthcare-hero'
import HealthcareLogoBelt from './healthcare/healthcare-logo-belt'
import HealthcareProcess from './healthcare/healthcare-process'
import HealthcareProjects from './healthcare/healthcare-projects'
import HealthcareServices from './healthcare/healthcare-services'
import HealthcareSlider from './healthcare/healthcare-slider'
import HealthcareStories from './healthcare/healthcare-stories'

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-[#11122F]">
      <Navbar />

      <main className="relative pt-36 pb-12 sm:pt-40 lg:pt-44 ">
        <section className="relative mx-auto w-full">
          <HealthcareHero />
          <HealthcareLogoBelt />
          <HealthcareSlider />
          <HealthcareGrowth />
          <HealthcareStories />
          <HealthcareProjects />
          <HealthcareProcess />
          <HealthcareServices />
        </section>
      </main>

      <Footer />
    </div>
  )
}
