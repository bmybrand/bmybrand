import { educationIndustry } from './education'
import { foodIndustry } from './food'
import { healthcareIndustry } from './healthcare'
import { nonProfitIndustry } from './non-profit'
import { sportsIndustry } from './sports'
import { travelAndTourismIndustry } from './travel-and-tourism'

export { educationIndustry } from './education'
export { foodIndustry } from './food'
export { healthcareIndustry } from './healthcare'
export { nonProfitIndustry } from './non-profit'
export { sportsIndustry } from './sports'
export { travelAndTourismIndustry } from './travel-and-tourism'
export type { IndustryItem } from './types'

export const industriesData = [
  healthcareIndustry,
  foodIndustry,
  nonProfitIndustry,
  sportsIndustry,
  travelAndTourismIndustry,
  educationIndustry,
]
