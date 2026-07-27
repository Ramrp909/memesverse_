import { apiClient } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

import type {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
} from "../types/request";

import type {
  CreateCommentResponse,
  DeleteCommentResponse,
  GetCommentsResponse,
} from "../types/response";

export const commentsApi = {
  async getComments({
    memeId,
    page = 1,
    pageSize = 20,
  }: GetCommentsRequest) {
    const { data } =
      await apiClient.get<GetCommentsResponse>(
        API_ENDPOINTS.INTERACTIONS.GET_COMMENTS,
        {
          params: {
            meme_id: memeId,
            page,
            page_size: pageSize,
          },
        }
      );

    return data;
  },

  async createComment({
    memeId,
    commentText,
    parentCommentId = null,
  }: CreateCommentRequest) {
    const { data } =
      await apiClient.post<CreateCommentResponse>(
        API_ENDPOINTS.INTERACTIONS.COMMENT,
        {
          meme_id: memeId,
          comment_text: commentText,
          parent_comment_id: parentCommentId,
        }
      );

    return data;
  },

  async deleteComment({
    commentId,
  }: DeleteCommentRequest) {
    const { data } =
      await apiClient.post<DeleteCommentResponse>(
        API_ENDPOINTS.INTERACTIONS.DELETE_COMMENT,
        {
          comment_id: commentId,
        }
      );

    return data;
  },
};