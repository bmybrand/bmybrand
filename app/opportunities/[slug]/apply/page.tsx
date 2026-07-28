import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import JobApplicationForm from '@/components/job-application-form'
import { getCareerOpening } from '@/lib/careers/queries'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getCareerOpening((await params).slug)
  if (!job) return {}
  return {
    title: `Apply for ${job.title}`,
    description: `Submit your application for the ${job.title} opportunity at BmyBrand.`,
  }
}

export default async function ApplyPage({ params }: Props) {
  const job = await getCareerOpening((await params).slug)
  if (!job) notFound()

  return (
    <div className="min-h-screen overflow-hidden bg-[#11122F] text-white">
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <JobApplicationForm job={job} />
      </main>
      <Footer />
    </div>
  )
}
