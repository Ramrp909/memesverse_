"use client";

import { X } from "lucide-react";
import Logo from "@/features/header/components/Logo";

interface AuthHeaderProps {
  onClose: () => void;
}

export default function AuthHeader({
  onClose,
}: AuthHeaderProps) {
  return (
    <div
      className="flex items-center justify-between pb-5 border-b"
      style={{
        borderColor: "var(--mv-border-subtle)",
      }}
    >
      <Logo />

      <button
        onClick={onClose}
        className="flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all hover:opacity-80 active:scale-95"
        style={{
          background: "var(--mv-btn-bg)",
          borderColor: "var(--mv-border-subtle)",
          color: "var(--mv-text-muted)",
          fontFamily: "'Onest',sans-serif",
        }}
      >
        <X size={14} />
        <span className="text-xs font-bold uppercase tracking-wide">
          Exit
        </span>
      </button>
    </div>
  );
}