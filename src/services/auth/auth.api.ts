import { apiClient } from "@/lib/api-client";

export type UserRole = "ADMIN" | "COUNSELLOR" | "CLIENT";

export interface LoginRequest {
  email: string;
  password: string;
}

/** User shape returned by the login endpoint. */
export interface AuthUser {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone?: string | null;
  status?: string;
  role: UserRole;
  profileImageUrl?: string | null;
  counsellorId?: number | null;
  permissions?: string[];
}

export interface UserNavigationItem {
  key: string;
  name: string;
  path: string;
  icon: string | null;
  sortOrder: number;
}

export interface CurrentUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: UserRole;
  profileImageUrl: string | null;
  counsellorId: number | null;
  permissions: string[];
  navigation: UserNavigationItem[];
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
  accessToken: string;
}

/** Matches the current backend GET /auth/me response. */
export interface MeResponse {
  message: string;
  user: CurrentUser;
}

export function login(data: LoginRequest) {
  return apiClient.post<LoginResponse>("/auth/login", data);
}

export function requestOtp(data: RequestOtpRequest) {
  return apiClient.post<RequestOtpResponse>(
    "/auth/otp/request",
    data,
  );
}

export function verifyLoginOtp(data: VerifyOtpRequest) {
  return apiClient.post<VerifyLoginOtpResponse>(
    "/auth/otp/verify",
    data,
  );
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


export type OtpPurpose = "LOGIN" | "BOOKING";

export interface RequestOtpRequest {
  email: string;
  purpose: OtpPurpose;
}

export interface RequestOtpResponse {
  message: string;
  expiresIn: number;
  resendAfter: number;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  purpose: OtpPurpose;
}

export interface VerifyLoginOtpResponse {
  message: string;
  user: AuthUser;
  accessToken: string;
}

export interface VerifyBookingOtpResponse {
  message: string;
  email: string;
  verificationToken: string;
}

export function verifyOtp(
  data: VerifyOtpRequest,
) {
  return apiClient.post<
    VerifyLoginOtpResponse | VerifyBookingOtpResponse
  >("/auth/otp/verify", data);
}