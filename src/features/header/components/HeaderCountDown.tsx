"use client";

import { useCountdown } from "../hooks/useCountdown";

export default function HeaderCountdown() {
  const { hh, mm, ss } = useCountdown();

  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <span
        className="hidden text-[10px] font-bold uppercase tracking-wider sm:block"
        style={{
          fontFamily: "'Onest', sans-serif",
          color: "var(--mv-text-dim)",
        }}
      >
        Drop in
      </span>

      <div
        className="flex items-center gap-0.5"
        style={{ fontFamily: "'Onest', sans-serif" }}
      >
        {[hh, mm, ss].map((value, index) => (
          <span key={index} className="flex items-center gap-0.5">
            <span
              className="rounded px-1.5 py-0.5 text-sm font-black tabular-nums"
              style={{
                background: "var(--mv-chip-bg)",
                color: "var(--mv-chip-text)",
              }}
            >
              {value}
            </span>

            {index < 2 && (
              <span
                className="text-xs font-black"
                style={{ color: "#6366f1" }}
              >
                :
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}