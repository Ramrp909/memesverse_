/* -------------------------------------------------------------------------- */
/*                                   Requests                                 */
/* -------------------------------------------------------------------------- */

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
export interface OtpVerificationProps {
  otp: string;
  loading?: boolean;
  resendCountdown: number;

  onOtpChange: (value: string) => void;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

/* -------------------------------------------------------------------------- */
/*                                    User                                    */
/* -------------------------------------------------------------------------- */

export interface ApiUser {
  id: number;
  user_name: string;
  email: string;
  profile_pic?: string | null;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  user: ApiUser;
}

export interface SignupResponse {
  status: string;
  message: string;
}

export interface VerifySignupResponse {
  status: string;
  message: string;
  token: string;
  user: ApiUser;
}

export interface LogoutResponse {
  status: string;
  message: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}