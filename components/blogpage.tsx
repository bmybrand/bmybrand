'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Navbar from './navbar'
import Footer from './footer'
import type { BlogPostSummary } from '@/lib/blog/types'

const filters = [
  'All Insights',
  'AI & Automation',
  'UX/UI Strategy',
  'Branding',
  'Website Trends',
  'Marketing Growth',
  'E-Commerce Acceleration',
]

export default function BlogPage({ blogPosts }: { blogPosts: BlogPostSummary[] }) {
  const [activeFilter, setActiveFilter] = useState('All Insights')
  const knowledgePosts = blogPosts.slice(0, 8)
  const latestInsights = blogPosts.slice(8)
  const visiblePosts = activeFilter === 'All Insights'
    ? knowledgePosts
    : knowledgePosts.filter((post) => post.category === activeFilter)

  return (
    <div className="min-h-screen bg-[#11122F] text-white">
      <Navbar />
      <main className="mx-auto w-[90%] pb-24 pt-44 sm:pt-48 lg:pb-32 lg:pt-52 2xl:w-[75%]">
        <section>
          <div className="mb-8 sm:mb-10">
            <h1 className="BenzinSemibold text-[clamp(2.8rem,6vw,5.8rem)] leading-none tracking-[-0.045em]">
              Knowledge Hub
            </h1>
            <p className="BenzinRegular mt-3 text-[clamp(1.25rem,2.6vw,2.35rem)] leading-tight text-white/95">
              Insights, Innovation &amp; More
            </p>
          </div>

          <div className="mb-12 flex flex-wrap gap-2.5 sm:mb-14" role="group" aria-label="Filter insights by category">
            {filters.map((filter) => {
              const active = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-md px-4 py-2 text-[11px] font-medium transition sm:text-xs ${active ? 'bg-[#F45B25] text-white shadow-[0_8px_24px_rgba(244,91,37,.25)]' : 'bg-white/[0.07] text-white/65 hover:bg-white/[0.12] hover:text-white'}`}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
            {visiblePosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article>
                  <div className="relative aspect-[1.62/1] overflow-hidden rounded-2xl bg-[#090A22]">
                    <Image
                      src={post.heroImage}
                      alt=""
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                      sizes="(max-width: 768px) 90vw, (max-width: 1536px) 43vw, 620px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08091E]/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#F45B25] opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="BenzinRegular mt-4 max-w-[95%] text-[clamp(.95rem,1.45vw,1.2rem)] leading-[1.35] text-white transition group-hover:text-[#F45B25]">
                    {post.title}
                  </p>
                </article>
              </Link>
            ))}
          </div>

          {visiblePosts.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center text-white/55">
              More insights in this category are on the way.
            </div>
          )}
        </section>

        <section className="mt-20 border-t border-white/10 pt-20 lg:mt-28 lg:pt-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#F45B25]">Fresh thinking</p>
              <h2 className="BenzinSemibold text-3xl sm:text-5xl">Latest insights</h2>
            </div>
            <p className="hidden max-w-sm text-right text-white/50 md:block">
              No filler. Just useful perspectives shaped by the work we do every day.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestInsights.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.075] sm:p-9"
              >
                <div>
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.16em]" style={{ color: post.accent }}>{post.category}</span>
                    <span className="BenzinSemibold text-5xl text-white/[0.08]">{post.number}</span>
                  </div>
                  <h3 className="BenzinSemibold text-2xl leading-snug sm:text-3xl">{post.title}</h3>
                  <p className="mt-5 leading-7 text-white/55">{post.excerpt}</p>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-white/45">
                  <span>{post.readTime}</span>
                  <ArrowUpRight className="h-5 w-5 text-white transition group-hover:rotate-45 group-hover:text-[#F45B25]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 lg:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#F45B25] px-7 py-14 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-20">
            <div className="absolute -right-8 -top-24 BenzinBold text-[15rem] text-white/10" aria-hidden="true">B</div>
            <div className="relative max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-[0.18em] text-white/70">Have a question?</p>
              <h2 className="BenzinSemibold text-3xl leading-tight sm:text-5xl">
                Let&apos;s turn your next challenge into a useful conversation.
              </h2>
            </div>
            <Link
              href="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#181932] transition hover:-translate-y-1 lg:mt-0"
            >
              Talk to our team
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
