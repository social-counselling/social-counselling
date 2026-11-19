"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";
import { getClientBookings } from "@/services/booking/booking.api";
import type { ClientBookingListItem, BookingListStatus } from "@/types/booking-list";

const toIsoDate = (v:string) => { const m=v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if(!m)return ""; const d=new Date(+m[3],+m[2]-1,+m[1]); return d.getFullYear()===+m[3]&&d.getMonth()===+m[2]-1&&d.getDate()===+m[1]?`${m[3]}-${m[2]}-${m[1]}`:""; };

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
  const [bookings, setBookings] = useState<ClientBookingListItem[]>([]);
  const [status, setStatus] = useState<"ALL" | BookingListStatus>("ALL");
  const [loading, setLoading] = useState(true);
  const [searchInput,setSearchInput]=useState(""); const [search,setSearch]=useState(""); const [fromDate,setFromDate]=useState(""); const [toDate,setToDate]=useState("");
  const [appliedFromDate,setAppliedFromDate]=useState(""); const [appliedToDate,setAppliedToDate]=useState("");
  const cache=useRef(new Map<string,ClientBookingListItem[]>());
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const key=JSON.stringify([status,search,appliedFromDate,appliedToDate]); const cached=cache.current.get(key); if(cached){setBookings(cached);setLoading(false);setError("");return;}
    setLoading(true);
    setError("");
    try {
      const response = await getClientBookings({ page: 1, limit: 50, status: status === "ALL" ? undefined : status, search, fromDate:toIsoDate(appliedFromDate), toDate:toIsoDate(appliedToDate) });
      cache.current.set(key,response.data??[]); setBookings(response.data ?? []);
    } catch {
      setError("Unable to load your bookings right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [status,search,appliedFromDate,appliedToDate]);

  useEffect(() => { void load(); }, [load]);

  return (
    <div className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-[#103f3d]">My bookings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review your counselling sessions and their status.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearch(searchInput.trim());
            setAppliedFromDate(fromDate);
            setAppliedToDate(toDate);
            cache.current.clear();
          }}
          className="grid grid-cols-1 items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Search bookings</span>
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Booking, service or counsellor"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#147d7e] focus:ring-2 focus:ring-[#147d7e]/10"
            />
          </label>

          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as "ALL" | BookingListStatus)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#147d7e] focus:ring-2 focus:ring-[#147d7e]/10"
            >
              {statuses.map((value) => (
                <option key={value} value={value}>
                  {value === "ALL" ? "All bookings" : value.charAt(0) + value.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500">From date</span>
            <input
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              placeholder="DD/MM/YYYY"
              inputMode="numeric"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#147d7e] focus:ring-2 focus:ring-[#147d7e]/10"
            />
          </label>

          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500">To date</span>
            <input
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              placeholder="DD/MM/YYYY"
              inputMode="numeric"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#147d7e] focus:ring-2 focus:ring-[#147d7e]/10"
            />
          </label>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="h-11 min-w-24 whitespace-nowrap rounded-xl bg-[#103f3d] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b302e]"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              const from = new Date(now);
              from.setDate(now.getDate() - ((now.getDay() + 6) % 7));
              const format = (date: Date) =>
                `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
              const fromValue = format(from);
              const toValue = format(now);
              setFromDate(fromValue);
              setToDate(toValue);
              setAppliedFromDate(fromValue);
              setAppliedToDate(toValue);
            }}
            className="h-11 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#147d7e]/40 hover:bg-[#f2f8f7]"
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              const from = new Date(now.getFullYear(), now.getMonth(), 1);
              const format = (date: Date) =>
                `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
              const fromValue = format(from);
              const toValue = format(now);
              setFromDate(fromValue);
              setToDate(toValue);
              setAppliedFromDate(fromValue);
              setAppliedToDate(toValue);
            }}
            className="h-11 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#147d7e]/40 hover:bg-[#f2f8f7]"
          >
            Monthly
          </button>
          </div>
        </form>
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
            <div className="hidden grid-cols-[1.2fr_1fr_0.9fr_0.8fr_0.8fr] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
              <span>Service</span><span>Counsellor</span><span>Date</span><span>Status</span><span className="text-right">Amount</span>
            </div>
            <div className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <div key={booking.id} className="grid gap-2 px-5 py-4 md:grid-cols-[1.2fr_1fr_0.9fr_0.8fr_0.8fr] md:items-center md:gap-4 md:px-6">
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{booking.service?.title || "Counselling session"}</p><p className="mt-1 text-xs text-slate-500">#{booking.bookingNumber}</p></div>
                  <p className="text-sm font-medium text-slate-700">{[booking.counsellor?.user?.firstName,booking.counsellor?.user?.lastName].filter(Boolean).join(" ")||"Not assigned"}</p><p className="text-sm text-slate-600">{formatDate(booking.counsellorSlot?.date)}</p>
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
