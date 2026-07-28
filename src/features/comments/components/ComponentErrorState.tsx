interface CommentErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function CommentErrorState({
  message,
  onRetry,
}: CommentErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p
        className="text-sm"
        style={{
          color: "var(--mv-text-muted)",
        }}
      >
        {message}
      </p>

      <button
        onClick={onRetry}
        className="mt-4 rounded-lg px-4 py-2"
        style={{
          background: "var(--mv-primary)",
          color: "white",
        }}
      >
        Retry
      </button>
    </div>
  );
}