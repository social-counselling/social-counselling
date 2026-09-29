import { apiClient } from "@/lib/api-client";

export type UserRole = "ADMIN" | "COUNSELLOR" | "CLIENT";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  status: string;
  role: UserRole;
  profileImageUrl?: string | null;
  counsellorId?: number | null;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
  accessToken: string;
}

export interface MeResponse {
  message: string;
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string | null;
    role: UserRole;
    profileImageUrl: string | null;
    counsellorId: number | null;
  };
}

export function login(data: LoginRequest) {
  return apiClient.post<LoginResponse>("/auth/login", data);
}

export function getCurrentUser() {
  return apiClient.get<MeResponse>("/auth/me");
}

export function refreshAccessToken() {
  return apiClient.post<{
    accessToken: string;
  }>("/auth/refresh");
}

export function logout() {
  return apiClient.post<{
    message: string;
  }>("/auth/logout");
}
