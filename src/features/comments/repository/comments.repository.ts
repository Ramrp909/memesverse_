import { commentsApi } from "../api/comments.api";
import { commentsMapper } from "../mapper/comments.mapper";
import type { CommentsPage } from "../types/comment";
import type {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
} from "../types/request";

export const commentsRepository = {
  async getComments(request: GetCommentsRequest): Promise<CommentsPage> {
    const response =
      await commentsApi.getComments(request);
      console.log("API RESPONSE", response);
    return {
      page: response.page,
      pageSize: response.page_size,
      totalComments: response.total_comments,
      comments:
        commentsMapper.comments(response.comments),
    };
  },

  async createComment(
    request: CreateCommentRequest
  ) {
    const response =
      await commentsApi.createComment(request);
    return {
      comment:
        commentsMapper.createdComment(response.comment),
      commentsCount:
        response.comments_count,
    };
  },

  async deleteComment(
    request: DeleteCommentRequest
  ) {
    return commentsApi.deleteComment(request);
  },
};