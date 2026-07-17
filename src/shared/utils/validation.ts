export function validateEmail(email: string) {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 8;
}

export function validateUsername(username: string) {
  return username.trim().length >= 3;
}

export function validateOtp(otp: string) {
  return otp.length === 6;
}