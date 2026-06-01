'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import type { IndustryItem } from '@/data/industries'
import HealthcareAdvantage from './healthcare/healthcare-advantage'
import HealthcareFAQ from './healthcare/healthcare-faq'
import HealthcareGrowth from './healthcare/healthcare-growth'
import HealthcareHero from './healthcare/healthcare-hero'
import HealthcareLogoBelt from './healthcare/healthcare-logo-belt'
import HealthcareProcess from './healthcare/healthcare-process'
import HealthcareProjects from './healthcare/healthcare-projects'
import HealthcareServices from './healthcare/healthcare-services'
import HealthcareSlider from './healthcare/healthcare-slider'
import HealthcareSpotlight from './healthcare/healthcare-spotlight'
import HealthcareStories from './healthcare/healthcare-stories'
import IndustriesHero from './industries-hero'

type IndustriesProps = {
  industry: IndustryItem
}

export default function Industries({ industry }: IndustriesProps) {
  return (
    <div className="min-h-screen bg-[#11122F]">
      <Navbar />

      <main className="relative pt-36 pb-12 sm:pt-40 lg:pt-44">
        <section className="relative mx-auto w-full">
          <HealthcareHero title={industry.heroTitle} description={industry.heroDescription} />
          <HealthcareLogoBelt />
          <HealthcareSlider slides={industry.sliderImages} />
          <HealthcareGrowth
            title={industry.growthTitle}
            description={industry.growthDescription}
            capabilities={industry.capabilities}
            metricTitle={industry.metricTitle}
            metricDescription={industry.metricDescription}
            metrics={industry.metrics}
          />
          <HealthcareStories
            title={industry.storiesTitle}
            stories={industry.stories}
          />
          <HealthcareProcess
            title={industry.processTitle}
            description={industry.processDescription}
            steps={industry.processSteps}
            ctaTitle={industry.processCtaTitle ?? `Your ${industry.title} Growth Partner Starts Here.`}
            ctaButtonLabel={industry.processCtaButtonLabel ?? `Start Your ${industry.title} Project`}
            teamDescription={industry.processTeamDescription ?? `A team of 50+ specialists in ${industry.title.toLowerCase()} strategy, design, development, and growth.`}
          />
          <HealthcareProjects
            title={industry.projectTitle}
            description={industry.projectDescription}
            projects={industry.projects}
          />
          <HealthcareServices
            title={industry.servicesTitle}
            description={industry.servicesDescription}
            services={industry.services}
          />
          <HealthcareAdvantage
            title={industry.advantageTitle}
            cards={industry.advantageCards}
          />
          <HealthcareSpotlight
            title={industry.spotlightTitle}
            description={industry.spotlightDescription}
            items={industry.spotlightItems}
          />
          <IndustriesHero title={industry.industriesHeroTitle} />
          <HealthcareFAQ title={industry.faqTitle} faqs={industry.faqs} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
