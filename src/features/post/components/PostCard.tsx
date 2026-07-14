"use client";

import { useEffect, useState } from "react";
import { handleShare } from "@/shared/utils/share";

import type { FeedItem } from "@/features/feed/types/feed.model";

import ShareToast from "@/shared/components/ShareToast";

import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostCaption from "./PostCaption";
import PostActions from "./PostActions";

interface PostCardProps {
  post: FeedItem;
  index: number;
  total: number;

  isLoggedIn?: boolean;

  onAuthRequired?: () => void;
  onOpenDetail?: () => void;
  onShare?: () => void;
}

export default function PostCard({
  post,
  index,
  total,
  isLoggedIn = false,
  onAuthRequired,
  onOpenDetail,
  onShare,
}: PostCardProps) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;

    const timer = window.setTimeout(() => {
      setShowToast(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [showToast]);

  async function onShareClick() {
  const shared = await handleShare(post);

  if (!shared) {
    setShowToast(true);
  }

  onShare?.();
}

  return (
    <>
      <article
        className="overflow-hidden rounded-xl border transition-all duration-200"
        style={{
          background: "var(--mv-card)",
          borderColor: "var(--mv-border)",
        }}
      >
        <PostHeader
          post={post}
          index={index}
          total={total}
          onOpenDetail={onOpenDetail ?? (() => {})}
        />

        <PostMedia
          post={post}
          onOpenDetail={onOpenDetail ?? (() => {})}
        />

        <PostCaption
          post={post}
          onOpenDetail={onOpenDetail ?? (() => {})}
        />

        <PostActions
          post={post}
          isLoggedIn={isLoggedIn}
          onAuthRequired={onAuthRequired}
          onOpenDetail={onOpenDetail}
          onShare={onShareClick}
        />
      </article>

      <ShareToast
        visible={showToast}
        message="Post shared"
      />
    </>
  );
}