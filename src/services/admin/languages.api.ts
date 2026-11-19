import { apiClient } from "@/lib/api-client";

export interface AdminLanguage {
  id: string;
  name: string;
  code: string | null;
  isActive: boolean;
}

export async function getAdminLanguages(): Promise<AdminLanguage[]> {
  const response = await apiClient.get<AdminLanguage[]>("/admin/languages");

  return Array.isArray(response) ? response : [];
}
export async function createAdminLanguage(data: {
  name: string;
  code?: string;
}) {
  return apiClient.post<AdminLanguage>("/admin/languages", data);
}

export async function deleteAdminLanguage(id: string) {
  return apiClient.delete<AdminLanguage>(`/admin/languages/${id}`);
}

export async function activateAdminLanguage(id: string) {
  return apiClient.patch<AdminLanguage>(`/admin/languages/${id}`, {
    isActive: true,
  });
}
