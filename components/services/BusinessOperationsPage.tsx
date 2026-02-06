'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WorkTogether from '../WorkTogether'
import RequestForm from '../RequestForm'

export default function BusinessOperationsPage() {
  const router = useRouter()

  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <button
            onClick={() => router.push('/services')}
            className="text-white/60 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </button>

      <WorkTogether />
      <RequestForm />
      <Footer />
    </div>
  )
}
