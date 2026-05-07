'use client'

import JiggyEmergencyCare from './jiggy-emergencycare'
import JiggyBackground from './jiggy-background'
import JiggySolution from './jiggy-solution'
import JiggyReviewTeam from './jiggy-reviewteam'
import FHFooter from './fhfooter'
import Navbar from './navbar'

export default function JiggyJerkyDetail() {
  return (
    <div
      className="min-h-screen bg-[#0D0D0D]"
      style={{
        ['--case-accent' as string]: '#EB9B0E',
        ['--case-accent-rgb' as string]: '235 155 14',
      }}
    >
      <Navbar />
      <JiggyEmergencyCare />
      <JiggyBackground />
      <JiggySolution />
      <JiggyReviewTeam />
      <FHFooter />
    </div>
  )
}
