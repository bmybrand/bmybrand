"use client";

import Image from "next/image";
import { X, Minus, RotateCcw } from "lucide-react";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  onNewChat: () => void;
}

export default function ChatHeader({ onMinimize, onClose, onNewChat }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#F45B25] to-[#FF843E] rounded-t-2xl">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white/20 shrink-0">
          <Image
            src="/bmybrand-mark.png"
            alt="BMYBrand"
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-white text-base font-semibold leading-tight">
            Mr. B
          </h3>
          <p className="text-white/70 text-sm">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onNewChat}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Start new chat"
          title="New chat"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white" />
        </button>
        <button
          onClick={onMinimize}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Minimize chat"
        >
          <Minus className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close chat"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
