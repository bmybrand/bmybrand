'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function JiggyJerkyDetail() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0D0E1F] pt-32 pb-20">
      <div className="w-[90%] lg:w-[90%] 2xl:w-[85%] mx-auto">
        {/* Add your content here */}
        <h1 className="text-white text-5xl BenzinSemibold">JIGGY JERKY - Coming Soon</h1>
      </div>
    </div>
  )
}
