"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useFullscreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;

    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFsChange);

    return () =>
      document.removeEventListener(
        "fullscreenchange",
        onFsChange
      );
  }, []);

  return {
    containerRef,
    fullscreen,
    toggleFullscreen,
  };
}