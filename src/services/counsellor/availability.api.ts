import { apiClient } from "@/lib/api-client";

export interface CounsellorAvailableSlot {
  id: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface CounsellorSlot {
  id: number;
  date: string;
  status: string;
  slot: CounsellorAvailableSlot;
}

export interface CreateCounsellorSlotRequest {
  slotId: number;
  date: string;
}

export function getCounsellorAvailableSlots() {
  return apiClient.get<CounsellorAvailableSlot[]>(
    "/counsellor/available-slots",
  );
}

export function getCounsellorSlots(date?: string) {
  return apiClient.get<CounsellorSlot[]>(
    "/counsellor/slots",
    date ? { date } : undefined,
  );
}

export function createCounsellorSlot(data: CreateCounsellorSlotRequest) {
  return apiClient.post<CounsellorSlot>("/counsellor/slots", data);
}

export function deleteCounsellorSlot(id: number) {
  return apiClient.delete<CounsellorSlot>(`/counsellor/slots/${id}`);
}

export function restoreCounsellorSlot(id: number) {
  return apiClient.patch<CounsellorSlot>(`/counsellor/slots/${id}/restore`);
}
