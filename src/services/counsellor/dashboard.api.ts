import { apiClient } from "@/lib/api-client";

export interface CounsellorDashboardService {
  id: number;
  price: number;
  createdAt: string;
  service: {
    serviceId: number;
    title: string;
    slug: string;
    category: string;
    subtitle: string | null;
    imageUrl: string | null;
  };
}

export interface CounsellorDashboardResponse {
  counsellor: {
    id: number;
    name: string;
    profileImageUrl: string | null;
    credentials: string | null;
    experienceYears: number | null;
    experienceText: string | null;
    avgRating: number;
    totalReviews: number;
    status: string;
  };
  services: CounsellorDashboardService[];
}

export interface CounsellorSlot {
  id: number;
  date: string;
  status: string;
  slot: {
    id: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
  };
}

export function getCounsellorDashboard() {
  return apiClient.get<CounsellorDashboardResponse>("/counsellor/dashboard");
}

export function getCounsellorSlots(date?: string) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";

  return apiClient.get<CounsellorSlot[]>(`/counsellor/slots${query}`);
}
