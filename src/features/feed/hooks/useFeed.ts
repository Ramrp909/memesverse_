"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedItem } from "../types/feed.model";
import { FeedService } from "../services/feed.service";

export function useFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await FeedService.getFeed();
      setItems(response.items);
    } catch (err) {
      console.error(err);
      setError("Failed to load feed.");
    } finally {
      setLoading(false);
    }
  },[]);
// eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    void loadFeed();
  }, [loadFeed]);

  return {
    items,
    loading,
    error,
    reload: loadFeed,
  };
}