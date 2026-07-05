"use client";

import { X, Moon, Sun, LogIn, LogOut, Sparkles } from "lucide-react";
import { useTheme } from "@/shared/providers/ThemeProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ open, onClose }: Props) {
  const { theme, setTheme } = useTheme();
  const isLoggedIn = false;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-[var(--mv-overlay)] backdrop-blur-sm">
      <div className="h-full w-full max-w-[360px] border-l border-[var(--mv-border)] bg-[var(--mv-card)] p-4 shadow-2xl sm:max-w-[360px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white">
              <Sparkles size={16} />
            </div>
            <div className="font-['Onest'] text-[16px] font-black tracking-[-0.03em] text-[var(--mv-text)]">memeverse</div>
          </div>
          <button onClick={onClose} className="rounded-full bg-[var(--mv-btn-bg)] p-2 text-[var(--mv-text-mid)]">
            <X size={16} />
          </button>
        </div>

        <div className="rounded-[16px] border border-[var(--mv-border)] bg-[var(--mv-card-el)] p-3">
          <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">Appearance</div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setTheme("dark")} className={`flex items-center justify-center gap-2 rounded-[12px] border px-3 py-2.5 text-sm font-semibold ${theme === "dark" ? "border-[#6366f1] bg-[rgba(99,102,241,0.16)] text-[var(--mv-text)]" : "border-[var(--mv-border)] bg-[var(--mv-btn-bg)] text-[var(--mv-text-mid)]"}`}>
              <Moon size={14} /> Dark
            </button>
            <button onClick={() => setTheme("light")} className={`flex items-center justify-center gap-2 rounded-[12px] border px-3 py-2.5 text-sm font-semibold ${theme === "light" ? "border-[#6366f1] bg-[rgba(99,102,241,0.16)] text-[var(--mv-text)]" : "border-[var(--mv-border)] bg-[var(--mv-btn-bg)] text-[var(--mv-text-mid)]"}`}>
              <Sun size={14} /> Light
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-[16px] border border-[var(--mv-border)] bg-[var(--mv-card-el)] p-3">
          <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">Account</div>
          {isLoggedIn ? (
            <button className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--mv-btn-bg)] px-3 py-2.5 text-sm font-semibold text-[var(--mv-text)]">
              <LogOut size={14} /> Sign out
            </button>
          ) : (
            <button className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-3 py-2.5 text-sm font-semibold text-white">
              <LogIn size={14} /> Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
