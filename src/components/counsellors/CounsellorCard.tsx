import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import type { Counsellor } from "@/types/counsellor";

interface CounsellorCardProps {
  counsellor: Counsellor;
}

function getInitials(name: string) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function CounsellorCard({
  counsellor,
}: CounsellorCardProps) {
  const initials = getInitials(counsellor.name);

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-border
        bg-white
        shadow-[var(--shadow-soft)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[var(--shadow-card)]
      "
    >
      {/* Profile image */}
      <div
        className="
          relative
          aspect-[4/3]
          overflow-hidden
          bg-primary-light
        "
      >
        {counsellor.profileImage ? (
          <Image
            src={counsellor.profileImage}
            alt={counsellor.name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-gradient-to-br
              from-primary-light
              via-white
              to-secondary-light
            "
          >
            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                bg-white
                text-3xl
                font-semibold
                text-primary
                shadow-[var(--shadow-soft)]
              "
            >
              {initials}
            </div>
          </div>
        )}

        {/* Availability */}
        {counsellor.isAvailableForBooking && (
          <div
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/80
              bg-white/90
              px-3
              py-1.5
              text-xs
              font-semibold
              text-primary
              shadow-sm
              backdrop-blur-md
            "
          >
            Available for booking
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Counsellor
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-secondary">
          {counsellor.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {counsellor.credentials}
        </p>

        {/* Coverage */}
        <div className="mt-4 flex items-start gap-2 text-sm text-text-secondary">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

          <span>
            {counsellor.geographicalCoverage}
          </span>
        </div>

        {/* Specializations */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-secondary">
            Areas of support
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {counsellor.specializations
              .slice(0, 3)
              .map((specialization) => (
                <span
                  key={specialization.id}
                  className="
                    rounded-full
                    bg-background-soft
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-text-secondary
                  "
                >
                  {specialization.title}
                </span>
              ))}
          </div>
        </div>

        {/* Action */}
        <Link
          href={`/counsellors/${counsellor.slug}`}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-primary
            transition-colors
            hover:text-primary-dark
          "
        >
          View profile

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
      </div>
    </article>
  );
}