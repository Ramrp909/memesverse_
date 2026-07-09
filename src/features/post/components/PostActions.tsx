
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

interface PostActionsProps {
  post: FeedItem;
  isLoggedIn?: boolean;

  onAuthRequired?: () => void;
  onOpenDetail?: () => void;
  onShare?: () => void;
}

export default function PostActions({
  post,
  isLoggedIn = false,
  onAuthRequired,
  onOpenDetail,
  onShare,
}: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  function handleLike() {
    if (!isLoggedIn) {
      onAuthRequired?.();
      return;
    }

    if (liked) {
      setLiked(false);
      setLikes((v) => v - 1);
    } else {
      setLiked(true);
      setLikes((v) => v + 1);

      if (disliked) {
        setDisliked(false);
      }
    }
  }

  function handleDislike() {
    if (!isLoggedIn) {
      onAuthRequired?.();
      return;
    }

    if (disliked) {
      setDisliked(false);
      return;
    }

    setDisliked(true);

    if (liked) {
      setLiked(false);
      setLikes((v) => v - 1);
    }
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

          {!isLoggedIn && (
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

          {!isLoggedIn && (
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

          <span>12</span>
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
            {formatNumber(post.views)}
          </span>
        </div>
      </div>

      <button
        onClick={onShare}
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
 {/* actions — two groups, never wrap */}
      // <div className="px-3 py-2.5 flex items-center justify-between gap-2 min-w-0">
      //   {/* left: like · dislike · comments · views */}
      //   <div className="flex items-center gap-1 min-w-0 overflow-hidden">
      //     <button onClick={handleLike}
      //       className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
      //       style={{ fontFamily: B2, background: liked ? "#6366f1" : c.btnBg, color: liked ? "white" : c.btnText }}>
      //       <ThumbsUp size={13} fill={liked ? "white" : "none"} />
      //       <span>{fmtNum(localLikes)}</span>
      //       {!isLoggedIn && <Lock size={9} className="opacity-40" />}
      //     </button>

      //     <button onClick={handleDislike}
      //       className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
      //       style={{ fontFamily: B2, background: disliked ? c.cardEl : c.btnBg, color: disliked ? c.text : c.btnText }}>
      //       <ThumbsDown size={13} fill={disliked ? "currentColor" : "none"} />
      //       {!isLoggedIn && <Lock size={9} className="opacity-40" />}
      //     </button>

      //     <button onClick={onOpenDetail}
      //       className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
      //       style={{ fontFamily: B2, background: c.btnBg, color: c.btnText }}>
      //       <MessageCircle size={13} />
      //       <span>{DUMMY_COMMENTS.length}</span>
      //     </button>

      //     <div className="flex items-center gap-1 px-1.5 text-xs flex-shrink-0" style={{ fontFamily: B2, color: c.textDim }}>
      //       <Eye size={11} /> <span className="hidden xs:inline">{fmtNum(post.views)}</span>
      //     </div>
      //   </div>

      //   {/* right: share — always pinned right, never wraps */}
      //   <button onClick={share}
      //     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
      //     style={{ fontFamily: B2, background: c.btnBg, color: c.btnText }}>
      //     <Share2 size={13} />
      //     <span>Share</span>
      //   </button>
      // </div>