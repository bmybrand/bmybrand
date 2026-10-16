'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_PUBLIC_CONFIG, type PublicChatConfig } from '@/lib/settings/public'

// Chat widget text set on the CRM's Settings page (assistant name, welcome
// message, quick replies). Starts with the defaults and swaps in the saved
// values once loaded.
const ChatConfigContext = createContext<PublicChatConfig>(DEFAULT_PUBLIC_CONFIG)

export function ChatConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PublicChatConfig>(DEFAULT_PUBLIC_CONFIG)

  useEffect(() => {
    let cancelled = false
    fetch('/api/chat/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PublicChatConfig | null) => {
        if (!cancelled && data?.name) setConfig({ ...DEFAULT_PUBLIC_CONFIG, ...data })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return <ChatConfigContext.Provider value={config}>{children}</ChatConfigContext.Provider>
}

export function useChatConfig(): PublicChatConfig {
  return useContext(ChatConfigContext)
}
