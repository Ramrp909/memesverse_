import { useTheme } from "../context/ThemeContext";


export default function Logo() {
  const dark = useTheme();
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect width="30" height="30" rx="8" fill="#6366f1"/>
        <polygon points="12,9 24,15 12,21" fill="white" opacity="0.95"/>
        <rect x="7" y="9" width="3" height="12" rx="1.5" fill="white" opacity="0.45"/>
      </svg>
      <span style={{ fontFamily: "'Onest',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em", color: dark ? "#e8e8f2" : "#111118" }}>
        meme<span style={{ color: "#818cf8" }}>verse</span>
      </span>
    </div>
  );
}