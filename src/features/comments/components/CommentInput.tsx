"use client";

import { Lock, Send } from "lucide-react";

interface CommentInputProps {
  isLoggedIn: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAuthRequired: () => void;
}

export default function CommentInput({
  isLoggedIn,
  value,
  onChange,
  onSubmit,
  onAuthRequired,
}: CommentInputProps) {
  return (
    <div
      className="flex-shrink-0 border-t px-4 py-3"
      style={{
        borderColor: "var(--mv-border-subtle)",
      }}
    >
      {isLoggedIn ? (
        <div className="flex items-end gap-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Add a comment…"
            rows={2}
            className="flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none transition-colors"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "var(--mv-input-bg)",
              borderColor: "var(--mv-input-border)",
              color: "var(--mv-text)",
            }}
          />

          <button
            onClick={onSubmit}
            disabled={!value.trim()}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl disabled:opacity-30"
            style={{
              background: "#6366f1",
            }}
          >
            <Send
              size={14}
              className="text-white"
            />
          </button>
        </div>
      ) : (
        <button
          onClick={onAuthRequired}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            borderColor: "var(--mv-border)",
            color: "var(--mv-text-muted)",
          }}
        >
          <Lock size={13} />
          Sign in to comment
        </button>
      )}
    </div>
  );
}