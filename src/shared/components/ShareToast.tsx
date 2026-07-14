"use client";

import { Link } from "lucide-react";
import { useTheme } from "@/shared/providers/ThemeProvider";

interface ShareToastProps {
  visible: boolean;
  message?: string;
}

export default function ShareToast({
  visible,
  message = "Link copied to clipboard",
}: ShareToastProps) {
  const { isDark } = useTheme();

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-xl"
        style={{
          background: isDark ? "#1a1b2e" : "#ffffff",
          color: isDark ? "#e8e8f2" : "#111118",
          border: `1px solid ${
            isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(0,0,0,0.08)"
          }`,
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <Link
          size={15}
          style={{
            color: "#6366f1",
            flexShrink: 0,
          }}
        />

        <span>{message}</span>
      </div>
    </div>
  );
}