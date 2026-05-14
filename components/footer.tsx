'use client'

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'

const subscribe = () => () => {}

const IMPORTANT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Website Audit', href: '#' },
  { label: 'Contact Us', href: '#' },
]

const SERVICE_LINKS = [
  { label: 'UI/UX Design', href: '/services/software-development' },
  { label: 'Website Development', href: '/services/software-development' },
  { label: 'Branding & Identity', href: '/services/brand-experience' },
  { label: 'AI Solutions', href: '/services/ai-driven' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Commerce Solutions', href: '/services/commerce-solutions' },
]

const REVIEW_PLATFORMS = [
  { name: 'Clutch', logo: '/bmyb-logo-clutchco-color-01.svg' },
  { name: 'Yelp', logo: '/bmyb-logo-yelp-color-01.svg' },
  { name: 'Bark', logo: '/bmyb-global-bark-color-01.svg' },
  { name: 'Upwork', logo: '/bmyb-logo-upwork-color-01.svg' },
  { name: 'Trustpilot', logo: '/bmyb-logo-trustpilot-color-01.svg' },
  { name: 'Google', logo: '/bmyb-logo-google-color-01.svg' },
]

type SocialIconProps = {
  className?: string
}

const FacebookIcon = ({ className }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.2c0-.9.2-1.5 1.5-1.5H16V5.1c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3V11H9v3h2.3v7h2.2Z" />
  </svg>
)

const InstagramIcon = ({ className }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.45 1.35a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
  </svg>
)

const LinkedInIcon = ({ className }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M6.4 8.2A1.7 1.7 0 1 1 6.4 4.8a1.7 1.7 0 0 1 0 3.4ZM5 9.8h2.8V19H5V9.8Zm4.5 0h2.7v1.3h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.6 2 3.6 4.5V19H16v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H9.5V9.8Z" />
  </svg>
)

const XIcon = ({ className }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.9 4H21l-4.6 5.3L21.8 20h-4.7l-3.7-4.9L9.1 20H7l4.9-5.6L2.8 4h4.8l3.3 4.4L14.9 4Zm-.8 14.4h1.2L6.9 5.5H5.6l12.5 12.9Z" />
  </svg>
)

const YouTubeIcon = ({ className }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5a2.9 2.9 0 0 0-2 2A30.9 30.9 0 0 0 2 12a30.9 30.9 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.9 2.9 0 0 0 2-2A30.9 30.9 0 0 0 22 12a30.9 30.9 0 0 0-.4-4.8ZM9.6 15.3V8.7l5.8 3.3-5.8 3.3Z" />
  </svg>
)

const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', Icon: FacebookIcon },
  { name: 'Instagram', href: '#', Icon: InstagramIcon },
  { name: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { name: 'Twitter', href: '#', Icon: XIcon },
  { name: 'YouTube', href: '#', Icon: YouTubeIcon },
]

const brandText = 'BMYBRAND'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const brandContainerRef = useRef<HTMLDivElement>(null)
  const [brandFontSize, setBrandFontSize] = useState(48)
  const currentYear = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => null)

  useEffect(() => {
    const container = brandContainerRef.current
    if (!container) return

    const updateFlexFont = () => {
      const width = container.offsetWidth
      const size = Math.min(340, Math.max(34, width * 0.10))
      setBrandFontSize(size)
    }

    updateFlexFont()
    const ro = new ResizeObserver(updateFlexFont)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  return (
    <footer className="relative bg-[linear-gradient(to_bottom,#1C1D3F,#1A1B38)] text-white overflow-hidden">
      <div
        className="relative z-10 max-w-none mx-auto w-[90%] lg:w-[85%] 2xl:w-[80%] py-12 lg:py-16"
        style={{
          paddingBottom: `${brandFontSize + 12 + Math.max(0, (brandFontSize - 34) * (12 / 306))}px`,
        }}
      >
        {/* Top: 5 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-12 lg:mb-16">
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Important Links</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {IMPORTANT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Services</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Specialized Industry</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {[{ label: 'Healthcare', href: '/industries/healthcare' }, { label: 'E-Commerce', href: '#' }, { label: 'SaaS & Startups', href: '#' }, { label: 'Finance & Fintech', href: '#' }, { label: 'Industrial & Engineering', href: '#' }, { label: 'NGOs & Nonprofits', href: '#' }].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Why BMYBrand</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {['Our Process', 'AI Capabilities', 'Design System Approach', 'Client Testimonials', 'FAQ', 'Get A Quote'].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Office Locations</h3>
            <div className="space-y-4 text-sm lg:text-base text-white/70">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden border border-white/20 bg-white/5">
                  <img
                    src="https://flagcdn.com/w80/us.png"
                    alt="USA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>PO BOX 605 Allen, TX 75013</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden border border-white/20 bg-white/5">
                  <img
                    src="https://flagcdn.com/w80/ca.png"
                    alt="Canada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>PO BOX 605 Allen, TX 75013</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Reviewed on platforms */}
        <div className="flex flex-wrap items-center lg:justify-between justify-center gap-6 sm:gap-4 py-8 border-y border-white/10">
          {REVIEW_PLATFORMS.map((platform) => (
            <div key={platform.name} className="flex flex-col items-center gap-2 min-w-[80px]">
              <img
                src={platform.logo}
                alt={platform.name}
                className="h-6 w-auto object-contain"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60  tracking-wider">Reviewed On</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400/90 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Subscribe + Social + Copyright + Policies */}
        <div className="py-10 space-y-6">
          <div>
            <h3 className="text-white font-semibold text-lg lg:text-xl mb-2 BenzinSemibold">Subscribe</h3>
            <p className="text-white/70 text-sm lg:text-base mb-4">
              Get Design, AI, And Growth Insights - Plus Updates
              <br />
              From BMYBrand.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <form
                className="flex flex-1 flex-col sm:flex-row gap-3 min-w-0"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="flex-1 max-w-96 px-4 py-3 rounded-lg border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F45B25] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white font-semibold hover:opacity-90 transition-colors shrink-0 BenzinSemibold"
                >
                  Subscribe
                </button>
              </form>
              <div className="flex gap-3 shrink-0 sm:items-center">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.Icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#F45B25] transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Copyright and policy links on same row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4  text-sm text-white/70">
            <p className="order-2 sm:order-1 text-[16px]">Copyright © {currentYear ?? ''} BMYBrand | All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-2 order-1 sm:order-2">
              <a href="#" className="text-white/70 hover:text-[#F45B25] transition-colors">Terms Of Use</a>
              <span className="text-white/40">|</span>
              <a href="#" className="text-white/70 hover:text-[#F45B25] transition-colors">Privacy Policy</a>
              <span className="text-white/40">|</span>
              <a href="#" className="text-white/70 hover:text-[#F45B25] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* BMYBRAND at bottom - flex font: scales with container width */}
      <div
        ref={brandContainerRef}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center items-end pt-4 min-h-[100px]"
      >
          <h2
            className="group BenzinSemibold text-center leading-none text-[#1A1B38] "
          style={{
            fontSize: `${brandFontSize}px`,
            textShadow:
              '1px 0 rgba(244, 91, 37, 0.45), -1px 0 rgba(244, 91, 37, 0.45), 0 1px rgba(244, 91, 37, 0.45), 0 -1px rgba(244, 91, 37, 0.45), 1px 1px rgba(244, 91, 37, 0.35), -1px -1px rgba(244, 91, 37, 0.35), 1px -1px rgba(244, 91, 37, 0.35), -1px 1px rgba(244, 91, 37, 0.35)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0) 100%)',
          }}
        >
          {brandText.split('').map((letter, index) => {
            const center = (brandText.length - 1) / 2
            const delay = Math.abs(index - center) * 35
            return (
              <span
                key={`${letter}-${index}`}
                className="transition-colors duration-500 ease-out group-hover:text-[#F45B25]"
                style={{ transitionDelay: `${delay}ms` }}
              >
                {letter}
              </span>
            )
          })}
        </h2>
      </div>
    </footer>
  )
}

export default Footer
