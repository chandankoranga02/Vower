import { useEffect, useRef } from "react";
import Google from "../../../apis/endpoints";

export default function useGoogleAuth({ onSuccess, onError }) {
  const tokenClient = useRef(null);

  useEffect(() => {
    const initializeGoogleAuth = () => {
      if (!window.google?.accounts?.oauth2) {
        setTimeout(initializeGoogleAuth, 300);
        return;
      }

      tokenClient.current =
        window.google.accounts.oauth2.initTokenClient({
          client_id: Google.CLIENT_ID,
          scope: "openid email profile",

          callback: (response) => {
            if (response.error) {
              onError?.(response);
              return;
            }

            onSuccess?.(response);
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