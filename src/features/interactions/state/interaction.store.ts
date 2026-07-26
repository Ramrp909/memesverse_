import { create } from "zustand";

import type { InteractionState } from "../types";

type InteractionMap = Record<number, InteractionState>;

interface InteractionStore {
  interactions: InteractionMap;

  getInteraction: (
    memeId: number
  ) => InteractionState | undefined;

  setInteraction: (
    memeId: number,
    interaction: InteractionState
  ) => void;

  setInteractions: (
    interactions: InteractionMap
  ) => void;

  updateInteraction: (
    memeId: number,
    updates: Partial<InteractionState>
  ) => void;

  removeInteraction: (
    memeId: number
  ) => void;

  clear: () => void;
}

export const useInteractionStore =
  create<InteractionStore>((set, get) => ({
    interactions: {},

    getInteraction: (memeId) =>
      get().interactions[memeId],

    setInteraction: (memeId, interaction) =>
      set((state) => ({
        interactions: {
          ...state.interactions,
          [memeId]: interaction,
        },
      })),

    setInteractions: (interactions) =>
      set((state) => ({
        interactions: {
          ...state.interactions,
          ...interactions,
        },
      })),

    updateInteraction: (memeId, updates) =>
      set((state) => {
        const current =
          state.interactions[memeId];

        if (!current) {
          return state;
        }

        return {
          interactions: {
            ...state.interactions,
            [memeId]: {
              ...current,
              ...updates,
            },
          },
        };
      }),

    removeInteraction: (memeId) =>
      set((state) => {
        const interactions = {
          ...state.interactions,
        };

        delete interactions[memeId];

        return {
          interactions,
        };
      }),

    clear: () =>
      set({
        interactions: {},
      }),
  }));