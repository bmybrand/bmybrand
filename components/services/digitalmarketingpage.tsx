'use client'

import { digitalMarketingServiceData } from '@/data/service-pages/digital-marketing'
import SharedServicePage from './sharedservicepage'

export default function DigitalMarketingPage() {
  return <SharedServicePage data={digitalMarketingServiceData} />
}
