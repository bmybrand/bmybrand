export type IndustryFeature = {
  title: string
  description: string
}

export type IndustrySliderImage = {
  alt: string
  image: string
  className?: string
  imageClassName?: string
}

export type IndustryStory = {
  title: string
  description: string
  name?: string
  role?: string
  showcaseImage?: string
  showcaseAlt?: string
  logoSrc?: string
  logoAlt?: string
  avatarSrc?: string
}

export type IndustryMetricCard = {
  number: string
  title: string
  description: string
}

export type IndustryProcessStep = {
  title: string
  description: string
}

export type IndustryAdvantageCard = {
  eyebrow: string
  title: string
  description: string
}

export type IndustryProject = {
  brand: string
  title: string
  tag: string
  href?: string
  image?: string
  imageClassName?: string
  brandLogo?: string
  brandSubtitle?: string
  logoClassName?: string
}

export type IndustryService = {
  title: string
  description: string
  items?: string[]
}

export type IndustrySpotlightItem = {
  title: string
  description: string
  name: string
  role: string
}

export type IndustryFaq = {
  question: string
  answer: string
}

export type IndustryItem = {
  slug: string
  title: string
  href: string
  description: string
  heroTitle: string
  heroDescription: string
  sliderImages: IndustrySliderImage[]
  growthTitle: string
  growthDescription: string
  capabilities: IndustryFeature[]
  metricTitle: string
  metricDescription: string
  metrics: IndustryMetricCard[]
  storiesTitle: string
  stories: IndustryStory[]
  processTitle: string
  processDescription: string
  processSteps: IndustryProcessStep[]
  processCtaTitle?: string
  processCtaButtonLabel?: string
  processTeamDescription?: string
  advantageTitle: string
  advantageCards: IndustryAdvantageCard[]
  projectTitle: string
  projectDescription: string
  projects: IndustryProject[]
  servicesTitle: string
  servicesDescription: string
  services: IndustryService[]
  spotlightTitle?: string
  spotlightDescription?: string
  spotlightItems: IndustrySpotlightItem[]
  industriesHeroTitle?: string
  faqTitle: string
  faqs: IndustryFaq[]
}
