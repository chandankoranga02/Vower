import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and exposes auth state.
 * Auth is determined by calling GET /profile with credentials (httpOnly cookie).
 * No localStorage is used.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on first mount by calling /profile
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/profile`, {
        credentials: 'include',
      });

      if (res.ok) {
        const json = await res.json();
        // Backend returns: { success, message, data: { data: { fullName, email, user_id, photo, phone } } }
        setUser(json.data?.data ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // ignore network errors on logout
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to access auth state from any component */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
