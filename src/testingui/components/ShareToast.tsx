import { Link } from "lucide-react";
import { useTheme } from "../context/ThemeContext";


export default function ShareToast({ show }: { show: boolean }) {
  const dark = useTheme();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
      style={{ opacity: show ? 1 : 0, transform: `translateX(-50%) translateY(${show ? 0 : 12}px)`, pointerEvents: "none" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl text-sm font-semibold"
        style={{ background: dark ? "#1a1b2e" : "#ffffff", color: dark ? "#e8e8f2" : "#111118", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, fontFamily: "'DM Sans',sans-serif" }}>
        <p style={{ color: "#6366f1" }} /> Link copied to clipboard
      </div>
    </div>
  );
}