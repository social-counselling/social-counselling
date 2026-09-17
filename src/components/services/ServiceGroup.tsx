import Image from "next/image";

import type { ServiceCardData } from "@/data/services";

import ServiceCard from "./ServiceCard";

interface ServiceGroupProps {
  services: ServiceCardData[];
  imagePosition: "left" | "right";
  imageSrc: string;
  imageAlt?: string;
}

export default function ServiceGroup({
  services,
  imagePosition,
  imageSrc,
  imageAlt = "",
}: ServiceGroupProps) {
  const imageOnLeft = imagePosition === "left";

  return (
    <div
      className="
        grid
        items-center
        gap-8
        lg:grid-cols-[0.85fr_1.15fr]
        lg:gap-10
        xl:grid-cols-[0.9fr_1.1fr]
        xl:gap-12
      "
    >
      {/* =====================================================
          CHARACTER IMAGE
          ===================================================== */}

      <div
        className={`
          flex
          items-center
          justify-center

          ${imageOnLeft ? "lg:order-1" : "lg:order-2"}
        `}
      >
        <div
          className="
            relative
            h-[300px]
            w-full
            max-w-[360px]

            sm:h-[360px]
            sm:max-w-[420px]

            md:h-[420px]
            md:max-w-[450px]

            lg:h-[520px]
            lg:max-w-[470px]

            xl:h-[560px]
            xl:max-w-[500px]
          "
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="
              (min-width: 1280px) 40vw,
              (min-width: 1024px) 42vw,
              90vw
            "
            className="
              object-contain
              drop-shadow-[0_18px_35px_rgba(24,59,59,0.10)]
            "
          />
        </div>
      </div>

      {/* =====================================================
          SERVICE CARDS
          ===================================================== */}

      <div
        className={`
          flex
          flex-col
          gap-4

          sm:gap-5

          ${imageOnLeft ? "lg:order-2" : "lg:order-1"}
        `}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}