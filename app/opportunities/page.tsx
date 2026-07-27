import type { Metadata } from 'next'
import OpportunitiesPage from '@/components/opportunities-page'

export const metadata: Metadata = {
  title: 'Open Opportunities',
  description: 'Search current BmyBrand openings across strategy, design, growth, and technology.',
}

export default function Page() {
  return <OpportunitiesPage />
}
