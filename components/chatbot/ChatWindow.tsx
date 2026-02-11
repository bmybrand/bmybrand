'use client'

import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

interface ChatWindowProps {
  messages: ChatMessageType[]
  isStreaming: boolean
  streamingText: string
}

export default function ChatWindow({
  messages,
  isStreaming,
  streamingText,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, streamingText])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5 scrollbar-thin">
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

      {/* Typing indicator while waiting for stream to start */}
      {isStreaming && !streamingText && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
