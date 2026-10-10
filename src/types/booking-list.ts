export type BookingListStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

export type BookingListItem = {
  id: string;
  bookingNumber: string;
  status: BookingListStatus | string;
  /** Stored in rupees, not paise. */
  amount: string | number;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    phone: string;
    profileImageUrl: string | null;
  };
  bookingDetails: {
    clientName: string;
    clientDob: string | null;
    clientPhone: string;
    clientEmail: string;
    counseleeSameAsClient: boolean;
    counseleeName: string | null;
    counseleeDob: string | null;
    relationship: string | null;
    bookingAuthorization: boolean;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  } | null;
  service: {
    serviceId: number;
    title: string;
    category: string;
    slug: string;
  } | null;
  counsellor: {
    id: number;
    user: {
      id: string;
      firstName: string;
      lastName: string | null;
      email: string;
      phone: string | null;
      profileImageUrl: string | null;
    };
  } | null;
  counsellorSlot: {
    id: number;
    date: string;
    status: string;
    slot: {
      id: number;
      startTime: string;
      endTime: string;
    } | null;
  } | null;
};

export type BookingListResponse = {
  data: BookingListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type BookingListQuery = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
};
