"use client";

import { useState, useEffect, useRef, useCallback} from "react";
import {
  ThumbsUp, ThumbsDown, Share2, X, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  MessageCircle, Eye, Send, ChevronLeft, Link, Settings,
} from "lucide-react";
import { useTheme } from "@/shared/providers/ThemeProvider";
import Logo from "@/features/header/components/Logo";

interface SettingsDrawerProps {
    open: boolean;
    onClose: () => void;
    isLoggedIn: boolean;
    onSignIn: () => void;
    onSignOut: () => void;
}


export default function SettingsDrawer( {open,
  onClose,
  isLoggedIn,
  onSignIn,
  onSignOut,
}: SettingsDrawerProps) {
  const { theme, setTheme } = useTheme();
const isDark = theme === "dark";
  const D2 = "'Onest',sans-serif";
  const B2 = "'DM Sans',sans-serif";

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* drawer — full width on mobile, fixed 300px on sm+ */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col shadow-2xl transition-transform duration-300"
        style={{
          width: "min(300px, 100vw)",
          background: "var(--mv-card)",
          borderLeft: `1px solid ${"var(--mv-border)"}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0" style={{ borderColor:"var(--mv-border-subtle)"}}>
          <Logo />
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all hover:opacity-70"
            style={{ background: "var(--mv-button-bg)", color: "var(--mv-text-muted)" }}>
            <X size={15} />
          </button>
        </div>

        {/* profile hero (when logged in) */}
        {isLoggedIn && (
          <div className="px-5 py-5 border-b flex items-center gap-4 flex-shrink-0" style={{ borderColor: "var(--mv-border-subtle)" }}>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&auto=format"
              alt="avatar" className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
              style={{ boxShadow: "0 0 0 2px #6366f1" }} />
            <div className="min-w-0">
              <p className="text-base font-bold truncate" style={{ fontFamily: D2, color: "var(--mv-text)"}}>MemeUser</p>
              <p className="text-xs mt-0.5" style={{ fontFamily: B2, color: "var(--mv-text-muted)" }}>@memeuser · Member</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>PRO</span>
                <span className="text-[10px]" style={{ fontFamily: B2, color:"var(--mv-text-dim)" }}>84.2K followers</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6" style={{ scrollbarWidth: "none" }}>

          {/* appearance */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: D2, color: "var(--mv-text-dim)" }}>Appearance</p>
            <div className="grid grid-cols-2 gap-2">
              {([["Dark", true], ["Light", false]] as [string, boolean][]).map(([label, val]) => (
                <button key={label} onClick={() => setTheme(val ? "dark" : "light")}
                  className="py-2.5 rounded-xl text-sm font-semibold border transition-all"
                  style={{ fontFamily: B2,
                    background: isDark === val ? "#6366f1" : "var(--mv-button-bg)",
                    color: isDark === val ? "white" : "var(--mv-button-text)",
                    borderColor: isDark === val ? "#6366f1" : "var(--mv-border)"}}>
                  {label === "Dark" ? "🌙 Dark" : "☀️ Light"}
                </button>
              ))}
            </div>
          </div>

          {/* account section */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: D2, color:"var(--mv-text-dim)"}}>Account</p>
            {isLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => { onSignOut(); onClose(); }}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ fontFamily: B2, background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.18)" }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onSignIn(); onClose(); }}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ fontFamily: D2, background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
              >
                Sign In
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}