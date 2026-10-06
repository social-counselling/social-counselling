"use client";

import { Check } from "lucide-react";

import type { BookingCategory } from "@/types/booking";

interface Step1CategoryProps {
  categories: BookingCategory[];

  selectedCategory: string | null;

  onSelect: (category: string) => void;
}

export default function Step1Category({
  categories,
  selectedCategory,
  onSelect,
}: Step1CategoryProps) {
  return (
    <section>
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Step 1 of 8
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight text-secondary sm:text-4xl">
          Select Service Category
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Choose the type of support you are looking for to begin your booking.
        </p>
      </div>

      {/* Categories */}
      <div className="mt-8 space-y-4">
        {categories.map((category) => {
          const selected = selectedCategory === category.value;

          return (
            <button
              key={category.value}
              type="button"
              onClick={() => onSelect(category.value)}
              className={`
                group w-full rounded-2xl border
                p-5 text-left transition-all
                duration-200 sm:p-6
                ${
                  selected
                    ? "border-primary bg-primary/[0.04] shadow-sm"
                    : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Radio */}
                <div
                  className={`
                    flex h-6 w-6 shrink-0
                    items-center justify-center
                    rounded-full border-2
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
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-secondary sm:text-xl">
                    {category.label}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {category.value === "SOCIAL_COUNSELLING"
                      ? "Professional counselling support for social, personal and relationship concerns."
                      : "A safe and supportive space where you can talk and be heard."}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <p className="mt-6 text-sm text-slate-500">
        Select one option to continue to the next step.
      </p>
    </section>
  );
}
