import { authRepository } from "../repository/auth.repository";
import { mapApiUser } from "../mapper/auth.mapper";

import { storage } from "@/shared/api/storage";

import type {
  LoginRequest,
  SignupRequest,
  VerifySignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth.api";

export const authService = {
  async login(payload: LoginRequest) {
    const { data } = await authRepository.login(payload);
    storage.saveToken(data.token);
    const user = mapApiUser(data.user);
    storage.saveUser(user);
    return user;
  },

  async signup(payload: SignupRequest) {
    const { data } = await authRepository.signup(payload);

    return data;
  },

  async verifySignup(payload: VerifySignupRequest) {
    const { data } = await authRepository.verifySignup(payload);

    storage.saveToken(data.token);

    const user = mapApiUser(data.user);

    storage.saveUser(user);

    return user;
  },

  async logout() {
    try {
      await authRepository.logout();
    } finally {
      storage.clearSession();
    }
  },

  async forgotPassword(payload: ForgotPasswordRequest) {
    const { data } = await authRepository.forgotPassword(payload);

    return data;
  },

  async resetPassword(payload: ResetPasswordRequest) {
    const { data } = await authRepository.resetPassword(payload);

    return data;
  },
};