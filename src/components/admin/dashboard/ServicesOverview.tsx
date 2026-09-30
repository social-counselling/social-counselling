"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

import { getAdminServices } from "@/services/admin/services.api";
import type { AdminService } from "@/types/admin-service";

export default function ServicesOverview() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      try {
        setLoading(true);

        const response = await getAdminServices({
          page: 1,
          limit: 5,
        });

        if (mounted) {
          setServices(response.data);
        }
      } catch {
        if (mounted) {
          setServices([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadServices();

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
            Services Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Services currently available on the platform
          </p>
        </div>

        <Link
          href="/admin/services"
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
              <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-200" />

              <div className="min-w-0 flex-1">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
              </div>

              <div className="hidden h-6 w-16 animate-pulse rounded-full bg-slate-100 sm:block" />
            </div>
          ))
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <BriefcaseBusiness className="h-5 w-5 text-slate-400" />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              No services found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Services will appear here once added.
            </p>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.serviceId}
              className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
            >
              {/* Image */}
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="h-11 w-11 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e7f3f0] text-[#2d716b]">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
              )}

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#183b3b]">
                  {service.title}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {service.category}
                  </span>

                  {service.subtitle && (
                    <span className="hidden truncate text-xs text-slate-400 sm:block">
                      {service.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  service.isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {service.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
