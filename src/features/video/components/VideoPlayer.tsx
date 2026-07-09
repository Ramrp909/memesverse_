import { useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";

import { useVideoPlayer } from "@/features/video/hooks/useVideoPlayer";

import { formatTime } from "../../../shared/utils/formatTime";

interface Props {
  src: string;
  poster?: string;
  small?: boolean;
}

export default function VideoPlayer({ src, poster, small = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    videoRef, playing, muted, currentTime, duration,
    progress, bufferedPct, showControls, fullscreen,
    togglePlay, toggleMute, restart, seek, toggleFullscreen, revealControls,
  } = useVideoPlayer();

  const iconSize = small ? 13 : 15;
  const playIconSize = small ? 18 : 24;
  const playContainerSize = small ? 44 : 58;

  function handleSeekClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", aspectRatio: fullscreen ? undefined : "16/9", height: fullscreen ? "100dvh" : undefined, background: "#000", userSelect: "none", borderRadius: small ? 10 : 12, overflow: "hidden" }}
      onMouseMove={revealControls}
      onMouseLeave={() => playing && setTimeout(() => {}, 0)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        playsInline
        loop
        muted
        preload="metadata"
      />

      {/* Center play overlay */}
      {!playing && (
        <div
          onClick={togglePlay}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.22)", cursor: "pointer" }}
        >
          <div style={{
            width: playContainerSize, height: playContainerSize,
            background: "linear-gradient(135deg, rgba(99,102,241,.93), rgba(139,92,246,.93))",
            borderRadius: "50%", backdropFilter: "blur(4px)",
            boxShadow: "0 0 22px rgba(99,102,241,.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Play size={playIconSize} fill="white" color="white" style={{ marginLeft: 4 }} />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, transparent 100%)",
          padding: small ? "22px 10px 8px" : "36px 14px 12px",
          opacity: showControls || !playing ? 1 : 0,
          transition: "opacity 300ms",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          onClick={handleSeekClick}
          style={{
            width: "100%", height: small ? 3 : 4,
            background: "rgba(255,255,255,.15)",
            borderRadius: 9999, marginBottom: 8, cursor: "pointer", position: "relative",
          }}
          className="group"
        >
          <div style={{ position: "absolute", inset: 0, borderRadius: 9999, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.2)", width: `${bufferedPct * 100}%` }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #6366f1, #818cf8)", width: `${progress * 100}%` }} />
          </div>
          <div style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            left: `${progress * 100}%`, marginLeft: small ? -4.5 : -6,
            width: small ? 9 : 12, height: small ? 9 : 12,
            background: "white", borderRadius: "50%",
            boxShadow: "0 0 6px rgba(129,140,248,.6)",
          }} />
        </div>

        {/* Buttons row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white" }}>
          <button onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", color: "white", display: "flex", padding: 0 }}>
            {playing ? <Pause size={iconSize} fill="white" /> : <Play size={iconSize} fill="white" />}
          </button>
          <button onClick={restart} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", display: "flex", padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <RotateCcw size={small ? 11 : 12} />
          </button>
          <span style={{ fontFamily: "monospace", fontSize: small ? 9 : 10, color: "rgba(255,255,255,0.45)", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div style={{ flex: 1 }} />
          <button onClick={toggleMute} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", padding: 0 }}>
            {muted ? <VolumeX size={small ? 12 : 14} /> : <Volume2 size={small ? 12 : 14} />}
          </button>
          <button onClick={toggleFullscreen} title={fullscreen ? "Exit fullscreen" : "Fullscreen"} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", padding: 0 }}>
            {fullscreen ? <Minimize2 size={small ? 11 : 13} /> : <Maximize2 size={small ? 11 : 13} />}
          </button>
        </div>
      </div>

      {/* Click-to-toggle when playing */}
      {playing && (
        <div onClick={togglePlay} style={{ position: "absolute", inset: 0, cursor: "pointer" }} />
      )}
    </div>
  );
}
