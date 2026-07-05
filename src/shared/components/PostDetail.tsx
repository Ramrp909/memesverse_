"use client";

import { X, ArrowLeft, Share2, ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import type { FeedItem } from "@/features/feed/types/feed.model";
import { VideoPlayer } from "@/features/video/components/VideoPlayer";

interface Props {
  post: FeedItem | null;
  open: boolean;
  onClose: () => void;
  onAuthRequired?: () => void;
  onShare?: () => void;
}

export function PostDetail({ post, open, onClose, onAuthRequired, onShare }: Props) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, author: "Mina", text: "This is literally me every single Monday morning 💀", time: "2h ago", likes: 342 },
    { id: 2, author: "Ari", text: "Perfect timing for this drop.", time: "1h ago", likes: 189 },
  ]);

  const isLoggedIn = false;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleComment = () => {
    if (!comment.trim()) return;
    if (!isLoggedIn) {
      onAuthRequired?.();
      return;
    }
    setComments((prev) => [...prev, { id: Date.now(), author: "You", text: comment.trim(), time: "just now", likes: 0 }]);
    setComment("");
  };

  if (!open || !post) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[var(--mv-overlay)] px-0 py-0 backdrop-blur-sm sm:items-center sm:px-3 sm:py-4">
      <div className="relative h-full w-full overflow-hidden rounded-none border border-[var(--mv-border)] bg-[var(--mv-card)] shadow-2xl sm:h-[90vh] sm:max-h-[760px] sm:w-[min(92vw,980px)] sm:rounded-[24px]">
        <div className="flex items-center justify-between border-b border-[var(--mv-border-sub)] px-4 py-3 sm:px-5">
          <button onClick={onClose} className="flex items-center gap-2 rounded-full bg-[var(--mv-btn-bg)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--mv-text-mid)]">
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">{post.mediaType === "video" ? "Video" : "Photo"}</span>
          <button onClick={onClose} className="rounded-full bg-[var(--mv-btn-bg)] p-2 text-[var(--mv-text-mid)]">
            <X size={16} />
          </button>
        </div>

        <div className="flex h-[calc(100%-56px)] flex-col overflow-hidden md:flex-row">
          <div className="flex-1 overflow-y-auto border-b border-[var(--mv-border-sub)] bg-black/80 md:border-b-0 md:border-r">
            <div className="bg-[var(--mv-card-el)] p-3 sm:p-4">
              {post.mediaType === "video" ? (
                <VideoPlayer src={post.mediaUrl} poster={post.thumbnailUrl} />
              ) : (
                <img src={post.mediaUrl} alt={post.title} className="w-full rounded-[14px] object-cover" style={{ maxHeight: 520 }} />
              )}
            </div>
            <div className="space-y-3 px-4 py-4 sm:px-5">
              <p className="text-sm leading-6 text-[var(--mv-text-mid)]">{post.title}</p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">
                <span className="flex items-center gap-1 rounded-full bg-[var(--mv-btn-bg)] px-2.5 py-1.5"><ThumbsUp size={12} /> {post.likes}</span>
                <span className="flex items-center gap-1 rounded-full bg-[var(--mv-btn-bg)] px-2.5 py-1.5"><Eye size={12} /> {post.views}</span>
                <button onClick={onShare} className="flex items-center gap-1 rounded-full bg-[var(--mv-btn-bg)] px-2.5 py-1.5"><Share2 size={12} /> Share</button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col md:w-[340px]">
            <div className="flex items-center justify-between border-b border-[var(--mv-border-sub)] px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">
              <span>Comments</span>
              <span>{comments.length}</span>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {comments.map((entry) => (
                <div key={entry.id} className="rounded-[14px] border border-[var(--mv-border)] bg-[var(--mv-card-el)] p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-[var(--mv-text)]">{entry.author}</div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">{entry.time}</div>
                  </div>
                  <div className="text-sm leading-6 text-[var(--mv-text-mid)]">{entry.text}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--mv-text-dim)]">{entry.likes} likes</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--mv-border-sub)] p-3 sm:p-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder={isLoggedIn ? "Write a comment…" : "Sign in to comment"}
                className="w-full rounded-[14px] border border-[var(--mv-border)] bg-[var(--mv-input-bg)] px-3 py-2.5 text-sm text-[var(--mv-text)] outline-none ring-0 placeholder:text-[var(--mv-text-dim)]"
              />
              <button onClick={handleComment} className="mt-3 w-full rounded-[12px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-3 py-2.5 text-sm font-semibold text-white">
                {isLoggedIn ? "Post comment" : "Sign in to comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
