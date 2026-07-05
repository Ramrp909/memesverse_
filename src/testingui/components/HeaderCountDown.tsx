"use client";

import { useTheme, C } from "../context/ThemeContext";
import { useCountdown } from "../hooks/useCountDown";
import { pad } from "../utils/helpers";

export default function HeaderCountdown() {
  const dark = useTheme();
  const c = C(dark);
  const { h, m, s } = useCountdown();
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block"
        style={{ fontFamily: "'Onest',sans-serif", color: c.textDim }}>Drop in</span>
      <div className="flex items-center gap-0.5" style={{ fontFamily: "'Onest',sans-serif" }}>
        {[h, m, s].map((v, i) => (
          <span key={i} className="flex items-center gap-0.5">
            <span className="text-sm font-black tabular-nums px-1.5 py-0.5 rounded"
              style={{ background: c.chipBg, color: c.chipText }}>{pad(v)}</span>
            {i < 2 && <span className="text-xs font-black" style={{ color: "#6366f1" }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}