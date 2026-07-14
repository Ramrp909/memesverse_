"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useAuthController } from "@/features/auth/hooks/useAuthController";
import type { AuthContextValue } from "@/shared/types/auth";

export const AuthContext =
  createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuthController();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}