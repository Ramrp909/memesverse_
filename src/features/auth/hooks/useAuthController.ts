"use client";

import { useCallback, useEffect,useMemo, useState } from "react";

import { authService } from "../services/auth.service";
import { storage } from "@/shared/api/storage";
import { getErrorMessage } from "@/shared/utils/error";
import type { User } from "../types/auth.model";
import type {
  LoginRequest,
  SignupRequest,
  VerifySignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth.api";

export function useAuthController() {
 const [user, setUser] = useState<User | null>(() =>
  storage.getUser<User>()
);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [hydrated, setHydrated] = useState(false);
  const isAuthenticated =
  !!storage.getToken() && !!user;

  const login = useCallback(async (payload: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const loggedInUser = await authService.login(payload);

      setUser(loggedInUser);

      return loggedInUser;
    } catch (err) {
  const message = getErrorMessage(err);
  setError(message);
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
    } catch (err) {
  const message = getErrorMessage(err);
  setError(message);
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
    } catch (err) {
  const message = getErrorMessage(err);
  setError(message);
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
    } catch (err) {
  const message = getErrorMessage(err);
  setError(message);
  throw err;}
  finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (payload: ResetPasswordRequest) => {
    try {
      setLoading(true);
      setError(null);

      return await authService.resetPassword(payload);
    }catch (err) {
  const message = getErrorMessage(err);
  setError(message);
  throw err;}
   finally {
      setLoading(false);
    }
  }, []);

  const restoreSession = useCallback(() => {
  const token = storage.getToken();
  const cachedUser = storage.getUser<User>();

  if (token && cachedUser) {
    setUser(cachedUser);
  }
}, []);
const clearError = useCallback(() => {
  setError(null);
}, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);

      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
  const message = getErrorMessage(err);
  setError(message);
  throw err;}
  finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
    restoreSession();
    setHydrated(true);
}, [restoreSession]);

  return useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated,
      hydrated,

      login,
      signup,
      verifySignup,

      forgotPassword,
      resetPassword,

      logout,
      restoreSession,
      clearError
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
      restoreSession,
      clearError,
    ]
  );
}