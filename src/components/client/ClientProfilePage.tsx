"use client";

import { Mail, UserRound, ShieldCheck } from "lucide-react";
import { useDashboardAuth } from "@/components/dashboard/SharedDashboardShell";

export default function ClientProfilePage() {
  const { user } = useDashboardAuth();
  const fullName = `${user.firstName} ${user.lastName ?? ""}`.trim();

  return (
    <div className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#103f3d]">My profile</h1>
        <p className="mt-1 text-sm text-slate-500">Your account information returned by the authentication service.</p>
      </div>
      <section className="max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-100 p-5 sm:p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f3f0] text-lg font-semibold text-[#103f3d]">
            {fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U"}
          </div>
          <div className="min-w-0"><h2 className="truncate text-lg font-semibold text-slate-900">{fullName || "Client"}</h2><p className="mt-1 text-sm text-slate-500">Client account</p></div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-medium text-slate-500"><UserRound className="h-4 w-4" /> Full name</div><p className="mt-2 break-words text-sm font-semibold text-slate-900">{fullName || "Not provided"}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Mail className="h-4 w-4" /> Email address</div><p className="mt-2 break-all text-sm font-semibold text-slate-900">{user.email}</p></div>
          <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2"><div className="flex items-center gap-2 text-xs font-medium text-slate-500"><ShieldCheck className="h-4 w-4" /> Account role</div><p className="mt-2 text-sm font-semibold text-slate-900">Client</p><p className="mt-1 text-xs leading-5 text-slate-500">Profile editing can be connected when the backend exposes a client profile update endpoint.</p></div>
        </div>
      </section>
    </div>
  );
}
