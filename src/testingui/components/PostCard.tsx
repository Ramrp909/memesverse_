"use client";

import { useState, useEffect, useRef, useCallback} from "react";
import {
  ThumbsUp, ThumbsDown, Share2, X, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  MessageCircle, Eye, Send, ChevronLeft, Link, Settings,
} from "lucide-react";
import {
  ThemeCtx,
  useTheme,
  C,
  tc,
} from "../context/ThemeContext"
import { Post } from "../types/post";
import { handleShare } from "../utils/share";
import ShareToast from "./ShareToast";
import VideoPlayer from "./VideoPlayer";
import { fmtNum } from "../utils/helpers";
import { DUMMY_COMMENTS } from "../data/comments";



export default function PostCard({ post, index, total, isLoggedIn, onAuthPrompt, onOpenDetail }: {
  post: Post; index: number; total: number; isLoggedIn: boolean; onAuthPrompt: () => void; onOpenDetail: () => void;
}) {
  const dark = useTheme();
  const c = C(dark);
  const [liked, setLiked]           = useState(false);
  const [disliked, setDisliked]     = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [showToast, setShowToast]   = useState(false);

  const D2 = "'Onest',sans-serif";
  const B2 = "'DM Sans',sans-serif";

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isLoggedIn) { onAuthPrompt(); return; }
    if (liked) { setLiked(false); setLocalLikes(n => n - 1); }
    else { setLiked(true); setLocalLikes(n => n + 1); if (disliked) setDisliked(false); }
  }
  function handleDislike(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isLoggedIn) { onAuthPrompt(); return; }
    if (disliked) setDisliked(false);
    else { setDisliked(true); if (liked) { setLiked(false); setLocalLikes(n => n - 1); } }
  }
  async function share(e: React.MouseEvent) {
    e.stopPropagation();
    const hadShare = !!navigator.share;
    await handleShare(post.caption);
    if (!hadShare) { setShowToast(true); setTimeout(() => setShowToast(false), 2500); }
  }

  return (
    <article className="overflow-hidden border transition-all duration-200 rounded-xl"
      style={{ background: c.card, borderColor: c.border }}>
      <ShareToast show={showToast} />

      {/* top strip */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b cursor-pointer transition-colors"
        style={{ borderColor: c.borderSub }}
        onClick={onOpenDetail}>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: D2, color: c.textDim }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
          style={{ fontFamily: D2, background: post.type === "video" ? "rgba(99,102,241,0.15)" : "rgba(129,140,248,0.08)", color: post.type === "video" ? "#818cf8" : c.textMuted }}>
          {post.type === "video" ? "▶ Video" : "Photo"}
        </span>
      </div>

      {/* media */}
      <div className="bg-black"
        onClick={post.type === "image" ? onOpenDetail : undefined}
        style={{ cursor: post.type === "image" ? "pointer" : "default" }}>
        {post.type === "video"
          ? <VideoPlayer src={post.src} poster={post.poster} compact />
          : (
            <div className="relative overflow-hidden group">
              <img src={post.src} alt="meme" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]" style={{ maxHeight: 440 }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-all" />
            </div>
          )}
      </div>

      {/* caption */}
      <div className="px-4 pt-3 pb-1 cursor-pointer" onClick={onOpenDetail}>
        <p className="text-sm leading-relaxed" style={{ fontFamily: B2, color: c.textMid }}>{post.caption}</p>
      </div>

      {/* actions — two groups, never wrap */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 min-w-0">
        {/* left: like · dislike · comments · views */}
        <div className="flex items-center gap-1 min-w-0 overflow-hidden">
          <button onClick={handleLike}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
            style={{ fontFamily: B2, background: liked ? "#6366f1" : c.btnBg, color: liked ? "white" : c.btnText }}>
            <ThumbsUp size={13} fill={liked ? "white" : "none"} />
            <span>{fmtNum(localLikes)}</span>
            {!isLoggedIn && <Lock size={9} className="opacity-40" />}
          </button>

          <button onClick={handleDislike}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
            style={{ fontFamily: B2, background: disliked ? c.cardEl : c.btnBg, color: disliked ? c.text : c.btnText }}>
            <ThumbsDown size={13} fill={disliked ? "currentColor" : "none"} />
            {!isLoggedIn && <Lock size={9} className="opacity-40" />}
          </button>

          <button onClick={onOpenDetail}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
            style={{ fontFamily: B2, background: c.btnBg, color: c.btnText }}>
            <MessageCircle size={13} />
            <span>{DUMMY_COMMENTS.length}</span>
          </button>

          <div className="flex items-center gap-1 px-1.5 text-xs flex-shrink-0" style={{ fontFamily: B2, color: c.textDim }}>
            <Eye size={11} /> <span className="hidden xs:inline">{fmtNum(post.views)}</span>
          </div>
        </div>

        {/* right: share — always pinned right, never wraps */}
        <button onClick={share}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
          style={{ fontFamily: B2, background: c.btnBg, color: c.btnText }}>
          <Share2 size={13} />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}