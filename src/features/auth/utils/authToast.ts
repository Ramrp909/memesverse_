import { toast } from "sonner";

export const authToast = {
  loginSuccess() {
    toast.success("Welcome back!");
  },

  signupSuccess() {
    toast.success("OTP sent successfully.");
  },

  verifySuccess() {
    toast.success("Account verified successfully.");
  },

  logoutSuccess() {
    toast.success("Logged out successfully.");
  },

  error(message: string) {
    toast.error(message);
  },
};