'use client'

import dynamic from 'next/dynamic'
import { isSupabaseBrowserConfigured } from '@/lib/supabase/client'

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false })

export default function ChatWidgetGate() {
  if (!isSupabaseBrowserConfigured()) return null
  return <ChatWidget />
}
