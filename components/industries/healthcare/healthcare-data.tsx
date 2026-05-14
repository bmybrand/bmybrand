import type { ReactNode } from 'react'

export const trustLogos = [
  '/bmyb-logo-client-10.png',
  '/bmyb-logo-client-11.png',
  '/bmyb-logo-client-12.png',
  '/bmyb-logo-client-13.png',
  '/bmyb-logo-client-09.png',
  '/bmyb-logo-client-14.png',
  '/bmyb-logo-client-15.png',
  '/bmyb-logo-client-08.png',
]

export const mockupSlides = [
  {
    alt: 'Mobile View',
    image: '/bmyb-global-mockup-01.webp',
    className: 'bg-gradient-to-br from-pink-100 to-pink-50',
    imageClassName: 'object-center object-contain',
  },
  {
    alt: 'Desktop View',
    image: '/bmyb-global-backgroundfh-02.webp',
    className: 'bg-[#1A1B2E]',
    imageClassName: 'object-center object-contain',
  },
  {
    alt: 'Tablet View',
    image: '/bmyb-global-mockup-02.webp',
    className: 'bg-gradient-to-br from-pink-100 to-pink-50',
    imageClassName: 'object-center object-contain',
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
      <img src="/bmyb-industries-healthcare-icon-01.svg" className="h-12 w-12 object-contain" alt="" />
    ),
  },
  {
    title: 'Healthcare Brand Identity',
    description:
      'Professional brand systems that build credibility, reflect compassion, and maintain consistent authority across every patient touchpoint.',
    icon: (
      <img src="/bmyb-industries-healthcare-icon-02.svg" className="h-12 w-12 object-contain" alt="" />
    ),
  },
  {
    title: 'Patient Growth & Experience',
    description:
      'AI-powered tools, automation, and targeted marketing strategies designed to increase visibility, improve response times, and drive steady patient acquisition.',
    icon: (
      <img src="/bmyb-industries-healthcare-icon-03.svg" className="h-12 w-12 object-contain" alt="" />
    ),
  },
]

export const growthCards = [
  {
    number: '01',
    title: 'Built-in Compliance',
    description:
      'Healthcare websites require strict compliance and secure data handling. We build HIPAA-aligned platforms that protect patient information across every touchpoint.',
    image: '/bmyb-global-heathcareservices-01.webp',
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
    image: '/bmyb-industries-healthcare-healthcare-services2-01.webp',
    imageClassName: 'absolute bottom-0 right-0 w-[38%] max-w-[210px] object-contain opacity-95',
  },
]
