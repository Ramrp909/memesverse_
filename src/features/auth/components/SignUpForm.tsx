"use client";

import LoadingButton from "@/shared/components/ui/LoadingButton";
import GoogleButton from "./GoogleButton";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/shared/utils/validation";

import { toast } from "sonner";

interface SignUpFormProps {
  username: string;
  email: string;
  password: string;
  loading: boolean;

  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;

  onGoogle: () => void;
  onSignup: () => void;

  onSwitchSignin: () => void;
}

export default function SignUpForm({
  username,
  email,
  password,
  loading,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onGoogle,
  onSignup,
  onSwitchSignin,
}: SignUpFormProps) {

  const handleSignup = () => {
  if (!validateUsername(username)) {
    toast.error("Username must be at least 3 characters.");
    return;
  }

  if (!validateEmail(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    toast.error("Password must contain at least 8 characters.");
    return;
  }

  onSignup();
};
  return (
    <div className="mt-3 space-y-3">

      {/* Hero */}
      <div className="space-y-2">
        <p
          className="text-[10px] font-black uppercase tracking-[0.22em]"
          style={{
            fontFamily: "'Onest',sans-serif",
            color: "#818cf8",
          }}
        >
          Join the drop
        </p>

        <h2
          className="text-xl font-black leading-none tracking-[-0.02em]"
          style={{
            fontFamily: "'Onest',sans-serif",
            color: "var(--mv-text)",
          }}
        >
          Create your account
        </h2>

        <p
          className="max-w-[290px] text-sm leading-6"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            color: "var(--mv-text-muted)",
          }}
        >
          Free forever. Best memes daily
        </p>
      </div>

      {/* Google */}
      <GoogleButton
        label="Continue with Google"
        onClick={onGoogle}
      />

       {/* Divider */}
      <div className="my-3 flex items-center gap-3">
        <div
          className="h-px flex-1"
          style={{
            background: "var(--mv-border-subtle)",
          }}
        />

        <span
          className="text-[10px] font-semibold tracking-wide uppercase"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            color: "var(--mv-text-dim)",
          }}
        >
          OR
        </span>

        <div
          className="h-px flex-1"
          style={{
            background: "var(--mv-border-subtle)",
          }}
        />
      </div>

      {/* Inputs */}
      <div className="space-y-3">

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          className="w-full h-11 rounded-xl border px-4 text-sm outline-none transition-colors focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            background: "var(--mv-input-bg)",
            borderColor: "var(--mv-input-border)",
            color: "var(--mv-text)",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full h-11 rounded-xl border px-4 text-sm outline-none transition-colors focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            background: "var(--mv-input-bg)",
            borderColor: "var(--mv-input-border)",
            color: "var(--mv-text)",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full h-11 rounded-xl border px-4 text-sm outline-none transition-colors focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            background: "var(--mv-input-bg)",
            borderColor: "var(--mv-input-border)",
            color: "var(--mv-text)",
          }}
        />
      </div>

      {/* Create Button */}
      <LoadingButton
      loading={loading}
      loadingText="Creating Account..."
        onClick={handleSignup}
        className="w-full h-11 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 active:scale-[0.98]"
        style={{
          fontFamily: "'Onest',sans-serif",
          background:
            "linear-gradient(135deg,#6366f1,#8b5cf6)",
        }}
      >
        Create Account &amp; Verify
      </LoadingButton>

      {/* Footer */}
      <p
        className="text-center text-sm"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        Already have an account?{" "}
        <button
          onClick={onSwitchSignin}
          className="font-bold transition-colors hover:opacity-80"
          style={{
            color: "#818cf8",
          }}
        >
          Sign In
        </button>
      </p>

    </div>
  );
}