import Image from 'next/image'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import BlogFaqs from './blog-faqs'
import BlogJumpNav from './blog-jump-nav'
import type { BlogArticle } from '@/lib/blog/types'

type Props = { article: BlogArticle }

function sanitizeBlogHtml(html: string) {
  return html
    .replace(/<\s*(script|iframe|object|embed|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<\s*(link|meta|base)[^>]*\/?\s*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '')
}

type JumpLink = { id: string; title: string }

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/gi, 'and')
    .replace(/&nbsp;/gi, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function prepareRichTextHtml(html: string, usedIds: Set<string>) {
  const headings: JumpLink[] = []
  const preparedHtml = sanitizeBlogHtml(html).replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (fullHeading, attributes: string, content: string) => {
      const title = content
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/gi, '&')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      if (!title) return fullHeading

      const baseId = headingId(title) || 'article-heading'
      let id = baseId
      let duplicate = 2
      while (usedIds.has(id)) {
        id = `${baseId}-${duplicate}`
        duplicate += 1
      }
      usedIds.add(id)

      const safeAttributes = attributes.replace(/\s+id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      headings.push({ id, title })
      return `<h2${safeAttributes} id="${id}">${content}</h2>`
    },
  )

  return { html: preparedHtml, headings }
}

export default function BlogDetailPage({ article }: Props) {
  const tags = article.tags ?? [article.category]
  const closingImages = article.closingImages ?? [
    { src: article.heroImage, alt: article.title },
    { src: article.sections.find((section) => section.image)?.image ?? article.heroImage, alt: '' },
  ]
  const usedJumpIds = new Set(['key-highlights', 'conclusion', 'frequently-asked-questions'])
  const jumpLinks: JumpLink[] = []
  const preparedBlockHtml = new Map<string, string>()
  const preparedSectionHtml = new Map<number, string>()

  article.sections.forEach((section, sectionIndex) => {
    if (!section.hideFromJump && section.title) {
      usedJumpIds.add(section.id)
      jumpLinks.push({ id: section.id, title: section.title })
    }

    section.blocks?.forEach((block, blockIndex) => {
      if ((block.type === 'richtext' || block.type === 'html') && block.html) {
        const prepared = prepareRichTextHtml(block.html, usedJumpIds)
        preparedBlockHtml.set(`${sectionIndex}:${blockIndex}`, prepared.html)
        jumpLinks.push(...prepared.headings)
      }
    })

    if (section.html) {
      const prepared = prepareRichTextHtml(section.html, usedJumpIds)
      preparedSectionHtml.set(sectionIndex, prepared.html)
      jumpLinks.push(...prepared.headings)
    }
  })

  return (
    <div className="min-h-screen bg-[#11122F] text-white">
      <Navbar />
      <main className="pb-28 pt-48 lg:pb-40 lg:pt-64">
        <header className="mx-auto w-[90%] max-w-[1322px]">
          <div className="max-w-[1040px]">
            <div className="mb-5 flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.07] px-5 py-2 text-xs text-white/60">{tag}</span>)}
            </div>
            <h1 className="BenzinSemibold max-w-[1020px] text-[clamp(2.2rem,3.2vw,3.8rem)] leading-[1.12] tracking-[-0.035em]">{article.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span>Posted By: <span className="text-white">{article.author}</span></span><span className="text-[#F45B25]">•</span><span>Created on: {article.publishedAt}</span><span className="text-[#F45B25]">•</span><span>Last updated: {article.updatedAt ?? article.publishedAt}</span>
            </div>
          </div>
          <div className="relative mt-14 aspect-[1322/825] overflow-hidden rounded-[1.75rem] bg-[#090A22]">
            <Image src={article.heroImage} alt={article.title} fill priority className="object-cover" sizes="(max-width:1536px) 90vw, 1322px" />
          </div>
        </header>

        <div className="mx-auto mt-24 grid w-[90%] max-w-[1322px] gap-12 lg:grid-cols-[minmax(0,872px)_minmax(300px,398px)] lg:items-start lg:gap-[52px]">
          <article className="min-w-0">
            <section id="key-highlights" className="scroll-mt-32 rounded-[1.25rem] border border-white/10 bg-[#1A1B3B] px-7 py-7 sm:px-9">
              <h2 className="BenzinSemibold mb-5 flex items-center gap-3 text-2xl"><Sparkles className="h-6 w-6 fill-[#F45B25] text-[#F45B25]" />Key Highlights</h2>
              <ul className="divide-y divide-white/10">
                {article.highlights.map((highlight) => <li key={highlight} className="flex gap-3 py-4 text-sm leading-6 text-white/65 sm:text-base"><Check className="mt-1 h-4 w-4 shrink-0 text-[#F45B25]" />{highlight}</li>)}
              </ul>
            </section>

            <div className="mt-10 space-y-4 text-base leading-7 text-white/65">
              {(article.introduction ?? [article.excerpt]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="mt-12">
              {article.sections.map((section, sectionIndex) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-32 border-b border-white/10 pb-12 sm:mb-16 sm:pb-16">
                  {!section.hideTitle && <h2 className="BenzinSemibold mb-5 text-[clamp(1.65rem,2vw,2.15rem)] leading-[1.15]">{section.title}</h2>}
                  {section.blocks && <div className="grid grid-cols-12 items-start gap-4">
                  {section.blocks.map((block, blockIndex) => {
                    const columns = Math.min(12, Math.max(1, Math.round(block.columns ?? ((block.width ?? 100) / 100) * 12)))
                    const gridStyle = { gridColumn: block.rowStart ? `1 / span ${columns}` : `span ${columns} / span ${columns}` }
                    if (block.type === 'heading') {
                      return block.level === 3
                        ? <h3 key={blockIndex} style={gridStyle} className="BenzinSemibold mb-4 mt-8 text-xl leading-snug text-white">{block.text}</h3>
                        : <h2 key={blockIndex} style={gridStyle} className="BenzinSemibold mb-5 mt-10 text-[clamp(1.65rem,2vw,2.15rem)] leading-[1.15] first:mt-0">{block.text}</h2>
                    }
                    if (block.type === 'paragraph') {
                      return <p key={blockIndex} style={gridStyle} className="mb-4 text-base leading-7 text-white/62">{block.text}</p>
                    }
                    if (block.type === 'points') {
                      return (
                        <ul key={blockIndex} style={gridStyle} className="my-6 space-y-3">
                          {block.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/65 sm:text-base"><Check className="mt-1 h-4 w-4 shrink-0 text-[#F45B25]" />{item}</li>)}
                        </ul>
                      )
                    }
                    if (block.type === 'image') {
                      return (
                        <div
                          key={blockIndex}
                          className="relative my-8 aspect-[1.95/1] max-w-full overflow-hidden rounded-2xl bg-[#090A22]"
                          style={gridStyle}
                        >
                          {block.image && <Image src={block.image} alt={block.alt} fill className="object-cover" sizes="(max-width:1024px) 90vw, 872px" />}
                        </div>
                      )
                    }
                    if (block.type === 'banner') {
                      return (
                        <div key={blockIndex} style={gridStyle} className="relative my-8 min-h-72 overflow-hidden rounded-2xl bg-[#090A22]">
                          {block.image && <Image src={block.image} alt={block.alt} fill className="object-cover" sizes="(max-width:1024px) 90vw, 872px" />}
                          {(block.heading || block.text) && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-7 pt-20"><h3 className="BenzinSemibold text-2xl">{block.heading}</h3>{block.text && <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">{block.text}</p>}</div>}
                        </div>
                      )
                    }
                    return (
                      <div
                        key={blockIndex}
                        style={gridStyle}
                        className="blog-rich-text my-6"
                        dangerouslySetInnerHTML={{
                          __html: preparedBlockHtml.get(`${sectionIndex}:${blockIndex}`) ?? sanitizeBlogHtml(block.html),
                        }}
                      />
                    )
                  })}
                  </div>}
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-base leading-7 text-white/62">{paragraph}</p>)}
                  {section.bullets && (
                    <div className="mt-8">
                      {section.bulletsTitle && <h3 className="BenzinSemibold mb-3 text-xl text-white">{section.bulletsTitle}</h3>}
                      <ul className="space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-white/65 sm:text-base"><Check className="mt-1 h-4 w-4 shrink-0 text-[#F45B25]" />{bullet}</li>)}</ul>
                    </div>
                  )}
                  {section.items && (
                    <div className="mt-8">
                      {section.itemsTitle && <h3 className="BenzinSemibold mb-2 text-xl leading-snug text-white">{section.itemsTitle}</h3>}
                      {section.itemsDescription && <p className="mb-4 text-sm leading-6 text-white/55">{section.itemsDescription}</p>}
                      {section.items.map((item) => (
                        <div key={`${item.title}-${item.description}`} className={`py-4 first:pt-1 ${section.divideItems ? 'border-b border-white/10' : ''}`}>
                          <h3 className="BenzinSemibold text-[18px] leading-snug text-white">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/55">{item.description}</p>
                          {item.bullets && (
                            <ul className="mt-3 space-y-2.5">
                              {item.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-2.5 text-sm leading-6 text-white/60">
                                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#F45B25]" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {section.images && <div className="mt-8 grid gap-5 sm:grid-cols-2">{section.images.map((image) => <div key={image.src} className="relative aspect-[1.48/1] overflow-hidden rounded-2xl bg-[#090A22]"><Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width:640px) 90vw, 425px" /></div>)}</div>}
                  {section.image && <div className="relative mt-8 aspect-[1.95/1] overflow-hidden rounded-2xl bg-[#090A22]"><Image src={section.image} alt={section.imageAlt || ''} fill className="object-cover" sizes="(max-width:1024px) 90vw, 872px" /></div>}
                  {section.html && (
                    <div
                      className="mt-8 text-base leading-7 text-white/65 [&_a]:text-[#F45B25] [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-[#F45B25] [&_blockquote]:pl-5 [&_div]:my-4 [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:mb-2 [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:mb-4 [&_strong]:text-white [&_ul]:ml-6 [&_ul]:list-disc"
                      dangerouslySetInnerHTML={{ __html: preparedSectionHtml.get(sectionIndex) ?? sanitizeBlogHtml(section.html) }}
                    />
                  )}
                </section>
              ))}
            </div>

            <section id="conclusion" className="scroll-mt-32 rounded-xl border border-[#F45B25] bg-[#F45B25]/10 p-7 sm:p-9">
              <h2 className="BenzinSemibold mb-5 flex items-center gap-3 text-2xl"><Sparkles className="h-6 w-6 fill-[#F45B25] text-[#F45B25]" />Conclusion</h2>
              <div className="space-y-4 text-base leading-7 text-white/70">
                {Array.isArray(article.conclusion)
                  ? article.conclusion.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  : <p className="whitespace-pre-line">{article.conclusion}</p>}
              </div>
            </section>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {closingImages.slice(0, 2).map((image, index) => <div key={`${image.src}-${index}`} className="relative aspect-[1.05/1] overflow-hidden rounded-2xl bg-[#090A22]"><Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width:640px) 90vw, 425px" /></div>)}
            </div>

            <BlogFaqs faqs={article.faqs} />

          </article>

          <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <div className="rounded-[1.25rem] border border-white/10 bg-[#1A1B3B] p-6">
              <p className="BenzinSemibold mb-5 text-xl">Jump To:</p>
              <BlogJumpNav sections={jumpLinks} />
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#1A1B3B]">
              <div className="relative aspect-[1.35/1] bg-[#F45B25]"><Image src="/bmyb-navbar-services-01.webp" alt="BmyBrand website design services" fill className="object-cover" sizes="398px" /></div>
              <div className="p-7">
                <span className="inline-flex rounded-full border border-[#F45B25] px-4 py-2 text-sm text-[#F45B25]">Website Design Service</span>
                <h2 className="BenzinSemibold mt-6 text-2xl leading-tight">Want More Leads, Sales &amp; Growth From Your Website?</h2>
                <p className="mt-5 text-sm leading-6 text-white/60">Book a free consultation to review your website and get expert recommendations tailored to your business.</p>
                <Link href="/strategy-call" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#F45B25] px-5 py-4 font-semibold text-white">Free Strategy Call</Link>
              </div>
            </div>
          </aside>
        </div>

      </main>
      <Footer />
    </div>
  )
}
