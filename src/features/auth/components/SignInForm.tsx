"use client";

import GoogleButton from "./GoogleButton";

interface SignInFormProps {
  email: string;
  password: string;

  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;

  onGoogle: () => void;
  onLogin: () => void;
  onGuest: () => void;

  onSwitchSignup: () => void;
}

export default function SignInForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onGoogle,
  onLogin,
  onGuest,
  onSwitchSignup,
}: SignInFormProps) {
  return (
    <div className="mt-6">

      {/* Hero */}
      <div className="space-y-2">
        <p
          className="text-[10px] font-black uppercase tracking-[0.22em]"
          style={{
            fontFamily: "'Onest',sans-serif",
            color: "#818cf8",
          }}
        >
          Welcome Back
        </p>

        <h2
          className="text-[10px] font-black leading-none"
          style={{
            fontFamily: "'Onest',sans-serif",
            color: "var(--mv-text)",
          }}
        >
          Sign in to MemeVerse
        </h2>

        <p
          className="max-w-[290px] text-sm leading-6"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            color: "var(--mv-text-muted)",
          }}
        >
          Members can like, save. Guest, view & share
        </p>
      </div>

      {/* Google */}
      <div className="pt-6">
        <GoogleButton
          label="Continue with Google"
          onClick={onGoogle}
        />
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div
          className="h-px flex-1"
          style={{
            background: "var(--mv-border-subtle)",
          }}
        />

        <span
          className="text-[10px] font-semibold lowercase tracking-wide"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            color: "var(--mv-text-dim)",
          }}
        >
          or
        </span>

        <div
          className="h-px flex-1"
          style={{
            background: "var(--mv-border-subtle)",
          }}
        />
      </div>

      {/* Inputs */}
      <div className="space-y-4">

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onEmailChange(e.target.value)}
          className="
            w-full
            h-11
            rounded-xl
            border
            px-4
            text-sm
            outline-none
            transition-colors
            focus:ring-2
            focus:ring-[#6366f1]/20
            focus:border-[#6366f1]
          "
          style={{
            fontFamily: "'DM Sans',sans-serif",
            background: "var(--mv-input-bg)",
            borderColor: "var(--mv-input-border)",
            color: "var(--mv-text)",
          }}
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onPasswordChange(e.target.value)}
          className="
            w-full
            h-11
            rounded-xl
            border
            px-4
            text-sm
            outline-none
            transition-colors
            focus:ring-2
            focus:ring-[#6366f1]/20
            focus:border-[#6366f1]
          "
          style={{
            fontFamily: "'DM Sans',sans-serif",
            background: "var(--mv-input-bg)",
            borderColor: "var(--mv-input-border)",
            color: "var(--mv-text)",
          }}
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs font-semibold transition-colors hover:opacity-80"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "#818cf8",
            }}
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-3">

        <button
          onClick={onLogin}
          className="
            w-full
            h-11
            rounded-xl
            text-sm
            font-black
            text-white
            transition-all
            hover:opacity-90
            active:scale-[0.98]
          "
          style={{
            fontFamily: "'Onest',sans-serif",
            background:
              "linear-gradient(135deg,#6366f1,#8b5cf6)",
          }}
        >
          Sign In
        </button>

        <button
          onClick={onGuest}
          className="
            w-full
            h-11
            rounded-xl
            border
            text-sm
            font-semibold
            transition-colors
            hover:opacity-90
          "
          style={{
            fontFamily: "'DM Sans',sans-serif",
            background: "var(--mv-button-bg)",
            borderColor: "var(--mv-border)",
            color: "var(--mv-button-text)",
          }}
        >
          Continue as Guest
        </button>
      </div>

      {/* Footer */}
      <p
        className="mt-6 text-center text-sm"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        No account?{" "}
        <button
          onClick={onSwitchSignup}
          className="font-bold transition-colors hover:opacity-80"
          style={{
            color: "#6366f1",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}