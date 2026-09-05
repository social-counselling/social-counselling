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
              min-h-[82px]
              gap-2
              rounded-[22px]
              px-3
              py-2.5
            `
        }
      `}
    >
      {  /* =====================================================
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
              : "h-[58px] w-[58px]"
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
                : "text-sm xl:text-[15px]"
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

          Only show on desktop.
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

      <div className="relative w-full">

        <Image
          src={heroData.image}
          alt="Social Counselling"
          width={1536}
          height={1024}
          priority
          sizes="100vw"
          className="
            block
            h-auto
            w-full
          "
        />

        {/* ===================================================
            DESKTOP SERVICE CARDS

            xl and above:
            Cards stay OVER the hero image.
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
              pointer-events-auto rounded-2xl
              
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
                mt-3
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

          Below xl:
          Image stays completely clean.

          Cards appear BELOW the image.
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

            {/* ===============================================
                COMPACT SERVICE CARDS
                =============================================== */}

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

    </section>
  );
}