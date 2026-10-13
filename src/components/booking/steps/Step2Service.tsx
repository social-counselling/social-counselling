"use client";

import { Check } from "lucide-react";

import type { BookingService } from "@/types/booking";

interface Step2ServiceProps {
  services: BookingService[];

  selectedServiceId: number | null;

  selectedCategory: string | null;

  onSelect: (serviceId: number) => void;
}

export default function Step2Service({
  services,
  selectedServiceId,
  selectedCategory,
  onSelect,
}: Step2ServiceProps) {
  const categoryServices = services
    .filter((service) =>
      service.category === selectedCategory ||
      (selectedCategory === "SOCIAL_COUNSELLING" &&
        service.category === "EMPATHETIC_LISTENING"),
    )
    .sort((a, b) => {
      const aEmpathetic = a.category === "EMPATHETIC_LISTENING";
      const bEmpathetic = b.category === "EMPATHETIC_LISTENING";
      if (aEmpathetic !== bEmpathetic) return aEmpathetic ? 1 : -1;
      return a.sortOrder - b.sortOrder;
    });

  return (
    <section>
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Step 2 of 8
        </p>

        <h1 className="mt-2 text-2xl font-semibold leading-tight text-secondary sm:text-3xl">
          Select a Service
        </h1>

        <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
          Choose the counselling service that best matches your needs.
        </p>
      </div>

      {/* Services */}
      <div className="mt-6 grid max-h-[390px] grid-cols-1 gap-2 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid-cols-2">
        {categoryServices.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">
              No services are currently available for this category.
            </p>
          </div>
        ) : (
          categoryServices.map((service) => {
            const selected = selectedServiceId === service.serviceId;

            return (
              <button
                key={service.serviceId}
                type="button"
                title={service.subtitle || service.title}
                onClick={() => onSelect(service.serviceId)}
                className={`
                  group flex min-h-[54px] w-full items-center gap-2 rounded-xl border
                  px-3 py-2.5 text-left
                  transition-all duration-200
                  ${
                    selected
                      ? "border-primary bg-primary/[0.04] shadow-sm"
                      : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  {/* Selection */}
                  <div
                    className={`
                      flex h-4 w-4
                      shrink-0 items-center
                      justify-center rounded-full
                      border-2
                      ${
                        selected
                          ? "border-primary bg-primary"
                          : "border-slate-300 bg-white"
                      }
                    `}
                  >
                    {selected && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>

                  {/* Compact service name; details appear on hover via tooltip */}
                  <div className="min-w-0 flex-1">
                    <h2 className={`truncate text-xs font-semibold sm:text-sm ${selected ? "text-primary" : "text-secondary"}`}>
                      {service.title}
                    </h2>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Select one service to continue.
      </p>
    </section>
  );
}
