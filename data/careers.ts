export type CareerOpening = {
  slug: string
  title: string
  department: 'Design' | 'Technology' | 'Growth' | 'Operations'
  summary: string
  description?: string
  aboutCompany?: string
  postedOn?: string
  jobCode?: string
  responsibilities?: string[]
  requirements?: string[]
  benefits?: string[]
  disclaimer?: string
  applyUrl?: string
  location: string
  workplace: 'Remote' | 'Hybrid' | 'On-site'
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
}

// Public roles will be supplied by the careers manager/database in a later phase.
// Keeping this empty prevents placeholder vacancies from being presented as real openings.
export const openCareerRoles: CareerOpening[] = []
