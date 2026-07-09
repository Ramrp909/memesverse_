"use client";

import { Lock } from "lucide-react";
import OtpInput from "./OtpInput";

interface OtpVerificationProps {
  otp: string;
  loading?: boolean;

  onOtpChange: (value: string) => void;

  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}

export default function OtpVerification({
  otp,
  loading = false,
  onOtpChange,
  onVerify,
  onResend,
  onBack,
}: OtpVerificationProps) {
  return (
    <div className="mt-8">

      <div className="flex justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: "rgba(99,102,241,.12)",
          }}
        >
          <Lock
            size={26}
            color="#6366f1"
          />
        </div>
      </div>

      <h3
        className="mt-5 text-center text-xl font-black"
        style={{
          fontFamily: "'Onest',sans-serif",
          color: "var(--mv-text)",
        }}
      >
        Verify Email
      </h3>

      <p
        className="mt-2 text-center text-sm"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        Enter the 6 digit verification code
      </p>

      <div className="mt-7">
        <OtpInput
          value={otp}
          onChange={onOtpChange}
        />
      </div>

      <button
        disabled={otp.length !== 6 || loading}
        onClick={onVerify}
        className="mt-7 w-full rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-40"
        style={{
          fontFamily: "'Onest',sans-serif",
          background:
            "linear-gradient(135deg,#6366f1,#8b5cf6)",
        }}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      <button
        onClick={onResend}
        className="mt-3 w-full text-sm font-semibold"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "#6366f1",
        }}
      >
        Resend Code
      </button>

      <button
        onClick={onBack}
        className="mt-5 w-full text-sm"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        ← Back to Sign In
      </button>

    </div>
  );
}