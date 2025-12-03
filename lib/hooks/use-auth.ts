"use client";

import { useCallback, useEffect, useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  adminId: string | null;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    adminId: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();

      setAuth({
        isAuthenticated: data.authenticated,
        isLoading: false,
        adminId: data.admin?.id || null,
      });
    } catch {
      setAuth({
        isAuthenticated: false,
        isLoading: false,
        adminId: null,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuth({
      isAuthenticated: false,
      isLoading: false,
      adminId: null,
    });
    window.location.href = "/";
  };

  return { ...auth, logout, checkAuth };
}

