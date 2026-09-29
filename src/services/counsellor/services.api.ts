import { apiClient } from "@/lib/api-client";

export interface CounsellorService {
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

export function getCounsellorServices() {
  return apiClient.get<CounsellorService[]>("/counsellor/services");
}

export function getCounsellorService(serviceId: number) {
  return apiClient.get<CounsellorService>(`/counsellor/services/${serviceId}`);
}
