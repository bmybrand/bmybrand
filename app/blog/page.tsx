import type { Metadata } from 'next'
import BlogPage from '@/components/blogpage'
import { getBlogPosts } from '@/lib/blog/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Insights & Ideas',
  description: 'Practical insights from BmyBrand on AI, branding, websites, search, and digital growth.',
}

export default async function Page() {
  const blogPosts = await getBlogPosts()
  return <BlogPage blogPosts={blogPosts} />
}
