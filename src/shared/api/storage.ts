const TOKEN_KEY = "mv_token";
const USER_KEY = "mv_user";

export const storage = {
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  saveUser(user: unknown) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser<T>() {
    const raw = localStorage.getItem(USER_KEY);

    return raw ? (JSON.parse(raw) as T) : null;
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  clearSession() {
    this.removeToken();
    this.removeUser();
  },
};