'use client'

import React from 'react'
import { caseStudiesData } from '../../data/case-study-data'
import CaseStudyHero from './CaseStudyHero'
import CaseStudyBackground from './CaseStudyBackground'
import CaseStudySolution from './CaseStudySolution'
import CaseStudyReviews from './CaseStudyReviews'
import FHFooter from '../fhfooter'
import Navbar from '../navbar'

type Props = {
  slug: string
}

const CaseStudyDetail = ({ slug }: Props) => {
  const data = caseStudiesData[slug]

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white">
        <p>Case study not found.</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-[#0D0D0D]"
      style={{
        ['--case-accent' as string]: data.accentColor,
        ['--case-accent-rgb' as string]: data.accentColorRgb,
        ['--case-accent-gradient' as string]: data.accentGradient ?? data.accentColor,
      }}
    >
      <Navbar />
      <CaseStudyHero data={data.hero} />
      <CaseStudyBackground data={data.background} />
      <CaseStudySolution data={data.solution} />
      <CaseStudyReviews data={data.reviews} />
      <FHFooter />
    </div>
  )
}

export default CaseStudyDetail
