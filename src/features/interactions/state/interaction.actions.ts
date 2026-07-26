import { interactionApi, mapInteractionState } from "../api";
import { useInteractionStore } from "./interaction.store";

import type {
  BookmarkRequest,
  InteractionApiState,
  InteractionState,
  LikeRequest,
  ShareRequest,
  ViewRequest,
} from "../types";

const getStore = () => useInteractionStore.getState();

export const interactionActions = {
  initializeInteractions(
    interactions: Record<number, InteractionApiState>
  ) {
    const mapped = Object.entries(interactions).reduce<
      Record<number, InteractionState>
    >((acc, [memeId, interaction]) => {
      acc[Number(memeId)] = mapInteractionState(interaction);
      return acc;
    }, {});

    getStore().setInteractions(mapped);
  },

  async like(memeId: number) {
    console.log("interactionActions.like", memeId);
    const store = getStore();

    const current = store.getInteraction(memeId);

    if (!current) return;

    const previous = { ...current };

    // Optimistic update
    store.updateInteraction(memeId, {
      liked: !current.liked,
      likes: current.liked
        ? current.likes - 1
        : current.likes + 1,
    });

    try {
      const payload: LikeRequest = {
        meme_id: memeId,
      };
      console.log("calling API")
      const response = await interactionApi.like(payload);

      store.updateInteraction(memeId, {
        liked: response.liked,
        likes: response.likes_count,
      });
    } catch (error) {
      store.updateInteraction(memeId, previous);
      throw error;
    }
  },

  async bookmark(memeId: number) {
    const store = getStore();

    const current = store.getInteraction(memeId);

    if (!current) return;

    const previous = { ...current };

    // Optimistic update
    store.updateInteraction(memeId, {
      bookmarked: !current.bookmarked,
      bookmarks: current.bookmarked
        ? current.bookmarks - 1
        : current.bookmarks + 1,
    });

    try {
      const payload: BookmarkRequest = {
        meme_id: memeId,
      };

      const response = await interactionApi.bookmark(payload);

      store.updateInteraction(memeId, {
        bookmarked: response.bookmarked,
        bookmarks: response.bookmarks_count,
      });
    } catch (error) {
      store.updateInteraction(memeId, previous);
      throw error;
    }
  },

  async share(memeId: number) {
    const store = getStore();

    const payload: ShareRequest = {
      meme_id: memeId,
    };

    const response = await interactionApi.share(payload);

    store.updateInteraction(memeId, {
      shares: response.shares_count,
    });
  },

  async view(
    memeId: number,
    watchedSeconds: number,
    isCompleted: boolean
  ) {
    const store = getStore();

    const payload: ViewRequest = {
      meme_id: memeId,
      watched_seconds: watchedSeconds,
      is_completed: isCompleted,
    };

    const response = await interactionApi.view(payload);

    store.updateInteraction(memeId, {
      views: response.views_count,
    });
  },
};