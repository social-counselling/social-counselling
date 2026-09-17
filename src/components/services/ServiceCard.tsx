"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceCardData } from "@/data/services";

interface ServiceCardProps {
  service: ServiceCardData;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-white/80
        bg-white/60
        shadow-[0_8px_30px_rgba(24,59,59,0.07)]
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_14px_36px_rgba(24,59,59,0.11)]
      "
    >
      <div className="relative flex min-h-[190px] flex-col justify-center px-6 py-6 sm:min-h-[205px] sm:px-8 sm:py-7 lg:min-h-[190px] lg:px-9">
        {/* =====================================================
            NUMBER
            ===================================================== */}

        <span
          className="
            text-sm
            font-semibold
            tracking-[0.16em]
            text-primary
          "
        >
          {service.number}
        </span>

        {/* =====================================================
            TITLE
            ===================================================== */}

        <h2
          className="
            mt-2
            max-w-xl
            font-serif
            text-2xl
            font-semibold
            leading-tight
            text-secondary
            sm:text-[27px]
          "
        >
          {service.title}
        </h2>

        {/* =====================================================
            SUBTITLE
            ===================================================== */}

        <p
          className="
            mt-2
            max-w-xl
            text-sm
            font-semibold
            leading-6
            text-[#2f7d48]
            sm:text-base
          "
        >
          {service.subtitle}
        </p>

        {/* =====================================================
            LEARN MORE
            ===================================================== */}

        <Link
          href={service.href}
          className="
            mt-4
            inline-flex
            w-fit
            items-center
            gap-2
            text-sm
            font-semibold
            text-blue-600
            transition-colors
            hover:text-blue-700
          "
        >
          Learn more

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </Link>

        {/* =====================================================
            CARD BOTANICAL
            ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-[125px]
            w-[95px]
            opacity-55
          "
          aria-hidden="true"
        >
          <Image
            src="/images/services/card-leaf-pattern.png"
            alt=""
            fill
            className="
              object-contain
              object-bottom-right
            "
          />
        </div>
      </div>
    </article>
  );
}