"use Client";
import { useRef, useState, useCallback, useEffect } from "react";

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2600);
  }, []);

  const revealControls = useCallback(() => {
    setShowControls(true);
    if (playing) scheduleHide();
  }, [playing, scheduleHide]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      await v.play();
      setPlaying(true);
      scheduleHide();
    } else {
      v.pause();
      setPlaying(false);
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    }
  }, [scheduleHide]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const restart = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    revealControls();
  }, [revealControls]);

  const seek = useCallback((pct: number) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = pct * duration;
    revealControls();
  }, [duration, revealControls]);

  const toggleFullscreen = useCallback(() => {
    const el = videoRef.current?.parentElement;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      if (v.buffered.length > 0) {
        setBuffered(v.buffered.end(v.buffered.length - 1));
      }
    };
    const onLoadedMetadata = () => setDuration(v.duration);
    const onEnded = () => { setPlaying(false); setShowControls(true); };
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);

    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("ended", onEnded);
    document.addEventListener("fullscreenchange", onFsChange);

    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("fullscreenchange", onFsChange);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const progress = duration > 0 ? currentTime / duration : 0;
  const bufferedPct = duration > 0 ? buffered / duration : 0;

  return {
    videoRef,
    playing,
    muted,
    currentTime,
    duration,
    progress,
    bufferedPct,
    showControls,
    fullscreen,
    togglePlay,
    toggleMute,
    restart,
    seek,
    toggleFullscreen,
    revealControls,
  };
}
