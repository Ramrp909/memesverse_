"use client";

import { useAuthContext } from "@/shared/providers/AuthProvider";

export function useAuth() {
  return useAuthContext();
}