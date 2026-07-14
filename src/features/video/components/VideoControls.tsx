"use client";

import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";

import { formatTime } from "@/shared/utils/formatTime";

interface Props {
  playing: boolean;
  muted: boolean;
  fullscreen: boolean;

  currentTime: number;
  duration: number;

  small?: boolean;

  onPlayPause: () => void;
  onRestart: () => void;
  onMute: () => void;
  onFullscreen: () => void;
}

export default function VideoControls({
  playing,
  muted,
  fullscreen,
  currentTime,
  duration,
  small = false,
  onPlayPause,
  onRestart,
  onMute,
  onFullscreen,
}: Props) {
  const iconSize = small ? 13 : 15;

  return (
    <div
      className="flex items-center gap-2 text-white"
    >
      {/* Play / Pause */}

      <button
        onClick={onPlayPause}
        className="flex p-0"
      >
        {playing ? (
          <Pause
            size={iconSize}
            fill="white"
          />
        ) : (
          <Play
            size={iconSize}
            fill="white"
          />
        )}
      </button>

      {/* Restart */}

      <button
        onClick={onRestart}
        className="
          flex
          p-0
          text-white/45
          hover:text-white
          transition-colors
        "
      >
        <RotateCcw
          size={small ? 11 : 12}
        />
      </button>

      {/* Time */}

      <span
        className="
          text-[10px]
          font-mono
          text-white/45
          tabular-nums
          shrink-0
        "
      >
        {formatTime(currentTime)}
        {" / "}
        {formatTime(duration)}
      </span>

      <div className="flex-1" />

      {/* Mute */}

      <button
        onClick={onMute}
        className="
          flex
          p-0
          text-white/60
          hover:text-white
          transition-colors
        "
      >
        {muted ? (
          <VolumeX
            size={small ? 12 : 14}
          />
        ) : (
          <Volume2
            size={small ? 12 : 14}
          />
        )}
      </button>

      {/* Fullscreen */}

      <button
        onClick={onFullscreen}
        className="
          flex
          p-0
          text-white/60
          hover:text-white
          transition-colors
        "
      >
        {fullscreen ? (
          <Minimize2
            size={small ? 11 : 13}
          />
        ) : (
          <Maximize2
            size={small ? 11 : 13}
          />
        )}
      </button>
    </div>
  );
}

//  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white" }}>
//           {/* <button onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", color: "white", display: "flex", padding: 0 }}>
//             {playing ? <Pause size={iconSize} fill="white" /> : <Play size={iconSize} fill="white" />}
//           </button> */}
//           <button
//   onClick={togglePlay}
//   className="flex items-center justify-center rounded-full transition-colors"
//   style={{
//     width: 40,
//     height: 40,
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "white",
//     flexShrink: 0,
//   }}
// >
//   {playing ? <Pause size={iconSize} fill="white" /> : <Play size={iconSize} fill="white" />}
// </button>

//           <button
//   onClick={restart}
//   className="flex items-center justify-center rounded-full transition-colors"
//   style={{
//     width: 40,
//     height: 40,
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "white",
//     flexShrink: 0,
//   }}
// >
//   <RotateCcw size={iconSize} fill="white" />
// </button>

//           <span style={{ fontFamily: "monospace", fontSize: small ? 9 : 10, color: "rgba(255,255,255,0.45)", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </span>
//           <div style={{ flex: 1 }} />

//           <button
//   onClick={toggleMute}
//   className="flex items-center justify-center rounded-full transition-colors"
//   style={{
//     width: 40,
//     height: 40,
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "white",
//     flexShrink: 0,
//   }}
// >
//   {muted ? <VolumeX size={iconSize ? 12 : 14} /> : <Volume2 size={iconSize ? 12 : 14} />}
// </button>

// <button
//   onClick={toggleFullscreen}
//   className="flex items-center justify-center rounded-full transition-colors"
//   style={{
//     width: 40,
//     height: 40,
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "white",
//     flexShrink: 0,
//   }}
// >
//   {fullscreen ? <Minimize2 size={iconSize ? 11 : 13} /> : <Maximize2 size={iconSize ? 11 : 13} />}
// </button>
  
//         </div>