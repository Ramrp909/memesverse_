"use client";
import { useTheme } from "../../../shared/providers/ThemeProvider";
import { useRef } from "react";


export default function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
 const { isDark } = useTheme();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !value[i] && i > 0) inputs.current[i - 1]?.focus();
  }
  function handleChange(i: number, ch: string) {
    const digit = ch.replace(/\D/g, "").slice(-1);
    const arr = value.split("");
    arr[i] = digit;
    const next = arr.join("").slice(0, 6);
    onChange(next);
    if (digit && i < 5) inputs.current[i + 1]?.focus();
  }
  function handlePaste(e: React.ClipboardEvent) {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(txt);
    inputs.current[Math.min(txt.length, 5)]?.focus();
    e.preventDefault();
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text" inputMode="numeric" maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className="w-10 h-12 text-center text-lg font-bold rounded-xl border outline-none transition-all"
          style={{ fontFamily: "'Onest',sans-serif", background: "var(--mv-inputBg)", borderColor: value[i] ? "#6366f1" : "var(--mv-inputBdr)", color: "var(--mv-text)", boxShadow: value[i] ? "0 0 0 2px rgba(99,102,241,0.25)" : "none" }}
        />
      ))}
    </div>
  );
}
