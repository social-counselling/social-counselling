"use client";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  IndianRupee,
  LoaderCircle,
  RefreshCw,
  Search,
  UsersRound,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import {
  getAdminBookings,
  getCounsellorBookings,
} from "@/services/booking/booking.api";
import type {
  BookingListItem,
  BookingListResponse,
  BookingListStatus,
} from "@/types/booking-list";

type BookingAudience = "admin" | "counsellor";

const PAGE_SIZE = 10;
const STATUS_OPTIONS: { label: string; value: "" | BookingListStatus }[] = [
  { label: "All statuses", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Refunded", value: "REFUNDED" },
];

function formatRupees(amount: string | number): string {
  const value = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(value)) return `₹${amount}`;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateValue?: string | null): string {
  if (!dateValue) return "—";
  const datePart = dateValue.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day, 12));
}

/** Slot times are serialized with a 1970-01-01 UTC date; use UTC clock fields
 * so formatting does not shift the stored time due to the browser timezone. */
function formatSlotTime(timeValue?: string | null): string {
  if (!timeValue) return "—";
  const date = new Date(timeValue);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}

function getClientName(booking: BookingListItem): string {
  const detailName = booking.bookingDetails?.clientName?.trim();
  if (detailName) return detailName;
  return (
    [booking.client?.firstName, booking.client?.lastName]
      .filter(Boolean)
      .join(" ") || "Unknown client"
  );
}

function getCounsellorName(booking: BookingListItem): string {
  return (
    [booking.counsellor?.user?.firstName, booking.counsellor?.user?.lastName]
      .filter(Boolean)
      .join(" ") || "Unassigned"
  );
}

function statusClass(status: string): string {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "PENDING":
      return "bg-amber-50 text-amber-700 ring-amber-600/20";
    case "COMPLETED":
      return "bg-blue-50 text-blue-700 ring-blue-600/20";
    case "CANCELLED":
    case "REFUNDED":
      return "bg-rose-50 text-rose-700 ring-rose-600/20";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-600/20";
  }
}

