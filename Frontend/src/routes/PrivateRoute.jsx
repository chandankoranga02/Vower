import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/session";

/**
 * PrivateRoute
 *
 * Wraps any route that requires authentication.
 * Unauthenticated users are redirected to /login.
 *
 * Usage in Router:
 *   <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
 */
export default function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
