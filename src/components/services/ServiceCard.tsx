"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceCardData } from "@/data/services";

interface ServiceCardProps {
  service: ServiceCardData;
  reverse?: boolean;
}

export default function ServiceCard({
  service,
  reverse = false,
}: ServiceCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-white/80 bg-white/60 shadow-[0_8px_30px_rgba(24,59,59,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(24,59,59,0.11)]">
      <div
        className={`
          grid
          items-stretch
          lg:grid-cols-2
          ${
            reverse
              ? "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1"
              : ""
          }
        `}
      >
        {/* =====================================================
            IMAGE
            ===================================================== */}
{/* 
        <div
          className="
            relative
            aspect-[16/9]
            w-full
            overflow-hidden
            lg:aspect-auto
            lg:min-h-[285px]
          "
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="
              object-cover
              object-center
              transition-transform
              duration-700
              group-hover:scale-[1.025]
            "
          />
        </div> */}

   <div
  className="
    relative
    aspect-[16/9]
    w-full
    overflow-hidden
    lg:aspect-auto
    lg:min-h-[285px]
    rounded-[20px]
    lg:rounded-l-[20px]
    lg:rounded-r-none
  "
>
  <Image
    src={service.image}
    alt={service.title}
    fill
    sizes="(min-width: 1024px) 50vw, 100vw"
    className="object-contain object-center"
  />
</div>

        {/* =====================================================
            CONTENT
            ===================================================== */}

        <div className="relative flex min-h-[285px] flex-col justify-center px-6 py-7 sm:px-8 lg:px-10">
          <span className="text-sm font-semibold tracking-[0.16em] text-primary">
            {service.number}
          </span>

          <h2 className="mt-2 max-w-xl font-serif text-2xl font-semibold leading-tight text-secondary sm:text-3xl">
            {service.title}
          </h2>

          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#2f7d48] sm:text-base">
            {service.subtitle}
          </p>

          <Link
            href={service.href}
            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* =================================================
              CARD LEAF
              ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              right-0
              h-[155px]
              w-[115px]
              opacity-60
            "
            aria-hidden="true"
          >
            <Image
              src="/images/services/card-leaf-pattern.png"
              alt=""
              fill
              className="object-contain object-bottom-right"
            />
          </div>
        </div>
      </div>
    </article>
  );
}