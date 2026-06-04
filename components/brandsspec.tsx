'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

type Review = {
  name: string
  title: string
  company?: string
  testimonial: string
}

const reviewsRow1: Review[] = [
  {
    name: 'Daniel Reeves',
    title: 'Client',
    testimonial:
      'BmyBrand built our website perfectly, with a smooth experience, great design, and everything works exactly how our business needed it.',
  },
  {
    name: 'Hannah Brooks',
    title: 'Client',
    testimonial:
      'The AI automation solution saved us so much time, improved workflow, and made daily operations much more efficient overall.',
  },
  {
    name: 'Mark Bennett',
    title: 'Client',
    testimonial:
      'Their digital marketing team helped increase our traffic significantly, and we started getting real leads within a few weeks.',
  },
  {
    name: 'Laura Mitchell',
    title: 'Client',
    testimonial:
      'We got a complete e-commerce store, and it works flawlessly, with easy checkout and excellent user experience for customers.',
  },
  {
    name: 'Jason Clarke',
    title: 'Client',
    testimonial:
      'Branding work was outstanding; they understood our vision clearly and created a strong identity that truly represents our business.',
  },
]

const reviewsRow2: Review[] = [
  {
    name: 'Emily Harper',
    title: 'Client',
    testimonial:
      'Software development was smooth, professional, and exactly tailored to our needs, making our internal system much easier to manage.',
  },
  {
    name: 'Kevin Lawson',
    title: 'Client',
    testimonial:
      'Business operations became far more organized after their automation setup, reducing manual work and improving overall productivity.',
  },
  {
    name: 'Megan Foster',
    title: 'Client',
    testimonial:
      'The team was very responsive, listened carefully, and delivered a solution that matched exactly what we were looking for.',
  },
  {
    name: 'Andrew Cole',
    title: 'Client',
    testimonial:
      'Our online presence improved massively after their marketing strategy, and engagement across platforms has grown consistently every month.',
  },
  {
    name: 'Rachel Turner',
    title: 'Client',
    testimonial:
      'From start to finish, everything felt professional, simple, and result-driven, making the whole experience very easy and stress-free.',
  },
]

const ITEM_CLASS =
  'w-[480px] h-[220px] bg-white/10 backdrop-blur-md text-white px-6 py-5 rounded-xl shadow-md flex flex-col gap-3 overflow-hidden'

