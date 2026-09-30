'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatHeader from './ChatHeader'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'
import { useChatState } from '@/hooks/useChatState'
import { isSupabaseBrowserConfigured } from '@/lib/supabase/client'

export default function ChatWidget() {
  if (!isSupabaseBrowserConfigured()) {
    return null
  }

  return <ChatWidgetInner />
}

function ChatWidgetInner() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    state,
    sessionLoading,
    messages,
    contactSubmitted,
    isStreaming,
    streamingText,
    botThinking,
    sendMessage,
    submitContact,
    clearSession,
  } = useChatState()

  const handleSend = async (content: string) => {
    await sendMessage(content)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleMinimize = () => {
    setIsOpen(false)
  }

  const isClosed = state === 'CLOSED'

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="absolute bottom-16 right-0 w-[380px] h-[550px] max-md:fixed max-md:inset-0 max-md:w-full max-md:h-full max-md:bottom-0 max-md:right-0 bg-[#11122F] rounded-2xl max-md:rounded-none shadow-[0_12px_48px_-8px_rgba(226,232,240,0.18)] border border-white/10 flex flex-col overflow-hidden"
          >
            <ChatHeader
              onMinimize={handleMinimize}
              onClose={handleClose}
              onNewChat={() => clearSession()}
            />

            <ChatWindow
              messages={messages}
              isStreaming={isStreaming}
              streamingText={streamingText}
              botThinking={botThinking}
              contactSubmitted={contactSubmitted}
              onSend={handleSend}
              onSubmitContact={submitContact}
            />

            {!isClosed && (
              <ChatInput
                onSend={handleSend}
                disabled={isStreaming || sessionLoading}
                placeholder="Type a message..."
              />
            )}

            {/* Closed state footer */}
            {isClosed && (
              <div className="px-4 py-3 border-t border-white/10 text-center">
                <button
                  onClick={() => clearSession()}
                  className="text-[#F45B25] text-base font-medium hover:underline cursor-pointer"
                >
                  Start a new conversation
                </button>
              </div>
            )}

            <p className="bg-[#11122F] px-4 pb-2 text-center text-xs text-[#ADAECC]/60">
              AI can make mistakes. Please double-check important details.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waves draw attention to the launcher; they stop while the chat is open */}
      {!isOpen && (
        <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-14 w-14">
          <span className="chat-launcher-wave" />
          <span className="chat-launcher-wave" />
          <span className="chat-launcher-wave" />
        </span>
      )}

      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white shadow-lg shadow-[#F45B25]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#F45B25]/40 transition-shadow cursor-pointer"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xl leading-none"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <BrandMark className="h-7 w-auto" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

// The BMYBrand "B" mark (same shape as the site loader), drawn in currentColor.
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 15" fill="currentColor" aria-hidden className={className}>
      <path d="M6.80532 0.525235L4.25712 0.0398631C4.08521 -0.0511442 3.88298 0.0196393 3.79197 0.191542C3.7313 0.322997 3.75152 0.474675 3.84253 0.575795L4.61103 1.07128C5.03574 1.28363 5.18741 1.83978 4.89417 2.20381C4.81327 2.29482 4.72227 2.37572 4.59081 2.43639L0 4.85314V8.91813L7.51316 4.27676C7.93786 4.01385 8.22099 3.63971 8.37267 3.23523C8.80748 2.05213 8.02886 0.767921 6.79521 0.535347L6.80532 0.525235Z" />
      <path d="M8.41312 9.1703C8.27155 9.62533 7.9783 10.0399 7.51315 10.3332L0 14.9745V11.3241L4.4998 8.54336L4.59081 8.4928C4.67171 8.45235 4.7526 8.4119 4.81327 8.35123C4.84361 8.3209 4.87394 8.29056 4.89417 8.26022C5.18741 7.88608 5.03573 7.34004 4.61103 7.12769L4.4998 7.07713L5.75368 6.30862L6.88622 6.58165C7.05812 6.62209 7.23002 6.69288 7.3817 6.77377C8.2311 7.22881 8.70636 8.21978 8.41312 9.18041V9.1703Z" />
    </svg>
  )
}
