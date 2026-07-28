import { create } from "zustand";
import type { CommentsPage } from "../types/comment";
import { commentsService } from "../services/comments.service";

interface CommentsState {
    commentsByMeme: Record<number, CommentsPage>;
    loadingByMeme: Record<number, boolean>;
    submittingByMeme: Record<number, boolean>;
    loadedMemeIds: Set<number>;
    getComments: (memeId: number) => CommentsPage | undefined;
    isLoaded: (memeId: number) => boolean;
    isLoading: (memeId: number) => boolean;
    isSubmitting: (memeId: number) => boolean;
    loadComments: (
    memeId: number,
    force?: boolean
) => Promise<void>;
}

export const useCommentsStore =
create<CommentsState>((set,get) => ({
    commentsByMeme: {},
    loadingByMeme: {},
    submittingByMeme: {},
    loadedMemeIds: new Set(),
    getComments: (memeId) =>
        get().commentsByMeme[memeId],

    isLoaded: (memeId) =>
        get().loadedMemeIds.has(memeId),

    isLoading: (memeId) =>
        get().loadingByMeme[memeId] ?? false,

    isSubmitting: (memeId) =>
        get().submittingByMeme[memeId] ?? false,

    loadComments: async (
    memeId,
    force = false
) => {
    // Return cached data unless refresh is forced
    if (!force && get().isLoaded(memeId)) {
        return;
    }
    // Mark loading
    set((state) => ({
        loadingByMeme: {
            ...state.loadingByMeme,
            [memeId]: true,
        },
    }));
    try {
        const page =   await commentsService.getComments({
                memeId,
            });
            console.log("STORE PAGE", page);
        set((state) => {
            const loadedMemeIds =
                new Set(state.loadedMemeIds);
            loadedMemeIds.add(memeId);
            return {
                commentsByMeme: {
                    ...state.commentsByMeme,
                    [memeId]: page,
                },
                loadedMemeIds,
            };
        });
    } finally {
        set((state) => ({
            loadingByMeme: {
                ...state.loadingByMeme,
                [memeId]: false,
            },
        }));
    }
},
    
}));

