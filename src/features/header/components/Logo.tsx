export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect width="30" height="30" rx="8" fill="#6366f1" />
        <rect x="7" y="8" width="3" height="14" rx="1.5" fill="white" fillOpacity="0.45" />
        <polygon points="13,9 24,15 13,21" fill="white" fillOpacity="0.95" />
      </svg>
      <span style={{ fontFamily: "'Onest', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--mv-text)", flexShrink: 0 }}>
        meme<span style={{ color: "#6366f1" }}>verse</span>
      </span>
    </div>
  );
}
