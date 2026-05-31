'use client'

import { commerceSolutionsServiceData } from '@/data/service-pages/commerce-solutions'
import SharedServicePage from './sharedservicepage'

export default function CommerceSolutionsPage() {
  return <SharedServicePage data={commerceSolutionsServiceData} />
}
