
const TOKEN_KEY = "vower_token";

/** Store the JWT after successful login/signup. */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/** Retrieve the stored JWT (null if not present). */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/** Remove the JWT — call on logout. */
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/** Returns true if a token exists (does not validate expiry client-side). */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Build the Authorization header value for API calls to protected routes.
 * Usage: fetch(url, { headers: { Authorization: getAuthHeader() } })
 */
export const getAuthHeader = () => {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
};
