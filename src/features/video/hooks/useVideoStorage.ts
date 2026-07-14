"use client";

import { useEffect } from "react";

export function useVideoStorage(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  setMuted: (v: boolean) => void
) {
  useEffect(() => {
    const saved = localStorage.getItem("mv-video-muted");

    if (saved === null) return;

    const muted = saved === "true";

    if (videoRef.current) {
      videoRef.current.muted = muted;
    }

    setMuted(muted);
  }, [videoRef, setMuted]);

  function saveMuted(value: boolean) {
    localStorage.setItem(
      "mv-video-muted",
      String(value)
    );
  }

  return {
    saveMuted,
  };
}