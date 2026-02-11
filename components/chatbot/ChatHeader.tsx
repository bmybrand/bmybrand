"use client";

import { X, Minus } from "lucide-react";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export default function ChatHeader({ onMinimize, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#F45B25] to-[#FF843E] rounded-t-2xl">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-sm font-bold">B</span>
        </div>
        <div>
          <h3 className="text-white text-sm font-semibold leading-tight">
            Mr. B
          </h3>
          <p className="text-white/70 text-xs">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onMinimize}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Minimize chat"
        >
          <Minus className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
