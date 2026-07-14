interface Props {
  loading: boolean;
}

export default function VideoLoading({
  loading,
}: Props) {
  if (!loading) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,.25)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{
          borderColor: "#818cf8",
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
}