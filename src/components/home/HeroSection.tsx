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
  heroBenefits,
  heroData,
} from "@/data/home";

const counsellingTypes = [
  {
    title: "Teenagers",
    subtitle: "Building confidence",
    icon: UsersRound,
  },
  {
    title: "Marriage",
    subtitle: "Creating stronger bonds",
    icon: HeartHandshake,
  },
  {
    title: "Senior Citizens",
    subtitle: "Transition & care",
    icon: HeartPulse,
  },
  {
    title: "Individual",
    subtitle: "Clarity & growth",
    icon: UserRound,
  },
  {
    title: "Corporate",
    subtitle: "Workplace wellbeing",
    icon: BriefcaseBusiness,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[780px] overflow-hidden bg-[#edf7f7] pt-28 sm:pt-32 lg:min-h-[820px] lg:pt-36">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#edf7f7] via-[#edf7f7]/90 to-transparent lg:w-[65%]" />

        <div className="absolute right-0 top-0 h-full w-full lg:w-[68%]">
          <Image
            src={heroData.image}
            alt="Counselling session in a peaceful natural environment"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#edf7f7] via-[#edf7f7]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#edf7f7]/20 via-transparent to-[#edf7f7]/20" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid min-h-[650px] items-center gap-8 lg:grid-cols-[270px_minmax(400px,520px)_1fr]">
          {/* Counselling categories */}
          <div className="hidden flex-col gap-3 lg:flex">
            {counsellingTypes.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  href="/services"
                  key={item.title}
                  className="group flex items-center gap-4 rounded-[22px] border border-white/80 bg-white/65 p-4 shadow-[0_8px_30px_rgba(24,59,59,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
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

          {/* Main copy */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
              {heroData.eyebrow}
            </p>

            <h1 className="max-w-[620px] text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-secondary sm:text-6xl lg:text-7xl">
              {heroData.title}
              <span className="mt-2 block font-serif italic font-normal text-primary">
                {heroData.highlightedTitle}
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              {heroData.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={heroData.primaryCta.href}
                size="lg"
              >
                {heroData.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                href={heroData.secondaryCta.href}
                variant="outline"
                size="lg"
              >
                {heroData.secondaryCta.label}
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
              {heroBenefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="border-l border-primary/30 pl-3"
                >
                  <p className="text-sm font-semibold text-secondary">
                    {benefit.title}
                  </p>

                  <p className="mt-1 hidden text-xs leading-5 text-slate-500 sm:block">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile visual / desktop visual spacing */}
          <div className="relative min-h-[300px] lg:min-h-[500px]">
            <div className="absolute bottom-4 right-2 hidden rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-lg backdrop-blur-md sm:block lg:right-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                A safe space
              </p>

              <p className="mt-1 text-sm font-semibold text-secondary">
                To pause, reflect & grow
              </p>
            </div>
          </div>
        </div>

        {/* Mobile service categories */}
        <div className="relative z-20 -mx-1 pb-8 lg:hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {counsellingTypes.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  href="/services"
                  key={item.title}
                  className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-md"
                >
                  <Icon
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.7}
                  />

                  <p className="mt-3 text-sm font-bold text-secondary">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.subtitle}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}