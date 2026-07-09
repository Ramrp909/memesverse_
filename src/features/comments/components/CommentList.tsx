"use client";

import { ThumbsUp } from "lucide-react";
import type { Comment } from "../types/comment";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({
  comments,
}: CommentListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-3"
        >
          <img
            src={comment.avatar}
            alt={comment.user}
            className="mt-0.5 h-7 w-7 flex-shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex flex-wrap items-baseline gap-2">
              <span
                className="text-xs font-bold"
                style={{
                  fontFamily: "'Onest', sans-serif",
                  color: "var(--mv-text)",
                }}
              >
                {comment.user}
              </span>

              <span
                className="text-[10px]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "var(--mv-text-dim)",
                }}
              >
                {comment.time}
              </span>
            </div>

            <p
              className="text-sm leading-snug"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "var(--mv-text-muted)",
              }}
            >
              {comment.text}
            </p>

            <button
              className="mt-1 flex items-center gap-1 text-[10px]"
              style={{
                color: "var(--mv-text-muted)",
              }}
            >
              <ThumbsUp size={9} />

              {comment.likes > 0
                ? comment.likes
                : "Like"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}