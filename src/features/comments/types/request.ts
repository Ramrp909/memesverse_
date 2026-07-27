export interface GetCommentsRequest {
  memeId: number;
  page?: number;
  pageSize?: number;
}

export interface CreateCommentRequest {
  memeId: number;
  commentText: string;
  parentCommentId?: number | null;
}

export interface DeleteCommentRequest {
  commentId: number;
}