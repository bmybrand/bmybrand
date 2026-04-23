import type { ReactNode } from 'react'

export const trustLogos = [
  '/abboott.svg.svg',
  '/mask group (3).svg',
  '/client_logo3.svg.svg',
  '/aldi.svg fill.svg',
  '/vector (27).svg',
  '/vector (28).svg',
  '/vector (11).svg',
  '/vector (25).svg',
]

export const mockupSlides = [
  {
    alt: 'Mobile View',
    className: 'bg-gradient-to-br from-pink-100 to-pink-50',
    imageClassName: 'object-left',
  },
  {
    alt: 'Desktop View',
    className: 'bg-[#1A1B2E]',
    imageClassName: 'object-center',
  },
  {
    alt: 'Tablet View',
    className: 'bg-gradient-to-br from-pink-100 to-pink-50',
    imageClassName: 'object-right',
  },
]

export const capabilityItems: Array<{
  title: string
  description: string
  icon: ReactNode
}> = [
  {
    title: 'Healthcare Website Design',
    description:
      'HIPAA-aware, conversion-focused websites designed to build trust, improve usability, and guide patients smoothly from first visit to appointment booking.',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.7" />
        <path d="M7 8h10M7 12h4M14 12h3M7 15h6" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10 20h4" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Healthcare Brand Identity',
    description:
      'Professional brand systems that build credibility, reflect compassion, and maintain consistent authority across every patient touchpoint.',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 3l2.1 4.26L19 9.02l-3.5 3.4.83 4.81L12 15l-4.33 2.23.83-4.81L5 9.02l4.9-1.76L12 3z" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.5 11.5c.8.67 1.63 1 2.5 1s1.7-.33 2.5-1" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Patient Growth & Experience',
    description:
      'AI-powered tools, automation, and targeted marketing strategies designed to increase visibility, improve response times, and drive steady patient acquisition.',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 19a4 4 0 00-8 0" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="9" r="3" strokeWidth="1.7" />
        <path d="M5 19a3 3 0 013-3M19 19a3 3 0 00-3-3" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="5" cy="10" r="2" strokeWidth="1.7" />
        <circle cx="19" cy="10" r="2" strokeWidth="1.7" />
      </svg>
    ),
  },
]

export const growthCards = [
  {
    number: '01',
    title: 'Built-in Compliance',
    description:
      'Healthcare websites require strict compliance and secure data handling. We build HIPAA-aligned platforms that protect patient information across every touchpoint.',
    image: '/heathcareservices.svg',
    imageClassName: 'absolute bottom-0 right-0 w-[42%] max-w-[220px] object-contain opacity-95',
  },
  {
    number: '02',
    title: 'Accessibility First',
    description:
      'We design accessibility-first experiences that follow WCAG standards, ensuring your website is easy to use, navigate, and accessible to all patients.',
  },
  {
    number: '03',
    title: 'Designed for Trust',
    description:
      'In healthcare, trust is essential. We create clean, fast, and professional experiences that build credibility and guide patients from first visit to action.',
  },
  {
    number: '04',
    title: 'Built to Scale',
    description:
      'As your organization grows, your digital systems should scale with you. We build flexible, low-maintenance platforms that support expansion without complexity.',
    image: '/healthcareservies2.svg',
    imageClassName: 'absolute bottom-0 right-0 w-[38%] max-w-[210px] object-contain opacity-95',
  },
]
