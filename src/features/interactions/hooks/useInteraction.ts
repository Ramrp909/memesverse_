import { useMemo } from "react";

import { interactionActions } from "../state/interaction.actions";
import { useInteractionStore } from "../state/interaction.store";

interface UseInteractionFallback {
  likes?: number;
  comments?: number;
  bookmarks?: number;
  shares?: number;
  views?: number;
}

export const useInteraction = (
  memeId: number,
  fallback: UseInteractionFallback = {}
) => {
  const interaction = useInteractionStore(
    (state) => state.interactions[memeId]
  );

  const actions = useMemo(
    () => ({
      like: () =>
        interactionActions.like(memeId),

      bookmark: () =>
        interactionActions.bookmark(memeId),

      share: () =>
        interactionActions.share(memeId),

      view: (
        watchedSeconds: number,
        isCompleted: boolean
      ) =>
        interactionActions.view(
          memeId,
          watchedSeconds,
          isCompleted
        ),
    }),
    [memeId]
  );

  return {
    interaction,

    liked: interaction?.liked ?? false,
    bookmarked: interaction?.bookmarked ?? false,

    likes: interaction?.likes ?? fallback.likes ?? 0,
    comments:
      interaction?.comments ??
      fallback.comments ??
      0,

    bookmarks:
      interaction?.bookmarks ??
      fallback.bookmarks ??
      0,

    shares:
      interaction?.shares ??
      fallback.shares ??
      0,

    views:
      interaction?.views ??
      fallback.views ??
      0,

    ...actions,
  };
};