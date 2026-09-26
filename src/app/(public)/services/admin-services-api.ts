import type { AdminService ,ServiceFormData ,   } from "@/types/admin-service";

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
  contentStatus?: string;
  isActive?: boolean;
  isPublished?: boolean;
  page?: number;
  limit?: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

export async function getAdminServices(
  params: AdminServicesParams = {},
): Promise<AdminServicesResponse> {
  const query = new URLSearchParams();

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.category) {
    query.set("category", params.category);
  }

  if (params.contentStatus) {
    query.set("contentStatus", params.contentStatus);
  }

  if (params.isActive !== undefined) {
    query.set("isActive", String(params.isActive));
  }

  if (params.isPublished !== undefined) {
    query.set("isPublished", String(params.isPublished));
  }

  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 10));

  const response = await fetch(
    `${API_URL}/admin/services?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch services: ${response.status}`,
    );
  }

  return response.json();
}

export async function createAdminService(
  data: ServiceFormData,
): Promise<AdminService> {
  const response = await fetch(`${API_URL}/admin/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to create service",
    );
  }

  return result;
}

export async function getAdminService(
  id: string,
): Promise<AdminService> {
  const response = await fetch(
    `${API_URL}/admin/services/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch service",
    );
  }

  return result;
}

export async function updateAdminService(
  id: string,
  data: ServiceFormData,
): Promise<AdminService> {
  const response = await fetch(
    `${API_URL}/admin/services/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to update service",
    );
  }

  return result;
}

export async function deleteAdminService(
  id: string,
): Promise<AdminService> {
  const response = await fetch(
    `${API_URL}/admin/services/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to delete service",
    );
  }

  return result;
}