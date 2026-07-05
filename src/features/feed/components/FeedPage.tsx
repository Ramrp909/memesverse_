"use client";

import { Feed } from "./Feed";
import { useFeed } from "../hooks/useFeed";
import { groupFeedByDate } from "../utils/groupFeedByDate";
import type { FeedItem } from "../types/feed.model";

interface FeedPageProps {
  onOpenDetail?: (post: FeedItem) => void;
  onAuthRequired?: () => void;
  onShare?: () => void;
}

const FALLBACK_POSTS: FeedItem[] = [
  {
    id: 1,
    title: "My cat every morning at 5AM. Zero mercy, zero remorse.",
    mediaUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&h=680&fit=crop&auto=format",
    thumbnailUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&h=680&fit=crop&auto=format",
    mediaType: "image",
    language: "en",
    likes: 14820,
    views: 48320,
    bookmarks: 312,
    shares: 42,
    createdAt: new Date("2026-07-05T00:00:00Z"),
  },
  {
    id: 2,
    title: "Me trying to fix a bug at 2am vs the bug fixing itself after I restart.",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=680&fit=crop&auto=format",
    mediaType: "video",
    language: "en",
    likes: 28500,
    views: 91205,
    bookmarks: 190,
    shares: 73,
    createdAt: new Date("2026-07-05T00:00:00Z"),
  },
  {
    id: 3,
    title: "Friday 4:59pm. Deploy pipeline turns red. Team disappears.",
    mediaUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=680&fit=crop&auto=format",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=680&fit=crop&auto=format",
    mediaType: "image",
    language: "en",
    likes: 9340,
    views: 33100,
    bookmarks: 88,
    shares: 17,
    createdAt: new Date("2026-07-04T00:00:00Z"),
  },
  {
    id: 4,
    title: "Dog explains microservices architecture better than any YouTube tutorial.",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=900&h=680&fit=crop&auto=format",
    mediaType: "video",
    language: "en",
    likes: 19200,
    views: 72450,
    bookmarks: 450,
    shares: 34,
    createdAt: new Date("2026-07-03T00:00:00Z"),
  },
];

export default function FeedPage({ onOpenDetail, onAuthRequired, onShare }: FeedPageProps) {
  const { items, loading, error } = useFeed();
  const sourceItems = items.length > 0 ? items : FALLBACK_POSTS;

  if (loading && items.length === 0) return <div className="px-3 py-8 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--mv-text-dim)]">Loading drops…</div>;

  if (error && items.length === 0) return <div className="px-3 py-8 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--mv-text-dim)]">{error}</div>;

  const groupedPosts = groupFeedByDate(sourceItems);

  return <Feed groupedPosts={groupedPosts} onOpenDetail={onOpenDetail} onAuthRequired={onAuthRequired} onShare={onShare} />;
}