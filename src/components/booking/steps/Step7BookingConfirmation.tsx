"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import type { BookingData } from "@/types/booking";

interface Step7BookingConfirmationProps {
  bookingData: BookingData;

  bookingNumber: string;
  status: string;

  serviceTitle: string;
  
  counsellorName: string;

  bookingDate: string;
  startTime: string;
  endTime: string;
}

function formatDate(date: string) {
  if (!date) return "—";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string) {
  if (!time) return "—";

  const parsed = new Date(time);

  if (Number.isNaN(parsed.getTime())) {
    return time;
  }

  return parsed.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatStatus(status: string) {
  if (!status) return "Pending";

  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Step7BookingConfirmation({
  bookingData,
  bookingNumber,
  status,
  serviceTitle,
  counsellorName,
  bookingDate,
  startTime,
  endTime,
}: Step7BookingConfirmationProps) {
  return (
    <section className="flex max-h-[520px] min-h-0 w-full flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1">
        <div className="space-y-5">
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                size={30}
                className="text-emerald-600"
                strokeWidth={2}
              />
            </div>

            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              Booking Confirmed
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your counselling session has been booked successfully.
            </p>
          </div>

          {/* Booking Number */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Booking Number
            </p>

            <p className="mt-1 text-base font-semibold text-slate-900">
              {bookingNumber || "—"}
            </p>
          </div>

          {/* Session Details */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Session Details
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs text-slate-500">Service</p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {serviceTitle || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs text-slate-500">Counsellor / Listener</p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {counsellorName || "—"}
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <CalendarDays
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <div>
                  <p className="text-xs text-slate-500">Date</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {formatDate(bookingDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <Clock3 size={18} className="mt-0.5 shrink-0 text-slate-500" />

                <div>
                  <p className="text-xs text-slate-500">Time</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {formatTime(startTime)} - {formatTime(endTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Client Details
            </h3>

            <div className="space-y-2 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <UserRound size={17} className="shrink-0 text-slate-500" />

                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="truncate text-sm font-medium text-slate-900">
                    {bookingData.clientName || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-slate-500" />

                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="truncate text-sm font-medium text-slate-900">
                    {bookingData.clientEmail || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-slate-500" />

                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-medium text-slate-900">
                    {bookingData.clientPhone || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-amber-700">
                  Booking Status
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-900">
                  {formatStatus(status)}
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                {formatStatus(status)}
              </span>
            </div>
          </div>

          {/* Information */}
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm leading-6 text-slate-600">
              Your booking details have been saved successfully. You can
              continue to the invitation step to complete the booking process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
