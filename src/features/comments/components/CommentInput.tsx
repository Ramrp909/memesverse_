"use client";

import { Lock, Send } from "lucide-react";
import { useState } from "react";

interface CommentInputProps {
  isLoggedIn: boolean;
  onSubmit: (
        comment: string,
        parentCommentId?: number | null
    ) => Promise<void>;
  onAuthRequired: () => void;
  submitting: boolean;
}

export default function CommentInput({
  isLoggedIn,
  onSubmit,
  onAuthRequired,
  submitting,
}: CommentInputProps) {

  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!value.trim() || submitting)
        return;
    try {
        await onSubmit(value);
        setValue("");
    } catch (error) {
        console.error(error);
    }
};
console.log("commentinput rendered")
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
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
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
  onClick={handleSubmit}
  disabled={!value.trim() || submitting}
  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
  style={{
    background: "#6366f1",
  }}
>
  {submitting ? (
    <span className="text-xs text-white">...</span>
  ) : (
    <Send
      size={14}
      className="text-white"
    />
  )}
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