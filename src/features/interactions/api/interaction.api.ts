import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

import type {
  BookmarkRequest,
  BookmarkResponse,
  CommentRequest,
  DeleteCommentRequest,
  LikeRequest,
  LikeResponse,
  ShareResponse,
  ViewResponse,
  ShareRequest,
  ViewRequest,
} from "../types";

const like = async (
  payload: LikeRequest
): Promise<LikeResponse> => {
  const { data } = await apiClient.post<LikeResponse>(
    API_ENDPOINTS.INTERACTIONS.LIKE,
    payload
  );

  return data;
};

const bookmark = async (
  payload: BookmarkRequest
): Promise<BookmarkResponse> => {
  const { data } =
    await apiClient.post<BookmarkResponse>(
      API_ENDPOINTS.INTERACTIONS.BOOKMARK,
      payload
    );

  return data;
};

const share = async (
  payload: ShareRequest
): Promise<ShareResponse> => {
  const { data } =
    await apiClient.post<ShareResponse>(
      API_ENDPOINTS.INTERACTIONS.SHARE,
      payload
    );

  return data;
};

const view = async (
  payload: ViewRequest
): Promise<ViewResponse> => {
  const { data } =
    await apiClient.post<ViewResponse>(
      API_ENDPOINTS.INTERACTIONS.VIEW,
      payload
    );

  return data;
};

const comment = async (
  payload: CommentRequest
): Promise<unknown> => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.INTERACTIONS.COMMENT,
    payload
  );

  return data;
};

const deleteComment = async (
  payload: DeleteCommentRequest
): Promise<unknown> => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.INTERACTIONS.DELETE_COMMENT,
    payload
  );

  return data;
};

const getComments = async (
  memeId: number,
  page = 1,
  pageSize = 20
): Promise<unknown> => {
  const { data } = await apiClient.get(
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
};

const getLikes = async (
  page = 1,
  pageSize = 20
): Promise<unknown> => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.INTERACTIONS.GET_LIKES,
    {
      params: {
        page,
        page_size: pageSize,
      },
    }
  );

  return data;
};

const getBookmarks = async (
  page = 1,
  pageSize = 20
): Promise<unknown> => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.INTERACTIONS.GET_BOOKMARKS,
    {
      params: {
        page,
        page_size: pageSize,
      },
    }
  );

  return data;
};

const getWatchHistory = async (
  page = 1,
  pageSize = 20
): Promise<unknown> => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.INTERACTIONS.GET_HISTORY,
    {
      params: {
        page,
        page_size: pageSize,
      },
    }
  );

  return data;
};

export const interactionApi = {
  like,
  bookmark,
  share,
  view,
  comment,
  deleteComment,
  getComments,
  getLikes,
  getBookmarks,
  getWatchHistory,
};