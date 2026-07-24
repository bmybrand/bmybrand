'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'

type SectionLink = { id: string; title: string }

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
      const readingLine = 180
      let currentId = links[0].id

      for (const link of links) {
        const element = document.getElementById(link.id)
        if (element && element.getBoundingClientRect().top <= readingLine) currentId = link.id
        else if (element) break
      }

      setActiveId(currentId)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
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
              const target = document.getElementById(link.id)
              if (!target) return

              setActiveId(link.id)
              target.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
