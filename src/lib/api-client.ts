import { API_URL } from "./api";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./auth/auth-storage";

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

type ApiErrorResponse = {
  message?: string | string[];
};

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        clearAccessToken();
        return null;
      }

      const data = (await response.json()) as {
        accessToken?: string;
      };

      if (!data.accessToken) {
        clearAccessToken();
        return null;
      }

      setAccessToken(data.accessToken);

      return data.accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);

      clearAccessToken();

      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
  isRetry = false,
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const accessToken = getAccessToken();

  const headers = new Headers(fetchOptions.headers);

  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,

    credentials: "include",

    headers,
  });

  /*
   * Access token expired.
   *
   * Try to refresh it once and retry
   * the original request.
   */
  if (
    response.status === 401 &&
    !isRetry &&
    endpoint !== "/auth/refresh" &&
    endpoint !== "/auth/login"
  ) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      return request<T>(endpoint, options, true);
    }

    clearAccessToken();

    throw new Error("Your session has expired. Please login again.");
  }

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? (data as ApiErrorResponse).message
        : "Something went wrong";

    throw new Error(
      Array.isArray(message) ? message.join(", ") : message || "Request failed",
    );
  }

  return data as T;
}

export const apiClient = {
  get<T>(endpoint: string, params?: RequestOptions["params"]) {
    return request<T>(endpoint, {
      method: "GET",
      params,
    });
  },

  post<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, {
      method: "DELETE",
    });
  },
};
