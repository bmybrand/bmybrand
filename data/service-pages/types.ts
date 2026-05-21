export type ServiceHeroListItem = {
  title: string
}

export type ServiceOverviewItem = {
  number: string
  title: string
  desc: string
}

export type ServiceBenefitCard = {
  icon: string
  title: string
  items: string[]
}

export type ServiceProcessStep = {
  number: string
  title: string
  desc: string
}

export type ServiceFaqItem = {
  question: string
  answer: string
}

export type ServiceFaqImage = {
  src: string
  alt: string
}

export type ServicePageData = {
  slug: string
  eyebrow: string
  heroTitle: string
  heroDescription: string
  heroList: ServiceHeroListItem[]
  bannerImage: string
  bannerAlt: string
  overviewTitle: string
  overviewDescription: string
  overviewAccentTitle: string
  overviewItems: ServiceOverviewItem[]
  overviewImage: string
  overviewImageAlt: string
  benefitsTitle: string
  benefitsCards: ServiceBenefitCard[]
  processTitle: string
  processSteps: ServiceProcessStep[]
  faqTitle: string
  faqImages: ServiceFaqImage[]
  faqs: ServiceFaqItem[]
}
