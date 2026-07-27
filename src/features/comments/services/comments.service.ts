import { commentsRepository } from "../repository/comments.repository";

import type {
  CommentsPage,
  CreateCommentResult,
  DeleteCommentResult,
} from "../types/comment";

import type {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
} from "../types/request";

async function getComments(
  request: GetCommentsRequest
): Promise<CommentsPage> {
  return commentsRepository.getComments(request);
}

async function createComment(
  request: CreateCommentRequest
): Promise<CreateCommentResult> {
  const result = await commentsRepository.createComment(request);

  return result;
}

async function deleteComment(
  request: DeleteCommentRequest
): Promise<DeleteCommentResult> {
  const response = await commentsRepository.deleteComment(request);

  return {
    success: response.status === "success",
    commentId: request.commentId,
  };
}

export const commentsService = {
  getComments,
  createComment,
  deleteComment,
};