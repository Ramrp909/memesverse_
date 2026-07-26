export interface LikeRequest {
  meme_id: number;
}

export interface LikeResponse {
  status: string;
  liked: boolean;
  likes_count: number;
}

export interface BookmarkRequest {
  meme_id: number;
}

export interface BookmarkResponse {
  status: string;
  bookmarked: boolean;
  bookmarks_count: number;
}

export interface ShareRequest {
  meme_id: number;
}

export interface ShareResponse {
  status: string;
  shares_count: number;
}

export interface ViewRequest {
  meme_id: number;
  watched_seconds: number;
  is_completed: boolean;
}

export interface ViewResponse {
  status: string;
  views_count: number;
}

export interface CommentRequest {
  meme_id: number;
  parent_comment_id?: number;
  comment_text: string;
}

export interface DeleteCommentRequest {
  comment_id: number;
}

export interface InteractionApiState {
  liked?: boolean;
  bookmarked?: boolean;

  likes_count: number;
  comments_count?: number;
  bookmarks_count: number;
  shares_count: number;
  views_count: number;
}