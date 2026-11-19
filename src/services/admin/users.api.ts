import { apiClient } from '@/lib/api-client';

export type AdminClient = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  profileImageUrl: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
};
export type AdminClientsResponse = {
  data: AdminClient[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};
export async function getAdminClients(params: { page?: number; limit?: number; search?: string; status?: string } = {}) {
  return apiClient.get<AdminClientsResponse>('/admin/clients', {
    page: params.page ?? 1, limit: params.limit ?? 10,
    search: params.search?.trim() || undefined, status: params.status || undefined,
  });
}
export async function updateAdminProfileImage(profileImageUrl: string | null) {
  return apiClient.patch('/admin/profile/image', { profileImageUrl });
}

export async function updateAdminClientStatus(id: string, status: 'ACTIVE' | 'INACTIVE') {
  return apiClient.patch<{id:string;status:'ACTIVE'|'INACTIVE'}>(`/admin/clients/${id}/status`, { status });
}
