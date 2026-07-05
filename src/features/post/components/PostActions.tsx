import { useMemo, useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Share2, Lock } from "lucide-react";
import type { CSSProperties } from "react";

import type { FeedItem } from "@/features/feed/types/feed.model";

interface Props {
  post: FeedItem;
  size?: "sm" | "lg";
  onComment?: () => void;
  onAuthRequired?: () => void;
  onShare?: () => void;
}

export function PostActions({ post, size = "sm", onComment, onAuthRequired, onShare }: Props) {
  const isLoggedIn = false;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(0);

  const formatNumber = (value: number) =>
  new Intl.NumberFormat().format(value);

  const commentCount = useMemo(() => Math.max(1, Math.floor(post.views / 16000)), [post.views]);

  const px = size === "lg" ? "px-3 py-2" : "px-2.5 py-1.5";
  const iconSize = 13;
  const fontSize = 12;

  function handleLike() {
    if (!isLoggedIn) { onAuthRequired?.(); return; }
    if (liked) { setLiked(false); setLikes(l => l - 1); }
    else { setLiked(true); setLikes(l => l + 1); if (disliked) { setDisliked(false); setDislikes(d => d - 1); } }
  }

  function handleDislike() {
    if (!isLoggedIn) { onAuthRequired?.(); return; }
    if (disliked) { setDisliked(false); setDislikes(d => d - 1); }
    else { setDisliked(true); setDislikes(d => d + 1); if (liked) { setLiked(false); setLikes(l => l - 1); } }
  }

  async function handleShare() {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
    onShare?.();
  }

  const btnStyle = (active: boolean, activeColor?: string): CSSProperties => ({
    display: "flex", alignItems: "center", gap: 6,
    padding: size === "lg" ? "8px 12px" : "6px 10px",
    background: active ? (activeColor ?? "#6366f1") : "var(--mv-btn-bg)",
    color: active ? "white" : "var(--mv-btn-text)",
    border: "1px solid transparent", borderRadius: 10, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize,
    transition: "all 200ms",
    flexShrink: 0,
    boxShadow: active ? "0 8px 18px rgba(99,102,241,0.22)" : "none",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, overflow: "hidden", paddingTop: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}>
        {/* Like */}
        <button style={btnStyle(liked)} onClick={handleLike}>
          <ThumbsUp size={iconSize} fill={liked ? "white" : "none"} />
          {formatNumber(likes)}
          {!isLoggedIn && <Lock size={9} style={{ opacity: 0.4 }} />}
        </button>
        {/* Dislike */}
        <button style={btnStyle(disliked, "var(--mv-card-el)")} onClick={handleDislike}>
          <ThumbsDown size={iconSize} fill={disliked ? "currentColor" : "none"} />
          {formatNumber(dislikes)}
          {!isLoggedIn && <Lock size={9} style={{ opacity: 0.4 }} />}
        </button>
        {/* Comment */}
        {onComment && (
          <button style={btnStyle(false)} onClick={onComment}>
            <MessageCircle size={iconSize} />
            {commentCount}
          </button>
        )}
        {/* Views */}
        <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 6px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--mv-text-dim)", flexShrink: 0 }}
          className="hidden sm:flex">
          <Eye size={11} /> {formatNumber(post.views)}
        </span>
      </div>

      {/* Share */}
      <button style={{ ...btnStyle(false), flexShrink: 0 }} onClick={handleShare}>
        <Share2 size={iconSize} /> Share
      </button>
    </div>
  );
}
