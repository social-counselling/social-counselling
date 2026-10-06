"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  createBooking,
  getBookingOptions,
} from "@/services/booking/booking.api";
import { canContinueBooking } from "@/lib/booking/booking-validation";

import BookingProgress from "./BookingProgress";
import BookingNavigation from "./BookingNavigation";

import Step1Category from "./steps/Step1Category";
import Step2Service from "./steps/Step2Service";
import Step3Counsellor from "./steps/Step3Counsellor";
import Step4Calendar from "./steps/Step4Calendar";
import Step5ClientInputs from "./steps/Step5ClientInputs";
import Step6ConsentPayment from "./steps/Step6ConsentPayment";
import Step7BookingConfirmation from "./steps/Step7BookingConfirmation";

import type {
  BookingData,
  BookingOptionsResponse,
  BookingConfirmation,
} from "@/types/booking";

const initialBookingData: BookingData = {
  category: null,

  serviceId: null,

  counsellorId: null,

  counsellorSlotId: null,
  bookingDate: "",
  clientName: "",

  clientDob: "",

  gender: "",

  clientPhone: "",

  clientEmail: "",

  counseleeSameAsClient: true,

  counseleeName: "",

  counseleeDob: "",

  relationship: "",

  bookingAuthorization: false,

  termsAccepted: false,

  privacyAccepted: false,
};

