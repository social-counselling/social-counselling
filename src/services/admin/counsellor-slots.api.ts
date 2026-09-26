import { apiClient } from "@/lib/api-client";

export type CounsellorSlotStatus = "AVAILABLE" | "BOOKED" | "BLOCKED";

export interface AdminCounsellorSlot {
  id: number;
  counsellorId: number;
  slotId: number;
  date: string;
  status: CounsellorSlotStatus;
  createdAt: string;
  updatedAt: string;

  slot: {
    id: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
  };
}

export interface CreateCounsellorSlotData {
  counsellorId: number;
  slotId: number;
  date: string;
}

export interface UpdateCounsellorSlotData {
  slotId?: number;
  date?: string;
}

export function getAdminCounsellorSlots(counsellorId?: number, date?: string) {
  return apiClient.get<AdminCounsellorSlot[]>("/admin/counsellor-slots", {
    ...(counsellorId !== undefined ? { counsellorId } : {}),
    ...(date ? { date } : {}),
  });
}

export function getAdminCounsellorSlot(id: number) {
  return apiClient.get<AdminCounsellorSlot>(`/admin/counsellor-slots/${id}`);
}

export function createAdminCounsellorSlot(data: CreateCounsellorSlotData) {
  return apiClient.post<AdminCounsellorSlot>("/admin/counsellor-slots", data);
}

export function updateAdminCounsellorSlot(
  id: number,
  data: UpdateCounsellorSlotData,
) {
  return apiClient.patch<AdminCounsellorSlot>(
    `/admin/counsellor-slots/${id}`,
    data,
  );
}

export function deleteAdminCounsellorSlot(id: number) {
  return apiClient.delete<AdminCounsellorSlot>(`/admin/counsellor-slots/${id}`);
}

export function getCounsellorSlotAvailability(
  counsellorId: number,
  date: string,
) {
  return apiClient.get<{
    counsellorId: number;
    date: string;
    slots: Array<{
      id: number;
      slotId: number;
      startTime: string;
      endTime: string;
      status: CounsellorSlotStatus;
    }>;
  }>(`/admin/counsellor-slots/${counsellorId}/availability`, {
    date,
  });
}
