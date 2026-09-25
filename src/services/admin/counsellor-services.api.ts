import { apiClient } from "@/lib/api-client";

export interface AdminCounsellorService {
  id: number;
  counsellorId: number;
  serviceId: number;
  price: string;
  createdAt: string;

  service: {
    serviceId: number;
    title: string;
    slug: string | null;
    category: string;
    subtitle: string | null;
    imageUrl: string | null;
    isActive?: boolean;
  };
}

export interface CreateCounsellorServiceData {
  counsellorId: number;
  serviceId: number;
  price: number;
}

export interface UpdateCounsellorServiceData {
  price?: number;
}

export function getAdminCounsellorServices(
  counsellorId?: number,
) {
  return apiClient.get<AdminCounsellorService[]>(
    "/admin/counsellor-services",
    counsellorId !== undefined
      ? {
          counsellorId,
        }
      : undefined,
  );
}

export function createAdminCounsellorService(
  data: CreateCounsellorServiceData,
) {
  return apiClient.post<AdminCounsellorService>(
    "/admin/counsellor-services",
    data,
  );
}

export function updateAdminCounsellorService(
  id: number,
  data: UpdateCounsellorServiceData,
) {
  return apiClient.patch<AdminCounsellorService>(
    `/admin/counsellor-services/${id}`,
    data,
  );
}

export function deleteAdminCounsellorService(
  id: number,
) {
  return apiClient.delete<AdminCounsellorService>(
    `/admin/counsellor-services/${id}`,
  );
}