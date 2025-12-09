import { API_BASE_URL } from "@/lib/config";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  status: string;
};

export type AuthSuccess = {
  access_token: string;
  refresh_token: string;
  refresh_token_expiry: string;
  user: AuthUser;
};

type ErrorResponse = {
  error?: string;
};

type RequestPayload = Record<string, unknown>;

async function post<T>(path: string, payload: RequestPayload): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const data = (await response.json()) as ErrorResponse;
      if (data.error) {
        message = data.error;
      }
    } catch (error) {
      console.error("Failed to parse auth error payload", error);
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function loginUser(email: string, password: string): Promise<AuthSuccess> {
  return post<AuthSuccess>("/api/v1/auth/login", { email, password });
}

export async function registerUser(email: string, password: string): Promise<AuthSuccess> {
  return post<AuthSuccess>("/api/v1/auth/register", { email, password });
}

export async function refreshSession(refreshToken: string): Promise<AuthSuccess> {
  return post<AuthSuccess>("/api/v1/auth/refresh", { refresh_token: refreshToken });
}

export async function logoutSession(refreshToken: string): Promise<void> {
  await post<unknown>("/api/v1/auth/logout", { refresh_token: refreshToken });
}
