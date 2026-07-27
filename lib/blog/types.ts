export type BlogContentBlock = (
  | { type: 'richtext'; html: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'paragraph'; text: string }
  | { type: 'points'; items: string[] }
  | { type: 'image'; image: string; alt: string }
  | { type: 'banner'; image: string; alt: string; heading?: string; text?: string }
  | { type: 'html'; html: string }
) & { columns?: number; width?: number; rowStart?: boolean }

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
  html?: string
  hideTitle?: boolean
  hideFromJump?: boolean
  blocks?: BlogContentBlock[]
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
  closingImages?: Array<{
    src: string
    alt: string
    columns?: number
    rowStart?: boolean
  }>
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
