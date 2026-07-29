const Google = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  // Signup
  SEND_EMAIL_OTP: `${BASE_URL}/auth/signup/email/send-otp`,
  VERIFY_EMAIL_OTP: `${BASE_URL}/auth/signup/email/verify-otp`,
  SIGNUP_EMAIL: `${BASE_URL}/auth/signup/email`,
  SIGNUP_PHONE: `${BASE_URL}/auth/signup/phone`,

  // Login
  LOGIN_EMAIL: `${BASE_URL}/auth/login/email`,
  LOGIN_PHONE: `${BASE_URL}/auth/login/phone`,
  GOOGLE_AUTH: `${BASE_URL}/auth/google`,

  // Reset Password
  SEND_RESET_PASSWORD_OTP: `${BASE_URL}/auth/reset-password/send-otp`,
  VERIFY_RESET_PASSWORD_OTP: `${BASE_URL}/auth/reset-password/verify-otp`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
};

export default Google;