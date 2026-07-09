"use client";

import type { FeedItem } from "@/features/feed/types/feed.model";

interface PostHeaderProps {
  post: FeedItem;
  index: number;
  total: number;
  onOpenDetail: () => void;
}

export default function PostHeader({
  post,
  index,
  total,
  onOpenDetail,
}: PostHeaderProps) {
  const isVideo = post.mediaType === "video";

  return (
    <div
      className="flex cursor-pointer items-center justify-between border-b px-4 py-2.5 transition-colors"
      style={{
        borderColor: "var(--mv-border-subtle)",
      }}
      onClick={onOpenDetail}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{
          fontFamily: "'Onest', sans-serif",
          color: "var(--mv-text-dim)",
        }}
      >
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </span>

      <span
        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
        style={{
          fontFamily: "'Onest', sans-serif",
          background: isVideo
            ? "rgba(99,102,241,0.15)"
            : "rgba(129,140,248,0.08)",
          color: isVideo
            ? "#818cf8"
            : "var(--mv-text-muted)",
        }}
      >
        {isVideo ? "▶ Video" : "Photo"}
      </span>
    </div>
  );
}