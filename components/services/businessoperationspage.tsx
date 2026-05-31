'use client'

import { businessOperationsServiceData } from '@/data/service-pages/business-operations'
import SharedServicePage from './sharedservicepage'

export default function BusinessOperationsPage() {
  return <SharedServicePage data={businessOperationsServiceData} />
}
