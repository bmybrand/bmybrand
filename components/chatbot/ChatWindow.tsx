'use client'

import { useEffect, useRef } from 'react'
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

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, streamingText, agentTyping])

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-0.5 chat-scrollbar">
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

      {/* Preset quick-reply messages */}
      {messages.length <= 1 && !isStreaming && !botThinking && (
        <div className="flex flex-wrap gap-2 pt-2">
          {PRESET_MESSAGES.map((msg) => (
            <button
              key={msg}
              onClick={() => onSend(msg)}
              className="text-sm text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              {msg}
            </button>
          ))}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
