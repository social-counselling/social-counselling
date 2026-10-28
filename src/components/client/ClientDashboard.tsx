"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, ArrowRight, Clock3, UserRound } from "lucide-react";

import { useDashboardAuth } from "@/components/dashboard/SharedDashboardShell";
import { getClientBookings } from "@/services/booking/booking.api";
import type { BookingListItem } from "@/types/booking-list";

function formatDate(value?: string | null) {
  if (!value) return "Date to be confirmed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusClass(status: string) {
  switch (status.toUpperCase()) {
    case "CONFIRMED": return "bg-emerald-50 text-emerald-700";
    case "COMPLETED": return "bg-slate-100 text-slate-700";
    case "CANCELLED":
    case "REFUNDED": return "bg-rose-50 text-rose-700";
    default: return "bg-amber-50 text-amber-700";
  }
}

export default function ClientDashboard() {
  const { user } = useDashboardAuth();
  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookingsUnavailable, setBookingsUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    getClientBookings({ page: 1, limit: 5 })
      .then((response) => {
        if (!active) return;
        setBookings(response.data ?? []);
        setTotalBookings(response.pagination?.total ?? response.data?.length ?? 0);
      })
      .catch(() => {
        if (active) setBookingsUnavailable(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const firstName = user.firstName || "there";

  return (
    <div className="min-w-0 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-2xl bg-[#103f3d] p-5 text-white sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Your wellness space</p>
        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Welcome back, {firstName}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">Manage your counselling sessions and keep your account information up to date.</p>
          </div>
          <Link href="/book-session" className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#103f3d] transition hover:bg-emerald-50 sm:self-auto">
            Book a session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800"><CalendarDays className="h-5 w-5" /></span>
          <p className="mt-4 text-sm text-slate-500">Total bookings</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{loading ? "—" : bookingsUnavailable ? "—" : totalBookings}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-800"><UserRound className="h-5 w-5" /></span>
          <p className="mt-4 text-sm text-slate-500">Account</p>
          <p className="mt-1 truncate text-base font-semibold text-slate-900">{user.firstName} {user.lastName ?? ""}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{user.email}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-800"><Clock3 className="h-5 w-5" /></span>
          <p className="mt-4 text-sm text-slate-500">Need support?</p>
          <p className="mt-1 text-base font-semibold text-slate-900">Take the next step at your pace</p>
          <Link href="/contact" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#103f3d] hover:underline">Contact us <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Recent bookings</h2>
            <p className="mt-1 text-sm text-slate-500">Your latest counselling sessions.</p>
          </div>
          <Link href="/client/bookings" className="inline-flex items-center gap-1 text-sm font-semibold text-[#103f3d] hover:underline">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>

        {loading ? (
          <div className="space-y-3 p-5 sm:p-6" aria-label="Loading bookings"><div className="h-14 animate-pulse rounded-xl bg-slate-100" /><div className="h-14 animate-pulse rounded-xl bg-slate-100" /></div>
        ) : bookingsUnavailable ? (
          <div className="px-5 py-8 text-sm text-slate-600 sm:px-6">
            <p className="font-medium text-slate-800">Your booking history is being connected.</p>
            <p className="mt-1">The frontend is ready for the client bookings API. This endpoint will become available when client access is implemented in the backend.</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <CalendarDays className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-800">No bookings yet</p>
            <p className="mt-1 text-sm text-slate-500">When you book a session, it will appear here.</p>
            <Link href="/book-session" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#103f3d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b302e]">Book a session</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{booking.service?.title || "Counselling session"}</p>
                  <p className="mt-1 text-xs text-slate-500">Booking #{booking.bookingNumber} · {formatDate(booking.counsellorSlot?.date)}</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(booking.status)}`}>{booking.status}</span>
                  <span className="text-sm font-semibold text-slate-900">₹{Number(booking.amount || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
