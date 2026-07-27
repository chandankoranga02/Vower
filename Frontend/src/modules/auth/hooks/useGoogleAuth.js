import { useEffect, useRef } from "react";
import Google, { AUTH_ENDPOINTS } from "../../../apis/endpoints";

/**
 * useGoogleAuth
 *
 * Wraps the Google Identity Services Token Client.
 * On success, sends the access_token to the backend /auth/google endpoint,
 * which verifies it, creates/finds the user in the DB, and returns a JWT.
 *
 * @param {function} onSuccess  Called with { token, user, msg } on successful auth
 * @param {function} onError    Called with an error message string on failure
 */
export default function useGoogleAuth({ onSuccess, onError }) {
  const tokenClient = useRef(null);

  useEffect(() => {
    const initializeGoogleAuth = () => {
      if (!window.google?.accounts?.oauth2) {
        setTimeout(initializeGoogleAuth, 300);
        return;
      }

      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: Google.CLIENT_ID,
        scope: "openid email profile",

        callback: async (response) => {
          if (response.error) {
            onError?.(response.error);
            return;
          }

          // Send the access token to backend for verification & DB operation
          try {
            const res = await fetch(AUTH_ENDPOINTS.GOOGLE_AUTH, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: response.access_token }),
            });

            const data = await res.json();

            if (!res.ok) {
              onError?.(data.msg || "Google authentication failed");
              return;
            }

            onSuccess?.({ token: data.token, user: data.user, msg: data.msg });
          } catch (err) {
            onError?.("Network error. Please try again.");
          }
        },
      });
    };

    initializeGoogleAuth();

    return () => {
      tokenClient.current = null;
    };
  }, [onSuccess, onError]);

  const login = () => {
    if (!tokenClient.current) {
      console.error("Google OAuth is not ready yet.");
      return;
    }

    tokenClient.current.requestAccessToken();
  };

  return login;
}