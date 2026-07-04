"use client";
import { Logo } from "./Logo";
import { useCountdown } from "../hooks/useCountdown";
// import { useAuth } from "../../contexts/AuthContext";

interface Props {
  onSettingsOpen: () => void;
}

 const SEGMENT_STYLE: React.CSSProperties = {
    fontFamily: "'Onest', sans-serif",
    fontWeight: 900,
    fontSize: 14,
    fontVariantNumeric: "tabular-nums",
    background: "var(--mv-chip-bg)",
    color: "var(--mv-chip-text)",
    padding: "2px 6px",
    borderRadius: 4,
    letterSpacing: "-0.01em",
  };

  const SEPARATOR_STYLE: React.CSSProperties = {
    fontSize: 10,
    color: "#6366f1",
    fontWeight: 800,
  };

export function Header({ onSettingsOpen }: Props) {
  const { hh, mm, ss } = useCountdown();
  // const { user, isLoggedIn } = useAuth();
const user = null;
const isLoggedIn = false;
 

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      height: 48, padding: "0 12px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "var(--mv-hdr)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--mv-border-sub)",
      transition: "all 300ms",
    }}>
      {/* Left: Logo */}
      <Logo />

      {/* Center: Countdown (hidden on mobile) */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="hidden sm:flex">
        <span style={{ fontFamily: "'Onest', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mv-text-dim)" }}>
          DROP IN
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={SEGMENT_STYLE}>{hh}</span>
          <span style={SEPARATOR_STYLE}>:</span>
          <span style={SEGMENT_STYLE}>{mm}</span>
          <span style={SEPARATOR_STYLE}>:</span>
          <span style={SEGMENT_STYLE}>{ss}</span>
        </div>
      </div>

      {/* Right: Profile/Settings */}
      <button
        onClick={onSettingsOpen}
        style={{
          width: 32, height: 32, border: "none", cursor: "pointer",
          borderRadius: "50%", overflow: "hidden", padding: 0,
          transition: "opacity 200ms, transform 200ms",
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isLoggedIn && user ? (
          <img src={user.avatar} alt={user.username} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: "50%", outline: "2px solid #6366f1", outlineOffset: 1 }} />
        ) : (
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Onest', sans-serif", fontWeight: 900, fontSize: 12, color: "white", borderRadius: "50%" }}>
            ?
          </div>
        )}
      </button>
    </header>
  );
}
