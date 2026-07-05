"use client";
import { useState, useEffect, useRef, useCallback} from "react";
import {
  ThumbsUp, ThumbsDown, Share2, X, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  MessageCircle, Eye, Send, ChevronLeft, Link, Settings,
} from "lucide-react";
import { useTheme, C } from "../context/ThemeContext";
import { Post } from "../types/post";
import { handleShare } from "../utils/share";
import ShareToast from "./ShareToast";
import VideoPlayer from "./VideoPlayer";
import { fmtNum } from "../utils/helpers";
import { Comment } from "../types/comment";
import { DUMMY_COMMENTS } from "../data/comments";



export default function PostDetail({ post, onClose, isLoggedIn, onAuthPrompt }: {
  post: Post; onClose: () => void; isLoggedIn: boolean; onAuthPrompt: () => void;
}) {
  const dark = useTheme();
  const c = C(dark);
  const [liked, setLiked]       = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  function toggleLike() { if (!isLoggedIn) { onAuthPrompt(); return; } setLiked(l => !l); if (!liked && disliked) setDisliked(false); }
  function toggleDislike() { if (!isLoggedIn) { onAuthPrompt(); return; } setDisliked(d => !d); if (!disliked && liked) setLiked(false); }

  async function share() {
    const hadShare = !!navigator.share;
    await handleShare(post.caption);
    if (!hadShare) { setShowToast(true); setTimeout(() => setShowToast(false), 2500); }
  }

  function submitComment() {
    if (!isLoggedIn) { onAuthPrompt(); return; }
    if (!commentText.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(), user: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&auto=format",
      text: commentText.trim(), time: "just now", likes: 0,
    }]);
    setCommentText("");
  }

  const D2 = "'Onest',sans-serif";
  const B2 = "'DM Sans',sans-serif";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center md:p-4"
      style={{ background: dark ? "rgba(8,9,14,0.95)" : "rgba(200,200,220,0.85)", backdropFilter: "blur(16px)" }}
    >
      <ShareToast show={showToast} />

      {/* modal container: fullscreen on mobile, split card on md+ */}
      <div
        className="flex flex-col md:flex-row w-full md:rounded-2xl overflow-hidden border shadow-2xl"
        style={{ maxWidth: 980, height: "100%", maxHeight: "100dvh", background: c.card, borderColor: c.border }}
      >
        {/* left / top: media */}
        <div className="flex flex-col md:flex-1 min-h-0">
          {/* top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: c.borderSub }}>
            <button onClick={onClose} className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ fontFamily: B2, color: c.textMuted }}>
              <ChevronLeft size={15} /> Back
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider"
              style={{ fontFamily: D2, color: c.textDim }}>
              {post.type === "video" ? "▶ Video" : "Image"}
            </span>
          </div>

          {/* media area */}
          <div className="flex items-center justify-center bg-black flex-shrink-0"
            style={{ maxHeight: post.type === "image" ? "50vh" : undefined }}>
            {post.type === "video"
              ? (
                <div className="w-full" style={{ aspectRatio: "16/9" }}>
                  <VideoPlayer src={post.src} poster={post.poster} />
                </div>
              )
              : <img src={post.src} alt="meme" className="w-full object-contain" style={{ maxHeight: "50vh" }} />
            }
          </div>

          {/* caption + actions */}
          <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: c.borderSub }}>
            <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: B2, color: c.textMid }}>{post.caption}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={toggleLike}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ fontFamily: B2, background: liked ? "#6366f1" : c.btnBg, color: liked ? "white" : c.btnText }}>
                <ThumbsUp size={14} fill={liked ? "white" : "none"} />
                {fmtNum(post.likes + (liked ? 1 : 0))}
                {!isLoggedIn && <Lock size={10} />}
              </button>
              <button onClick={toggleDislike}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ fontFamily: B2, background: disliked ? c.cardEl : c.btnBg, color: disliked ? c.text : c.btnText }}>
                <ThumbsDown size={14} fill={disliked ? "currentColor" : "none"} />
                {!isLoggedIn && <Lock size={10} />}
              </button>
              <div className="flex items-center gap-1.5 text-xs ml-1" style={{ fontFamily: B2, color: c.textMuted }}>
                <Eye size={12} /> {fmtNum(post.views)}
              </div>
              <div className="flex-1" />
              <button onClick={share}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ fontFamily: B2, background: c.btnBg, color: c.btnText }}>
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* right / bottom: comments — flex-1 + overflow on mobile */}
        <div
          className="flex flex-col flex-1 md:flex-none border-t md:border-t-0 md:border-l min-h-0"
          style={{ borderColor: c.borderSub, width: undefined }}
        >
          <div className="flex flex-col h-full md:w-80">
            {/* comments header */}
            <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: c.borderSub }}>
              <h3 className="text-sm font-bold" style={{ fontFamily: D2, color: c.text }}>
                Comments <span style={{ color: c.textDim }}>({comments.length})</span>
              </h3>
              <button onClick={onClose} className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                style={{ color: c.textMuted }}>
                <X size={14} />
              </button>
            </div>

            {/* scrollable comments list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {comments.map((cm) => (
                <div key={cm.id} className="flex gap-3">
                  <img src={cm.avatar} alt={cm.user} className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-bold" style={{ fontFamily: D2, color: c.text }}>{cm.user}</span>
                      <span className="text-[10px]" style={{ fontFamily: B2, color: c.textDim }}>{cm.time}</span>
                    </div>
                    <p className="text-sm leading-snug" style={{ fontFamily: B2, color: c.textMid }}>{cm.text}</p>
                    <button className="flex items-center gap-1 mt-1 text-[10px] transition-colors" style={{ color: c.textMuted }}>
                      <ThumbsUp size={9} /> {cm.likes > 0 ? cm.likes : "Like"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* fixed comment input */}
            <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: c.borderSub }}>
              {isLoggedIn ? (
                <div className="flex gap-2 items-end">
                  <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitComment(); } }}
                    placeholder="Add a comment…" rows={2}
                    className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none resize-none transition-colors"
                    style={{ fontFamily: B2, background: c.inputBg, borderColor: c.inputBdr, color: c.text }} />
                  <button onClick={submitComment} disabled={!commentText.trim()}
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30"
                    style={{ background: "#6366f1" }}>
                    <Send size={14} className="text-white" />
                  </button>
                </div>
              ) : (
                <button onClick={onAuthPrompt}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all"
                  style={{ fontFamily: B2, borderColor: c.border, color: c.textMuted }}>
                  <Lock size={13} /> Sign in to comment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}