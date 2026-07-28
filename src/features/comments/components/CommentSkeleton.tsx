export default function CommentSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 animate-pulse"
        >
          <div className="h-7 w-7 rounded-full bg-[var(--mv-surface)]" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-[var(--mv-surface)]" />

            <div className="h-3 w-full rounded bg-[var(--mv-surface)]" />

            <div className="h-3 w-3/4 rounded bg-[var(--mv-surface)]" />

            <div className="h-2 w-12 rounded bg-[var(--mv-surface)]" />
          </div>
        </div>
      ))}
    </div>
  );
}