'use client'

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const subscribe = () => () => {}

type IconProps = {
  className?: string
}

const CheckIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const WarningIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A1 1 0 003.66 18h16.68a1 1 0 00.87-1.5l-7.5-13a1 1 0 00-1.74 0z" />
  </svg>
)

const FacebookIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.2-1.6 1.6-1.6H16V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V11H7.5v3h2.4v7h3.6Z" />
  </svg>
)

const InstagramIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedInIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56C7.14 3.83 6.3 3 5.27 3S3.38 3.83 3.38 4.94c0 1.1.83 1.94 1.86 1.94h.02c1.05 0 1.9-.84 1.9-1.94ZM20.62 12.87c0-3.48-1.86-5.1-4.33-5.1-2 0-2.9 1.1-3.4 1.88V8.5H9.5c.04.76 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.9-1.39 1.96-1.39 1.38 0 1.93 1.05 1.93 2.58V20H20.6l.02-7.13Z" />
  </svg>
)

const XIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.9 3H21l-6.4 7.3L22 21h-5.8l-4.5-6-5.2 6H4.4l6.9-7.8L2 3h6l4 5.4L18.9 3Zm-2 16h1.6L6.9 4.9H5.2L16.9 19Z" />
  </svg>
)

const YouTubeIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.8 7.2a2.95 2.95 0 0 0-2.07-2.09C17.9 4.6 12 4.6 12 4.6s-5.9 0-7.73.5A2.95 2.95 0 0 0 2.2 7.2 30.7 30.7 0 0 0 1.7 12c0 1.63.17 3.23.5 4.8a2.95 2.95 0 0 0 2.07 2.09c1.83.5 7.73.5 7.73.5s5.9 0 7.73-.5a2.95 2.95 0 0 0 2.07-2.09c.33-1.57.5-3.17.5-4.8s-.17-3.23-.5-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
)

const IMPORTANT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Website Audit', href: '#' },
  { label: 'Contact Us', href: '#' },
]

