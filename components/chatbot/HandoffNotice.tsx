'use client'

import { UserCheck } from 'lucide-react'

interface HandoffNoticeProps {
  agentName?: string
}

export default function HandoffNotice({ agentName }: HandoffNoticeProps) {
  return (
    <div className="flex justify-center my-4">
      <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-xl px-4 py-2.5">
        <UserCheck className="w-4 h-4 text-blue-400" />
        <span className="text-blue-300 text-xs font-medium">
          {agentName
            ? `${agentName} has joined the chat`
            : 'Connecting you with an agent...'}
        </span>
      </div>
    </div>
  )
}
