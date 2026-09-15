"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { bookingCategories } from "@/data/booking";

interface Step1CategoryProps {
  selectedCategory: string | null;
  onSelect: (categoryId: string) => void;
}

export default function Step1Category({
  selectedCategory,
  onSelect,
}: Step1CategoryProps) {
  return (
    <section className="relative">
      {/* Section Heading */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Step 1 of 8
        </p>

        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-secondary sm:text-4xl lg:text-5xl">
          Select Service Category
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Please choose the type of support you are looking for. You can
          always reach out if you’re unsure  we’re here to guide you.
        </p>
            
                <Image
                          src="/images/booking/HANDWRITTEN.png"
                          alt=""
                          width={140}
                          height={40}
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute
                            -right-4
                            top-[12%]
                            z-20
                            hidden
                            w-[125px]
                            rotate-[-10deg]
                            opacity-75
                            xl:block
                          "
                        />

      </div>

      {/* Category Cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        {bookingCategories.map((category) => {
          const selected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`
                group relative overflow-hidden rounded-[22px]
                border bg-white text-left
                transition-all duration-300
                ${
                  selected
                    ? "border-primary shadow-[0_14px_40px_rgba(24,100,90,0.16)]"
                    : "border-white/80 shadow-[0_8px_28px_rgba(24,59,59,0.07)] hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(24,59,59,0.12)]"
                }
              `}
            >
              {/* Selected indicator */}
              {selected && (
                <div className="absolute right-4 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md">
                  <Check className="h-4 w-4" />
                </div>
              )}

              <div className="grid items-center gap-5 p-5 sm:grid-cols-[150px_1fr] sm:p-6">
                {/* Image */}
                <div className="relative mx-auto h-[145px] w-[145px] shrink-0 overflow-hidden rounded-full bg-[#f5eee2]">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="145px"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl font-semibold leading-tight text-secondary">
                    {category.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {category.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4b9b68] text-white">
                          <Check className="h-2.5 w-2.5" />
                        </span>

                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`
                      mt-5 inline-flex items-center gap-2
                      text-sm font-semibold
                      transition-colors
                      ${
                        selected
                          ? "text-primary"
                          : "text-blue-600 group-hover:text-primary"
                      }
                    `}
                  >
                    {selected ? "Selected" : "Explore"}

                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

         {/* =========================
                  CONNECTION DIVIDER
              ========================== */}
              <div className="mx-auto my-12 flex max-w-3xl items-center justify-center gap-4 sm:my-14">
                <span className="h-px flex-1 bg-primary/15" />
      
                <Image
                  src="/images/booking/divider.png"
                  alt=""
                  width={140}
                  height={40}
                  aria-hidden="true"
                  className="h-auto w-[90px] opacity-25"
                />
      
                <span className="h-px flex-1 bg-primary/15" />
              </div>

               <p className="mt-4 max-w-3xl text-center text-base leading-7 text-slate-600 sm:text-lg">
                   " you don't have to face it alone. Support is just a conversation aways."
        </p>
    </section>
  );
}