"use client";

import { DeleteIcon, ThumbsUp } from "lucide-react";
import type { Comment } from "../types/comment";
import { useComments } from "../hooks/useComments";

interface CommentListProps {
  comments: Comment[];
  onDeleteComment:(commentId: number) => void;
}


export default function CommentList({
  comments,
  onDeleteComment,
}: CommentListProps) {
  
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-3"
        >
          <img
            src={comment.user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(comment.user.name)}
            alt={comment.user.name}
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
                {comment.user.name}
              </span>

              <span
                className="text-[10px]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "var(--mv-text-dim)",
                }}
              >
                {new Date(comment.createdAt).toLocaleString()}
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
            <div
            className="flex gap-3">
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
            <button
            onClick={() => onDeleteComment(comment.id)}
              className="mt-1 flex items-center gap-1 text-[10px]"
              style={{
                color: "var(--mv-text-muted)",
              }}
            >
              <DeleteIcon size={9} />

              {"Delete"}
            </button>
            </div>
            

          </div>
        </div>
      ))}
    </div>

    
  );
}