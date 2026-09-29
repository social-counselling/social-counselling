"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, IndianRupee, Star } from "lucide-react";

import {
  getCounsellorServices,
  type CounsellorService,
} from "@/services/counsellor/services.api";

export default function CounsellorServices() {
  const [services, setServices] = useState<CounsellorService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data = await getCounsellorServices();

        console.log("COUNSELLOR SERVICES RESPONSE:", data);

        setServices(data);
      } catch (error) {
        console.error(
          "Failed to load counsellor services:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load services.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-48 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-900">
            Unable to load services
          </h1>

          <p className="mt-1 text-sm text-red-700">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Services
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View the counselling services currently assigned to you.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Services
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {services.length}
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <BriefcaseBusiness className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Average Rating
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                —
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <Star className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Reviews
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                —
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <Star className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="mt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Assigned Services
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Services available on your counselling profile.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <BriefcaseBusiness className="h-6 w-6 text-gray-500" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              No services assigned
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
              No counselling services have been assigned to your profile yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm"
              >
                {/* Service Image */}
                {item.service.imageUrl ? (
                  <div className="h-44 overflow-hidden bg-gray-100">
                    <img
                      src={item.service.imageUrl}
                      alt={item.service.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-44 items-center justify-center bg-gray-100">
                    <BriefcaseBusiness className="h-10 w-10 text-gray-400" />
                  </div>
                )}

                {/* Service Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.service.title}
                      </h3>

                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                        {item.service.category.replace(/_/g, " ")}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5">
                      <IndianRupee className="h-3.5 w-3.5 text-gray-700" />

                      <span className="text-sm font-semibold text-gray-900">
                        {Number(item.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {item.service.subtitle && (
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {item.service.subtitle}
                    </p>
                  )}

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Service Status</span>

                      <span className="font-medium text-green-600">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}