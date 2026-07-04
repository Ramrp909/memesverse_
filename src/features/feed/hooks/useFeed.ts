"use client";

import { useEffect, useState } from "react";
import { FeedItem } from "../types/feed.model";
import { FeedService } from "../services/feed.service";

export function useFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = async () => {
    try {
      setLoading(true);

      const response = await FeedService.getFeed();

      setItems(response.items);
    } catch (err) {
      console.error(err);
      setError("Failed to load feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return {
    items,
    loading,
    error,
    reload: loadFeed,
  };
}