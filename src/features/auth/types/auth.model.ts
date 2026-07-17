export interface User {
  id: number;
  username: string;
  email: string;
  profile_pic: string | null;
}

export interface Session {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}