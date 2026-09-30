import { apiClient } from "@/lib/api-client";
import type {
  AdminService,
  ServiceFormData,
} from "@/types/admin-service";

export interface AdminServicesMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminServicesResponse {
  data: AdminService[];
  meta: AdminServicesMeta;
}

export interface AdminServicesParams {
  search?: string;
  category?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export function getAdminServices(
  params: AdminServicesParams = {},
) {
  return apiClient.get<AdminServicesResponse>(
    "/admin/services",
    {
      search: params.search,
      category: params.category,
      isActive: params.isActive,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  );
}

export function getAdminService(id: string) {
  return apiClient.get<AdminService>(
    `/admin/services/${id}`,
  );
}

export function createAdminService(
  data: ServiceFormData,
) {
  return apiClient.post<AdminService>(
    "/admin/services",
    data,
  );
}

export function updateAdminService(
  id: string,
  data: ServiceFormData,
) {
  return apiClient.patch<AdminService>(
    `/admin/services/${id}`,
    data,
  );
}

export function disableAdminService(id: string) {
  return apiClient.patch<AdminService>(
    `/admin/services/${id}`,
    {
      isActive: false,
    },
  );
}

export function enableAdminService(id: string) {
  return apiClient.patch<AdminService>(
    `/admin/services/${id}`,
    {
      isActive: true,
    },
  );
}