import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OpportunityDetailPage from '@/components/opportunity-detail-page'
import { getCareerOpening, getCareerOpenings } from '@/lib/careers/queries'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getCareerOpening((await params).slug)
  if (!job) return {}
  return { title: job.title, description: job.summary }
}

export default async function OpportunityPage({ params }: Props) {
  const slug = (await params).slug
  const [job, jobs] = await Promise.all([getCareerOpening(slug), getCareerOpenings()])
  if (!job) notFound()

  const similarJobs = jobs
    .filter((item) => item.slug !== job.slug)
    .sort((a, b) => Number(b.department === job.department) - Number(a.department === job.department))
    .slice(0, 3)

  return <OpportunityDetailPage job={job} similarJobs={similarJobs} />
}
