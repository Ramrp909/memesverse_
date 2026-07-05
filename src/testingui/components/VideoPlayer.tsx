"use client";

import {
  ThumbsUp, ThumbsDown, Share2, X, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  MessageCircle, Eye, Send, ChevronLeft, Link, Settings,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback} from "react";
import { useTheme, C } from "../context/ThemeContext";
import { pad } from "../utils/helpers";


export default function VideoPlayer({ src, poster, compact = false }: { src: string; poster?: string; compact?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const vidRef  = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [show, setShow]         = useState(true);
  const [isFS, setIsFS]         = useState(false);
  // const timer = useRef<ReturnType<typeof setTimeout>>();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function bump() {
    setShow(true);
    if (timer.current) {
  clearTimeout(timer.current);
}
    timer.current = setTimeout(() => { if (vidRef.current && !vidRef.current.paused) setShow(false); }, 2600);
  }

  useEffect(() => {
    const onFS = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFS);
    return () => { if (timer.current) {
  clearTimeout(timer.current);
}; document.removeEventListener("fullscreenchange", onFS); };
  }, []);

  function togglePlay(e: React.MouseEvent) {
    e.stopPropagation();
    const v = vidRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); bump(); }
    else { v.pause(); setPlaying(false); setShow(true); }
  }
  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const v = vidRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted); bump();
  }
  function seek(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const v = vidRef.current; if (!v || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * duration; bump();
  }
  function restart(e: React.MouseEvent) {
    e.stopPropagation();
    if (vidRef.current) vidRef.current.currentTime = 0; bump();
  }
  async function toggleFS(e: React.MouseEvent) {
    e.stopPropagation();
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    // try container div first
    try {
      await wrapRef.current?.requestFullscreen();
      return;
    } catch {}
    // try video element
    try {
      await vidRef.current?.requestFullscreen();
      return;
    } catch {}
    // webkit fallback (Safari/iOS)
    const v = vidRef.current as any;
    if (v?.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (v?.webkitRequestFullscreen) v.webkitRequestFullscreen();
  }

  function fmtT(s: number) { return `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`; }

  const sm = compact && !isFS;

  return (
    <div ref={wrapRef}
      className="relative w-full bg-black select-none"
      style={{ position: "relative", aspectRatio: isFS ? "unset" : "16/9", height: isFS ? "100dvh" : undefined }}
      onMouseMove={bump} onMouseLeave={() => { if (playing) setShow(false); }} onTouchStart={bump}>

      <video ref={vidRef} src={src} poster={poster} muted={muted} loop preload="metadata" playsInline
        className="w-full h-full object-contain" onClick={togglePlay}
        onTimeUpdate={() => { const v = vidRef.current; if (!v) return; setProgress(v.currentTime); if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1)); }}
        onLoadedMetadata={() => { if (vidRef.current) setDuration(vidRef.current.duration); }}
        onEnded={() => { setPlaying(false); setShow(true); }} />

      {/* centre play */}
      {!playing && (
        <button onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.22)" }}>
          <div style={{ width: sm ? 44 : 58, height: sm ? 44 : 58, borderRadius: "50%",
            background: "linear-gradient(135deg,rgba(99,102,241,.93),rgba(139,92,246,.93))",
            backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 22px rgba(99,102,241,.45)" }}>
            <Play size={sm ? 18 : 24} fill="white" className="ml-1 text-white" />
          </div>
        </button>
      )}

      {/* controls */}
      <div className="absolute bottom-0 left-0 right-0 transition-opacity duration-300"
        style={{ opacity: show ? 1 : 0, background: "linear-gradient(to top,rgba(0,0,0,.9) 0%,transparent 100%)", padding: sm ? "22px 10px 8px" : "36px 14px 12px" }}>
        {/* scrub */}
        <div className="w-full rounded-full mb-2 cursor-pointer relative group"
          style={{ height: sm ? 3 : 4, background: "rgba(255,255,255,.15)" }} onClick={seek}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: duration ? `${(buffered/duration)*100}%` : "0%", background: "rgba(255,255,255,.2)" }} />
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: duration ? `${(progress/duration)*100}%` : "0%", background: "linear-gradient(90deg,#6366f1,#818cf8)" }} />
          <div className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-transform group-hover:scale-125"
            style={{ width: sm ? 9 : 12, height: sm ? 9 : 12, boxShadow: "0 0 6px rgba(129,140,248,.6)",
              left: duration ? `calc(${(progress/duration)*100}% - ${sm ? 4.5 : 6}px)` : "-6px" }} />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="text-white hover:text-indigo-300 transition-colors flex-shrink-0">
            {playing ? <Pause size={sm ? 13 : 15} fill="white" /> : <Play size={sm ? 13 : 15} fill="white" />}
          </button>
          <button onClick={restart} className="text-white/40 hover:text-white transition-colors flex-shrink-0">
            <RotateCcw size={sm ? 11 : 12} />
          </button>
          <span className="text-white/45 tabular-nums flex-shrink-0" style={{ fontFamily: "monospace", fontSize: sm ? 9 : 10 }}>
            {fmtT(progress)} / {fmtT(duration)}
          </span>
          <div className="flex-1" />
          <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors flex-shrink-0">
            {muted ? <VolumeX size={sm ? 12 : 14} /> : <Volume2 size={sm ? 12 : 14} />}
          </button>
          <button onClick={toggleFS} className="text-white/60 hover:text-white transition-colors flex-shrink-0" title={isFS ? "Exit fullscreen" : "Fullscreen"}>
            {isFS ? <Minimize2 size={sm ? 11 : 13} /> : <Maximize2 size={sm ? 11 : 13} />}
          </button>
        </div>
      </div>
    </div>
  );
}