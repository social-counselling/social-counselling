import { apiClient } from "@/lib/api-client";

export interface CounsellorProfile {
  id: number;
  credentials: string | null;
  bio: string | null;
  mantra: string | null;
  coverage: string | null;
  experienceYears: number | null;
  experienceText: string | null;
  avgRating: number;
  totalReviews: number;
  status: string;

  user: {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    phone: string | null;
    gender: string;
    dateOfBirth: string | null;
    profileImageUrl: string | null;
  };

  languages: {
    id: string;
    name: string;
  }[];

  specializations: string[];

  services: {
    id: number;
    price: number;
    service: {
      serviceId: number;
      title: string;
      slug: string;
      category: string;
      subtitle: string | null;
      imageUrl: string | null;
    };
  }[];
}

export interface UpdateCounsellorProfileRequest {
  credentials?: string;
  bio?: string;
  mantra?: string;
  coverage?: string;
  experienceYears?: number;
  experienceText?: string;
  languageIds?: string[];
  specializations?: string[];
}

export interface ChangeCounsellorPasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export function getCounsellorProfile() {
  return apiClient.get<CounsellorProfile>("/counsellor/profile");
}

export function updateCounsellorProfile(data: UpdateCounsellorProfileRequest) {
  return apiClient.patch<CounsellorProfile>("/counsellor/profile", data);
}

export function changeCounsellorPassword(
  data: ChangeCounsellorPasswordRequest,
) {
  return apiClient.patch<{
    message: string;
  }>("/counsellor/profile/password", data);
}
