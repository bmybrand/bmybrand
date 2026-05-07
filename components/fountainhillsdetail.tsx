'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import EmergencyCare from './emergencycare'
import Background from './background'
import Solution from './solution'
import ReviewTeam from './reviewteam'
import FHFooter from './fhfooter'
import Navbar from './navbar'

export default function FountainHillsDetail() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen bg-[#0D0D0D] "
      style={{
        ['--case-accent' as string]: '#BF212F',
        ['--case-accent-rgb' as string]: '191 33 47',
      }}
    >
      <Navbar />
      <EmergencyCare />
      <Background />
      <Solution />
      <ReviewTeam />
      <FHFooter />
    </div>
  )
}
