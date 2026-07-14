interface Props {
  progress: number;
  bufferedPct: number;
  small?: boolean;
  onSeek: (
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export default function VideoProgress({
  progress,
  bufferedPct,
  small = false,
  onSeek,
}: Props) {
  return (
    <div
      onClick={onSeek}
      className="relative w-full cursor-pointer rounded-full"
      style={{
        height: small ? 3 : 4,
        background: "rgba(255,255,255,.15)",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${bufferedPct * 100}%`,
          background:
            "rgba(255,255,255,.20)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg,#6366f1,#818cf8)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: `${progress * 100}%`,
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: small ? 9 : 12,
          height: small ? 9 : 12,
          borderRadius: "50%",
          background: "white",
        }}
      />
    </div>
  );
}