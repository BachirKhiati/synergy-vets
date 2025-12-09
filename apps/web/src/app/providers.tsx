"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { AuthSuccess, AuthUser } from "@/lib/api/auth";
import { loginUser, logoutSession, refreshSession, registerUser } from "@/lib/api/auth";

const STORAGE_KEY = "sv-auth-session";

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiry: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  refreshTokenExpiry: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type StoredSession = AuthSession;

type ParsedSession = StoredSession | null;

function readSession(): ParsedSession {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed?.accessToken || !parsed?.refreshToken) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.error("Failed to parse stored auth session", error);
    return null;
  }
}

function writeSession(session: StoredSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function toSession(payload: AuthSuccess): AuthSession {
  return {
    user: payload.user,
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    refreshTokenExpiry: payload.refresh_token_expiry,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshingRef = useRef(false);

  const clearSession = useCallback(() => {
    setSession(null);
    writeSession(null);
  }, []);

  const storeSession = useCallback((next: AuthSession) => {
    setSession(next);
    writeSession(next);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const stored = readSession();
      if (!stored) {
        if (mounted) {
          clearSession();
          setIsLoading(false);
        }
        return;
      }

      const expiry = Date.parse(stored.refreshTokenExpiry);
      if (Number.isNaN(expiry) || expiry <= Date.now()) {
        if (mounted) {
          clearSession();
          setIsLoading(false);
        }
        return;
      }

      if (mounted) {
        storeSession(stored);
      }

      try {
        const refreshed = await refreshSession(stored.refreshToken);
        if (!mounted) {
          return;
        }
        storeSession(toSession(refreshed));
      } catch (error) {
        console.error("Failed to refresh auth session on bootstrap", error);
        if (mounted) {
          clearSession();
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [clearSession, storeSession]);

  const refresh = useCallback(async () => {
    if (!session) {
      throw new Error("No active session");
    }
    if (refreshingRef.current) {
      return;
    }

    const expiry = Date.parse(session.refreshTokenExpiry);
    if (Number.isNaN(expiry) || expiry <= Date.now() + 60_000) {
      clearSession();
      throw new Error("Refresh token expired");
    }

    refreshingRef.current = true;
    try {
      const refreshed = await refreshSession(session.refreshToken);
      storeSession(toSession(refreshed));
    } catch (error) {
      console.error("Failed to refresh session", error);
      clearSession();
      throw error instanceof Error ? error : new Error("Unable to refresh session");
    } finally {
      refreshingRef.current = false;
    }
  }, [session, clearSession, storeSession]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const interval = window.setInterval(() => {
      const expiry = Date.parse(session.refreshTokenExpiry);
      if (Number.isNaN(expiry) || expiry <= Date.now() + 60_000) {
        clearSession();
        return;
      }

      refresh().catch((error) => {
        console.error("Scheduled refresh failed", error);
      });
    }, 10 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, [session, refresh, clearSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginUser(email, password);
      storeSession(toSession(result));
    },
    [storeSession],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const result = await registerUser(email, password);
      storeSession(toSession(result));
    },
    [storeSession],
  );

  const logout = useCallback(async () => {
    if (!session) {
      clearSession();
      return;
    }

    try {
      await logoutSession(session.refreshToken);
    } catch (error) {
      console.error("Failed to revoke session on logout", error);
    } finally {
      clearSession();
    }
  }, [session, clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,
      refreshToken: session?.refreshToken ?? null,
      refreshTokenExpiry: session?.refreshTokenExpiry ?? null,
      isAuthenticated: Boolean(session),
      isLoading,
      login,
      register,
      logout,
      refresh,
    }),
    [session, isLoading, login, register, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
