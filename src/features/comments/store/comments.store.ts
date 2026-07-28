import { create } from "zustand";
import type { CommentsPage } from "../types/comment";
import { commentsService } from "../services/comments.service";

interface CommentsState {
    commentsByMeme: Record<number, CommentsPage>;
    loadingByMeme: Record<number, boolean>;
    submittingByMeme: Record<number, boolean>;
    errorByMeme: Record<number, string | null>;
    loadedMemeIds: Set<number>;
    getComments: (memeId: number) => CommentsPage | undefined;
    isLoaded: (memeId: number) => boolean;
    isLoading: (memeId: number) => boolean;
    isSubmitting: (memeId: number) => boolean;
    getError: (memeId: number) => string | null;
    loadComments: (
    memeId: number,
    force?: boolean
    ) => Promise<void>;
    createComment: (
        memeId: number,
        commentText: string,
        parentCommentId?: number | null
    ) => Promise<void>;
    deleteComment: (
    memeId: number,
    commentId: number
) => Promise<void>;

}

export const useCommentsStore =
create<CommentsState>((set,get) => ({
    commentsByMeme: {},
    loadingByMeme: {},
    errorByMeme:{},
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
    getError: (memeId) => 
        get().errorByMeme[memeId],

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
    } 
    catch (error) {

    set((state) => ({
        errorByMeme: {
            ...state.errorByMeme,
            [memeId]: "Unable to load comments.",
        },
    }))}
    finally {
        set((state) => ({
            loadingByMeme: {
                ...state.loadingByMeme,
                [memeId]: false,
            },
        }));
    }
},
createComment: async (
    memeId,
    commentText,
    parentCommentId = null
) => {
    set((state) => ({
        submittingByMeme: {
            ...state.submittingByMeme,
            [memeId]: true,
        },
    }));
    try { const result = await commentsService.createComment({
            memeId,
            commentText,
            parentCommentId,
        });
        set((state) => {const page =state.commentsByMeme[memeId];
    if (!page) {
        return state;
    }
    const updatedPage = {
        ...page,
        comments: [
            ...page.comments,
            result.comment,
        ],
        totalComments:
            result.commentsCount,
    };
    return {
        commentsByMeme: {
            ...state.commentsByMeme,
            [memeId]: updatedPage,
        },
    };
});
    console.log("CREATE RESULT", result);
} 
catch (error) {

    set((state) => ({
        errorByMeme: {
            ...state.errorByMeme,
            [memeId]: "Unable to load comments.",
        },
    }));

}finally {
    set((state) => ({
        submittingByMeme: {
            ...state.submittingByMeme,
            [memeId]: false,
        },
    }));

}
},

deleteComment: async (
    memeId,
    commentId
) => {
 await commentsService.deleteComment({
        commentId,
    });
    set((state) => {
    const page =
        state.commentsByMeme[memeId];
    if (!page) {
        return state;
    }
    const updatedPage = {
        ...page,
        comments: page.comments.filter(
            (comment) => comment.id !== commentId
        ),
        totalComments: Math.max(  0,
            page.totalComments - 1
        ),
    };
    return {
        commentsByMeme: {
            ...state.commentsByMeme,
            [memeId]: updatedPage,
        },
    };
});
},

    
}));

