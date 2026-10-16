'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import ChatCard from './ChatCards'
import type { BookingSummary, ChatMessage as ChatMessageType, ChatUi } from '@/types/chat'
import type { BookingFormValues, BookingResult, ContactFormValues } from '@/hooks/useChatState'
import type { BookingPrefill } from './BookingCalendar'
import { useChatConfig } from '@/hooks/useChatConfig'

interface ChatWindowProps {
  messages: ChatMessageType[]
  isStreaming: boolean
  streamingText: string
  botThinking: boolean
  contactSubmitted: boolean
  onSend: (message: string) => void
  onSubmitContact: (values: ContactFormValues) => Promise<{ error?: string }>
  booking: BookingSummary | null
  onSubmitBooking: (values: BookingFormValues) => Promise<BookingResult>
}

function messageUi(msg: ChatMessageType): ChatUi | null {
  const ui = msg.metadata?.ui as ChatUi | undefined
  return ui && ['contact_form', 'sales', 'calendar', 'booking'].includes(ui.type) ? ui : null
}

function hasForm(ui: ChatUi | null): boolean {
  return ui?.type === 'contact_form' || ui?.type === 'sales' || ui?.type === 'calendar'
}

// Details the visitor already shared in this chat (contact form), used to
// pre-fill the booking form.
function prefillFrom(messages: ChatMessageType[]): BookingPrefill {
  const shared = [...messages].reverse().find((m) => m.metadata?.type === 'contact_form')
  if (!shared) return {}
  const field = (label: string) => new RegExp(`^${label}: (.+)$`, 'm').exec(shared.content)?.[1]?.trim()
  return { name: field('Name'), email: field('Email'), phone: field('Phone') }
}

export default function ChatWindow({
  messages,
  isStreaming,
  streamingText,
  botThinking,
  contactSubmitted,
  onSend,
  onSubmitContact,
  booking,
  onSubmitBooking,
}: ChatWindowProps) {
  const config = useChatConfig()
  const bottomRef = useRef<HTMLDivElement>(null)
  // Locks the preset buttons the moment one is tapped, so a fast double-click
  // can't fire two sends during the brief session-creation gap.
  const [presetSent, setPresetSent] = useState(false)

  // Auto-scroll to bottom on new messages or streaming updates
  const lastMessageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // A reply that comes with a card can be taller than the window, so show
    // the start of the reply instead of jumping past it to the card's end.
    const last = messages[messages.length - 1]
    if (last?.role === 'assistant' && messageUi(last) && !streamingText) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const handlePreset = (msg: string) => {
    if (presetSent) return
    setPresetSent(true)
    // Re-enable if the send fails and the welcome screen is still showing.
    Promise.resolve(onSend(msg)).finally(() => setPresetSent(false))
  }

  const showWelcome = messages.length === 0 && !isStreaming && !botThinking

  // Only the newest contact form can be filled in.
  let lastFormIndex = -1
  messages.forEach((msg, i) => {
    if (hasForm(messageUi(msg))) lastFormIndex = i
  })
  const prefill = prefillFrom(messages)

  return (
    <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-0.5 chat-scrollbar">
      {/* Welcome screen — shown before the first message */}
      {showWelcome && (
        <div className="flex flex-col items-center justify-center h-full text-center px-2">
          <div className="w-14 h-14 rounded-full overflow-hidden mb-3 ring-2 ring-white/70 shadow-[0_0_18px_rgba(255,255,255,0.15)]">
            <Image
              src="/bmybrand-mark.png"
              alt={config.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <h3 className="text-white text-lg font-semibold">{config.name}</h3>
          <p className="text-[#ADAECC] text-sm mt-0.5">{config.subtitle}</p>
          <p className="text-white/90 text-base font-medium mt-4 max-w-[260px]">{config.welcome}</p>

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {config.quickReplies.map((msg) => (
              <button
                key={msg}
                onClick={() => handlePreset(msg)}
                disabled={presetSent}
                className="text-sm text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message list */}
      {messages.map((msg, i) => {
        const ui = messageUi(msg)
        return (
          <div key={msg.id} ref={i === messages.length - 1 ? lastMessageRef : undefined}>
            <ChatMessage
              role={msg.role}
              content={msg.content}
              timestamp={msg.created_at}
              kind={typeof msg.metadata?.type === 'string' ? msg.metadata.type : undefined}
            />
            {ui && (
              <ChatCard
                ui={ui}
                interactive={i === lastFormIndex}
                submitted={contactSubmitted}
                onSubmitContact={onSubmitContact}
                booking={booking}
                prefill={prefill}
                onSubmitBooking={onSubmitBooking}
              />
            )}
          </div>
        )
      })}

      {/* Streaming message in progress */}
      {isStreaming && streamingText && (
        <ChatMessage
          role="assistant"
          content={streamingText}
          timestamp={new Date().toISOString()}
        />
      )}

      {/* Typing indicator while waiting for bot stream to start */}
      {isStreaming && !streamingText && <TypingIndicator />}

      {/* Bot thinking indicator (non-streaming responses) */}
      {botThinking && !isStreaming && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
