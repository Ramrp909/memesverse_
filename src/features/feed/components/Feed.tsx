"use client";

import type { RefObject } from "react";

import PostCard  from "@/features/post/components/PostCard";
import DateDivider from "./DateDivider";

import type { FeedGroup, FeedItem } from "../types/feed.model";

interface FeedProps {
  groupedPosts: FeedGroup[];

  loading?: boolean;
  hasMore?: boolean;

  sentinelRef?: RefObject<HTMLDivElement | null>;

  onOpenDetail?: (post: FeedItem) => void;
  onAuthRequired?: () => void;
  onShare?: (post: FeedItem) => void;
}

export function Feed({
  groupedPosts,
  loading = false,
  hasMore = false,
  sentinelRef,
  onOpenDetail,
  onAuthRequired,
  onShare,
}: FeedProps) {
  const todayGroup = groupedPosts[0];
  const archiveGroups = groupedPosts.slice(1);

  return (
    <main className="space-y-3 px-3 pt-4 pb-24 sm:px-4">
      {/* Today */}
      {todayGroup && (
        <>
          <div className="flex items-center gap-3">
            <div
              className="flex-1 h-px"
              style={{
                background: "var(--mv-border-subtle)",
              }}
            />

            <div className="text-center">
              <p
                className="text-sm font-black uppercase"
                style={{
                  fontFamily: "'Onest', sans-serif",
                  letterSpacing: "-0.01em",
                  color: "var(--mv-text)",
                }}
              >
                {todayGroup.label}
              </p>

              <p
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "'Onest', sans-serif",
                  color: "var(--mv-text-dim)",
                }}
              >
                {todayGroup.date} · {todayGroup.posts.length} posts
              </p>
            </div>

            <div
              className="flex-1 h-px"
              style={{
                background: "var(--mv-border-subtle)",
              }}
            />
          </div>

          {todayGroup.posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              total={todayGroup.posts.length}
              onOpenDetail={() => onOpenDetail?.(post)}
              onAuthRequired={onAuthRequired}
              onShare={() => onShare?.(post)}
            />
          ))}

          <p
            className="py-3 text-center text-[10px] font-bold uppercase tracking-widest"
            style={{
              fontFamily: "'Onest', sans-serif",
              color: "var(--mv-text-dim)",
            }}
          >
            — end of today · scroll for previous drops —
          </p>
        </>
      )}

      {/* Previous Days */}
      {archiveGroups.map((group) => (
        <div key={group.date} className="space-y-3">
          <DateDivider day={group} />

          {group.posts.map((post, index) => (
            <PostCard
              key={`${group.date}-${post.id}`}
              post={post}
              index={index}
              total={group.posts.length}
              onOpenDetail={() => onOpenDetail?.(post)}
              onAuthRequired={onAuthRequired}
              onShare={() => onShare?.(post)}
            />
          ))}
        </div>
      ))}

      {/* Infinite Scroll Sentinel */}
      <div ref={sentinelRef} />

      {/* Loading / End */}
      {loading ? (
        <div className="flex justify-center py-6">
          <div
            className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
            style={{
              borderColor: "#6366f1",
              borderTopColor: "transparent",
            }}
          />
        </div>
      ) : !hasMore ? (
        <p
          className="py-8 text-center text-[10px] font-bold uppercase tracking-widest"
          style={{
            fontFamily: "'Onest', sans-serif",
            color: "var(--mv-text-dim)",
          }}
        >
          Beginning of history
        </p>
      ) : null}
    </main>
  );
}