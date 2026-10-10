"use client";

import { Check } from "lucide-react";
import Image from "next/image";

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
    .filter((service) => service.category === selectedCategory)
    .sort((a, b) => a.sortOrder - b.sortOrder);

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
      <div className="mt-8 max-h-[390px] space-y-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-2">
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
                onClick={() => onSelect(service.serviceId)}
                className={`
                  group w-full rounded-2xl border
                  p-4 text-left
                  transition-all duration-200
                  sm:p-4
                  ${
                    selected
                      ? "border-primary bg-primary/[0.04] shadow-sm"
                      : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Selection */}
                  <div
                    className={`
                      mt-0.5 flex h-6 w-6
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

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h2
                      className={`
                        text-base font-semibold
                        sm:text-lg
                        ${selected ? "text-primary" : "text-secondary"}
                      `}
                    >
                      {service.title}
                    </h2>

                    {service.subtitle && (
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {service.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Image */}

                  {service.imageUrl && (
                    <div className="relative hidden h-16 w-20 shrink-0 overflow-hidden rounded-xl sm:block">
                      <Image
                        src={service.imageUrl}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  )}
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
