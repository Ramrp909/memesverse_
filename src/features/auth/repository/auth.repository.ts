import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  VerifySignupRequest,
  VerifySignupResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LogoutResponse,
} from "../types/auth.api";

export const authRepository = {
  login(payload: LoginRequest) {
    return apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );
  },

  signup(payload: SignupRequest) {
    return apiClient.post<SignupResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      payload
    );
  },

  verifySignup(payload: VerifySignupRequest) {
    return apiClient.post<VerifySignupResponse>(
      API_ENDPOINTS.AUTH.VERIFY_SIGNUP,
      payload
    );
  },

  logout() {
    return apiClient.post<LogoutResponse>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
  },

  forgotPassword(payload: ForgotPasswordRequest) {
    return apiClient.post<ForgotPasswordResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      payload
    );
  },

  resetPassword(payload: ResetPasswordRequest) {
    return apiClient.post<ResetPasswordResponse>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      payload
    );
  },
};