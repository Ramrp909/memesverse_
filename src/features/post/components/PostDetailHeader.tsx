"use client";

import { ChevronLeft, X } from "lucide-react";

interface PostDetailHeaderProps {
  mediaType: "image" | "video";
  onClose: () => void;
}

export default function PostDetailHeader({
  mediaType,
  onClose,
}: PostDetailHeaderProps) {
  return (
    <div
      className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0"
      style={{
        borderColor: "var(--mv-border-subtle)",
      }}
    >
      <button
        onClick={onClose}
        className="flex items-center gap-1.5 text-sm transition-colors"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        <ChevronLeft size={15} />
        Back
      </button>

      <span
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{
          fontFamily: "'Onest', sans-serif",
          color: "var(--mv-text-dim)",
        }}
      >
        {mediaType === "video" ? "▶ Video" : "Image"}
      </span>

      <button
        onClick={onClose}
        className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          color: "var(--mv-text-muted)",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}