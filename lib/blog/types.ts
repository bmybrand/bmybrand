export type BlogArticleSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  bulletsTitle?: string
  image?: string
  imageAlt?: string
  images?: Array<{ src: string; alt: string }>
  itemsTitle?: string
  itemsDescription?: string
  divideItems?: boolean
  items?: Array<{ title: string; description: string; bullets?: string[] }>
}

export type BlogArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  author: string
  tags?: string[]
  updatedAt?: string
  heroImage: string
  highlights: string[]
  introduction?: string[]
  sections: BlogArticleSection[]
  conclusion: string | string[]
  closingImages?: Array<{ src: string; alt: string }>
  faqs: Array<{ question: string; answer: string }>
}

export type BlogPostSummary = {
  slug: string
  category: string
  title: string
  excerpt: string
  publishedAt: string
  readTime: string
  heroImage: string
  accent: string
  number: string
}
