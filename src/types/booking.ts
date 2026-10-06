export type BookingCategory = {
  value: string;
  label: string;
};

export type BookingService = {
  serviceId: number;
  category: string;
  title: string;
  subtitle: string | null;
  slug: string;
  imageUrl: string | null;
  heroImageUrl: string | null;
  sortOrder: number;
};

export type BookingCounsellorService = {
  serviceId: number;
  title: string;
  category: string;
  price: string;
  isCustomPrice: boolean;
};

export type BookingCounsellor = {
  counsellorId: number;
  name: string;
  profileImageUrl: string | null;
  credentials: string | null;
  bio: string | null;
  mantra: string | null;
  coverage: string | null;
  experienceYears: number | null;
  experienceText: string | null;

  languages: {
    id: string;
    name: string;
    code: string | null;
  }[];

  specializations: string[];

  avgRating: number;
  totalReviews: number;

  services: BookingCounsellorService[];
};

export type BookingOptionsResponse = {
  categories: BookingCategory[];
  services: BookingService[];
  counsellors: BookingCounsellor[];
};

export type BookingData = {
  category: string | null;

  serviceId: number | null;

  counsellorId: number | null;

  counsellorSlotId: number | null;

  bookingDate: string;

  clientName: string;

  clientDob: string;

  gender: string;

  clientPhone: string;

  clientEmail: string;

  counseleeSameAsClient: boolean;

  counseleeName: string;

  counseleeDob: string;

  relationship: string;

  bookingAuthorization: boolean;

  termsAccepted: boolean;

  privacyAccepted: boolean;
};

export type BookingAvailabilitySlot = {
  counsellorSlotId: number;
  slotId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
};

export type BookingAvailabilityResponse = {
  counsellorId: number;
  counsellorName: string;
  date: string;
  data: BookingAvailabilitySlot[];
};

export type BookingConfirmation = {
  id: string;
  bookingNumber: string;
  status: string;
  amount: string;

  service?: {
    serviceId: number;
    title: string;
    category: string;
  };

  counsellor?: {
    id: number;
    name: string;
  };

  slot?: {
    counsellorSlotId: number;
    date: string;
    startTime: string;
    endTime: string;
  };
};
