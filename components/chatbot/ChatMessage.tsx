'use client'

import type { MessageRole } from '@/types/chat'

interface ChatMessageProps {
  role: MessageRole
  content: string
  timestamp: string
}

export default function ChatMessage({
  role,
  content,
  timestamp,
}: ChatMessageProps) {
  const isUser = role === 'user'
  const isSystem = role === 'system'

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-[#ADAECC] text-sm px-3 py-1 bg-white/5 rounded-full">
          {content}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 group`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-1'}`}>
        {/* Sender label */}
        {!isUser && (
          <span className="text-xs font-medium mb-0.5 block text-[#ADAECC]">
            Mr. B
          </span>
        )}

        <div
          className={`px-4 py-2.5 rounded-2xl text-base leading-relaxed break-words whitespace-pre-wrap ${
            isUser
              ? 'bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white rounded-br-md'
              : 'bg-[#21235C] text-white/90 rounded-bl-md'
          }`}
        >
          {renderContent(content)}
        </div>

        {/* Timestamp on hover */}
        <span
          className={`text-xs text-[#ADAECC]/0 group-hover:text-[#ADAECC]/70 transition-colors mt-0.5 block ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  )
}

// Render markdown links as clickable
function renderContent(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-white/70 transition-colors"
      >
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
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
