"use client";

import { useEffect, useState } from "react";

export function useVideoVisibility(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onLeave: () => void
) {
  const [isVisible, setVisible] =
    useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);

          if (!entry.isIntersecting) {
            onLeave();
          }
        },
        {
          threshold: 0.4,
        }
      );

    observer.observe(video);

    return () => observer.disconnect();
  }, [videoRef, onLeave]);

  return isVisible;
}