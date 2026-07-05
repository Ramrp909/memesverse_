"use client";
import { useEffect, useRef, useState } from "react";
import GoogleButton from "./GoogleButton";
import Logo from "./Logo";
import { useTheme, C } from "../context/ThemeContext";
import {
  ThumbsUp, ThumbsDown, Share2, X, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  MessageCircle, Eye, Send, ChevronLeft, Link, Settings,
} from "lucide-react";
import OtpInput from "./OtpInput";


type AuthStep = "in" | "up" | "otp";

export default function AuthModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const dark = useTheme();
  const c = C(dark);
  const [step, setStep] = useState<AuthStep>("in");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  function doSignUp() { setStep("otp"); setOtp(""); setOtpError(false); }
  function doVerify() {
    if (otp.length < 6) { setOtpError(true); return; }
    onLogin();
  }
  function doResend() { setOtp(""); setResent(true); setTimeout(() => setResent(false), 3000); }
  function doGoogle() { onLogin(); }

  const D2 = "'Onest',sans-serif";
  const B2 = "'DM Sans',sans-serif";

  const divider = (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px" style={{ background: c.borderSub }} />
      <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: B2, color: c.textDim }}>or</span>
      <div className="flex-1 h-px" style={{ background: c.borderSub }} />
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: c.modalBg, backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm sm:rounded-2xl rounded-t-3xl border overflow-hidden shadow-2xl"
        style={{ background: c.card, borderColor: c.border }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b" style={{ borderColor: c.borderSub }}>
          <Logo />
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:opacity-80"
            style={{ fontFamily: B2, borderColor: c.border, color: c.textMuted }}>
            <X size={12} /> Exit
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">

          {/* sign in */}
          {step === "in" && <>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: D2, color: "#818cf8" }}>Welcome back</p>
              <h2 className="text-xl font-bold" style={{ fontFamily: D2, color: c.text, letterSpacing: "-0.02em" }}>Sign in to MemeVerse</h2>
              <p className="text-xs mt-1" style={{ fontFamily: B2, color: c.textMuted }}>Members: like, comment, save. Guests: view &amp; share.</p>
            </div>

            <GoogleButton label="Continue with Google" onClick={doGoogle} />
            {divider}

            <div className="space-y-2">
              <input placeholder="Email" className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                style={{ fontFamily: B2, background: c.inputBg, borderColor: c.inputBdr, color: c.text }} />
              <input type="password" placeholder="Password" className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                style={{ fontFamily: B2, background: c.inputBg, borderColor: c.inputBdr, color: c.text }} />
            </div>

            <button onClick={onLogin}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ fontFamily: D2, background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>Sign In</button>

            <button onClick={onClose}
              className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all hover:opacity-70"
              style={{ fontFamily: B2, borderColor: c.border, color: c.textMuted }}>Continue as Guest</button>

            <p className="text-center text-xs pb-1" style={{ fontFamily: B2, color: c.textMuted }}>
              No account?{" "}
              <button onClick={() => setStep("up")} className="font-semibold hover:underline" style={{ color: "#818cf8" }}>Sign up free</button>
            </p>
          </>}

          {/* sign up */}
          {step === "up" && <>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: D2, color: "#818cf8" }}>Join the drop</p>
              <h2 className="text-xl font-bold" style={{ fontFamily: D2, color: c.text, letterSpacing: "-0.02em" }}>Create your account</h2>
              <p className="text-xs mt-1" style={{ fontFamily: B2, color: c.textMuted }}>Free forever. Just memes, daily.</p>
            </div>

            <GoogleButton label="Sign up with Google" onClick={doGoogle} />
            {divider}

            <div className="space-y-2">
              <input placeholder="Username" className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                style={{ fontFamily: B2, background: c.inputBg, borderColor: c.inputBdr, color: c.text }} />
              <input placeholder="Email" className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                style={{ fontFamily: B2, background: c.inputBg, borderColor: c.inputBdr, color: c.text }} />
              <input type="password" placeholder="Password" className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                style={{ fontFamily: B2, background: c.inputBg, borderColor: c.inputBdr, color: c.text }} />
            </div>

            <button onClick={doSignUp}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ fontFamily: D2, background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>Create Account &amp; Verify</button>

            <p className="text-center text-xs pb-1" style={{ fontFamily: B2, color: c.textMuted }}>
              Already a member?{" "}
              <button onClick={() => setStep("in")} className="font-semibold hover:underline" style={{ color: "#818cf8" }}>Sign in</button>
            </p>
          </>}

          {/* otp */}
          {step === "otp" && <>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(99,102,241,0.12)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#6366f1" strokeWidth="1.8"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="#6366f1"/>
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: D2, color: "#818cf8" }}>Verify your email</p>
              <h2 className="text-xl font-bold" style={{ fontFamily: D2, color: c.text, letterSpacing: "-0.02em" }}>Enter OTP code</h2>
              <p className="text-xs mt-1" style={{ fontFamily: B2, color: c.textMuted }}>
                We sent a 6-digit code to your email address.
              </p>
            </div>

            <OtpInput value={otp} onChange={(v) => { setOtp(v); setOtpError(false); }} />

            {otpError && (
              <p className="text-center text-xs" style={{ color: "#ef4444", fontFamily: B2 }}>
                Please enter all 6 digits.
              </p>
            )}

            <button onClick={doVerify}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ fontFamily: D2, background: otp.length === 6 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(99,102,241,0.35)" }}>
              {otp.length === 6 ? "Verify & Sign In" : `Enter ${6 - otp.length} more digit${6 - otp.length !== 1 ? "s" : ""}`}
            </button>

            <div className="flex items-center justify-center gap-3 pb-1">
              <button onClick={doResend} className="text-xs font-semibold hover:underline" style={{ fontFamily: B2, color: resent ? "#22c55e" : "#818cf8" }}>
                {resent ? "✓ Code resent" : "Resend code"}
              </button>
              <span style={{ color: c.textDim }}>·</span>
              <button onClick={() => setStep("up")} className="text-xs" style={{ fontFamily: B2, color: c.textMuted }}>← Back</button>
            </div>
          </>}

        </div>
      </div>
    </div>
  );
}