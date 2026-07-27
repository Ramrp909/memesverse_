import { useEffect, useRef } from "react";
import { useInteraction } from "./useInteraction";

interface UseViewTrackingOptions {
  memeId: number;
  enabled?: boolean;
  duration?: number;
  threshold?: number;
  watchedSeconds?: number;
  isCompleted?: boolean;
}

export const useViewTracking = ({
  memeId,
  enabled = true,
  duration = 2000,
  threshold = 0.5,
  watchedSeconds = 2,
  isCompleted = true
}: UseViewTrackingOptions) => {
  const { view } = useInteraction(memeId);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const hasTracked = useRef(false);
  const timerRef = useRef<number | null>(null);
  const isTracking = useRef(false)

  useEffect(() => {
    if (!enabled) return;
    const element = targetRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Already tracked
        if (hasTracked.current) return;

        if (entry.isIntersecting) {
          timerRef.current = window.setTimeout(async () => {
  // Already tracked or currently sending request
  if (hasTracked.current || isTracking.current) {
    return;
  }

  isTracking.current = true;

  try {
    await view(2, true);

    // Mark as tracked only after successful API call
    hasTracked.current = true;
  } catch (error) {
    console.error("View tracking failed", error);
  } finally {
    isTracking.current = false;
    timerRef.current = null;
  }
}, duration);
        } else {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, enabled, threshold, view]);

  return targetRef;
};