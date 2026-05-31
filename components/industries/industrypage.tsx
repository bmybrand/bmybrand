'use client'

import type { IndustryItem } from '@/data/industries'
import Industries from './industries'

type IndustryPageProps = {
  industry: IndustryItem
}

export default function IndustryPage({ industry }: IndustryPageProps) {
  return <Industries industry={industry} />
}
