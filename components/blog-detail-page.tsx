import Image from 'next/image'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import BlogFaqs from './blog-faqs'
import BlogJumpNav from './blog-jump-nav'
import type { BlogArticle } from '@/lib/blog/types'

type Props = { article: BlogArticle }

export default function BlogDetailPage({ article }: Props) {
  const tags = article.tags ?? [article.category]
  const closingImages = article.closingImages ?? [
    { src: article.heroImage, alt: article.title },
    { src: article.sections.find((section) => section.image)?.image ?? article.heroImage, alt: '' },
  ]

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
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-32 border-b border-white/10 pb-12 sm:mb-16 sm:pb-16">
                  <h2 className="BenzinSemibold mb-5 text-[clamp(1.65rem,2vw,2.15rem)] leading-[1.15]">{section.title}</h2>
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
                </section>
              ))}
            </div>

            <section id="conclusion" className="scroll-mt-32 rounded-xl border border-[#F45B25] bg-[#F45B25]/10 p-7 sm:p-9">
              <h2 className="BenzinSemibold mb-5 flex items-center gap-3 text-2xl"><Sparkles className="h-6 w-6 fill-[#F45B25] text-[#F45B25]" />Conclusion</h2>
              <div className="space-y-4 text-base leading-7 text-white/70">
                {(Array.isArray(article.conclusion) ? article.conclusion : [article.conclusion]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
              <BlogJumpNav sections={article.sections.map(({ id, title }) => ({ id, title }))} />
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
