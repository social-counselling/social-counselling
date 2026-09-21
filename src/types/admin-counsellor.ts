export type CounsellorStatus =
  | "ACTIVE"
  | "INACTIVE";

export type CounsellorAvailability =
  | "AVAILABLE"
  | "UNAVAILABLE";

export interface AdminCounsellor {
  id: string;

  name: string;
  age: number | null;

  imageUrl: string;

  credentials: string;

  bio: string;

  specializations: string[];

  languages: string[];

  coverage: string;

  status: CounsellorStatus;

  availability: CounsellorAvailability;

  isPublished: boolean;

  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface CounsellorFormData {
  name: string;
  age: number | null;

  imageUrl: string;

  credentials: string;

  bio: string;

  specializations: string[];

  languages: string[];

  coverage: string;

  status: CounsellorStatus;

  availability: CounsellorAvailability;

  isPublished: boolean;

  sortOrder: number;
}