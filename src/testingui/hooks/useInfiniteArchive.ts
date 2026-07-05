"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ARCHIVE } from "../data/archive";

export function useInfiniteArchive() {
  const [loaded, setLoaded] = useState(1);
  const sentinel = useRef<HTMLDivElement>(null);
  const hasMore = loaded < ARCHIVE.length;
  const loadMore = useCallback(() => { if (hasMore) setLoaded(n => Math.min(n + 1, ARCHIVE.length)); }, [hasMore]);
  useEffect(() => {
    const el = sentinel.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) loadMore(); }, { rootMargin: "400px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);
  return { days: ARCHIVE.slice(0, loaded), sentinel, hasMore };
}