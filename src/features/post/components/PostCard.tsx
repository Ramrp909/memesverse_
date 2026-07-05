import { useState } from "react";
import type { FeedItem } from "@/features/feed/types/feed.model";
// import { VideoPlayer } from "../video/VideoPlayer";

import { PostActions } from "./PostActions";
import { VideoPlayer } from "@/features/video/components/VideoPlayer";

interface Props {
  post: FeedItem;
  index: number;
  total: number;
  onOpenDetail?: (post: FeedItem) => void;
  onAuthRequired?: () => void;
  onShare?: () => void;
}

export function PostCard({ post, index, total, onOpenDetail, onAuthRequired, onShare }: Props) {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <article style={{ background: "var(--mv-card)", border: "1px solid var(--mv-border)", borderRadius: 16, overflow: "hidden", transition: "box-shadow 200ms, transform 200ms", boxShadow: "0 10px 30px rgba(0,0,0,0.14)" }}>
      {/* Header strip */}
      <div
        onClick={() => onOpenDetail?.(post)}
        style={{ padding: "10px 14px", borderBottom: "1px solid var(--mv-border-sub)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: "rgba(255,255,255,0.01)" }}
      >
        <span style={{ fontFamily: "'Onest', sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mv-text-dim)" }}>
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span style={{
          background: post.mediaType === "video" ? "rgba(99,102,241,0.15)" : "rgba(129,140,248,0.08)",
          color: post.mediaType=== "video" ? "#818cf8" : "var(--mv-text-muted)",
          fontFamily: "'Onest', sans-serif", fontWeight: 700, fontSize: 10,
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "2px 8px", borderRadius: 9999,
        }}>
          {post.mediaType === "video" ? "▶ Video" : "Photo"}
        </span>
      </div>

      {/* Media */}
      <div style={{ background: "#000", width: "100%", position: "relative" }}>
        {post.mediaType === "video" ? (
          <VideoPlayer src={post.mediaUrl} poster={post.thumbnailUrl} small />
        ) : (
          <div
            style={{ position: "relative", overflow: "hidden", maxHeight: 440, display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            onClick={() => onOpenDetail?.(post)}
          >
            <img
              src={post.mediaUrl}
              alt={post.title || "untitled"}
              style={{ width: "100%", objectFit: "cover", maxHeight: 440, transform: imgHovered ? "scale(1.01)" : "scale(1)", transition: "transform 500ms", cursor: "pointer", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "black", opacity: imgHovered ? 0.12 : 0, transition: "opacity 300ms" }} />
          </div>
        )}
      </div>

      {/* Caption */}
      <div
        onClick={() => onOpenDetail?.(post)}
        style={{ padding: "12px 16px 4px", cursor: "pointer" }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.5, color: "var(--mv-text-mid)", margin: 0 }}>
          {post.title || "untitled"}
        </p>
      </div>

      {/* Actions */}
      <div style={{ padding: "10px 12px 12px" }}>
        <PostActions
          post={post}
          onComment={() => onOpenDetail?.(post)}
          onAuthRequired={onAuthRequired}
          onShare={onShare}
        />
      </div>
    </article>
  );
}
