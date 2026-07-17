import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    switch (message) {
      case "Invalid credentials":
        return "Incorrect email or password.";

      case "OTP expired":
        return "Your OTP has expired. Please request a new OTP.";

      case "User already exists":
        return "An account with this email already exists.";

      case "Invalid OTP":
        return "The OTP you entered is incorrect.";

      default:
        return (
          message ??
          "Something went wrong. Please try again."
        );
    }
  }

  if (!navigator.onLine) {
    return "No internet connection.";
  }

  return "Something went wrong. Please try again.";
}