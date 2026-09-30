"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail, Star, Users } from "lucide-react";
import Link from "next/link";

import { getAdminCounsellors } from "@/services/admin/counsellors.api";
import type { AdminCounsellor } from "@/types/admin-counsellor";

export default function RecentCounsellors() {
  const [counsellors, setCounsellors] = useState<AdminCounsellor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCounsellors() {
      try {
        setLoading(true);

        const response = await getAdminCounsellors({
          page: 1,
          limit: 5,
        });

        if (mounted) {
          setCounsellors(response.data);
        }
      } catch {
        if (mounted) {
          setCounsellors([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCounsellors();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#183b3b]">
            Recent Counsellors
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Latest counsellors added to the platform
          </p>
        </div>

        <Link
          href="/admin/counsellors"
          className="flex items-center gap-1.5 text-sm font-medium text-[#2d716b] transition hover:text-[#183b3b]"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="divide-y divide-slate-100">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 px-5 py-4">
              <div className="h-11 w-11 animate-pulse rounded-full bg-slate-200" />

              <div className="min-w-0 flex-1">
                <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-48 animate-pulse rounded bg-slate-100" />
              </div>

              <div className="hidden h-6 w-16 animate-pulse rounded-full bg-slate-100 sm:block" />
            </div>
          ))
        ) : counsellors.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Users className="h-5 w-5 text-slate-400" />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              No counsellors found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Counsellors will appear here once added.
            </p>
          </div>
        ) : (
          counsellors.map((counsellor) => {
            const fullName = `${counsellor.user.firstName} ${
              counsellor.user.lastName ?? ""
            }`.trim();

            const initials = fullName
              .split(" ")
              .filter(Boolean)
              .map((name) => name.charAt(0))
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div
                key={counsellor.id}
                className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
              >
                {/* Avatar */}
                {counsellor.user.profileImageUrl ? (
                  <img
                    src={counsellor.user.profileImageUrl}
                    alt={fullName}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f3f0] text-sm font-semibold text-[#2d716b]">
                    {initials || "C"}
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#183b3b]">
                    {fullName}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="max-w-[220px] truncate">
                        {counsellor.user.email}
                      </span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {counsellor.avgRating.toFixed(1)}
                    </span>

                    {counsellor.experienceYears !== null && (
                      <span>
                        {counsellor.experienceYears}{" "}
                        {counsellor.experienceYears === 1 ? "year" : "years"}{" "}
                        experience
                      </span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-medium sm:inline-flex ${
                    counsellor.status === "ACTIVE"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {counsellor.status === "ACTIVE" ? "Active" : "Inactive"}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
