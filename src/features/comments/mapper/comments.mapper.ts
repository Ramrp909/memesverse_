import type {
  Comment,
  CommentUser,
} from "../types/comment";

import type {
  CommentResponse,
  CommentUserResponse,
} from "../types/response";

function mapUser(
  user: CommentUserResponse
): CommentUser {
  return {
    id: user.id,
    name: user.user_name,
    avatar: user.profile_pic,
  };
}

function mapComment(
  comment: CommentResponse
): Comment {
  return {
    id: comment.id,
    text: comment.comment_text,
    createdAt: comment.created_at,
    likes: comment.likes_count,
    isOwner: comment.is_owner,
    replyCount: comment.reply_count,
    user: mapUser(comment.user),
    replies: comment.replies.map(mapComment),
  };
}

export const commentsMapper = {
  comment: mapComment,
  comments: (
    comments: CommentResponse[]
  ): Comment[] => comments.map(mapComment),
};