import type {
  AdminCounsellor,
  CounsellorFormData,
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
  language?: string;
  status?: string;
  availability?: string;
  isPublished?: boolean;
  page?: number;
  limit?: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

export async function getAdminCounsellors(
  params: AdminCounsellorsParams = {},
): Promise<AdminCounsellorsResponse> {
  const query = new URLSearchParams();

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.specialization) {
    query.set(
      "specialization",
      params.specialization,
    );
  }

  if (params.language) {
    query.set(
      "language",
      params.language,
    );
  }

  if (params.status) {
    query.set("status", params.status);
  }

  if (params.availability) {
    query.set(
      "availability",
      params.availability,
    );
  }

  if (params.isPublished !== undefined) {
    query.set(
      "isPublished",
      String(params.isPublished),
    );
  }

  query.set(
    "page",
    String(params.page ?? 1),
  );

  query.set(
    "limit",
    String(params.limit ?? 10),
  );

  const response = await fetch(
    `${API_URL}/admin/counsellors?${query.toString()}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Failed to fetch counsellors",
    );
  }

  return result;
}

export async function getAdminCounsellor(
  id: string,
): Promise<AdminCounsellor> {
  const response = await fetch(
    `${API_URL}/admin/counsellors/${id}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Failed to fetch counsellor",
    );
  }

  return result;
}

export async function createAdminCounsellor(
  data: CounsellorFormData,
): Promise<AdminCounsellor> {
  const response = await fetch(
    `${API_URL}/admin/counsellors`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Failed to create counsellor",
    );
  }

  return result;
}

export async function updateAdminCounsellor(
  id: string,
  data: CounsellorFormData,
): Promise<AdminCounsellor> {
  const response = await fetch(
    `${API_URL}/admin/counsellors/${id}`,
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
      result?.message ||
        "Failed to update counsellor",
    );
  }

  return result;
}

export async function deleteAdminCounsellor(
  id: string,
): Promise<AdminCounsellor> {
  const response = await fetch(
    `${API_URL}/admin/counsellors/${id}`,
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
      result?.message ||
        "Failed to delete counsellor",
    );
  }

  return result;
}