const SERVICE_LINKS = [
  { label: 'AI-Driven Solutions', href: '/services/ai-driven' },
  { label: 'Website Development', href: '/services/web-development' },
  { label: 'Mobile App Development', href: '/services/mobile-app-development' },
  { label: 'MVP Development', href: '/services/mvp-development' },
  { label: 'E-Commerce Solutions', href: '/services/commerce-solutions' },
  { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
]

const REVIEW_PLATFORMS = [
  { name: 'Clutch', logo: '/bmyb-logo-clutchco-color-01.svg', href: 'https://clutch.co/profile/bmybrand' },
  { name: 'Yelp', logo: '/bmyb-logo-yelp-color-01.svg', href: 'https://www.yelp.com/biz/bmy-brand-allen-3' },
  { name: 'Bark', logo: '/bmyb-global-bark-color-01.svg' },
  { name: 'Upwork', logo: '/bmyb-logo-google-color-01.svg' },
  { name: 'Trustpilot', logo: '/bmyb-logo-trustpilot-color-01.svg', href: 'https://www.trustpilot.com/review/bmybrand.com' },
  { name: 'Google', logo: '/bmyb-logo-upwork-color-01.svg' },
]

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/bmybrandofficial/', Icon: FacebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/bmybrand_official/', Icon: InstagramIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/bmy-brand/', Icon: LinkedInIcon },
  { name: 'Twitter', href: '#', Icon: XIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@BMyBrandofficial', Icon: YouTubeIcon },
]

const brandText = 'BMYBRAND'

const Footer: React.FC = () => {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const brandContainerRef = useRef<HTMLDivElement>(null)
  const statusHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [brandFontSize, setBrandFontSize] = useState(48)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | 'warning'
    message: string
  } | null>(null)
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

  useEffect(() => {
    return () => {
      if (statusHideTimerRef.current) {
        clearTimeout(statusHideTimerRef.current)
      }
    }
  }, [])

  const showStatus = (type: 'success' | 'error' | 'warning', message: string) => {
    if (statusHideTimerRef.current) {
      clearTimeout(statusHideTimerRef.current)
    }

    setSubmitStatus({ type, message })

    statusHideTimerRef.current = setTimeout(() => {
      setSubmitStatus(null)
      statusHideTimerRef.current = null
    }, 4200)
  }

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (statusHideTimerRef.current) {
      clearTimeout(statusHideTimerRef.current)
      statusHideTimerRef.current = null
    }
    setSubmitStatus(null)

    if (!email.trim()) {
      showStatus('error', 'Enter your email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          accessPage: pathname || '/',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.')
      }

      if (result.alreadySubscribed) {
        showStatus('warning', result.message || 'You are already subscribed.')
      } else {
        showStatus('success', result.message || 'Subscribed successfully.')
        setEmail('')
      }
    } catch (error) {
      showStatus('error', error instanceof Error ? error.message : 'Failed to subscribe.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              {[{ label: 'Healthcare', href: '/industries/healthcare' }, { label: 'Food', href: '/industries/food' }, { label: 'Non-Profit', href: '/industries/non-profit' }, { label: 'Sports', href: '/industries/sports' }, { label: 'Travel and Tourism', href: '/industries/travel-and-tourism' }, { label: 'Education', href: '/industries/education' }].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Why BmyBrand</h3>
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
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 shrink-0 rounded-full overflow-hidden border border-white/20 bg-white/5">
                  <img
                    src="https://flagcdn.com/w80/us.png"
                    alt="USA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div>PO BOX 605 Allen, TX 75013</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 shrink-0 rounded-full overflow-hidden border border-white/20 bg-white/5">
                  <img
                    src="https://flagcdn.com/w80/ca.png"
                    alt="Canada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div> 845 Adelaide St W, Toronto, ON M6J 3X1, Canada</div>
                </div>
              </div>
              <a
                href="tel:+14695011401"
                className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-[#F45B25] to-[#FF843E] px-6 py-3 text-center font-semibold text-white transition-colors hover:opacity-90 BenzinSemibold"
              >
                Call Our Team
              </a>
            </div>
          </div>
        </div>

        {/* Middle: Reviewed on platforms */}
        <div className="flex flex-wrap items-center lg:justify-between justify-center gap-6 sm:gap-4 py-8 border-y border-white/10">
          {REVIEW_PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              onClick={() => {
                if ('href' in platform) {
                  window.open(platform.href, '_blank', 'noopener,noreferrer')
                }
              }}
              role={'href' in platform ? 'link' : undefined}
              tabIndex={'href' in platform ? 0 : undefined}
              className={`flex flex-col items-center gap-2 min-w-20 ${'href' in platform ? 'cursor-pointer rounded-lg px-2 py-2 transition-colors hover:bg-white/5' : ''}`}
            >
              <img
                src={platform.logo}
                alt={platform.name}
                width={96}
                height={24}
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
              From BmyBrand.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex flex-col flex-1 min-w-0 relative">
                <form
                  className="flex flex-1 flex-col sm:flex-row gap-3 min-w-0"
                  onSubmit={handleSubscribe}
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
                    className="px-6 py-3 rounded-lg bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white font-semibold hover:opacity-90 transition-colors shrink-0 BenzinSemibold disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>

                {/* Reserved status area under the subscription field so layout won't shift */}
                <div className="mt-3 w-full max-w-96 min-h-10">
                  <div
                    className={`w-full h-full transition-opacity duration-300 ${
                      submitStatus ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {submitStatus ? (
                      <div
                        className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${
                          submitStatus.type === 'success'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
                            : submitStatus.type === 'warning'
                            ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-100'
                            : 'border-red-500/30 bg-red-500/10 text-red-100'
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            submitStatus.type === 'success'
                              ? 'text-emerald-400'
                              : submitStatus.type === 'warning'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {submitStatus.type === 'success' ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : submitStatus.type === 'warning' ? (
                            '!'
                          ) : (
                            <WarningIcon className="h-5 w-5" />
                          )}
                        </span>
                        <p className="leading-6">{submitStatus.message}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 shrink-0 sm:items-center">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.Icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-white/70">
            <p className="order-2 sm:order-1 text-[16px]">Copyright © {currentYear ?? ''} BmyBrand | All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-2 order-1 sm:order-2">
              <Link href="/terms-of-use" className="text-white/70 hover:text-[#F45B25] transition-colors">Terms Of Use</Link>
              <span className="text-white/40">|</span>
              <Link href="/privacy-policy" className="text-white/70 hover:text-[#F45B25] transition-colors">Privacy Policy</Link>
              <span className="text-white/40">|</span>
              <Link href="/cookie-policy" className="text-white/70 hover:text-[#F45B25] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* BMYBRAND at bottom - flex font: scales with container width */}
      <div
        ref={brandContainerRef}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center items-end pt-4 min-h-25"
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
