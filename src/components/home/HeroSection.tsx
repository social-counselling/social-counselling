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

import {
  counsellingTypes,
  heroData,
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
        group flex items-center border border-white/70
        bg-white/75 shadow-lg backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1 hover:bg-white/90

        ${
          compact
         ? "gap-1.5 rounded-lg px-1.5 py-1"
         : "gap-2.5 rounded-[18px] px-3 py-2.5"
        }
      `}
    >
      <div
        className={`
          flex shrink-0 items-center justify-center
          rounded-full bg-white text-primary shadow-sm
          transition-all duration-300
          group-hover:bg-primary group-hover:text-white

          ${
            compact
            ? "h-6 w-6"
            : "h-9 w-9"
          }
        `}
      >
        <Icon
         className={compact ? "h-3 w-3" : "h-4.5 w-4.5"}
          strokeWidth={1.7}
        />
      </div>

      <div className="min-w-0">
        <p
          className={`
            truncate font-bold text-secondary

            ${
             compact
             ? "text-[8px] sm:text-[10px]"
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
                ? "text-[7px] sm:text-[9px]"
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
            opacity-0 transition-all duration-300
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
      {/* =====================================================
          IMAGE

          IMPORTANT:
          The image contains the hero heading itself.
          ===================================================== */}

     <div
  className="
    relative
    aspect-[3/2]
    w-full
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
        className="object-contain object-center lg:object-cover"
        />

        {/* ===================================================
            OVERLAY UI
            =================================================== */}

        <Container className="relative z-10 h-full">
          {/* =================================================
              DESKTOP
              >= 1280px

              Small cards on the far left.
              ================================================= */}

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
            {counsellingTypes.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}

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

          {/* =================================================
              TABLET / SMALL DESKTOP
              768px - 1279px

              Compact cards at the very top.
              ================================================= */}

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
              {counsellingTypes.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  compact
                />
              ))}
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

          {/* =================================================
              MOBILE
              < 768px

              Compact overlay at TOP of artwork.

              IMPORTANT:
              These are deliberately small because
              the quote is already inside the image.
              ================================================= */}

          <div
            className="
              absolute
              left-2
              right-2 bottom-[5%]
              md:hidden
            "
          >
            <div
              className="
                grid
                grid-cols-2
                gap-1.5
              "
            >
              {counsellingTypes.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  compact
                />
              ))}
            </div>

            <div className="mt-1.5">
              <Button
                href="/services"
                variant="outline"
                size="sm"
                className="
                  h-8
                  w-full
                  border-white
                  bg-white/80
                  px-3
                  text-[10px]
                  backdrop-blur-md
                "
              >
                View All Services

                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}