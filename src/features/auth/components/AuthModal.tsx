"use client";

import { useEffect, useState } from "react";

import AuthHeader from "./AuthHeader";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OtpVerification from "./OtpVerification";

import type { AuthStep } from "../types/auth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin?: () => void;
}
export default function AuthModal({
  open,
  onClose,
  onLogin,
}: AuthModalProps) {
const [step, setStep] =useState<AuthStep>("signin");
const [email, setEmail] =useState("")
const [password, setPassword] = useState("");
const [username, setUsername] =useState("");
const [otp, setOtp] =useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") { onClose();}
    };
    window.addEventListener(
        "keydown",
        handleEscape
    );
    return () => {
        document.body.style.overflow = "";
        window.removeEventListener(
            "keydown",
            handleEscape
        );
    };
}, [open, onClose]);

if (!open) return null;

return (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    style={{
      background: "rgba(8,9,14,.82)",
      backdropFilter: "blur(14px)",
    }}
  >
    <div
  className="
    w-[92vw]
    max-w-[370px]
    max-h-[92vh]
    overflow-y-auto
    rounded-2xl
    border
    px-[18px]
    py-[18px]
    shadow-xl
  "
  style={{
    background: "var(--mv-card)",
    borderColor: "var(--mv-border)",
  }}

    >
      <AuthHeader onClose={onClose} />

      {step === "signin" && (
        <SignInForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onGoogle={() => {}}
          onGuest={onLogin ?? (() => {})}
          onLogin={() => setStep("otp")}
          onSwitchSignup={() => setStep("signup")}
        />
      )}

      {step === "signup" && (
        <SignUpForm
          username={username}
          email={email}
          password={password}
          onUsernameChange={setUsername}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onGoogle={() => {}}
          onSignup={() => setStep("otp")}
          onSwitchSignin={() => setStep("signin")}
        />
      )}

      {step === "otp" && (
        <OtpVerification
          otp={otp}
          loading={loading}
          onOtpChange={setOtp}
          onVerify={() => {
            setLoading(true);

            setTimeout(() => {
              setLoading(false);
              onLogin?.();
              onClose();
            }, 1000);
          }}
          onResend={() => {}}
          onBack={() => setStep("signin")}
        />
      )}
    </div>
  </div>
);
}