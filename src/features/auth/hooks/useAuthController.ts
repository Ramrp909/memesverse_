"use client";

import { useCallback, useMemo, useState } from "react";

import { authService } from "../services/auth.service";

import type { User } from "../types/auth.model";
import type {
  LoginRequest,
  SignupRequest,
  VerifySignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth.api";

export function useAuthController() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const login = useCallback(async (payload: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const loggedInUser = await authService.login(payload);

      setUser(loggedInUser);

      return loggedInUser;
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (payload: SignupRequest) => {
    try {
      setLoading(true);
      setError(null);

      return await authService.signup(payload);
    } catch (err: any) {
      setError(err?.message ?? "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifySignup = useCallback(async (payload: VerifySignupRequest) => {
    try {
      setLoading(true);
      setError(null);

      const verifiedUser = await authService.verifySignup(payload);

      setUser(verifiedUser);

      return verifiedUser;
    } catch (err: any) {
      setError(err?.message ?? "Verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (payload: ForgotPasswordRequest) => {
    try {
      setLoading(true);
      setError(null);

      return await authService.forgotPassword(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (payload: ResetPasswordRequest) => {
    try {
      setLoading(true);
      setError(null);

      return await authService.resetPassword(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);

      await authService.logout();

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated,

      login,
      signup,
      verifySignup,

      forgotPassword,
      resetPassword,

      logout,
    }),
    [
      user,
      loading,
      error,
      isAuthenticated,

      login,
      signup,
      verifySignup,
      forgotPassword,
      resetPassword,
      logout,
    ]
  );
}