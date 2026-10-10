import { apiClient } from "@/lib/api-client";

import type {
  BookingAvailabilityResponse,
  CreateBookingPayload,
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
  payload: CreateBookingPayload,
): Promise<BookingConfirmation> {
  const response = await apiClient.post<{
    message: string;
    booking: BookingConfirmation;
  }>("/booking", payload);

  return response.booking;
}

import type {
  BookingListQuery,
  BookingListResponse,
} from "@/types/booking-list";

/** Retrieve bookings across all counsellors. The backend restricts this to admins. */
export async function getAdminBookings(
  query: BookingListQuery = {},
): Promise<BookingListResponse> {
  return apiClient.get<BookingListResponse>("/booking/admin", {
    page: query.page ?? 1,
    limit: query.limit ?? 10,
    status: query.status || undefined,
    search: query.search?.trim() || undefined,
  });
}

/** Retrieve bookings assigned to the authenticated counsellor only. */
export async function getCounsellorBookings(
  query: BookingListQuery = {},
): Promise<BookingListResponse> {
  return apiClient.get<BookingListResponse>("/booking/counsellor", {
    page: query.page ?? 1,
    limit: query.limit ?? 10,
    status: query.status || undefined,
    search: query.search?.trim() || undefined,
  });
}
