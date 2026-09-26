import { apiClient } from "@/lib/api-client";

export interface AdminSlot {
  id: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSlotData {
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

export interface UpdateSlotData {
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}

export function getAdminSlots() {
  return apiClient.get<AdminSlot[]>("/admin/slots");
}

export function getAdminSlot(id: number) {
  return apiClient.get<AdminSlot>(`/admin/slots/${id}`);
}

export function createAdminSlot(data: CreateSlotData) {
  return apiClient.post<AdminSlot>("/admin/slots", data);
}

export function updateAdminSlot(id: number, data: UpdateSlotData) {
  return apiClient.patch<AdminSlot>(`/admin/slots/${id}`, data);
}

export function deleteAdminSlot(id: number) {
  return apiClient.delete<AdminSlot>(`/admin/slots/${id}`);
}
