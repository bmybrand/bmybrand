'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
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
    isStreaming,
    streamingText,
    agentTyping,
    botThinking,
    sendMessage,
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
  const isAgentMode = state === 'AGENT_CONNECTED'

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
              agentTyping={agentTyping}
              botThinking={botThinking}
              onSend={handleSend}
            />

            {!isClosed && (
              <ChatInput
                onSend={handleSend}
                disabled={isStreaming || sessionLoading}
                placeholder={
                  isAgentMode
                    ? 'Message the agent...'
                    : isClosed
                      ? 'Chat ended'
                      : 'Type a message...'
                }
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white shadow-lg shadow-[#F45B25]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#F45B25]/40 transition-shadow cursor-pointer"
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
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
