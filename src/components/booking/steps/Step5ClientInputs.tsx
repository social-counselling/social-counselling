"use client";

import { CalendarDays, Mail, Phone, User, Users } from "lucide-react";

import type { BookingData } from "@/types/booking";
interface Step5ClientInputsProps {
  bookingData: BookingData;

  onChange: (data: Partial<BookingData>) => void;
}

/*
 * ----------------------------------------------------
 * Relationship options
 * ----------------------------------------------------
 */

const minorRelationships = [
  {
    value: "PARENT",
    label: "Parent",
  },
  {
    value: "LEGAL_GUARDIAN",
    label: "Legal Guardian",
  },
];

const adultRelationships = [
  {
    value: "PARENT",
    label: "Parent",
  },
  {
    value: "ADULT_CHILD",
    label: "Adult Child",
  },
  {
    value: "FAMILY_RELATIVE",
    label: "Family Relative",
  },
  {
    value: "FRIEND",
    label: "Friend",
  },
  {
    value: "COLLEAGUE",
    label: "Colleague",
  },
];

/*
 * ----------------------------------------------------
 * Calculate age
 * ----------------------------------------------------
 */

function calculateAge(dateOfBirth: string) {
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

/*
 * ----------------------------------------------------
 * Today's date
 * ----------------------------------------------------
 */

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/*
 * ----------------------------------------------------
 * Input component
 * ----------------------------------------------------
 */

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  max?: string;
  onChange: (value: string) => void;
}

function InputField({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  icon,
  max,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold text-secondary">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          max={max}
          onChange={(event) => onChange(event.target.value)}
          className={`
            h-9
            w-full
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            text-sm
            text-secondary
            outline-none
            transition
            placeholder:text-slate-400

            focus:border-primary
            focus:ring-2
            focus:ring-primary/10

            ${icon ? "pl-9" : ""}

            ${disabled ? "cursor-not-allowed bg-slate-50 text-slate-400" : ""}
          `}
        />
      </div>
    </div>
  );
}

