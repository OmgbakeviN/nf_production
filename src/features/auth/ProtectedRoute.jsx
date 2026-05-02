import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getMe } from "./authApi";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  saveCurrentUser,
} from "./authStore";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken && !refreshToken) {
        clearAuth();
        setAllowed(false);
        setChecking(false);
        return;
      }

      try {
        const user = await getMe();

        saveCurrentUser(user);
        setAllowed(true);
      } catch (error) {
        clearAuth();
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    }

    checkSession();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Checking session...
        </p>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}