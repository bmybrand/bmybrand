'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import EmergencyCare from './EmergencyCare'
import Background from './Background'
import Solution from './Solution'
import ReviewTeam from './ReviewTeam'
import FHFooter from './FHFooter'
import Navbar from './Navbar'

export default function FountainHillsDetail() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0D0D0D] ">
      <Navbar />
      <EmergencyCare />
      <Background />
      <Solution />
      <ReviewTeam />
      <FHFooter />
    </div>
  )
}