export default function Step5ClientInputs({
  bookingData,
  onChange,
}: Step5ClientInputsProps) {
  const today = getTodayDate();

  /*
   * ----------------------------------------------------
   * Counselee age
   * ----------------------------------------------------
   */

  const counseleeAge = calculateAge(bookingData.counseleeDob);

  const isMinorCounselee = counseleeAge !== null && counseleeAge < 18;

  /*
   * ----------------------------------------------------
   * Available relationships
   * ----------------------------------------------------
   */

  const relationships = isMinorCounselee
    ? minorRelationships
    : adultRelationships;

  /*
   * ----------------------------------------------------
   * Client DOB change
   *
   * If client DOB changes, keep the
   * other booking fields untouched.
   * ----------------------------------------------------
   */

  const handleClientDobChange = (value: string) => {
    onChange({
      clientDob: value,
    });
  };

  /*
   * ----------------------------------------------------
   * Counselee same as client
   * ----------------------------------------------------
   */

  const handleSameAsClientChange = (sameAsClient: boolean) => {
    if (sameAsClient) {
      onChange({
        counseleeSameAsClient: true,
        counseleeName: "",
        counseleeDob: "",
        relationship: "",
      });

      return;
    }

    onChange({
      counseleeSameAsClient: false,
    });
  };

  /*
   * ----------------------------------------------------
   * Counselee DOB
   * ----------------------------------------------------
   */

  const handleCounseleeDobChange = (value: string) => {
    /*
     * Changing DOB can change the
     * allowed relationship list.
     *
     * Clear old relationship so that
     * an invalid relationship cannot
     * remain selected.
     */

    onChange({
      counseleeDob: value,
      relationship: "",
    });
  };

  return (
    <section
      className="
        flex
        max-h-[500px]
        min-h-0
        w-full
        flex-col
        overflow-hidden
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="shrink-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Step 5 of 8
        </p>

        <h1 className="mt-2 text-2xl font-semibold leading-tight text-secondary sm:text-3xl">
          Your Information
        </h1>

        <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
          Please provide the information needed to complete your counselling
          booking.
        </p>
      </div>

      {/* =================================================
          SCROLLABLE FORM
      ================================================= */}

      <div
        className="
          mt-4
          min-h-0
          flex-1
          overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          pr-2
          scrollbar-thin
        "
      >
        {/* =================================================
            CLIENT INFORMATION
        ================================================= */}

        <div>
          <div className="mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />

            <h2 className="text-sm font-semibold text-secondary">
              Client information
            </h2>
          </div>

          {/* Name */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InputField
              label="Full Name"
              value={bookingData.clientName}
              placeholder="Enter your full name"
              required
              icon={<User className="h-3.5 w-3.5" />}
              onChange={(value) =>
                onChange({
                  clientName: value,
                })
              }
            />

            {/* DOB */}

            <InputField
              label="Date of Birth"
              value={bookingData.clientDob}
              type="date"
              required
              max={today}
              icon={<CalendarDays className="h-3.5 w-3.5" />}
              onChange={handleClientDobChange}
            />
          </div>

          {/* Gender */}

          <div className="mt-3">
            <label className="mb-1 block text-[11px] font-semibold text-secondary">
              Gender
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  value: "MALE",
                  label: "Male",
                },
                {
                  value: "FEMALE",
                  label: "Female",
                },
                {
                  value: "OTHER",
                  label: "Other",
                },
              ].map((option) => {
                const selected = bookingData.gender === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onChange({
                        gender: option.value,
                      })
                    }
                    className={`
                      rounded-lg
                      border
                      px-3
                      py-2
                      text-xs
                      font-medium
                      transition

                      ${
                        selected
                          ? "border-primary bg-primary/[0.06] text-primary"
                          : "border-slate-200 bg-white text-slate-600 hover:border-primary/40"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone + Email */}

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InputField
              label="Mobile Number"
              value={bookingData.clientPhone}
              placeholder="+91 9876543210"
              type="tel"
              required
              icon={<Phone className="h-3.5 w-3.5" />}
              onChange={(value) =>
                onChange({
                  clientPhone: value,
                })
              }
            />

            <InputField
              label="Email Address"
              value={bookingData.clientEmail}
              placeholder="you@example.com"
              type="email"
              required
              icon={<Mail className="h-3.5 w-3.5" />}
              onChange={(value) =>
                onChange({
                  clientEmail: value,
                })
              }
            />
          </div>

          {/* Client age warning */}

          {bookingData.clientDob &&
            calculateAge(bookingData.clientDob) !== null &&
            (calculateAge(bookingData.clientDob) as number) < 18 && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                <p className="text-[11px] font-medium text-red-700">
                  The client must be 18 years or older to make a booking.
                </p>
              </div>
            )}
        </div>

        {/* =================================================
            COUNSELEE
        ================================================= */}

        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />

            <h2 className="text-sm font-semibold text-secondary">Counselee</h2>
          </div>

          {/* Same as client */}

          <button
            type="button"
            onClick={() =>
              handleSameAsClientChange(!bookingData.counseleeSameAsClient)
            }
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              border
              px-3
              py-2.5
              text-left
              transition

              ${
                bookingData.counseleeSameAsClient
                  ? "border-primary bg-primary/[0.04]"
                  : "border-slate-200 bg-white hover:border-primary/40"
              }
            `}
          >
            <span
              className={`
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                border

                ${
                  bookingData.counseleeSameAsClient
                    ? "border-primary bg-primary"
                    : "border-slate-300 bg-white"
                }
              `}
            >
              {bookingData.counseleeSameAsClient && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </span>

            <span>
              <span className="block text-xs font-semibold text-secondary">
                Counselee is the same as client
              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">
                I am booking counselling for myself.
              </span>
            </span>
          </button>

          {/* Someone else */}

          <button
            type="button"
            onClick={() => handleSameAsClientChange(false)}
            className={`
              mt-2
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              border
              px-3
              py-2.5
              text-left
              transition

              ${
                !bookingData.counseleeSameAsClient
                  ? "border-primary bg-primary/[0.04]"
                  : "border-slate-200 bg-white hover:border-primary/40"
              }
            `}
          >
            <span
              className={`
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                border

                ${
                  !bookingData.counseleeSameAsClient
                    ? "border-primary bg-primary"
                    : "border-slate-300 bg-white"
                }
              `}
            >
              {!bookingData.counseleeSameAsClient && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </span>

            <span>
              <span className="block text-xs font-semibold text-secondary">
                Someone else
              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">
                I am booking on behalf of another person.
              </span>
            </span>
          </button>

          {/* =================================================
              OTHER COUNSELEE FIELDS
          ================================================= */}

          {!bookingData.counseleeSameAsClient && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Counselee name */}

                <InputField
                  label="Counselee Name"
                  value={bookingData.counseleeName}
                  placeholder="Enter counselee name"
                  required
                  icon={<User className="h-3.5 w-3.5" />}
                  onChange={(value) =>
                    onChange({
                      counseleeName: value,
                    })
                  }
                />

                {/* Counselee DOB */}

                <InputField
                  label="Counselee Date of Birth"
                  value={bookingData.counseleeDob}
                  type="date"
                  required
                  max={today}
                  icon={<CalendarDays className="h-3.5 w-3.5" />}
                  onChange={handleCounseleeDobChange}
                />
              </div>

              {/* Relationship */}

              <div className="mt-3">
                <label className="mb-1 block text-[11px] font-semibold text-secondary">
                  Relationship
                  <span className="ml-1 text-red-500">*</span>
                </label>

                {!bookingData.counseleeDob ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5">
                    <p className="text-[11px] text-slate-500">
                      Select the counselee&apos;s date of birth first.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {relationships.map((option) => {
                      const selected =
                        bookingData.relationship === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            onChange({
                              relationship: option.value,
                            })
                          }
                          className={`
                              rounded-lg
                              border
                              px-2
                              py-2
                              text-xs
                              font-medium
                              transition

                              ${
                                selected
                                  ? "border-primary bg-primary/[0.06] text-primary"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-primary/40"
                              }
                            `}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Relationship age information */}

                {counseleeAge !== null && (
                  <p className="mt-2 text-[10px] text-slate-500">
                    {isMinorCounselee
                      ? "For a minor counselee, the relationship must be Parent or Legal Guardian."
                      : "Select your relationship with the adult counselee."}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <p className="mt-2 shrink-0 text-[10px] text-slate-500">
        Please complete all required information to continue.
      </p>
    </section>
  );
}
