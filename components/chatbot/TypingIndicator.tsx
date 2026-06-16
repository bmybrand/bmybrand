'use client'

interface TypingIndicatorProps {
  label?: string
}

export default function TypingIndicator({ label }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-[#21235C] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
        {label && (
          <span className="text-[#ADAECC] text-sm mr-1">{label}</span>
        )}
        <span className="w-1.5 h-1.5 bg-[#ADAECC] rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-[#ADAECC] rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-[#ADAECC] rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}
