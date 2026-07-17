import type { User } from "@/features/auth/types/auth.model";
import type {
  LoginRequest,
  SignupRequest,
  VerifySignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/features/auth/types/auth.api";

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;

  isAuthenticated: boolean;
  hydrated: boolean;

  login(payload: LoginRequest): Promise<User>;
  signup(payload: SignupRequest): Promise<any>;
  verifySignup(payload: VerifySignupRequest): Promise<User>;

  forgotPassword(payload: ForgotPasswordRequest): Promise<any>;
  resetPassword(payload: ResetPasswordRequest): Promise<any>;

  logout(): Promise<void>;
}