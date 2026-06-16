'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

interface ChatWindowProps {
  messages: ChatMessageType[]
  isStreaming: boolean
  streamingText: string
  agentTyping: boolean
  botThinking: boolean
  onSend: (message: string) => void
}

const PRESET_MESSAGES = [
  'What services do you offer?',
  'I need a website built',
  'Tell me about your process',
  "I'd like a consultation",
]

export default function ChatWindow({
  messages,
  isStreaming,
  streamingText,
  agentTyping,
  botThinking,
  onSend,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  // Locks the preset buttons the moment one is tapped, so a fast double-click
  // can't fire two sends during the brief session-creation gap.
  const [presetSent, setPresetSent] = useState(false)

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, streamingText, agentTyping])

  const handlePreset = (msg: string) => {
    if (presetSent) return
    setPresetSent(true)
    // Re-enable if the send fails and the welcome screen is still showing.
    Promise.resolve(onSend(msg)).finally(() => setPresetSent(false))
  }

  const showWelcome = messages.length === 0 && !isStreaming && !botThinking

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-0.5 chat-scrollbar">
      {/* Welcome screen — shown before the first message */}
      {showWelcome && (
        <div className="flex flex-col items-center justify-center h-full text-center px-2">
          <div className="w-14 h-14 rounded-full overflow-hidden mb-3 ring-2 ring-white/70 shadow-[0_0_18px_rgba(255,255,255,0.15)]">
            <Image
              src="/bmybrand-mark.png"
              alt="Mr. B"
              width={56}
              height={56}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <h3 className="text-white text-lg font-semibold">Mr. B</h3>
          <p className="text-[#ADAECC] text-sm mt-0.5">AI Specialist at BMYBrand</p>
          <p className="text-[#ADAECC]/70 text-sm mt-3 max-w-[260px]">
            Send a message or pick a topic below to start chatting.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {PRESET_MESSAGES.map((msg) => (
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
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          role={msg.role}
          content={msg.content}
          timestamp={msg.created_at}
        />
      ))}

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

      {/* Agent typing indicator */}
      {agentTyping && !isStreaming && <TypingIndicator label="Agent is typing" />}

      <div ref={bottomRef} />
    </div>
  )
}
