import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  HeartHandshake,
  HeartPulse,
  UserRound,
  UsersRound,
} from "lucide-react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import MarriageServiceCard from "@/components/home/MarriageServiceCard";
import {
  counsellingTypes,
  heroData,
  marriageServices,
  type CounsellingTypeId,
} from "@/data/home";

/* =========================================================
   SERVICE ICONS
   ========================================================= */

const counsellingIcons: Record<
  CounsellingTypeId,
  typeof UsersRound
> = {
  teenagers: UsersRound,
  marriage: HeartHandshake,
  "senior-citizens": HeartPulse,
  individual: UserRound,
  corporate: BriefcaseBusiness,
};

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
  const Icon = counsellingIcons[service.id];

  return (
    <Link
  href={service.href}
  className={`
    group flex min-w-0 items-center
    border border-white/60
    bg-white/75
    shadow-sm
    backdrop-blur-md
    transition-all duration-300

   ${
  compact
    ? "h-7 w-[125px] gap-1 rounded-md px-1.5"
    : "gap-2.5 rounded-[18px] px-3 py-2.5"
}
  `}
>
      <div
        className={`
          flex shrink-0 items-center justify-center
          rounded-full bg-white text-primary
          shadow-sm

          ${
            compact
              ? "h-5 w-5"
              : "h-9 w-9"
          }
        `}
      >
        <Icon
          className={
            compact
              ? "h-2.5 w-2.5"
              : "h-4.5 w-4.5"
          }
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0 leading-none">
        <p
          className={`
            truncate font-bold text-secondary
            ${
              compact
                ? "text-[7px]"
                : "text-xs xl:text-sm"
            }
          `}
        >
          {service.title}
        </p>

        <p
          className={`
            truncate text-slate-600
            ${
              compact
                ? "mt-0.5 text-[6px]"
                : "mt-0.5 text-[10px] xl:text-xs"
            }
          `}
        >
          {service.subtitle}
        </p>
      </div>

      {!compact && (
        <ArrowRight
          className="
            ml-auto hidden h-3.5 w-3.5
            shrink-0 text-primary
            opacity-0
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:opacity-100
            xl:block
          "
        />
      )}
    </Link>
  );
}

/* =========================================================
   HERO SECTION
   ========================================================= */

export default function HeroSection() {
  return (
   <section className="relative w-full overflow-hidden">
  <div
    className="
      relative
      w-full
      h-[360px]
      sm:h-[420px]
      lg:min-h-[700px]
      xl:min-h-[780px]
    "
  >
    <Image
      src={heroData.image}
      alt="Social Counselling"
      fill
      priority
      sizes="100vw"
      className="
        object-cover
        object-[52%_center]
        lg:object-center
      "
    />

    <Container className="relative z-10 h-full">

      {/* DESKTOP SERVICES */}
      <div
        className="
          absolute
          left-3
          top-[18%]
          hidden
          w-[185px]
          flex-col
          gap-2
          xl:flex
        "
      >
        {counsellingTypes.map((service) =>
  service.id === "marriage" ? (
    <MarriageServiceCard
      key={service.id}
      service={service}
    />
  ) : (
    <ServiceCard
      key={service.id}
      service={service}
    />
  )
)}

        <Button
          href="/services"
          variant="outline"
          size="sm"
          className="
            mt-1
            w-full
            border-white
            bg-white/80
            backdrop-blur-md
          "
        >
          View All Services
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* TABLET */}
      <div
        className="
          absolute
          left-3
          right-3
          bottom-[10%]
          hidden
          md:block
          xl:hidden
        "
      >
        <div className="grid grid-cols-3 gap-2">
       {counsellingTypes.map((service) =>
  service.id === "marriage" ? (
    <MarriageServiceCard
      key={service.id}
      service={service}
      compact
    />
  ) : (
    <ServiceCard
      key={service.id}
      service={service}
      compact
    />
  )
)}
        </div>

        <div className="mt-2 max-w-[260px]">
          <Button
            href="/services"
            variant="outline"
            size="sm"
            className="
              w-full
              border-white
              bg-white/80
              backdrop-blur-md
            "
          >
            View All Services
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className="
          absolute
          left-2
          right-2
          bottom-3
          md:hidden
        "
      >
        <div className="grid grid-cols-2 justify-items-start gap-1.5 px-3">
       {counsellingTypes.map((service) =>
  service.id === "marriage" ? (
    <MarriageServiceCard
      key={service.id}
      service={service}
      compact
    />
  ) : (
    <ServiceCard
      key={service.id}
      service={service}
      compact
    />
  )
)}
        </div>

        <div className="mt-1">
          <Button
            href="/services"
            variant="outline"
            size="sm"
            className="
              mx-auto
              flex
              h-6
              w-[125px]
              rounded-full
              border-white
              bg-white/80
              px-2
              text-[8px]
              leading-none
              backdrop-blur-md
            "
          >
            View All Services
            <ArrowRight className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>

    </Container>
  </div>
</section>
  );
}