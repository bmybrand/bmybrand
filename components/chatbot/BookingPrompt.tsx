'use client'

import { Calendar } from 'lucide-react'

interface BookingPromptProps {
  url: string
}

export default function BookingPrompt({ url }: BookingPromptProps) {
  return (
    <div className="flex justify-start mb-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-gradient-to-r from-[#F45B25]/10 to-[#FF843E]/10 border border-[#F45B25]/30 rounded-xl px-4 py-3 hover:border-[#F45B25]/50 transition-colors group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white text-base font-medium group-hover:text-[#F45B25] transition-colors">
            Book a Consultation
          </p>
          <p className="text-[#ADAECC] text-sm">
            Schedule a free call with our team
          </p>
        </div>
      </a>
    </div>
  )
}
