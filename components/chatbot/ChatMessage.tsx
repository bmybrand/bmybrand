'use client'

import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import RichText from './RichText'
import type { MessageRole } from '@/types/chat'

interface ChatMessageProps {
  role: MessageRole
  content: string
  timestamp: string
  // 'contact_form' marks the visitor's submitted contact details.
  kind?: string
}

export default function ChatMessage({ role, content, timestamp, kind }: ChatMessageProps) {
  if (role === 'system') {
    return (
      <div className="my-2 flex justify-center">
        <span className="rounded-full bg-white/5 px-3 py-1 text-center text-sm text-[#ADAECC]">
          {content}
        </span>
      </div>
    )
  }

  if (role === 'user') {
    if (kind === 'contact_form') {
      const lines = content.split('\n').slice(1)
      return (
        <div className="group mb-3 flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md border border-[#FF843E]/40 bg-[#F45B25]/15 px-4 py-3 text-sm text-white">
            <p className="mb-1.5 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-[#FF843E]" /> Details shared with the team
            </p>
            {lines.map((line, i) => (
              <p key={i} className="break-words text-white/80">
                {line}
              </p>
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="group mb-3 flex justify-end">
        <div className="max-w-[80%]">
          <div className="rounded-2xl rounded-br-md bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-4 py-2.5 text-[15px] leading-relaxed text-white shadow-md shadow-[#F45B25]/15 break-words">
            <RichText text={content} variant="user" />
          </div>
          <Time value={timestamp} align="right" />
        </div>
      </div>
    )
  }

  // Bot
  return (
    <div className="group mb-3 flex items-end gap-2">
      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
        <Image src="/bmybrand-mark.png" alt="" width={28} height={28} className="h-full w-full object-cover" />
      </div>
      <div className="max-w-[82%]">
        <span className="mb-1 block text-xs font-medium text-[#ADAECC]">Mr. B</span>
        <div className="rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#21235C] px-4 py-2.5 text-[15px] leading-relaxed text-white/90 break-words">
          <RichText text={content} variant="bot" />
        </div>
        <Time value={timestamp} align="left" />
      </div>
    </div>
  )
}

function Time({ value, align }: { value: string; align: 'left' | 'right' }) {
  return (
    <span
      className={`mt-0.5 block text-xs text-[#ADAECC]/0 transition-colors group-hover:text-[#ADAECC]/70 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      {formatTime(value)}
    </span>
  )
}

function formatTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}
