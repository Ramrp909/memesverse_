import type {
  LoginRequest,
  SignupRequest,
  VerifySignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignupResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "@/features/auth/types/auth.api";
import type { User } from "@/features/auth/types/auth.model";

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;

  isAuthenticated: boolean;
  hydrated: boolean;

  login(payload: LoginRequest): Promise<User>;
  signup(payload: SignupRequest): Promise<SignupResponse>;
  verifySignup(payload: VerifySignupRequest): Promise<User>;

  forgotPassword(
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse>;

  resetPassword(
    payload: ResetPasswordRequest
  ): Promise<ResetPasswordResponse>;

  logout(): Promise<void>;
}