"use client";

import {
  Check,
  CreditCard,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import type { BookingData } from "@/types/booking";
interface Step6ConsentPaymentProps {
  bookingData: BookingData;

  serviceTitle: string;

  counsellorName: string;

  amount: string;

  onChange: (data: Partial<BookingData>) => void;
}

interface ConsentItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ConsentItem({
  checked,
  onChange,
  title,
  description,
  icon,
}: ConsentItemProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        flex
        w-full
        items-start
        gap-3
        rounded-xl
        border
        p-3
        text-left
        transition-all
        duration-200

        ${
          checked
            ? "border-primary bg-primary/[0.04]"
            : "border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50"
        }
      `}
    >
      {/* Checkbox */}

      <span
        className={`
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          transition

          ${checked ? "border-primary bg-primary" : "border-slate-300 bg-white"}
        `}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" />}
      </span>

      {/* Icon */}

      <span
        className={`
          mt-0.5
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            checked
              ? "bg-primary/10 text-primary"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {icon}
      </span>

      {/* Content */}

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-secondary">
          {title}
        </span>

        <span className="mt-0.5 block text-[10px] leading-4 text-slate-500">
          {description}
        </span>
      </span>
    </button>
  );
}

export default function Step6ConsentPayment({
  bookingData,
  serviceTitle,
  counsellorName,
  amount,
  onChange,
}: Step6ConsentPaymentProps) {
  const allAccepted =
    bookingData.bookingAuthorization &&
    bookingData.termsAccepted &&
    bookingData.privacyAccepted;

  return (
    <section
      className="
        flex
        max-h-[520px]
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
          Step 6 of 8
        </p>

        <h1 className="mt-2 text-2xl font-semibold leading-tight text-secondary sm:text-3xl">
          Consent & Payment
        </h1>

        <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
          Review your session details and provide the required confirmations
          before continuing to payment.
        </p>
      </div>

      {/* =================================================
          SCROLLABLE CONTENT
      ================================================= */}

      <div
        className="
          mt-4
          min-h-0
          flex-1
          overflow-y-auto
          pr-2
          scrollbar-thin
        "
      >
        {/* =================================================
            BOOKING SUMMARY
        ================================================= */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50/70
            p-3
          "
        >
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />

            <h2 className="text-sm font-semibold text-secondary">
              Booking summary
            </h2>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {/* Service */}

            <div className="rounded-lg bg-white px-3 py-2">
              <p className="text-[9px] uppercase tracking-wide text-slate-400">
                Service
              </p>

              <p className="mt-0.5 truncate text-xs font-semibold text-secondary">
                {serviceTitle}
              </p>
            </div>

            {/* Counsellor */}

            <div className="rounded-lg bg-white px-3 py-2">
              <p className="text-[9px] uppercase tracking-wide text-slate-400">
                Counsellor
              </p>

              <p className="mt-0.5 truncate text-xs font-semibold text-secondary">
                {counsellorName}
              </p>
            </div>

            {/* Date */}

            <div className="rounded-lg bg-white px-3 py-2">
              <p className="text-[9px] uppercase tracking-wide text-slate-400">
                Session date
              </p>

              <p className="mt-0.5 text-xs font-semibold text-secondary">
                {bookingData.bookingDate
                  ? new Date(
                      `${bookingData.bookingDate}T00:00:00`,
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not selected"}
              </p>
            </div>

            {/* Amount */}

            <div className="rounded-lg bg-white px-3 py-2">
              <p className="text-[9px] uppercase tracking-wide text-slate-400">
                Session fee
              </p>

              <p className="mt-0.5 text-sm font-bold text-primary">₹{amount}</p>
            </div>
          </div>
        </div>

        {/* =================================================
            CONSENTS
        ================================================= */}

        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />

            <h2 className="text-sm font-semibold text-secondary">
              Required confirmations
            </h2>
          </div>

          <div className="space-y-2">
            {/* Booking Authorization */}

            <ConsentItem
              checked={bookingData.bookingAuthorization}
              onChange={(checked) =>
                onChange({
                  bookingAuthorization: checked,
                })
              }
              title="Booking Authorization"
              description="I confirm that I am authorized to make this booking and that the information provided is accurate."
              icon={<LockKeyhole className="h-3.5 w-3.5" />}
            />

            {/* Terms */}

            <ConsentItem
              checked={bookingData.termsAccepted}
              onChange={(checked) =>
                onChange({
                  termsAccepted: checked,
                })
              }
              title="Terms & Conditions"
              description="I have read and agree to the Terms & Conditions applicable to this counselling session."
              icon={<FileCheck2 className="h-3.5 w-3.5" />}
            />

            {/* Privacy */}

            <ConsentItem
              checked={bookingData.privacyAccepted}
              onChange={(checked) =>
                onChange({
                  privacyAccepted: checked,
                })
              }
              title="Privacy Policy"
              description="I have read and agree to the Privacy Policy and consent to the processing of my information."
              icon={<ShieldCheck className="h-3.5 w-3.5" />}
            />
          </div>
        </div>

        {/* =================================================
            PAYMENT NOTICE
        ================================================= */}

        <div className="mt-4 rounded-xl border border-primary/15 bg-primary/[0.04] p-3">
          <div className="flex items-start gap-2.5">
            <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

            <div>
              <p className="text-xs font-semibold text-secondary">Payment</p>

              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                Your selected session fee is{" "}
                <span className="font-semibold text-secondary">₹{amount}</span>.
                After all required confirmations are accepted, you can continue
                to the secure payment step.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            PAYMENT TOTAL
        ================================================= */}

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-[10px] text-slate-500">Total session fee</p>

            <p className="mt-0.5 text-lg font-bold text-secondary">₹{amount}</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-400">Consent status</p>

            <p
              className={`
                mt-0.5 text-xs font-semibold

                ${allAccepted ? "text-green-600" : "text-amber-600"}
              `}
            >
              {allAccepted ? "All accepted" : "Pending confirmation"}
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <p className="mt-2 shrink-0 text-[10px] text-slate-500">
        All three confirmations are required to continue.
      </p>
    </section>
  );
}
