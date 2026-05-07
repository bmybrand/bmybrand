'use client'

import EpciEmergencyCare from './epci-emergencycare'
import EpciBackground from './epci-background'
import EpciSolution from './epci-solution'
import EpciReviewTeam from './epci-reviewteam'
import FHFooter from './fhfooter'
import Navbar from './navbar'

export default function EpciDetail() {
  return (
    <div
      className="min-h-screen bg-[#0D0D0D] "
      style={{
        ['--case-accent' as string]: '#00ACC8',
        ['--case-accent-rgb' as string]: '0 172 200',
      }}
    >
      <Navbar />
      <EpciEmergencyCare />
      <EpciBackground />
      <EpciSolution />
      <EpciReviewTeam />
      <FHFooter />
    </div>
  )
}
