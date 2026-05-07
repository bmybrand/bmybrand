'use client'

import PinkEmergencyCare from './pink-emergencycare'
import PinkBackground from './pink-background'
import PinkSolution from './pink-solution'
import PinkReviewTeam from './pink-reviewteam'
import FHFooter from './fhfooter'
import Navbar from './navbar'

export default function PinkMeDetail() {
  return (
    <div
      className="min-h-screen bg-[#0D0D0D]"
      style={{
        ['--case-accent' as string]: '#E667A2',
        ['--case-accent-rgb' as string]: '230 103 162',
      }}
    >
      <Navbar />
      <PinkEmergencyCare />
      <PinkBackground />
      <PinkSolution />
      <PinkReviewTeam />
      <FHFooter />
    </div>
  )
}
