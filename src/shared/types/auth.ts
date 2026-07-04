export interface User {
  id: number;
  username: string;
  avatar: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export type AuthStatus = "authenticated" | "unauthenticated";