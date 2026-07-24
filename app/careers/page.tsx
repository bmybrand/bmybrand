import type { Metadata } from 'next'
import CareerPage from '@/components/careerpage'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore career paths and opportunities to create meaningful digital work with BmyBrand.',
}

export default function Page() {
  return <CareerPage />
}
