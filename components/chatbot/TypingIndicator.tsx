'use client'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-[#21235C] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-[#ADAECC] rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-[#ADAECC] rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-[#ADAECC] rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}
