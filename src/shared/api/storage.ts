const TOKEN_KEY = "mv_token";
const USER_KEY = "mv_user";

export const storage = {
  saveToken(token: string) {
    if (typeof window === "undefined") return;

    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    if (typeof window === "undefined") return;

    localStorage.removeItem(TOKEN_KEY);
  },

  saveUser(user: unknown) {
    if (typeof window === "undefined") return;

    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser<T>() {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(USER_KEY);

    return raw ? (JSON.parse(raw) as T) : null;
  },

  removeUser() {
    if (typeof window === "undefined") return;

    localStorage.removeItem(USER_KEY);
  },

  clearSession() {
    if (typeof window === "undefined") return;

    this.removeToken();
    this.removeUser();
  },
};