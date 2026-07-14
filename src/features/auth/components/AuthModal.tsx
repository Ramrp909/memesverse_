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
  const [step, setStep] = useState<AuthStep>("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-end
        justify-center
        sm:items-center
        p-0
        sm:p-4
      "
      style={{
        background: "var(--mv-modal-bg)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-sm
          max-h-[90vh]
          overflow-y-auto

          rounded-t-3xl
          sm:rounded-2xl

          border
          shadow-2xl

          bg-[var(--mv-card)]
        "
        style={{
          borderColor: "var(--mv-border)",
        }}
      >
        <div className="px-5 pt-5 pb-5">

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
    </div>
  );
}