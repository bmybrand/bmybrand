import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailPage from '@/components/blog-detail-page'
import { getBlogArticle } from '@/lib/blog/queries'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getBlogArticle((await params).slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const article = await getBlogArticle((await params).slug)
  if (!article) notFound()

  return <BlogDetailPage article={article} />
}
