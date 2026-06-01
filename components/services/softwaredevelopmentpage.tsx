'use client'

import { useEffect, useState } from 'react'
import { softwareDevelopmentServiceData } from '@/data/service-pages/software-development'
import SharedServicePage from './sharedservicepage'

export default function SoftwareDevelopmentPage() {
  const [hashKey, setHashKey] = useState('')

  useEffect(() => {
    const updateHashKey = () => {
      setHashKey(window.location.hash || 'default')
    }

    updateHashKey()
    window.addEventListener('hashchange', updateHashKey)

    return () => {
      window.removeEventListener('hashchange', updateHashKey)
    }
  }, [])

  return <SharedServicePage key={hashKey} data={softwareDevelopmentServiceData} />
}
