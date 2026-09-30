import { apiClient } from "@/lib/api-client";

import type {
  AdminCounsellor,
  CounsellorFormData,
  CounsellorStatus,
} from "@/types/admin-counsellor";

export interface AdminCounsellorsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminCounsellorsResponse {
  data: AdminCounsellor[];
  meta: AdminCounsellorsMeta;
}

export interface AdminCounsellorsParams {
  search?: string;
  specialization?: string;
  languageId?: string;
  status?: CounsellorStatus;
  page?: number;
  limit?: number;
}

interface BackendCounsellorsResponse {
  value?: AdminCounsellor[];
  Count?: number;
}

export async function getAdminCounsellors(
  params: AdminCounsellorsParams = {},
): Promise<AdminCounsellorsResponse> {
  const response = await apiClient.get<
    AdminCounsellorsResponse |
    BackendCounsellorsResponse |
    AdminCounsellor[]
  >("/admin/counsellors", {
    search: params.search,
    specialization: params.specialization,
    languageId: params.languageId,
    status: params.status,
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  });

  // Current backend response:
  // [ ...counsellors ]
  if (Array.isArray(response)) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const total = response.length;

    return {
      data: response,
      meta: {
        page,
        limit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    };
  }

  // Older backend response:
  // { value: [...], Count: number }
  if ("value" in response && Array.isArray(response.value)) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const total = response.Count ?? response.value.length;

    return {
      data: response.value,
      meta: {
        page,
        limit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    };
  }

  // Paginated response:
  // { data: [...], meta: {...} }
  return response as AdminCounsellorsResponse;
}

export function getAdminCounsellor(id: string) {
  return apiClient.get<AdminCounsellor>(
    `/admin/counsellors/${id}`,
  );
}

export function createAdminCounsellor(
  data: CounsellorFormData,
) {
  return apiClient.post<AdminCounsellor>(
    "/admin/counsellors",
    data,
  );
}

export function updateAdminCounsellor(
  id: string,
  data: CounsellorFormData,
) {
  return apiClient.patch<AdminCounsellor>(
    `/admin/counsellors/${id}`,
    data,
  );
}

export function updateAdminCounsellorStatus(
  id: string,
  status: CounsellorStatus,
) {
  return apiClient.patch<{
    message: string;
    status: CounsellorStatus;
  }>(`/admin/counsellors/${id}/status`, {
    status,
  });
}
