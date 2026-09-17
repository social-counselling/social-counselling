import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import {
  counsellingTypes,
  heroData,
} from "@/data/home";

import MarriageServiceCard from "./MarriageServiceCard";


/* =========================================================
   SERVICE CARD
   ========================================================= */

function ServiceCard({
  service,
  compact = false,
}: {
  service: (typeof counsellingTypes)[number];
  compact?: boolean;
}) {
  return (
    <Link
      href={service.href}
      className={`
        group
        flex
        items-center
        min-w-0
        border
        border-white/70
        bg-white/70
        shadow-[0_5px_18px_rgba(24,59,59,0.07)]
        transition-all
        duration-300
        hover:bg-white/90
        hover:shadow-[0_8px_24px_rgba(24,59,59,0.12)]

        ${
          compact
            ? `
              w-full
              min-h-[64px]
              gap-2
              rounded-[18px]
              px-2
              py-2
            `
            : `
              w-full
              min-h-[62px]
              gap-2
              rounded-[22px]
              px-3
              py-2.5
            `
        }
      `}
    >
      {/* =====================================================
          ICON
          ===================================================== */}

      <div
        className={`
          relative
          flex
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-white
          shadow-sm

          ${
            compact
              ? "h-11 w-11"
              : "h-[48px] w-[48px]"
          }
        `}
      >
        <Image
          src={service.icon}
          alt=""
          width={80}
          height={80}
          className="
            h-full
            w-full
            object-contain
            p-1
          "
        />
      </div>

      {/* =====================================================
          TEXT
          ===================================================== */}

      <div className="min-w-0 flex-1">
        <p
          className={`
            font-semibold
            leading-tight
            text-secondary

            ${
              compact
                ? "line-clamp-2 text-[10px]"
                : "text-sm xl:text-[13px]"
            }
          `}
        >
          {service.title}
        </p>

        <p
          className={`
            mt-1
            leading-tight
            text-slate-600

            ${
              compact
                ? "line-clamp-2 text-[8px]"
                : "line-clamp-2 text-[11px] xl:text-xs"
            }
          `}
        >
          {service.subtitle}
        </p>
      </div>

      {/* =====================================================
          ARROW
          ===================================================== */}

      {!compact && (
        <ArrowRight
          className="
            h-4
            w-4
            shrink-0
            text-primary
            opacity-0
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:opacity-100
          "
        />
      )}
    </Link>
  );
}

/* =========================================================
   SERVICE LIST
   ========================================================= */

function ServiceList({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex flex-col gap-2"
          : "flex flex-col gap-2.5"
      }
    >
      {counsellingTypes.map((service) =>
        service.id === "marriage" ? (
          <MarriageServiceCard
            key={service.id}
            service={service}
            compact={compact}
          />
        ) : (
          <ServiceCard
            key={service.id}
            service={service}
            compact={compact}
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   HERO SECTION
   ========================================================= */

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* =====================================================
          HERO IMAGE
          ===================================================== */}

      <div
        className="
          relative
          w-full
          bg-white
          md:h-[100svh]
          md:min-h-[600px]
          md:max-h-[1080px]
        "
      >
       <Image
  src={heroData.image}
  alt="Social Counselling"
  width={1536}
  height={864}
  priority
  sizes="100vw"
  className="
    block
    h-auto
    w-full
z-0
    md:absolute
    md:inset-y-0
    md:right-0
    md:left-auto
    md:h-full
    md:w-[calc(100%_-_160px)]

    md:object-cover
    md:object-center
  "
/>

{/* ===================================================
    LEFT WHITE GRADIENT
    Keeps the service-card area clean
    =================================================== */}

<div
  className="
    pointer-events-none
    absolute
    inset-y-0
    left-0
    z-10
    hidden
    w-[430px]
    bg-gradient-to-r
    from-white
    via-white/95
    to-transparent
    md:block
    lg:w-[470px]
    xl:w-[520px]
  "
  aria-hidden="true"
/>

        {/* ===================================================
            DESKTOP SERVICE CARDS
            =================================================== */}

        <Container
  className="
    pointer-events-none
    absolute
    inset-0
    z-20
    hidden
    xl:block
  "
>
          <div
            className="
              pointer-events-auto
              absolute
              left-3
              top-[16%]
              w-[250px]
            "
          >
            <ServiceList />

            {/* ===============================================
                VIEW ALL SERVICES
                =============================================== */}

            <Button
              href="/services"
              variant="outline"
              size="md"
              className="
                mt-2
                w-full
                rounded-full
                border-white
                bg-white/80
                backdrop-blur-md
              "
            >
              View All Services

              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </div>

      {/* =====================================================
          TABLET + MOBILE SERVICES
          ===================================================== */}

      <div
        className="
          block
          bg-white
          py-6
          sm:py-8
          lg:py-10
          xl:hidden
        "
      >
        <Container>
          <div
            className="
              mx-auto
              w-full
              max-w-2xl
            "
          >
            <ServiceList compact />

            {/* ===============================================
                VIEW ALL SERVICES
                =============================================== */}

            <div
              className="
                mx-auto
                mt-4
                max-w-[260px]
                sm:mt-5
              "
            >
              <Button
                href="/services"
                variant="outline"
                size="sm"
                className="
                  w-full
                  rounded-full
                  border-primary/30
                  bg-white
                "
              >
                View All Services

                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </div>
       {/* =====================================================
                 Wave
                 ===================================================== */}
     <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-[55px]
          overflow-hidden
          sm:h-[65px]
          lg:h-[75px]
        "
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
        >
          <path
             fill="#E8F5E9"
            d="
              M0 65
              C120 95 210 112 340 102
              C470 92 535 55 665 65
              C795 75 850 112 970 105
              C1090 98 1145 65 1250 72
              C1340 78 1390 92 1440 88
              L1440 140
              L0 140
              Z
            "
          />
        </svg>
      </div>
    </section>
  );
}