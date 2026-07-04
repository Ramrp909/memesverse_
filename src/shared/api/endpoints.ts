export const API_ENDPOINTS = {
  FEED: {
    LIST: "/memes",
    DETAIL: (id: number) => `/memes/${id}`,
  },

  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },

  COMMENTS: {
    LIST: (id: number) => `/memes/${id}/comments`,
  },
} as const;