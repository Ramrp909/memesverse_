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
      className="flex items-center justify-between border-b pb-4"
      style={{
        borderColor: "var(--mv-border-subtle)",
      }}
    >
      <Logo />

      <button
        type="button"
        onClick={onClose}
        className="
          flex
          h-9
          flex-shrink-0
          items-center
          gap-1.5
          rounded-xl
          border
          px-2.5
          transition-all
          hover:opacity-80
          active:scale-95
        "
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "var(--mv-button-bg)",
          borderColor: "var(--mv-border)",
          color: "var(--mv-text-muted)",
        }}
      >
        <X size={13} strokeWidth={2.2} />

        <span
          className="text-[11px] font-bold uppercase tracking-[0.12em]"
        >
          Exit
        </span>
      </button>
    </div>
  );
}