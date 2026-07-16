"use client";

import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import AuthHeader from "./AuthHeader";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OtpVerification from "./OtpVerification";

import type { AuthStep } from "../types/auth";
import { DeviceService } from "@/shared/services/device.service";

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

  const {login,signup,verifySignup,loading,error,} = useAuth();
  const [step, setStep] = useState<AuthStep>("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [otp, setOtp] = useState("");


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


  const handleLogin = async () => {
    const device = DeviceService.getDevice();
  try {
    await login({
      email,
      password,
      ...device,
    });
    onLogin?.();
    onClose();
  } catch (err) {
    console.error(err);
  }
};

const handleSignup = async () => {
  const device = DeviceService.getDevice();
  try {
    await signup({
      user_name: username,
      email,
      password,
      device_id: device.device_id,
    });

    setStep("otp");
  } catch (err) {
    console.error(err);
  }
};

const handleVerifyOtp = async () => {
  const device = DeviceService.getDevice();
  try {
    await verifySignup({
      email,
      otp,
      ...device,
    });

    onLogin?.();
    onClose();
  } catch (err) {
    console.error(err);
  }
};
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
        className="w-full
sm:max-w-sm
lg:max-w-[420px]
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
          {error && (
  <div
    className="mb-4 rounded-xl border px-3 py-2 text-sm"
    style={{
      borderColor: "#ef4444",
      background: "rgba(239,68,68,.08)",
      color: "#ef4444",
    }}
  >
    {error}
  </div>
)}

          {step === "signin" && (
            <SignInForm
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onGoogle={() => {}}
              onGuest={onLogin ?? (() => {})}
              onLogin={handleLogin}
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
              onSignup={handleSignup}
              onSwitchSignin={() => setStep("signin")}
            />
          )}

          {step === "otp" && (
            <OtpVerification
              otp={otp}
              loading={loading}
              onOtpChange={setOtp}
              onVerify={handleVerifyOtp}
              onResend={() => {}}
              onBack={() => setStep("signin")}
            />
          )}

        </div>
      </div>
    </div>
  );
}