import { apiClient } from "@/lib/api-client";

export interface AdminLanguage {
  id: string;
  name: string;
  code: string | null;
  isActive: boolean;
}

export async function getAdminLanguages(): Promise<AdminLanguage[]> {
  const response = await apiClient.get<AdminLanguage[]>(
    "/admin/languages",
  );

  return Array.isArray(response) ? response : [];
}