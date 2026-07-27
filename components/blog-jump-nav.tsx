'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'

type SectionLink = { id: string; title: string }

function anchorOffset() {
  const fixedHeader = document.querySelector<HTMLElement>('header.fixed')
  return Math.ceil(fixedHeader?.getBoundingClientRect().bottom ?? 104) + 24
}

function scrollToAnchor(id: string, behavior: ScrollBehavior) {
  const target = document.getElementById(id)
  if (!target) return false

  const top = target.getBoundingClientRect().top + window.scrollY - anchorOffset()
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export default function BlogJumpNav({ sections }: { sections: SectionLink[] }) {
  const links = useMemo(() => [
    { id: 'key-highlights', title: 'Key Highlights' },
    ...sections,
    { id: 'conclusion', title: 'Conclusion' },
    { id: 'frequently-asked-questions', title: 'Frequently Asked Questions' },
  ], [sections])
  const [activeId, setActiveId] = useState('key-highlights')

  useEffect(() => {
    const updateActiveSection = () => {
      const readingLine = anchorOffset() + 4
      let currentId = links[0].id

      for (const link of links) {
        const element = document.getElementById(link.id)
        if (element && element.getBoundingClientRect().top <= readingLine) currentId = link.id
        else if (element) break
      }

      setActiveId(currentId)
    }

    const alignHashTarget = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1))
      if (!hashId || !links.some((link) => link.id === hashId)) return

      setActiveId(hashId)
      window.requestAnimationFrame(() => {
        scrollToAnchor(hashId, 'auto')
      })
    }

    updateActiveSection()
    alignHashTarget()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('hashchange', alignHashTarget)
    window.addEventListener('popstate', alignHashTarget)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('hashchange', alignHashTarget)
      window.removeEventListener('popstate', alignHashTarget)
    }
  }, [links])

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const isActive = activeId === link.id

        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => {
              event.preventDefault()
              if (!scrollToAnchor(link.id, 'smooth')) return

              setActiveId(link.id)
              window.history.pushState(null, '', `#${link.id}`)
            }}
            className={`rounded-lg px-2 py-2.5 text-[16px] leading-5 transition hover:bg-white/[0.05] hover:text-white ${isActive ? 'flex gap-3 text-[#F45B25]' : 'block text-white/60'}`}
            aria-current={isActive ? 'location' : undefined}
          >
            {isActive && <ArrowRight className="h-4 w-4 shrink-0" />}
            {link.title}
          </a>
        )
      })}
    </nav>
  )
}
