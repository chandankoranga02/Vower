 const Google = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  SEND_EMAIL_OTP: `${BASE_URL}/auth/signup/email/send-otp`,
  VERIFY_EMAIL_OTP: `${BASE_URL}/auth/signup/email/verify-otp`,
  SIGNUP_EMAIL: `${BASE_URL}/auth/signup/email`,
  SIGNUP_PHONE: `${BASE_URL}/auth/signup/phone`,
  LOGIN_EMAIL: `${BASE_URL}/auth/login/email`,
  LOGIN_PHONE: `${BASE_URL}/auth/login/phone`,
  GOOGLE_AUTH: `${BASE_URL}/auth/google`,
};

export default Google;