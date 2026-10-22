'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { isSupabaseBrowserConfigured } from '@/lib/supabase/client'

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false })

export default function ChatWidgetGate() {
  const pathname = usePathname()
  // The CRM's test chat page renders its own embedded chat.
  if (pathname?.startsWith('/chat-test')) return null
  if (!isSupabaseBrowserConfigured()) return null
  return <ChatWidget />
}
