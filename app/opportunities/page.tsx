import type { Metadata } from 'next'
import OpportunitiesPage from '@/components/opportunities-page'
import { getCareerOpenings } from '@/lib/careers/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Open Opportunities',
  description: 'Search current BmyBrand openings across strategy, design, growth, and technology.',
}

export default async function Page() {
  const roles = await getCareerOpenings()
  return <OpportunitiesPage roles={roles} />
}
