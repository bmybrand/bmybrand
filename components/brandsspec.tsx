'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

type Review = {
  name: string
  title: string
  company: string
  testimonial: string
}

const reviewsRow1: Review[] = [
  {
    name: 'Sarah Mitchell',
    title: 'Founder',
    company: 'Bloom Avenue',
    testimonial:
      'Our brand finally feels modern, consistent, and polished. The redesign brought clarity to our message, and customers are responding better than ever. BMYBrand exceeded every expectation.',
  },
  {
    name: 'Michael Lee',
    title: 'CEO',
    company: 'TechNova',
    testimonial:
      'Working with BMYBrand has transformed our online presence. The team is highly professional and creative, delivering results beyond what we imagined.',
  },
  {
    name: 'Ava Rodriguez',
    title: 'Marketing Lead',
    company: 'GreenLeaf Co.',
    testimonial:
      'BMYBrand’s redesign gave our brand the consistency and polish we needed. Customers notice the difference immediately.',
  },
]

const reviewsRow2: Review[] = [
  {
    name: 'James Carter',
    title: 'Head of Sales',
    company: 'BlueWave Inc.',
    testimonial:
      'Our collaboration with BMYBrand has taken our branding and digital presence to the next level. Truly outstanding work!',
  },
  {
    name: 'Olivia Bennett',
    title: 'Creative Director',
    company: 'Lumina Studios',
    testimonial:
      'BMYBrand exceeded all expectations. Their design process is thorough, creative, and results-driven.',
  },
  {
    name: 'Ethan Wilson',
    title: 'Product Manager',
    company: 'Skyline Tech',
    testimonial:
      'From strategy to design, BMYBrand delivered exceptional quality. Our brand now feels modern, cohesive, and trustworthy.',
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
      role.textContent = `${review.title} - ${review.company}`

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
    setup(row1Ref, reviewsRow1, 20, true)
    setup(row2Ref, reviewsRow2, 25, false)

    const onResize = () => {
      anims.current.forEach((a) => a.kill())
      anims.current = []
      setup(row1Ref, reviewsRow1, 20, true)
      setup(row2Ref, reviewsRow2, 25, false)
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
          Built With Care. <span className="text-[#F45B25]">Trusted By </span>Brands.
        </h1>
        <p className="text-[#ADAECC] text-sm sm:text-base max-w-2xl mx-auto">
          At BMYBrand, businesses trust us for clean design, smooth functionality, and results that help
          their brand grow. Here's what our clients are saying.
        </p>
      </div>

      <div className="relative overflow-hidden w-full">
        <div ref={row1Ref} className="flex gap-4 md:gap-5" />
      </div>

      <div className="relative overflow-hidden w-full">
        <div ref={row2Ref} className="flex gap-4 md:gap-5" />
      </div>
    </div>
  )
}
