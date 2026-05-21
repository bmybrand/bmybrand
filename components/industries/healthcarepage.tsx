'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { healthcareIndustry } from '@/data/industries'
import HealthcareGrowth from './healthcare/healthcare-growth'
import HealthcareAdvantage from './healthcare/healthcare-advantage'
import HealthcareHero from './healthcare/healthcare-hero'
import HealthcareLogoBelt from './healthcare/healthcare-logo-belt'
import HealthcareProcess from './healthcare/healthcare-process'
import HealthcareProjects from './healthcare/healthcare-projects'
import HealthcareServices from './healthcare/healthcare-services'
import HealthcareFAQ from './healthcare/healthcare-faq'
import IndustriesHero from './industries-hero'
import HealthcareSlider from './healthcare/healthcare-slider'
import HealthcareSpotlight from './healthcare/healthcare-spotlight'
import HealthcareStories from './healthcare/healthcare-stories'

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-[#11122F]">
      <Navbar />

      <main className="relative pt-36 pb-12 sm:pt-40 lg:pt-44 ">
        <section className="relative mx-auto w-full">
          <HealthcareHero />
          <HealthcareLogoBelt />
          <HealthcareSlider slides={healthcareIndustry.sliderImages} />
          <HealthcareGrowth />
          <HealthcareStories
            title={healthcareIndustry.storiesTitle}
            stories={healthcareIndustry.stories}
          />
          <HealthcareProcess />
          <HealthcareProjects />
          <HealthcareServices />
          <HealthcareAdvantage />
          <HealthcareSpotlight />
          <IndustriesHero />
          <HealthcareFAQ />
        </section>
      </main>

      <Footer />
    </div>
  )
}
