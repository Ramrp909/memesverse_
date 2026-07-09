"use client";

import { useEffect, useState } from "react";

import type { FeedItem } from "@/features/feed/types/feed.model";
import type { Comment } from "@/features/comments/types/comment";

// import ShareToast from "@/shared/components/ShareToast";

import PostDetailHeader from "./PostDetailHeader";
import PostMedia from "./PostMedia";
import PostCaption from "./PostCaption";
import PostActions from "./PostActions";

import CommentList from "@/features/comments/components/CommentList";
import CommentInput from "@/features/comments/components/CommentInput";

import { DUMMY_COMMENTS } from "../../comments/types/comment"

interface Props {
  post: FeedItem | null;
  open: boolean;

  isLoggedIn?: boolean;

  onClose: () => void;
  onAuthRequired?: () => void;
  onShare?: () => void;
}

export function PostDetail({
  post,
  open,
  isLoggedIn = false,
  onClose,
  onAuthRequired,
  onShare,
}: Props) {
  const [comments, setComments] =
    useState<Comment[]>(DUMMY_COMMENTS);

  const [commentText, setCommentText] =
    useState("");

  const [showToast, setShowToast] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open || !post) {
    return null;
  }

  function handleShare() {
    setShowToast(true);

    onShare?.();

    setTimeout(() => {
      setShowToast(false);
    }, 1800);
  }

  function submitComment() {
    if (!commentText.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64",
        text: commentText,
        time: "Just now",
        likes: 0,
      },
    ]);

    setCommentText("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center md:p-4"
      style={{
        background:
          "rgba(8,9,14,.95)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* <ShareToast
        visible={showToast}
        message="Post shared"
      /> */}

      <div
        className="flex h-full w-full flex-col overflow-hidden border shadow-2xl md:h-auto md:max-h-[100dvh] md:max-w-[980px] md:flex-row md:rounded-2xl"
        style={{
          background: "var(--mv-card)",
          borderColor: "var(--mv-border)",
        }}
      >
        {/* LEFT */}

        <div className="flex min-h-0 flex-1 flex-col">
          <PostDetailHeader
            mediaType={post.mediaType}
            onClose={onClose}
          />

          <PostMedia
            post={post}
            onOpenDetail={() => {}}
          />

          <div
            className="border-t px-4 py-3"
            style={{
              borderColor:
                "var(--mv-border-subtle)",
            }}
          >
            <PostCaption
              post={post}
              onOpenDetail={() => {}}
            />

            <PostActions
              post={post}
              isLoggedIn={isLoggedIn}
              onAuthRequired={
                onAuthRequired
              }
              onShare={handleShare}
            />
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="flex min-h-0 flex-1 flex-col border-t md:w-80 md:flex-none md:border-l md:border-t-0"
          style={{
            borderColor:
              "var(--mv-border-subtle)",
          }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-3"
            style={{
              borderColor:
                "var(--mv-border-subtle)",
            }}
          >
            <h3
              className="text-sm font-bold"
              style={{
                fontFamily:
                  "'Onest', sans-serif",
              }}
            >
              Comments ({comments.length})
            </h3>
          </div>

          <CommentList
            comments={comments}
          />

          <CommentInput
            isLoggedIn={isLoggedIn}
            value={commentText}
            onChange={setCommentText}
            onSubmit={submitComment}
            onAuthRequired={
              onAuthRequired ??
              (() => {})
            }
          />
        </div>
      </div>
    </div>
  );
}