export default function Brandsspec() {
  const row1Ref = useRef<HTMLDivElement | null>(null)
  const row2Ref = useRef<HTMLDivElement | null>(null)
  const anims = useRef<gsap.core.Tween[]>([])

  const makeBlock = (row: HTMLDivElement, items: Review[]) => {
    const block = document.createElement('div')
    block.style.display = 'flex'
    block.style.gap = getComputedStyle(row).gap || '0px'
    block.style.flex = 'none'

    items.forEach((review) => {
      const it = document.createElement('div')
      it.className = ITEM_CLASS

      const header = document.createElement('div')
      header.className = 'flex items-center gap-3'

      const initials = review.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase() || '')
        .slice(0, 2)
        .join('')

      const avatar = document.createElement('div')
      avatar.className =
        'h-14 w-14 rounded-full bg-[#F45B25]/20 text-[#F45B25] flex items-center justify-center text-lg font-semibold flex-none'
      avatar.textContent = initials || 'U'

      const meta = document.createElement('div')
      meta.className = 'flex flex-col gap-1'

      const name = document.createElement('div')
      name.className = 'text-[20px] font-semibold BenzinSemibold'
      name.textContent = review.name

      const role = document.createElement('div')
      role.className = 'text-[15px] text-white/70'
      role.textContent = review.company ? `${review.title} - ${review.company}` : review.title

      meta.appendChild(name)
      meta.appendChild(role)
      header.appendChild(avatar)
      header.appendChild(meta)

      const icon = document.createElement('img')
      icon.src = '/bmyb-global-quote-01.svg'
      icon.alt = ''
      icon.className = 'ml-auto w-12'
      header.appendChild(icon)

      const quote = document.createElement('p')
      quote.className = 'mt-2 text-[16px] leading-6 text-white/80'
      quote.textContent = review.testimonial

      it.appendChild(header)
      it.appendChild(quote)
      block.appendChild(it)
    })

    return block
  }

  const makeSpacer = (gapPx: number) => {
    const sp = document.createElement('div')
    sp.style.width = `${gapPx}px`
    sp.style.flex = 'none'
    return sp
  }

  const buildTrackWithBlocks = (row: HTMLDivElement, items: Review[], nBlocks: number, gapPx: number) => {
    row.innerHTML = ''
    const track = document.createElement('div')
    track.style.display = 'flex'
    track.style.width = 'max-content'
    track.style.alignItems = 'center'
    track.style.willChange = 'transform'

    for (let i = 0; i < nBlocks; i++) {
      track.appendChild(makeBlock(row, items))
      if (i < nBlocks - 1) track.appendChild(makeSpacer(gapPx))
    }

    row.appendChild(track)
    return track
  }

  const setup = (
    rowRef: React.RefObject<HTMLDivElement | null>,
    items: Review[],
    duration: number,
    moveRight: boolean
  ) => {
    if (!rowRef.current) return
    const row = rowRef.current

    row.innerHTML = ''
    const measuringTrack = document.createElement('div')
    measuringTrack.style.display = 'flex'
    measuringTrack.style.width = 'max-content'

    const blockA = makeBlock(row, items)
    const blockB = makeBlock(row, items)
    const gapStr = getComputedStyle(row).gap || '0px'
    const gapPx = parseFloat(gapStr) || 0

    measuringTrack.appendChild(blockA)
    measuringTrack.appendChild(makeSpacer(gapPx))
    measuringTrack.appendChild(blockB)
    row.appendChild(measuringTrack)

    requestAnimationFrame(() => {
      const measuredBlock = measuringTrack.children[0] as HTMLElement
      const blockWidth = measuredBlock.scrollWidth
      const blockWidthWithGap = blockWidth + gapPx
      const containerWidth = row.parentElement?.offsetWidth || window.innerWidth

      if (!blockWidthWithGap || blockWidthWithGap <= 0) {
        const fallback = buildTrackWithBlocks(row, items, 2, gapPx)
        gsap.set(fallback, { x: 0 })
        const t = gsap.to(fallback, {
          x: moveRight ? '+=1' : '-=1',
          duration,
          ease: 'linear',
          repeat: -1,
        })
        anims.current.push(t)
        return
      }

      const needed = Math.max(2, Math.ceil((containerWidth + blockWidthWithGap) / blockWidthWithGap))
      const track = buildTrackWithBlocks(row, items, needed, gapPx)
      const wrap = gsap.utils.wrap

      gsap.set(track, { x: 0 })

      if (moveRight) {
        const tween = gsap.to(track, {
          x: `+=${blockWidthWithGap}`,
          duration,
          ease: 'linear',
          repeat: -1,
          modifiers: {
            x: (x) => {
              const n = parseFloat(x)
              return wrap(-blockWidthWithGap, 0, n) + 'px'
            },
          },
        })
        anims.current.push(tween)
      } else {
        const tween = gsap.to(track, {
          x: `-=${blockWidthWithGap}`,
          duration,
          ease: 'linear',
          repeat: -1,
          modifiers: {
            x: (x) => {
              const n = parseFloat(x)
              return wrap(-blockWidthWithGap, 0, n) + 'px'
            },
          },
        })
        anims.current.push(tween)
      }
    })
  }

  useLayoutEffect(() => {
    setup(row1Ref, reviewsRow1, 28, true)
    setup(row2Ref, reviewsRow2, 32, false)

    const onResize = () => {
      anims.current.forEach((a) => a.kill())
      anims.current = []
      setup(row1Ref, reviewsRow1, 28, true)
      setup(row2Ref, reviewsRow2, 32, false)
    }

    window.addEventListener('resize', onResize)
    return () => {
      anims.current.forEach((a) => a.kill())
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center gap-8 py-20 bg-[#11122F]">
      <div className="text-center w-[90%] mx-auto px-6">
        <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] BenzinSemibold mb-6">
          What People Say <span className="text-[#F45B25]">About BmyBrand</span>
        </h1>
        <p className="text-[#ADAECC] text-sm sm:text-base max-w-2xl mx-auto">
          Our clients share their real experiences working with us, highlighting trust, results, and long-term collaboration.
        </p>
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#11122F] via-[#11122F]/90 to-transparent sm:w-14 md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#11122F] via-[#11122F]/90 to-transparent sm:w-14 md:w-20" />
        <div ref={row1Ref} className="flex gap-4 md:gap-5" />
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#11122F] via-[#11122F]/90 to-transparent sm:w-14 md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#11122F] via-[#11122F]/90 to-transparent sm:w-14 md:w-20" />
        <div ref={row2Ref} className="flex gap-4 md:gap-5" />
      </div>
    </div>
  )
}
