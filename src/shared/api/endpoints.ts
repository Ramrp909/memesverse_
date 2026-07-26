export const API_ENDPOINTS = {
  FEED: {
    LIST: "/memes",
    DETAIL: (id: number) => `/memes/${id}`,
  },

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    VERIFY_SIGNUP: "/verify_signup",
    LOGOUT: "/logout",
    FORGOT_PASSWORD: "/forgot_password",
    RESET_PASSWORD: "/reset_password",
  },

  INTERACTIONS: {
    LIKE: "/like_meme",
    BOOKMARK: "/bookmark_meme",
    SHARE: "/share_meme",
    VIEW: "/view_meme",

    COMMENT: "/comment_meme",
    DELETE_COMMENT: "/delete_comment",

    GET_COMMENTS: "/get_comments",
    GET_BOOKMARKS: "/get_bookmarks",
    GET_LIKES: "/get_likes",
    GET_HISTORY: "/get_watch_history",
  },

  // COMMENTS: {
  //   LIST: (id: number) => `/memes/${id}/comments`,
  // },
} as const;