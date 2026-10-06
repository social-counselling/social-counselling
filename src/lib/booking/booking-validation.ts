import type { BookingData } from "@/types/booking";

export function calculateAge(dateOfBirth: string): number | null {
  if (!dateOfBirth) {
    return null;
  }

  const today = new Date();

  const birthDate = new Date(`${dateOfBirth}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function validateBookingClient(bookingData: BookingData): boolean {
  const clientAge = calculateAge(bookingData.clientDob);

  return (
    Boolean(bookingData.clientName.trim()) &&
    Boolean(bookingData.clientDob) &&
    Boolean(bookingData.gender) &&
    Boolean(bookingData.clientPhone.trim()) &&
    Boolean(bookingData.clientEmail.trim()) &&
    clientAge !== null &&
    clientAge >= 18
  );
}

export function validateBookingCounselee(bookingData: BookingData): boolean {
  if (bookingData.counseleeSameAsClient) {
    return true;
  }

  const counseleeAge = calculateAge(bookingData.counseleeDob);

  return (
    Boolean(bookingData.counseleeName.trim()) &&
    Boolean(bookingData.counseleeDob) &&
    Boolean(bookingData.relationship) &&
    counseleeAge !== null
  );
}

export function canContinueBooking(
  currentStep: number,
  bookingData: BookingData,
): boolean {
  switch (currentStep) {
    case 1:
      return Boolean(bookingData.category);

    case 2:
      return Boolean(bookingData.serviceId);

    case 3:
      return Boolean(bookingData.counsellorId);

    case 4:
      return Boolean(bookingData.counsellorSlotId);

    case 5:
      return (
        validateBookingClient(bookingData) &&
        validateBookingCounselee(bookingData)
      );

    case 6:
      return (
        bookingData.bookingAuthorization &&
        bookingData.termsAccepted &&
        bookingData.privacyAccepted
      );

    default:
      return true;
  }
}
