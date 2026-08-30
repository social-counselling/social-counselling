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
  heroBenefits,
  heroData,
  type CounsellingTypeId,
} from "@/data/home";

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

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background-soft">
      {/* =====================================================
          DESKTOP HERO IMAGE  Visible only on lg+
          ===================================================== */}

      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-background-soft via-background-soft/90 to-transparent lg:w-[65%]" />

        <div className="absolute right-0 top-0 h-full w-[68%]">
          <Image
            src={heroData.image}
            alt="Counselling session in a peaceful natural environment"
            fill
            priority
            className="object-cover object-center"
            sizes="68vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-background-soft via-background-soft/20 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-background-soft/20 via-transparent to-background-soft/20" />
        </div>
      </div>

      <Container className="relative z-10">
        {/* ===================================================
            MOBILE / TABLET IMAGE

            Visible below lg. We intentionally put the image BEFORE the content.
            =================================================== */}

        <div className="relative -mx-5 sm:-mx-8 lg:hidden">
          <div
            className="
              relative
              w-full
              aspect-[16/10]
              overflow-hidden
              sm:aspect-[16/8]
            "
          >
            <Image
              src={heroData.image}
              alt="Counselling session in a peaceful natural environment"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-soft to-transparent" />
          </div>
        </div>

        {/* ===================================================
            DESKTOP CONTENT
            =================================================== */}

        <div
          className="
            hidden
            lg:grid
            min-h-[820px]
            items-center
            gap-8
            lg:grid-cols-[270px_minmax(400px,520px)_1fr]
          "
        >
          {/* Desktop counselling categories */}
          <div className="flex flex-col gap-3">
            {counsellingTypes.map((item) => {
              const Icon = counsellingIcons[item.id];

              return (
                <Link
                  href={item.href}
                  key={item.id}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-[22px]
                    border
                    border-white/80
                    bg-white/65
                    p-4
                    shadow-[0_8px_30px_rgba(24,59,59,0.06)]
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-white/85
                  "
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-secondary">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop main content */}
          <HeroContent />

          {/* Desktop visual spacer */}
          <div className="relative min-h-[500px]">
            <div className="absolute bottom-8 right-4 rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-lg backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                A safe space
              </p>

              <p className="mt-1 text-sm font-semibold text-secondary">
                To pause, reflect & grow
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE / TABLET CONTENT
            =================================================== */}

        <div
          className="
            py-8
            sm:py-10
            lg:hidden
          "
        >
          <HeroContent />

          {/* Mobile / tablet benefits */}
          <div className="mt-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {heroBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="
                    rounded-2xl
                    border
                    border-border
                    bg-white/70
                    p-4
                    shadow-[0_8px_30px_rgba(24,59,59,0.05)]
                  "
                >
                  <p className="text-sm font-semibold text-secondary">
                    {benefit.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet service categories */}
          <div className="mt-10 pb-6">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Find the right support
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
                Counselling for every stage of life
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {counsellingTypes.map((item) => {
                const Icon = counsellingIcons[item.id];

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="
                      rounded-2xl
                      border
                      border-border
                      bg-white
                      p-4
                      shadow-[0_8px_30px_rgba(24,59,59,0.05)]
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:shadow-[0_12px_35px_rgba(24,59,59,0.08)]
                    "
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.7}
                      />
                    </div>

                    <p className="mt-3 text-sm font-bold text-secondary">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      {item.subtitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   HERO CONTENT

   Shared between desktop and mobile/tablet.
   ========================================================= */

function HeroContent() {
  return (
    <div className="max-w-xl">
      {/* Eyebrow */}
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
        {heroData.eyebrow}
      </p>

      {/* Heading */}
      <h1
        className="
          max-w-[620px]
          text-4xl
          font-semibold
          leading-[1]
          tracking-[-0.045em]
          text-secondary
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
        "
      >
        {heroData.title}

        <span className="mt-2 block font-serif italic font-normal text-primary">
          {heroData.highlightedTitle}
        </span>
      </h1>

      {/* Description */}
      <p
        className="
          mt-6
          max-w-lg
          text-sm
          leading-6
          text-text-secondary
          sm:mt-7
          sm:text-base
          sm:leading-7
          lg:text-lg
        "
      >
        {heroData.description}
      </p>

      {/* CTA */}
      <div
        className="
          mt-7
          flex
          flex-col
          gap-3
          sm:mt-8
          sm:flex-row
        "
      >
        <Button
          href={heroData.primaryCta.href}
          size="lg"
          className="w-full sm:w-auto"
        >
          {heroData.primaryCta.label}

          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button
          href={heroData.secondaryCta.href}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          {heroData.secondaryCta.label}
        </Button>
      </div>
    </div>
  );
}