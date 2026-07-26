"use client";

import { useState } from "react";
import {
  Eye,
  Lock,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import type { FeedItem } from "@/features/feed/types/feed.model";
import { formatNumber } from "@/shared/utils/number";
import { useInteraction } from "@/features/interactions/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";


interface PostActionsProps {
  post: FeedItem;
  isLoggedIn?: boolean;

  onAuthRequired?: () => void;
  onOpenDetail?: () => void;
  onShare?: () => void;
}

export default function PostActions({
  post,
  onAuthRequired,
  onOpenDetail,
  onShare,
}: PostActionsProps) {
  const [disliked, setDisliked] = useState(false);
const { isAuthenticated } = useAuth();
 const {
  liked,
  likes,
  comments,
  views,
  like,
  share,
} = useInteraction(post.id, {
  likes: post.likes,
  comments: 0,
  views: post.views,
  bookmarks: post.bookmarks,
  shares: post.shares,
});

  async function handleLike() {
  console.log("handleLike");

  if (!isAuthenticated) {
    console.log("Not logged in");
    onAuthRequired?.();
    return;
  }

  console.log("Calling like()");
  await like();
  console.log("Like completed");

  if (disliked) {
    setDisliked(false);
  }
}

  function handleDislike() {
    if (!isAuthenticated) {
      onAuthRequired?.();
      return;
    }

    setDisliked((prev) => !prev);
  }

  async function handleShare() {
    await share();
    onShare?.();
  }

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2.5 min-w-0">
      <div className="flex items-center gap-1 min-w-0 overflow-hidden">
        <button
          onClick={handleLike}
          className="flex flex-shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: liked
              ? "#6366f1"
              : "var(--mv-button-bg)",
            color: liked
              ? "#fff"
              : "var(--mv-button-text)",
          }}
        >
          <ThumbsUp
            size={13}
            fill={liked ? "white" : "none"}
          />

          <span>{formatNumber(likes)}</span>

          {!isAuthenticated && (
            <Lock
              size={9}
              className="opacity-40"
            />
          )}
        </button>

        <button
          onClick={handleDislike}
          className="flex flex-shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: disliked
              ? "var(--mv-card-elevated)"
              : "var(--mv-button-bg)",
            color: disliked
              ? "var(--mv-text)"
              : "var(--mv-button-text)",
          }}
        >
          <ThumbsDown
            size={13}
            fill={disliked ? "currentColor" : "none"}
          />

          {!isAuthenticated && (
            <Lock
              size={9}
              className="opacity-40"
            />
          )}
        </button>

        <button
          onClick={onOpenDetail}
          className="flex flex-shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "var(--mv-button-bg)",
            color: "var(--mv-button-text)",
          }}
        >
          <MessageCircle size={13} />

          <span>{comments}</span>
        </button>

        <div
          className="flex flex-shrink-0 items-center gap-1 px-1.5 text-xs"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--mv-text-dim)",
          }}
        >
          <Eye size={11} />

          <span className="hidden xs:inline">
            {formatNumber(views)}
          </span>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "var(--mv-button-bg)",
          color: "var(--mv-button-text)",
        }}
      >
        <Share2 size={13} />
        <span>Share</span>
      </button>
    </div>
  );
}