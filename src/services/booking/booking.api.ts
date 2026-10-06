import { apiClient } from "@/lib/api-client";

import type {
  BookingAvailabilityResponse,
  BookingData,
  BookingOptionsResponse,
  BookingConfirmation,
} from "@/types/booking";

export async function getBookingOptions(): Promise<BookingOptionsResponse> {
  const response =
    await apiClient.get<BookingOptionsResponse>("/booking/options");

  return response;
}

export async function getBookingAvailability(
  counsellorId: number,
  date: string,
): Promise<BookingAvailabilityResponse> {
  const response = await apiClient.get<BookingAvailabilityResponse>(
    "/booking/availability",
    {
      counsellorId,
      date,
    },
  );

  return response;
}

export async function createBooking(
  payload: BookingData,
): Promise<BookingConfirmation> {
  const response = await apiClient.post<{
    message: string;
    booking: BookingConfirmation;
  }>("/booking", payload);

  return response.booking;
}
