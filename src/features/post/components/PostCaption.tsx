"use client";

import type { FeedItem } from "@/features/feed/types/feed.model";

interface PostCaptionProps {
  post: FeedItem;
  onOpenDetail: () => void;
}

export default function PostCaption({
  post,
  onOpenDetail,
}: PostCaptionProps) {
  return (
    <div
      className="cursor-pointer px-4 pt-3 pb-1"
      onClick={onOpenDetail}
    >
      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "var(--mv-text-mid)",
        }}
      >
        {post.title}
      </p>
    </div>
  );
}