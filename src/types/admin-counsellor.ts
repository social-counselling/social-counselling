export type CounsellorStatus = "ACTIVE" | "INACTIVE";

export interface CounsellorUser {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  profileImageUrl: string | null;
  dateOfBirth: string | null;
  gender: "MALE" | "FEMALE" | "OTHER";
  status: CounsellorStatus;
}
export interface CounsellorLanguage {
  id: string;
  name: string;
  code: string | null;
}

export interface CounsellorService {
  id: number;
  price: string;
  service: {
    serviceId: number;
    title: string;
    slug: string | null;
    category: string;
    subtitle: string | null;
    imageUrl: string | null;
  };
}

export interface AdminCounsellor {
  id: number;

  userId: string;

  credentials: string | null;
  bio: string | null;
  mantra: string | null;
  coverage: string | null;

  experienceYears: number | null;
  experienceText: string | null;

  languageIds: string[];
  specializations: string[];

  avgRating: number;
  totalReviews: number;

  status: CounsellorStatus;
  sortOrder: number;

  createdBy: string | null;
  updatedBy: string | null;

  createdAt: string;
  updatedAt: string;

  user: CounsellorUser;

  languages: CounsellorLanguage[];

  services: CounsellorService[];
}

export interface CreateCounsellorUserData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profileImageUrl?: string;
}

export interface CounsellorFormData {
  user: CreateCounsellorUserData;

  credentials?: string;
  bio?: string;
  mantra?: string;
  coverage?: string;
  experienceYears?: number;
  experienceText?: string;
  languageIds: string[];
  specializations: string[];
  sortOrder?: number;
}
