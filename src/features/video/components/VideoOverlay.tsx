import { Play } from "lucide-react";

interface Props {
  playing: boolean;
  small?: boolean;
  onPlay: () => void;
}

export default function VideoOverlay({
  playing,
  small = false,
  onPlay,
}: Props) {
  if (playing) return null;

  return (
    <div
      onClick={onPlay}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,.22)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: small ? 44 : 58,
          height: small ? 44 : 58,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:
            "0 0 24px rgba(99,102,241,.45)",
        }}
      >
        <Play
          size={small ? 18 : 24}
          fill="white"
          color="white"
          style={{ marginLeft: 3 }}
        />
      </div>
    </div>
  );
}