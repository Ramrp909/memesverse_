/* ---------- Requests ---------- */

export interface LoginRequest {
  email: string;
  password: string;
  device_id: string;
  device_name: string;
  platform: string;
}

export interface SignupRequest {
  user_name: string;
  email: string;
  password: string;
  device_id: string;
}

export interface VerifySignupRequest {
  email: string;
  otp: string;
  device_id: string;
  device_name: string;
  platform: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

/* ---------- User ---------- */

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  profile_picture?: string | null;
}

/* ---------- Responses ---------- */

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user: ApiUser;
}

export interface SignupResponse {
  message: string;
  email: string;
}

export interface VerifySignupResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user: ApiUser;
}

export interface LogoutResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}