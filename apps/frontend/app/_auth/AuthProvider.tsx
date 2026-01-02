"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearStoredAuth,
  fetchMe,
  getStoredEmail,
  getStoredToken,
} from "./authClient";

type AuthStatus = "loading" | "guest" | "authed";

export type AuthUser = {
  id: string;
  email: string;
  isTokenHolder: boolean;
};

type AuthState = {
  status: AuthStatus;
  token: string | null;
  email: string | null;
  user: AuthUser | null;
  error: string | null;

  /** whether token is persisted in localStorage (vs sessionStorage) */
  isRemembered: boolean;

  refresh: () => Promise<void>;
  logout: () => void;
};

const AuthCtx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Track where token came from (optional, but handy)
  const [isRemembered, setIsRemembered] = useState(false);

  const logout = useCallback(() => {
    clearStoredAuth();
    setToken(null);
    setEmail(null);
    setUser(null);
    setError(null);
    setIsRemembered(false);
    setStatus("guest");
  }, []);

  const refresh = useCallback(async () => {
    // ✅ IMPORTANT: getStoredToken() must check BOTH local + session
    const t = getStoredToken();
    const e = getStoredEmail();

    setToken(t);
    setEmail(e);

    // Determine persistence (localStorage vs sessionStorage)
    // If token is present in localStorage, it's remembered.
    // If only in sessionStorage, it's not remembered.
    try {
      const localT =
        typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      setIsRemembered(!!localT);
    } catch {
      setIsRemembered(false);
    }

    if (!t) {
      setUser(null);
      setError(null);
      setStatus("guest");
      return;
    }

    setStatus("loading");
    setError(null);

    const me = await fetchMe(t);

    if (!me.success) {
      // token invalid/expired
      logout();
      setError(me.error || "Session expired");
      return;
    }

    setUser({
      id: me.user.id,
      email: me.user.email,
      isTokenHolder: !!me.user.isTokenHolder,
    });
    setStatus("authed");
  }, [logout]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      status,
      token,
      email,
      user,
      error,
      isRemembered,
      refresh,
      logout,
    }),
    [status, token, email, user, error, isRemembered, refresh, logout]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
