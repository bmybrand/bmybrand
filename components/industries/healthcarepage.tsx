'use client'

import IndustryPage from './industrypage'
import { healthcareIndustry } from '@/data/industries'

export default function HealthcarePage() {
  return <IndustryPage industry={healthcareIndustry} />
}
