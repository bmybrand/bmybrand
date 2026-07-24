import 'server-only'

import { cache } from 'react'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { BlogArticle, BlogArticleSection, BlogPostSummary } from './types'

type BlogArticleRow = {
  slug: string
  title: string
  excerpt: string
  category: string
  published_on: string
  updated_on: string | null
  read_time: string
  author: string
  hero_image: string
  accent: string
  display_number: string
  tags: unknown
  highlights: unknown
  introduction: unknown
  sections: unknown
  conclusion: unknown
  closing_images: unknown
  faqs: unknown
}

const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${value}T00:00:00Z`))

const toArticle = (row: BlogArticleRow): BlogArticle => ({
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  category: row.category,
  publishedAt: formatDate(row.published_on),
  updatedAt: formatDate(row.updated_on ?? row.published_on),
  readTime: row.read_time,
  author: row.author,
  heroImage: row.hero_image,
  tags: row.tags as string[],
  highlights: row.highlights as string[],
  introduction: row.introduction as string[],
  sections: row.sections as BlogArticleSection[],
  conclusion: row.conclusion as string | string[],
  closingImages: row.closing_images as BlogArticle['closingImages'],
  faqs: row.faqs as BlogArticle['faqs'],
})

export const getBlogArticle = cache(async (slug: string): Promise<BlogArticle | null> => {
  const { data, error } = await supabaseAdmin
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) throw new Error(`Unable to load blog article: ${error.message}`)
  return data ? toArticle(data as BlogArticleRow) : null
})

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabaseAdmin
    .from('blog_articles')
    .select('slug, category, title, excerpt, published_on, read_time, hero_image, accent, display_number')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Unable to load blog posts: ${error.message}`)

  return (data ?? []).map((row) => ({
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: formatDate(row.published_on),
    readTime: row.read_time,
    heroImage: row.hero_image,
    accent: row.accent,
    number: row.display_number,
  }))
}
