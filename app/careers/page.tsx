import type { Metadata } from 'next'
import CareerPage from '@/components/careerpage'
import { getCareerOpenings } from '@/lib/careers/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore career paths and opportunities to create meaningful digital work with BmyBrand.',
}

export default async function Page() {
  const openRoles = await getCareerOpenings()
  return <CareerPage openRoles={openRoles} />
}