export default function BookSessionShell() {
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);

  const [options, setOptions] = useState<BookingOptionsResponse | null>(null);

  const [loadingOptions, setLoadingOptions] = useState(true);

  const [optionsError, setOptionsError] = useState<string | null>(null);

  const [bookingConfirmation, setBookingConfirmation] =
    useState<BookingConfirmation | null>(null);

  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  /*
   * ----------------------------------------------------
   * Load booking options once
   * ----------------------------------------------------
   */

  useEffect(() => {
    const loadBookingOptions = async () => {
      try {
        setLoadingOptions(true);
        setOptionsError(null);

        const data = await getBookingOptions();

        setOptions(data);
      } catch (error) {
        console.error("Failed to load booking options:", error);

        setOptionsError(
          error instanceof Error
            ? error.message
            : "Failed to load booking options.",
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    loadBookingOptions();
  }, []);

  /*
   * ----------------------------------------------------
   * Update booking data
   * ----------------------------------------------------
   */

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((previous) => ({
      ...previous,
      ...data,
    }));
  };

  /*
   * ----------------------------------------------------
   * Navigation
   * ----------------------------------------------------
   */
  const canContinue = canContinueBooking(currentStep, bookingData);

  const handleNext = async () => {
    if (!canContinue || isCreatingBooking) {
      return;
    }

    if (currentStep === 1 && bookingData.category === "EMPATHETIC_LISTENING") {
      setCurrentStep(3);
      return;
    }

    if (currentStep === 6) {
      try {
        setIsCreatingBooking(true);

        const booking = await createBooking({
          serviceId: bookingData.serviceId!,
          counsellorId: bookingData.counsellorId!,
          counsellorSlotId: bookingData.counsellorSlotId!,

          clientName: bookingData.clientName,
          clientDob: bookingData.clientDob,
          gender: bookingData.gender,
          clientPhone: bookingData.clientPhone,
          clientEmail: bookingData.clientEmail,

          counseleeSameAsClient: bookingData.counseleeSameAsClient,
          ...(bookingData.counseleeSameAsClient
            ? {}
            : {
                counseleeName: bookingData.counseleeName,
                counseleeDob: bookingData.counseleeDob,
                relationship: bookingData.relationship,
              }),

          bookingAuthorization: bookingData.bookingAuthorization,
          termsAccepted: bookingData.termsAccepted,
          privacyAccepted: bookingData.privacyAccepted,
        });

        setBookingConfirmation(booking);
        setCurrentStep(7);
      } catch (error) {
        console.error("Failed to create booking:", error);

        alert(
          error instanceof Error
            ? error.message
            : "Unable to create booking. Please try again.",
        );
      } finally {
        setIsCreatingBooking(false);
      }

      return;
    }

    if (currentStep < 8) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 3) {
      if (bookingData.category === "EMPATHETIC_LISTENING") {
        setCurrentStep(1);
        return;
      }
    }

    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };
  /*
   * ----------------------------------------------------
   * Render
   * ----------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#f7faf7] pt-[100px]">
      {/* =================================================
        BOOKING PROGRESS
       ================================================= */}
      <section className="relative z-10 border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-7">
            <BookingProgress currentStep={currentStep} />
          </div>
        </div>
      </section>

      {/* =================================================
        BOOKING AREA
    ================================================= */}

      <section className="mx-auto mt-5 w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] lg:grid-cols-[42%_58%]">
          {/* =================================================
            FIXED IMAGE
        ================================================= */}

          <div className="relative hidden min-h-[650px] overflow-hidden lg:block">
            <Image
              src="/images/booking/BookingPage.png"
              alt="Social Counselling booking"
              fill
              priority
              sizes="42vw"
              className="object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            {/* Image content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                Social Counselling
              </p>

              <h1 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white xl:text-4xl">
                Take the first step towards a better tomorrow.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
                Choose the right support, counsellor and appointment time that
                works for you.
              </p>
            </div>
          </div>

          {/* =================================================
            FORM CONTAINER
        ================================================= */}

          <div className="flex min-w-0 items-start justify-center p-5 sm:p-8 lg:p-10 xl:p-12">
            <div className="w-full max-w-2xl">
              {/* Loading */}
              {loadingOptions && (
                <div className="flex min-h-[450px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />

                    <p className="mt-4 text-sm text-slate-500">
                      Loading booking options...
                    </p>
                  </div>
                </div>
              )}

              {/* Error */}
              {!loadingOptions && optionsError && (
                <div className="flex min-h-[450px] items-center justify-center">
                  <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                    <h2 className="font-semibold text-red-800">
                      Unable to load booking options
                    </h2>

                    <p className="mt-2 text-sm text-red-700">{optionsError}</p>

                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="mt-5 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Steps */}
              {!loadingOptions && !optionsError && options && (
                <>
                  {currentStep === 1 && (
                    <Step1Category
                      categories={options.categories}
                      selectedCategory={bookingData.category}
                      onSelect={(category) => {
                        const isEmpatheticListening =
                          category === "EMPATHETIC_LISTENING";

                        const empatheticListeningService =
                          options.services.find(
                            (service) =>
                              service.category === "EMPATHETIC_LISTENING",
                          );

                        updateBookingData({
                          category,
                          serviceId: isEmpatheticListening
                            ? (empatheticListeningService?.serviceId ?? null)
                            : null,
                          counsellorId: null,
                          counsellorSlotId: null,
                          bookingDate: "",
                        });
                      }}
                    />
                  )}

                  {currentStep === 2 && (
                    <Step2Service
                      services={options.services}
                      selectedServiceId={bookingData.serviceId}
                      selectedCategory={bookingData.category}
                      onSelect={(serviceId) =>
                        updateBookingData({
                          serviceId,
                          counsellorId: null,
                          counsellorSlotId: null,
                        })
                      }
                    />
                  )}

                  {currentStep === 3 && (
                    <Step3Counsellor
                      counsellors={options.counsellors}
                      selectedCounsellorId={bookingData.counsellorId}
                      selectedServiceId={bookingData.serviceId}
                      selectedCategory={bookingData.category}
                      onSelect={(counsellorId) =>
                        updateBookingData({
                          counsellorId,
                          counsellorSlotId: null,
                          bookingDate: "",
                        })
                      }
                    />
                  )}
                  {currentStep === 4 && options && (
                    <Step4Calendar
                      counsellorId={bookingData.counsellorId}
                      counsellorName={
                        options.counsellors.find(
                          (counsellor) =>
                            counsellor.counsellorId ===
                            bookingData.counsellorId,
                        )?.name ?? "your counsellor"
                      }
                      selectedSlotId={bookingData.counsellorSlotId}
                      selectedDate={bookingData.bookingDate}
                      onSelectSlot={(slotId, date) =>
                        updateBookingData({
                          counsellorSlotId: slotId,
                          bookingDate: date,
                        })
                      }
                    />
                  )}

                  {currentStep === 5 && (
                    <Step5ClientInputs
                      bookingData={bookingData}
                      onChange={updateBookingData}
                    />
                  )}

                  {currentStep === 6 && options && (
                    <Step6ConsentPayment
                      bookingData={bookingData}
                      serviceTitle={
                        options.services.find(
                          (service) =>
                            service.serviceId === bookingData.serviceId,
                        )?.title ?? "Selected service"
                      }
                      counsellorName={
                        options.counsellors.find(
                          (counsellor) =>
                            counsellor.counsellorId ===
                            bookingData.counsellorId,
                        )?.name ?? "Selected counsellor"
                      }
                      amount={
                        options.counsellors
                          .find(
                            (counsellor) =>
                              counsellor.counsellorId ===
                              bookingData.counsellorId,
                          )
                          ?.services?.find(
                            (service) =>
                              service.serviceId === bookingData.serviceId,
                          )?.price ?? "0"
                      }
                      onChange={updateBookingData}
                    />
                  )}

                  {currentStep === 7 && bookingConfirmation && (
                    <Step7BookingConfirmation
                      bookingData={bookingData}
                      bookingNumber={bookingConfirmation.bookingNumber}
                      status={bookingConfirmation.status}
                      serviceTitle={
                        bookingConfirmation.service?.title ?? "Selected service"
                      }
                      counsellorName={
                        bookingConfirmation.counsellor?.name ??
                        "Selected counsellor"
                      }
                      bookingDate={
                        bookingConfirmation.slot?.date ??
                        bookingData.bookingDate
                      }
                      startTime={bookingConfirmation.slot?.startTime ?? ""}
                      endTime={bookingConfirmation.slot?.endTime ?? ""}
                    />
                  )}

                  {currentStep === 8 && <div>Step 8 will be added here.</div>}

                  <BookingNavigation
                    currentStep={currentStep}
                    canContinue={canContinue}
                    isLoading={isCreatingBooking}
                    onBack={handleBack}
                    onNext={handleNext}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
