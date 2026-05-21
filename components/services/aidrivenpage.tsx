'use client'

import { aiDrivenServiceData } from '@/data/service-pages/ai-driven'
import SharedServicePage from './sharedservicepage'

export default function AIDrivenPage() {
  return <SharedServicePage data={aiDrivenServiceData} />
}
