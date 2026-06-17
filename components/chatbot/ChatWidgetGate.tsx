'use client'

import dynamic from 'next/dynamic'
import { isSupabaseConfigured } from '@/lib/supabase/client'

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false })

export default function ChatWidgetGate() {
  if (!isSupabaseConfigured) return null
  return <ChatWidget />
}
