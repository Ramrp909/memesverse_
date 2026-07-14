"use Client";
import { useRef, useState, useCallback, useEffect } from "react";
import { useFullscreen } from "./useFullScreen";
import { useVideoStorage } from "./useVideoStorage";
import { useVideoVisibility } from "./useVideoVisibility";
let activeVideo: HTMLVideoElement | null = null;

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);

const {
  containerRef,
  fullscreen,
  toggleFullscreen,
} = useFullscreen();
  const { saveMuted } = useVideoStorage(
  videoRef,
  setMuted
);
const isVisible = useVideoVisibility(
  videoRef,
  () => {
    const v = videoRef.current;

    if (!v) return;

    if (!v.paused) {
      v.pause();

      setPlaying(false);

      if (activeVideo === v) {
        activeVideo = null;
      }
    }
  }
);


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
    if (activeVideo && activeVideo !== v) {
      activeVideo.pause();
    }

    activeVideo = v;

    try {
      await v.play();
      setPlaying(true);
      scheduleHide();
    } catch {
      setPlaying(false);
    }
  } else {
    v.pause();

    if (activeVideo === v) {
      activeVideo = null;
    }

    setPlaying(false);
    setShowControls(true);

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
  }
}, [scheduleHide]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    saveMuted(v.muted);
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


const isReady =
  !loading &&
  !error &&
  duration > 0;


  useEffect(() => {
    const v = videoRef.current;
    const onWaiting = () => setLoading(true);
const onPlaying = () => setLoading(false);
const onCanPlay = () => setLoading(false);
    if (!v) return;

    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      if (v.buffered.length > 0) {
        setBuffered(v.buffered.end(v.buffered.length - 1));
      }
    };
    const onLoadedMetadata = () => setDuration(v.duration);
    const onEnded = () => { setPlaying(false); setShowControls(true); };

    const onVisibilityChange = () => {
  const v = videoRef.current;
  if (!v) return;

  if (document.visibilityState === "hidden") {
    if (!v.paused) {
      v.pause();
      setPlaying(false);

      if (activeVideo === v) {
        activeVideo = null;
      }
    }
  }
};

document.addEventListener("visibilitychange", onVisibilityChange);

const onError = () => {
  setError(true);
  setLoading(false);
  setPlaying(false);
};

const onLoadedData = () => {
  setError(false);
};



    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("ended", onEnded);
  
    v.addEventListener("waiting", onWaiting);
v.addEventListener("playing", onPlaying);
v.addEventListener("canplay", onCanPlay);
v.addEventListener("error", onError);
v.addEventListener("loadeddata", onLoadedData);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("waiting", onWaiting);
v.removeEventListener("playing", onPlaying);
v.removeEventListener("canplay", onCanPlay);
v.removeEventListener("error", onError);
v.removeEventListener("loadeddata", onLoadedData);

document.removeEventListener(
  "visibilitychange",
  onVisibilityChange
);

  if (videoRef.current) {
      videoRef.current.pause();
   }

   if (activeVideo === videoRef.current) {
      activeVideo = null;
   }
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
    loading,
isVisible,
error,
containerRef,
isReady,
    togglePlay,
    toggleMute,
    restart,
    seek,
    toggleFullscreen,
    revealControls,
  };
}
