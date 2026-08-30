import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/types/service";

import ServiceStatusBadge from "./ServiceStatusBadge";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const isReady = service.status === "READY";

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
      {/* Image / visual */}
      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          bg-primary-light
        "
      >
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
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
            <span
              className="
                font-serif
                text-4xl
                italic
                text-primary/50
              "
            >
              Support
            </span>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <ServiceStatusBadge status={service.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h2
          className="
            text-xl
            font-semibold
            tracking-tight
            text-secondary
          "
        >
          {service.title}
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-text-secondary
          "
        >
          {service.shortDescription}
        </p>

        {service.suitableFor &&
          service.suitableFor.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Suitable for
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {service.suitableFor.map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      bg-background-soft
                      px-3
                      py-1.5
                      text-xs
                      text-text-secondary
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Action */}
        {isReady ? (
          <Link
            href={`/services/${service.slug}`}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-primary
            "
          >
            Explore service

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
        ) : (
          <span
            className="
              mt-6
              inline-block
              text-sm
              font-medium
              text-slate-400
            "
          >
            Details coming soon
          </span>
        )}
      </div>
    </article>
  );
}