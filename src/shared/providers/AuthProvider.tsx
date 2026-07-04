import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";
import { MOCK_USER } from "../mocks/data";

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(u: User) {
    setUser(u);
  }

  function logout() {
    setUser(null);
  }

  // For demo: expose mock login helper on window
  if (typeof window !== "undefined") {
    (window as any).__mvLogin = () => login(MOCK_USER);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
