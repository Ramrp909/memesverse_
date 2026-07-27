import { useCallback, useEffect, useRef } from "react";
import { useInteraction } from "./useInteraction";

interface UseVideoTrackingOptions {
  memeId: number;
  threshold?: number;
}

export const useVideoTracking = ({
  memeId,
  threshold = 0.3,
}: UseVideoTrackingOptions) => {
  const { view } = useInteraction(memeId);

  const hasTracked = useRef(false);
  const isTracking = useRef(false);

  const reset = useCallback(() => {
    hasTracked.current = false;
    isTracking.current = false;
  }, []);

  useEffect(() => {
    reset();
  }, [memeId, reset]);

  const track = useCallback(
    async (currentTime: number, duration: number) => {
      if (hasTracked.current || isTracking.current) return;

      if (!duration || Number.isNaN(duration)) return;

      const requiredWatchTime = duration * threshold;

      if (currentTime < requiredWatchTime) return;

      isTracking.current = true;

      try {
        await view(Math.floor(currentTime), false);
        hasTracked.current = true;
      } catch (error) {
        hasTracked.current = false;
      } finally {
        isTracking.current = false;
      }
    },
    [threshold, view]
  );

  return {
    track,
    reset,
  };
};