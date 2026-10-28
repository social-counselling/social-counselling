"use client";

import { useCallback, useEffect, useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";
import { getClientBookings } from "@/services/booking/booking.api";
import type { BookingListItem, BookingListStatus } from "@/types/booking-list";

const statuses: Array<"ALL" | BookingListStatus> = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "REFUNDED"];

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function statusClass(status: string) {
  if (status === "CONFIRMED") return "bg-emerald-50 text-emerald-700";
  if (status === "COMPLETED") return "bg-slate-100 text-slate-700";
  if (status === "CANCELLED" || status === "REFUNDED") return "bg-rose-50 text-rose-700";
  return "bg-amber-50 text-amber-700";
}

export default function ClientBookingsPage() {
  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [status, setStatus] = useState<"ALL" | BookingListStatus>("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getClientBookings({ page: 1, limit: 50, status: status === "ALL" ? undefined : status });
      setBookings(response.data ?? []);
    } catch {
      setError("Client booking history will load once the client bookings endpoint is enabled in the backend.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { void load(); }, [load]);

  return (
    <div className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#103f3d]">My bookings</h1>
          <p className="mt-1 text-sm text-slate-500">Review your counselling sessions and their status.</p>
        </div>
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 sm:min-w-44">
          Filter by status
          <select value={status} onChange={(event) => setStatus(event.target.value as "ALL" | BookingListStatus)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#103f3d]">
            {statuses.map((value) => <option key={value} value={value}>{value === "ALL" ? "All bookings" : value.charAt(0) + value.slice(1).toLowerCase()}</option>)}
          </select>
        </label>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="space-y-3 p-5"><div className="h-12 animate-pulse rounded-xl bg-slate-100" /><div className="h-12 animate-pulse rounded-xl bg-slate-100" /><div className="h-12 animate-pulse rounded-xl bg-slate-100" /></div>
        ) : error ? (
          <div className="p-6 sm:p-8">
            <p className="text-sm text-slate-600">{error}</p>
            <button type="button" onClick={() => void load()} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#103f3d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b302e]"><RefreshCw className="h-4 w-4" /> Try again</button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-6">
            <CalendarDays className="mx-auto h-9 w-9 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-800">No bookings found</p>
            <p className="mt-1 text-sm text-slate-500">Your sessions will appear here once booked.</p>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[1.3fr_1fr_0.8fr_0.8fr] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
              <span>Service</span><span>Date</span><span>Status</span><span className="text-right">Amount</span>
            </div>
            <div className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <div key={booking.id} className="grid gap-2 px-5 py-4 md:grid-cols-[1.3fr_1fr_0.8fr_0.8fr] md:items-center md:gap-4 md:px-6">
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{booking.service?.title || "Counselling session"}</p><p className="mt-1 text-xs text-slate-500">#{booking.bookingNumber}</p></div>
                  <p className="text-sm text-slate-600">{formatDate(booking.counsellorSlot?.date)}</p>
                  <p><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(booking.status)}`}>{booking.status}</span></p>
                  <p className="text-sm font-semibold text-slate-900 md:text-right">₹{Number(booking.amount || 0).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
