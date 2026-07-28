"use client";

import { useEffect, useState } from "react";

import type { FeedItem } from "@/features/feed/types/feed.model";
import type { Comment } from "@/features/comments/types/comment";

import ShareToast from "@/shared/components/ShareToast";
import PostDetailHeader from "./PostDetailHeader";
import PostMedia from "./PostMedia";
import PostCaption from "./PostCaption";
import PostActions from "./PostActions";

import CommentList from "@/features/comments/components/CommentList";
import CommentInput from "@/features/comments/components/CommentInput";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useComments } from "@/features/comments/hooks/useComments";
import CommentSkeleton from "@/features/comments/components/CommentSkeleton";
import CommentEmptyState from "@/features/comments/components/CommentEmptyState";

interface Props {
  post: FeedItem | null;
  open: boolean;
  isLoggedIn?: boolean;
  onClose: () => void;
  onAuthRequired?: () => void;
  onShare?: () => void;
  submitting: boolean;
}

export function PostDetail({
  post,
  open,
  isLoggedIn,
  submitting,
  onClose,
  onAuthRequired,
  onShare,
}: Props) {
 

  // const [commentText, setCommentText] =
  //   useState("");

  const [showToast, setShowToast] =
    useState(false);
const { isAuthenticated } = useAuth();

const {
    comments,
    loading,
    loadComments,
    createComment,
    deleteComment,
    error,
} = useComments(post?.id ?? 0);

console.log({
    comments,
    count: comments.length,
});

console.log("postDetail rendered")

useEffect(() => {
    if (!open || !post) {
        return;
    }
    loadComments();
}, [open, post?.id]);

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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center md:p-4"
      style={{
        background:
          "rgba(8,9,14,.95)",
        backdropFilter: "blur(16px)",
      }}
    >
      <ShareToast
        visible={showToast}
        message="Post shared"
      />

      <div
        className="flex h-full w-full flex-col overflow-hidden border shadow-2xl md:grid md:grid-cols-[minmax(0,1fr)_320px]
    md:max-h-[100dvh]
    md:max-w-[980px]  md:rounded-2xl"
        style={{
          background: "var(--mv-card)",
          borderColor: "var(--mv-border)",
        }}
      >
        {/* LEFT */}

        <div className="flex min-h-0 flex-col overflow-y-auto md:self-start">
          <PostDetailHeader
            mediaType={post.mediaType}
            onClose={onClose}
          />

          <div
    className="flex items-center justify-center bg-black"
    style={{
        maxHeight:
            post.mediaType === "image"
                ? "50vh"
                : undefined,
    }}
>
    <div
        className="w-full"
        style={
            post.mediaType === "video"
                ? { aspectRatio: "16/9" }
                : undefined
        }
    >
        <PostMedia
            post={post}
            onOpenDetail={() => {}}
        />
    </div>
</div>

          <div
            className="border-t px-4 py-3 flex-shrink-0"
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
              isLoggedIn={isAuthenticated}
              onAuthRequired={
                onAuthRequired
              }
              onShare={handleShare}
            />
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="flex min-h-0 flex-1 flex-col border-t md:w-80 md:flex-none md:border-l md:border-t-0 overflow-hidden"
          style={{
            borderColor:
              "var(--mv-border-subtle)",
          }}
        >
          <div className="flex min-h-0 flex-1 flex-col md:w-80">
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

          {loading ? (
            <CommentSkeleton />
          ): comments.length === 0 ? (
            <CommentEmptyState 
             isLoggedIn={isAuthenticated}
    onAuthRequired={onAuthRequired}
            />
          ) :
          (
          <CommentList
            comments={comments}
            onDeleteComment={deleteComment}
          />
          )
        }
          
          <CommentInput
            isLoggedIn={isAuthenticated}
            onSubmit={createComment}
            submitting={submitting}
            onAuthRequired={
              onAuthRequired ??
              (() => {})
              
            }
          />
          </div>
        </div>
      </div>
    </div>
  );
}