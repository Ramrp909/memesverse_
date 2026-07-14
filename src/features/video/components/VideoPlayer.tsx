import { useRef } from "react";
import { useVideoPlayer } from "@/features/video/hooks/useVideoPlayer";
import VideoOverlay from "./VideoOverlay";
import VideoProgress from "./VideoProgress";
import VideoControls from "./VideoControls";
import VideoLoading from "./VideoLoading";

interface Props {
  src: string;
  poster?: string;
  small?: boolean;
}

export default function VideoPlayer({ src, poster, small = false }: Props) {
 
  const {
    videoRef, playing, muted, currentTime, duration,
    progress, bufferedPct, showControls, fullscreen,containerRef,
    togglePlay, toggleMute, restart, seek, toggleFullscreen, revealControls,loading,
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
      style={{ position: "relative", width: "100%", aspectRatio: fullscreen ? "auto" : "16/9", height: fullscreen ? "100dvh" : undefined, background: "#000", userSelect: "none", borderRadius: small ? 10 : 12, overflow: "hidden" }}
      onMouseMove={revealControls}
      onTouchStart={revealControls}
    >
      <video
        ref={videoRef}
        onClick={togglePlay}
        src={src}
        poster={poster}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        playsInline
        loop
        muted
        preload="metadata"
      />
<VideoLoading loading={loading} />

      {/* Center play overlay */}
       <VideoOverlay
    playing={playing}
    small={small}
    onPlay={togglePlay}
/>

      {/* Controls bar */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,zIndex:20,
          background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, transparent 100%)",
          padding: small ? "22px 10px 8px" : "36px 14px 12px",
          opacity: showControls || !playing ? 1 : 0,
          transition: "opacity 300ms",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        <VideoProgress
    progress={progress}
    bufferedPct={bufferedPct}
    small={small}
    onSeek={handleSeekClick}
/>
        {/* Buttons row */}
       <VideoControls
  playing={playing}
  muted={muted}
  fullscreen={fullscreen}
  currentTime={currentTime}
  duration={duration}
  small={small}
  onPlayPause={togglePlay}
  onRestart={restart}
  onMute={toggleMute}
  onFullscreen={toggleFullscreen}
/>
      </div>

      {/* Click-to-toggle when playing */}
      {/* {playing && (
        <div
  onClick={togglePlay}
  style={{
    position: "absolute",top:0,left:0,right:0,bottom:60,
    zIndex:10,
    inset: 0,
    cursor: "pointer",
    // background: "rgba(255,0,0,.2)",
  }}
/>
      )} */}
    </div>
  );
}
