"use client";

import type { CSSProperties } from "react";
import { Logo } from "./Logo";
import { useCountdown } from "../hooks/useCountdown";
// import { useAuth } from "@/shared/providers/AuthProvider";

interface Props {
  onSettingsOpen: () => void;
}

const SEGMENT_STYLE: CSSProperties = {
  fontFamily: "'Onest', sans-serif",
  fontWeight: 900,
  fontSize: 14,
  fontVariantNumeric: "tabular-nums",
  background: "var(--mv-chip-bg)",
  color: "var(--mv-chip-text)",
  padding: "2px 6px",
  borderRadius: 4,
  letterSpacing: "-0.01em",
};

const SEPARATOR_STYLE: CSSProperties = {
  fontSize: 10,
  color: "#6366f1",
  fontWeight: 800,
};

export function Header({ onSettingsOpen }: Props) {
  const { hh, mm, ss } = useCountdown();

  // Temporary until AuthProvider is connected
  // const { user, isLoggedIn } = useAuth();
  const user = null as { avatar?: string; username?: string } | null;
  const isLoggedIn = false;

  return (
    <header
      className="sticky top-0 z-20 border-b transition-colors duration-300"
      style={{
        background: "var(--mv-hdr)",
        backdropFilter: "blur(16px)",
        borderColor: "var(--mv-border-sub)",
      }}
    >
      <div className="mx-auto flex h-12 max-w-[560px] items-center justify-between gap-2 px-3 sm:px-4 lg:max-w-[620px]">
        {/* Left */}
        <Logo />

        {/* Center */}
        <div
          className="hidden sm:flex"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "'Onest', sans-serif",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--mv-text-dim)",
            }}
          >
            DROP IN
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={SEGMENT_STYLE}>{hh}</span>
            <span style={SEPARATOR_STYLE}>:</span>

            <span style={SEGMENT_STYLE}>{mm}</span>
            <span style={SEPARATOR_STYLE}>:</span>

            <span style={SEGMENT_STYLE}>{ss}</span>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={onSettingsOpen}
          title="Settings"
          className="flex-shrink-0 transition-all hover:opacity-80 active:scale-95"
          style={{ marginLeft: "auto" }}
        >
          {isLoggedIn && user ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6366f1]"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{
                background:
                  "linear-gradient(135deg,#6366f1,#8b5cf6)",
                fontFamily: "'Onest',sans-serif",
              }}
            >
              ?
            </div>
          )}
        </button>
      </div>
    </header>
  );
}