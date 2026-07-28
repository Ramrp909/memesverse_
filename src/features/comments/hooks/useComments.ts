import { useCommentsStore } from "../store/comments.store";

export function useComments(memeId: number) {
    const commentsPage = useCommentsStore(
        state => state.getComments(memeId)
    );
    const loading = useCommentsStore(
        state => state.isLoading(memeId)
    );
    const loaded = useCommentsStore(
        state => state.isLoaded(memeId)
    );
    const submitting = useCommentsStore(
        state => state.isSubmitting(memeId)
    );
    const loadComments = useCommentsStore(
        state => state.loadComments
    );
    const createComment = useCommentsStore(
    state => state.createComment
);

const deleteComment =
    useCommentsStore(
        (state) => state.deleteComment
    );

    return {
        comments: commentsPage?.comments ?? [],
        totalComments: commentsPage?.totalComments ?? 0,
        page: commentsPage?.page ?? 1,
        loading,
        loaded,
        submitting,
        loadComments: (force = false) =>
            loadComments(memeId, force),
        createComment: (
    commentText: string,
    parentCommentId?: number | null
) =>
    createComment(
        memeId,
        commentText,
        parentCommentId
    ),
    deleteComment: (commentId: number) =>
    deleteComment(memeId, commentId),
    };
    

}