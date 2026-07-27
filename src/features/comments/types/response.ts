export interface CommentUserResponse {
  id: number;
  user_name: string;
  profile_pic: string;
}

export interface CommentResponse {
  id: number;
  comment_text: string;
  likes_count: number;
  created_at: string;
  user: CommentUserResponse;
  is_owner: boolean;
  reply_count: number;
  replies: CommentResponse[];
}

export interface GetCommentsResponse {
  status: string;
  page: number;
  page_size: number;
  total_comments: number;
  comments: CommentResponse[];
}

export interface CreateCommentResponse {
  status: string;
  comment: CommentResponse;
  comments_count: number;
}

export interface DeleteCommentResponse {
  status: string;
  message: string;
}