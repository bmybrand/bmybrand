'use client'

import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const REVIEW_PLATFORMS = [
  { name: 'Clutch', logo: '/clutchco.svg' },
  { name: 'Yelp', logo: '/yelp.svg' },
  { name: 'Bark', logo: '/bark.svg' },
  { name: 'Upwork', logo: '/upwork.svg' },
  { name: 'Trustpilot', logo: '/trustpilot-1.svg' },
  { name: 'Google', logo: '/google.svg' },
]

const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', Icon: FaFacebookF },
  { name: 'Instagram', href: '#', Icon: FaInstagram },
  { name: 'LinkedIn', href: '#', Icon: FaLinkedinIn },
  { name: 'Twitter', href: '#', Icon: FaXTwitter },
  { name: 'YouTube', href: '#', Icon: FaYoutube },
]

const brandText = 'BMYBRAND'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  return (
    <footer className="relative bg-[#202141] text-white overflow-hidden pb-10">
      <div className="relative z-10 max-w-none mx-auto w-[90%] lg:w-[85%] 2xl:w-[80%] py-12 lg:py-16 pb-32 lg:pb-40">
        {/* Top: 5 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-12 lg:mb-16">
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Important Links</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {['Home', 'About Us', 'Services', 'Case Studies', 'Website Audit', 'Contact Us'].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Services</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {['UI/UX Design', 'Website Development', 'Branding & Identity', 'AI Solutions', 'Digital Marketing', 'Commerce Solutions'].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 BenzinSemibold">Specialized Industry</h3>
            <ul className="space-y-2.5 text-sm lg:text-base text-white/70">
              {['Healthcare', 'E-Commerce', 'SaaS & Startups', 'Finance & Fintech', 'Industrial & Engineering', 'NGOs & Nonprofits'].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:text-white transition-colors">{label}</a>
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
        <div className="flex flex-wrap items-center justify-between py-8 border-y border-white/10">
          {REVIEW_PLATFORMS.map((platform) => (
            <div key={platform.name} className="flex flex-col items-center gap-2">
              <img
                src={platform.logo}
                alt={platform.name}
                className="h-6 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
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

        {/* Bottom: Subscribe + Social on one level; Copyright + Policies on one level */}
        <div className="py-10 space-y-6">
          <div>
            <h3 className="text-white font-semibold text-lg lg:text-xl mb-2 BenzinSemibold">Subscribe</h3>
            <p className="text-white/70 text-sm lg:text-base mb-4">
              Get Design, AI, And Growth Insights—Plus Updates From BMYBrand.
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
                  className="flex-1 max-w-150 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F45B25] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#F45B25] text-white font-semibold hover:bg-[#e04f1f] transition-colors shrink-0 BenzinSemibold"
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
            <p className="order-2 sm:order-1">Copyright © {new Date().getFullYear()} BMYBrand | All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-2 order-1 sm:order-2">
              <a href="#" className="text-[#F45B25] hover:underline">Terms Of Use</a>
              <span className="text-white/40">|</span>
              <a href="#" className="text-[#F45B25] hover:underline">Privacy Policy</a>
              <span className="text-white/40">|</span>
              <a href="#" className="text-[#F45B25] hover:underline">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* BMYBRAND at bottom - z-20 so it's on top and hover works */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center items-end pt-4 min-h-[100px]">
        <h2
          className="group BenzinSemibold text-center leading-none text-[30px] sm:text-7xl md:text-[80px] lg:text-[110px] xl:text-9xl 2xl:text-[160px] text-[#202141] pb-10"
          style={{
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
