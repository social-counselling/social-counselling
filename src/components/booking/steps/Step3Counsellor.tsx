"use client";

import { Check, Star } from "lucide-react";
import Image from "next/image";

import type { BookingCounsellor } from "@/types/booking";

interface Step3CounsellorProps {
  counsellors: BookingCounsellor[];

  selectedCounsellorId: number | null;

  selectedServiceId: number | null;

  selectedCategory: string | null;

  onSelect: (counsellorId: number) => void;
}

export default function Step3Counsellor({
  counsellors,
  selectedCounsellorId,
  selectedServiceId,
  selectedCategory,
  onSelect,
}: Step3CounsellorProps) {
  /*
   * ----------------------------------------------------
   * Filter counsellors
   * ----------------------------------------------------
   */

  const availableCounsellors = counsellors.filter((counsellor) => {
    /*
     * Empathetic Listening
     *
     * Step 2 is skipped, so there is
     * no selected serviceId.
     */
    if (selectedCategory === "EMPATHETIC_LISTENING") {
      return counsellor.services.some(
        (service) => service.category === "EMPATHETIC_LISTENING",
      );
    }

    /*
     * Social Counselling
     *
     * Counsellor must provide the
     * selected service.
     */
    if (!selectedServiceId) {
      return false;
    }

    return counsellor.services.some(
      (service) => service.serviceId === selectedServiceId,
    );
  });

  /*
   * ----------------------------------------------------
   * Dynamic title
   * ----------------------------------------------------
   */

  const isEmpatheticListening = selectedCategory === "EMPATHETIC_LISTENING";

  const title = isEmpatheticListening
    ? "Select Your Listener"
    : "Select Your Counsellor";

  const description = isEmpatheticListening
    ? "Choose a listener who can provide a safe and supportive space to talk and be heard."
    : "Choose a counsellor based on their experience, languages and specialization.";

  /*
   * ----------------------------------------------------
   * Render
   * ----------------------------------------------------
   */

  return (
    <section className="w-full">
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Step 3 of 8
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight text-secondary sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      {/* =================================================
          COUNSELLOR LIST
          
          IMPORTANT:
          Only this area scrolls.
      ================================================= */}

      <div
        className="
          mt-6
          max-h-[330px]
          space-y-3
          overflow-y-auto
          pr-2
          scrollbar-thin
          scrollbar-thumb-slate-300
          scrollbar-track-transparent
        "
      >
        {availableCounsellors.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm font-medium text-slate-600">
              No {isEmpatheticListening ? "listeners" : "counsellors"} are
              currently available for this selection.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Please go back and choose another option.
            </p>
          </div>
        ) : (
          availableCounsellors.map((counsellor) => {
            const selected = selectedCounsellorId === counsellor.counsellorId;

            /*
             * Find price for the currently
             * selected service.
             */
            const selectedService = selectedServiceId
              ? counsellor.services.find(
                  (service) => service.serviceId === selectedServiceId,
                )
              : counsellor.services.find(
                  (service) => service.category === "EMPATHETIC_LISTENING",
                );

            return (
              <button
                key={counsellor.counsellorId}
                type="button"
                onClick={() => onSelect(counsellor.counsellorId)}
                className={`
                    group
                    w-full
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-200
                    sm:p-5

                    ${
                      selected
                        ? `
                          border-primary
                          bg-primary/[0.04]
                          shadow-sm
                        `
                        : `
                          border-slate-200
                          bg-white
                          hover:border-primary/40
                          hover:shadow-sm
                        `
                    }
                  `}
              >
                <div className="flex items-start gap-4">
                  {/* =================================================
                        PROFILE IMAGE
                    ================================================= */}

                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:h-16 sm:w-16">
                    {counsellor.profileImageUrl ? (
                      <Image
                        src={counsellor.profileImageUrl}
                        alt={counsellor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                        {counsellor.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* =================================================
                        CONTENT
                    ================================================= */}

                  <div className="min-w-0 flex-1">
                    {/* Name + Selection */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2
                          className={`
                              truncate
                              text-base
                              font-semibold
                              sm:text-lg

                              ${selected ? "text-primary" : "text-secondary"}
                            `}
                        >
                          {counsellor.name}
                        </h2>

                        {counsellor.credentials && (
                          <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                            {counsellor.credentials}
                          </p>
                        )}
                      </div>

                      {/* Selection Circle */}
                      <div
                        className={`
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            transition-colors

                            ${
                              selected
                                ? "border-primary bg-primary"
                                : "border-slate-300 bg-white group-hover:border-primary/50"
                            }
                          `}
                      >
                        {selected && (
                          <Check className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                    </div>

                    {/* =================================================
                          RATING + EXPERIENCE
                      ================================================= */}

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-current text-amber-500" />

                        <span className="font-medium text-slate-700">
                          {counsellor.avgRating.toFixed(1)}
                        </span>

                        <span>({counsellor.totalReviews} reviews)</span>
                      </span>

                      {counsellor.experienceYears !== null && (
                        <span>
                          {counsellor.experienceYears} years experience
                        </span>
                      )}
                    </div>

                    {/* =================================================
                          LANGUAGES
                      ================================================= */}

                    {counsellor.languages.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {counsellor.languages.map((language) => (
                          <span
                            key={language.id}
                            className="
                                  rounded-full
                                  bg-slate-100
                                  px-2.5
                                  py-1
                                  text-[10px]
                                  font-medium
                                  text-slate-600
                                "
                          >
                            {language.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* =================================================
                          SPECIALIZATIONS
                      ================================================= */}

                    {counsellor.specializations.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {counsellor.specializations
                          .slice(0, 4)
                          .map((specialization) => (
                            <span
                              key={specialization}
                              className="
                                    rounded-full
                                    bg-primary/5
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-primary
                                  "
                            >
                              {specialization}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* =================================================
                          PRICE
                      ================================================= */}

                    {selectedService && (
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-500">
                          Session fee
                        </span>

                        <span className="text-sm font-semibold text-secondary sm:text-base">
                          ₹{selectedService.price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* =================================================
          FOOTER MESSAGE
      ================================================= */}

      <p className="mt-4 text-xs text-slate-500 sm:text-sm">
        Select one {isEmpatheticListening ? "listener" : "counsellor"} to
        continue.
      </p>
    </section>
  );
}
