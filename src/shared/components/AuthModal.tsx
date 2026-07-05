"use client";

import { X, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"sign-in" | "sign-up" | "otp">("sign-in");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--mv-overlay)] px-3 py-4 backdrop-blur-sm sm:px-4">
      <div className="w-full max-w-[440px] rounded-[24px] border border-[var(--mv-border)] bg-[var(--mv-card)] p-4 shadow-2xl sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="font-['Onest'] text-[16px] font-black tracking-[-0.03em] text-[var(--mv-text)]">memeverse</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">continue to vibe</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-[var(--mv-btn-bg)] p-2 text-[var(--mv-text-mid)]">
            <X size={16} />
          </button>
        </div>

        {step === "sign-in" && (
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-btn-bg)] px-3 py-2.5 text-sm font-semibold text-[var(--mv-text)]">
              Continue with Google
            </button>
            <div className="text-center text-[10px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">or</div>
            <input className="w-full rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] px-3 py-2.5 text-sm text-[var(--mv-text)] outline-none" placeholder="Email" />
            <input className="w-full rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] px-3 py-2.5 text-sm text-[var(--mv-text)] outline-none" placeholder="Password" type="password" />
            <button onClick={() => setStep("otp")} className="w-full rounded-[12px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-3 py-2.5 text-sm font-semibold text-white">Sign in</button>
            <button onClick={() => setStep("sign-up")} className="w-full rounded-[12px] bg-[var(--mv-btn-bg)] px-3 py-2.5 text-sm font-semibold text-[var(--mv-text)]">Create account</button>
          </div>
        )}

        {step === "sign-up" && (
          <div className="space-y-3">
            <input className="w-full rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] px-3 py-2.5 text-sm text-[var(--mv-text)] outline-none" placeholder="Username" />
            <input className="w-full rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] px-3 py-2.5 text-sm text-[var(--mv-text)] outline-none" placeholder="Email" />
            <input className="w-full rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] px-3 py-2.5 text-sm text-[var(--mv-text)] outline-none" placeholder="Password" type="password" />
            <button onClick={() => setStep("otp")} className="w-full rounded-[12px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-3 py-2.5 text-sm font-semibold text-white">Create account</button>
            <button onClick={() => setStep("sign-in")} className="flex items-center justify-center gap-2 text-sm text-[var(--mv-text-mid)]">
              <ArrowLeft size={14} /> Back to sign in
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-3">
            <div className="text-sm leading-6 text-[var(--mv-text-mid)]">Enter the six-digit code we sent to your email.</div>
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input key={index} className="h-12 w-12 rounded-[12px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] text-center text-lg text-[var(--mv-text)] outline-none" maxLength={1} />
              ))}
            </div>
            <button onClick={onClose} className="w-full rounded-[12px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-3 py-2.5 text-sm font-semibold text-white">Verify</button>
            <button onClick={() => setStep("sign-in")} className="w-full rounded-[12px] bg-[var(--mv-btn-bg)] px-3 py-2.5 text-sm font-semibold text-[var(--mv-text)]">Resend code</button>
          </div>
        )}
      </div>
    </div>
  );
}
