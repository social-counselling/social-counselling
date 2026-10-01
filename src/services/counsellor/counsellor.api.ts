import { apiClient } from "@/lib/api-client";

export interface ChangeCounsellorPasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangeCounsellorPasswordResponse {
  message: string;
}

export async function changeCounsellorPassword(
  payload: ChangeCounsellorPasswordPayload,
) {
  const response = await apiClient.patch<ChangeCounsellorPasswordResponse>(
    "/counsellor/profile/password",
    payload,
  );

  return response;
}