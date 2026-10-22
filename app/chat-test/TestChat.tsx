'use client'

import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/chatbot/ChatWidget'), { ssr: false })

export default function TestChat({ testTicket }: { testTicket: string }) {
  return <ChatWidget embedded testTicket={testTicket} />
}
