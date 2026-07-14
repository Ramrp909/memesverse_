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


  COMMENTS: {
    LIST: (id: number) => `/memes/${id}/comments`,
  },
} as const;