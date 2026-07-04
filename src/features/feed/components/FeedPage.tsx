"use client";

import { Feed } from "./Feed";
import { useFeed } from "../hooks/useFeed";
import { groupFeedByDate } from "../utils/groupFeedByDate"

export default function FeedPage() {
  const { items, loading, error } = useFeed();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const groupedPosts = groupFeedByDate(items);

  return <Feed groupedPosts={groupedPosts} />;
}