import { API_URL } from "./api";

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
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

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data
        ? (data as { message?: string }).message
        : "Something went wrong";

    throw new Error(
      Array.isArray(message)
        ? message.join(", ")
        : message || "Request failed",
    );
  }

  return data as T;
}

export const apiClient = {
  get<T>(
    endpoint: string,
    params?: RequestOptions["params"],
  ) {
    return request<T>(endpoint, {
      method: "GET",
      params,
    });
  },

  post<T>(
    endpoint: string,
    body?: unknown,
  ) {
    return request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(
    endpoint: string,
    body?: unknown,
  ) {
    return request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, {
      method: "DELETE",
    });
  },
};    