function StatusBadge({ status }: { status: string }) {
  const label = status.toLowerCase().replaceAll("_", " ");
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass(status)}`}
    >
      {label}
    </span>
  );
}

function BookingCard({
  booking,
  audience,
}: {
  booking: BookingListItem;
  audience: BookingAudience;
}) {
  const clientName = getClientName(booking);
  const clientEmail =
    booking.bookingDetails?.clientEmail || booking.client?.email;
  const clientPhone =
    booking.bookingDetails?.clientPhone || booking.client?.phone;
  const slot = booking.counsellorSlot;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-all text-sm font-bold text-[#103f3d]">
            {booking.bookingNumber}
          </p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            {clientName}
          </p>
          <p className="mt-0.5 break-all text-sm text-slate-500">
            {clientEmail || "No email"}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Service
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800">
            {booking.service?.title?.trim() || "Service unavailable"}
          </p>
        </div>
        {audience === "admin" && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Counsellor
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {getCounsellorName(booking)}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Appointment
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-700">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            {formatDate(slot?.date)}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <Clock3 className="h-4 w-4 text-slate-400" />
            {formatSlotTime(slot?.slot?.startTime)} –{" "}
            {formatSlotTime(slot?.slot?.endTime)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Fee
          </p>
          <p className="mt-1 text-lg font-bold text-[#103f3d]">
            {formatRupees(booking.amount)}
          </p>
          {clientPhone && (
            <p className="mt-1 text-sm text-slate-500">{clientPhone}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BookingManagementPage({
  audience,
}: {
  audience: BookingAudience;
}) {
  const isAdmin = audience === "admin";
  const [result, setResult] = useState<BookingListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const loadBookings = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const query = { page, limit: PAGE_SIZE, status, search };
        const response = isAdmin
          ? await getAdminBookings(query)
          : await getCounsellorBookings(query);
        setResult(response);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load bookings. Please try again.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [isAdmin, page, search, status],
  );

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  const bookings = result?.data ?? [];
  const pagination = result?.pagination;
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);
  const rangeLabel = useMemo(() => {
    if (!pagination || pagination.total === 0) return "Showing 0 bookings";
    const first = (pagination.page - 1) * pagination.limit + 1;
    const last = Math.min(pagination.page * pagination.limit, pagination.total);
    return `Showing ${first}–${last} of ${pagination.total} bookings`;
  }, [pagination]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatus(value);
  };

  const title = isAdmin ? "Booking Management" : "My Bookings";
  const description = isAdmin
    ? "View and manage bookings across all counsellors and their clients."
    : "View appointments booked with you and the details needed for each session.";

  return (
    <section
      className={`min-h-screen px-4 py-6 sm:px-6 lg:px-8 ${isAdmin ? "bg-[#f5f8f5]" : "bg-gray-50"}`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#147d7e]">
              <CalendarDays className="h-4 w-4" />
              {isAdmin ? "Administration" : "Counsellor workspace"}
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadBookings(true)}
            disabled={loading || refreshing}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5f4] text-[#147d7e]">
                <UsersRound className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Total bookings</p>
                <p className="mt-0.5 text-2xl font-bold text-slate-900">
                  {loading && !result ? "—" : (pagination?.total ?? 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <IndianRupee className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Fees on this page</p>
                <p className="mt-0.5 text-2xl font-bold text-slate-900">
                  {formatRupees(
                    bookings.reduce(
                      (sum, booking) => sum + (Number(booking.amount) || 0),
                      0,
                    ),
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]"
          >
            <label className="relative block">
              <span className="sr-only">Search bookings</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={
                  isAdmin
                    ? "Search booking, client, counsellor or service…"
                    : "Search booking, client or service…"
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#147d7e] focus:ring-2 focus:ring-[#147d7e]/10"
              />
            </label>
            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={status}
                onChange={(event) => handleStatusChange(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#147d7e] focus:ring-2 focus:ring-[#147d7e]/10"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value || "all"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#103f3d] px-5 text-sm font-semibold text-white transition hover:bg-[#14514e]"
            >
              <Search className="h-4 w-4" /> Search
            </button>
          </form>
        </div> */}

        {error && (
          <div
            role="alert"
            className="mb-5 flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Could not load bookings</p>
                <p className="mt-1 break-words">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void loadBookings()}
              className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
            >
              Try again
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <h2 className="font-semibold text-slate-900">Booking records</h2>
            <p className="text-sm text-slate-500">{rangeLabel}</p>
          </div>

          {loading ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-4 text-sm text-slate-500">
              <LoaderCircle className="h-7 w-7 animate-spin text-[#147d7e]" />{" "}
              Loading bookings…
            </div>
          ) : !error && bookings.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <CalendarDays className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">
                No bookings found
              </h3>
              <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
                {search || status
                  ? "Try changing your search or status filter."
                  : "Bookings will appear here when clients schedule a counselling session."}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 p-3 md:hidden">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    audience={audience}
                  />
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[950px] border-collapse text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-3.5">Booking / Client</th>
                      <th className="px-5 py-3.5">Service</th>
                      {isAdmin && <th className="px-5 py-3.5">Counsellor</th>}
                      <th className="px-5 py-3.5">Appointment</th>
                      <th className="px-5 py-3.5">Fee</th>
                      <th className="px-5 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map((booking) => {
                      const clientName = getClientName(booking);
                      const clientEmail =
                        booking.bookingDetails?.clientEmail ||
                        booking.client?.email;
                      const slot = booking.counsellorSlot;
                      return (
                        <tr
                          key={booking.id}
                          className="align-top transition hover:bg-slate-50/70"
                        >
                          <td className="px-5 py-4">
                            <p className="whitespace-nowrap text-sm font-bold text-[#103f3d]">
                              {booking.bookingNumber}
                            </p>
                            <p className="mt-1 font-semibold text-slate-900">
                              {clientName}
                            </p>
                            <p className="mt-0.5 max-w-[210px] break-all text-xs text-slate-500">
                              {clientEmail || "No email"}
                            </p>
                          </td>
                          <td className="max-w-[210px] px-5 py-4 text-sm text-slate-700">
                            {booking.service?.title?.trim() ||
                              "Service unavailable"}
                          </td>
                          {isAdmin && (
                            <td className="px-5 py-4 text-sm text-slate-700">
                              {getCounsellorName(booking)}
                            </td>
                          )}
                          <td className="px-5 py-4">
                            <p className="whitespace-nowrap text-sm font-medium text-slate-800">
                              {formatDate(slot?.date)}
                            </p>
                            <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
                              {formatSlotTime(slot?.slot?.startTime)} –{" "}
                              {formatSlotTime(slot?.slot?.endTime)}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-900">
                            {formatRupees(booking.amount)}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={booking.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-slate-500">
              Page {pagination?.page ?? page} of {totalPages}
            </p>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                disabled={loading || page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                type="button"
                disabled={loading || page >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {!loading && !error && bookings.length > 0 && (
          <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-slate-500">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Fees
            are displayed in Indian rupees (₹), using the amount returned by
            your backend without converting from paise.
          </p>
        )}
      </div>
    </section>
  );
}
