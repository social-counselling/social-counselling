"use client";

import Image from "next/image";

import Link from "next/link";

import { useState, type ReactNode } from "react";

import { resolveImageUrl } from "@/lib/image-url";

import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Quote,
  Share2,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

import Container from "@/components/common/Container";

import type { CounsellorData } from "@/data/counsellors";

import type { ServiceCardData } from "@/data/services";

type ProfileTab =
  | "about"
  | "services"
  | "approach"
  | "availability"
  | "reviews";

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "about", label: "About" },

  // { id: "services", label: "Services" },

  // { id: "approach", label: "Approach" },

  // { id: "availability", label: "Availability" },

  // { id: "reviews", label: "Reviews" },
];

export default function CounsellorProfilePage({
  counsellor,

  services = [],
}: {
  counsellor: CounsellorData;

  services?: ServiceCardData[];
}) {
  const [saved, setSaved] = useState(false);

  const [showAllIntroduction, setShowAllIntroduction] = useState(false);

  const initials = counsellor.name

    .replace(/^Dr\\.\s\*/i, "")

    .split(" ")

    .filter(Boolean)

    .slice(0, 2)

    .map((part) => part[0])

    .join("")

    .toUpperCase();

  const introduction = counsellor.introduction ?? [];

  const visibleIntroduction = showAllIntroduction
    ? introduction
    : introduction.slice(0, 2);

  const hasMoreIntroduction = introduction.length > 2;

  const experience =
    counsellor.experienceYears != null
      ? `${counsellor.experienceYears} ${counsellor.experienceYears === 1 ? "Year" : "Years"}`
      : counsellor.experienceText?.trim() || "Experienced counsellor";

  const languages = counsellor.languages.length
    ? counsellor.languages.join(", ")
    : "Not specified";

  const coverage = counsellor.geographicalCoverage || "Available online";

  const specialties = counsellor.specializationAreas ?? [];

  const shareProfile = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: counsellor.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // A cancelled share is expected and should not interrupt the page.
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-[#142b49]">
      <section className="px-3 pb-7 pt-24 sm:px-5 sm:pt-28 lg:px-8 lg:pb-10">
        <Container className="max-w-[1440px]">
          <div className="overflow-hidden rounded-[24px] border border-[#e8ece8] bg-white shadow-[0_12px_45px_rgba(24,47,63,0.08)] sm:rounded-[30px]">
            {/* Breadcrumb and profile actions */}

            <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-7 lg:px-8">
              <nav
                aria-label="Breadcrumb"
                className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-[#60718a] sm:text-sm"
              >
                <Link href="/" className="transition hover:text-[#00665d]">
                  Home
                </Link>

                <ChevronRight className="h-3.5 w-3.5" />

                <Link
                  href="/counsellors"
                  className="transition hover:text-[#00665d]"
                >
                  Counsellors
                </Link>

                <ChevronRight className="h-3.5 w-3.5" />

                <span className="max-w-[180px] truncate font-semibold text-[#142b49]">
                  {counsellor.name}
                </span>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void shareProfile()}
                  aria-label="Share counsellor profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7ebf0] bg-white text-[#304761] transition hover:border-[#b7d8d1] hover:bg-[#f1f8f6]"
                >
                  <Share2 className="h-[17px] w-[17px]" />
                </button>

                {/* <button

                  type="button"

                  onClick={() => setSaved((value) => !value)}

                  aria-label={saved ? "Remove counsellor from favourites" : "Save counsellor to favourites"}

                  aria-pressed={saved}

                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${saved ? "border-rose-200 bg-rose-50 text-rose-600" : "border-[#e7ebf0] bg-white text-[#304761] hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"}`}

                >

                  <Heart className={`h-[19px] w-[19px] ${saved ? "fill-current" : ""}`} />

                </button> */}

                <Link
                  href="/book-session"
                  className="group inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#00665d] px-2.5 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#00554e] sm:min-h-11 sm:w-auto sm:self-start sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm lg:px-7"
                >
                  Book a Session{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>

            {/* Main profile header */}
            <div className="grid grid-cols-1 items-start gap-5 px-4 pb-6 pt-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-5 sm:px-7 sm:pb-8 sm:pt-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pb-9">
              {/* Counsellor image */}
              <div className="relative mx-auto h-[190px] w-full max-w-[220px] overflow-hidden rounded-2xl bg-[#edf2f3] sm:mx-0 sm:h-[220px] sm:max-w-none sm:rounded-[15px] lg:h-[270px]">
                {counsellor.image ? (
                  <Image
                    src={resolveImageUrl(counsellor.image)}
                    alt={counsellor.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 180px, 220px"
                    className="object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#e9f4ef] to-[#dbe9e7]">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-semibold text-[#00665d] shadow-sm sm:h-24 sm:w-24">
                      {initials}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#087b61] shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Available
                </div>
              </div>

              {/* Counsellor information */}
              <div className="flex min-w-0 flex-col justify-center gap-4 sm:gap-5 lg:pt-2">
                {/* Name and credentials */}
                <div className="min-w-0 text-center sm:text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#75859a] sm:text-[11px] sm:tracking-[0.18em]">
                    Counsellor
                  </p>

                  <h1 className="mt-1 break-words font-serif text-2xl font-bold leading-tight tracking-[-0.025em] text-[#102746] sm:text-3xl lg:text-[42px]">
                    {counsellor.name}
                  </h1>

                  <p className="mt-2 break-words text-sm leading-6 text-[#50627c] sm:text-base lg:text-lg">
                    {counsellor.credentials.length
                      ? counsellor.credentials.join(" / ")
                      : "Counsellor / Social Advisor"}
                  </p>
                </div>

                {/* Experience, coverage and languages */}
                <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                  <QuickFact
                    icon={
                      <BriefcaseBusiness className="h-4 w-4 sm:h-5 sm:w-5" />
                    }
                    tone="green"
                    title={experience}
                    detail="Experience"
                  />

                  <QuickFact
                    icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />}
                    tone="rose"
                    title={coverage}
                    detail="Coverage"
                  />

                  <QuickFact
                    icon={<Languages className="h-4 w-4 sm:h-5 sm:w-5" />}
                    tone="green"
                    title={languages}
                    detail="Languages"
                  />
                </div>

                {/* Mantra */}
                <div className="min-w-0 rounded-xl border border-[#dcece5] bg-[#f2f8f5] px-3 py-3 sm:px-4">
                  <div className="flex min-w-0 items-start gap-2 sm:items-center">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-[#4ba994] sm:mt-0" />

                    <p className="min-w-0 break-words text-sm italic leading-6 text-[#245c50] sm:text-sm sm:leading-6">
                      {counsellor.mantra?.trim() ||
                        "A thoughtful conversation can open the door to understanding."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About section */}

            <section
              id="about"
              className="scroll-mt-24 px-5 py-6 sm:px-7 sm:py-8 lg:px-8"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.9fr)] lg:gap-8">
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl font-bold text-[#102746] sm:text-[27px]">
                    About {counsellor.name.split(" ")[0]}
                  </h2>

                  {introduction.length > 0 ? (
                    <div className="mt-2 space-y-2 text-sm leading-[1.65] text-[#50627c] sm:text-[15px]">
                      {visibleIntroduction.map((paragraph, index) => (
                        <p key={`${index}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm leading-7 text-[#50627c]">
                      Learn more about {counsellor.name} and their counselling
                      approach by booking a session.
                    </p>
                  )}

                  {hasMoreIntroduction ? (
                    <button
                      type="button"
                      onClick={() => setShowAllIntroduction((value) => !value)}
                      aria-expanded={showAllIntroduction}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#00665d] hover:underline"
                    >
                      {showAllIntroduction ? "Read Less" : "Read More"}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${showAllIntroduction ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : null}
                </div>

                {/* Area of Specializations */}
                <div className="relative overflow-hidden rounded-2xl border border-[#e0ebe5] bg-gradient-to-br from-[#edf6f2] via-[#f8fbf8] to-[#e5f0eb] p-5 sm:p-6">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#087b61] shadow-sm">
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#183c52] sm:text-2xl">
                          Area of Specializations
                        </h3>
                        <p className="mt-1 text-xs text-[#607b70] sm:text-sm">
                          Areas where this counsellor can support you
                        </p>
                      </div>
                    </div>
                    {specialties.length > 0 ? (
                      <ul className="mt-5 space-y-3">
                        {specialties.map((item, index) => (
                          <li
                            key={`${item}-${index}`}
                            className="flex items-start gap-3 rounded-xl border border-[#d5e8df] bg-white/90 px-3.5 py-3 text-sm leading-6 text-[#174b52] shadow-sm sm:px-4"
                          >
                            <span
                              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4ba994]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-5 text-sm leading-6 text-[#60718a]">
                        Specialization details are not available yet.
                      </p>
                    )}
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -right-2 text-[110px] leading-none text-[#b9d8cf]/30"
                  >
                    ❧
                  </div>
                </div>
              </div>

              {/* <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

                <SummaryCard icon={<BriefcaseBusiness className="h-5 w-5" />} tone="amber" title={experience} description="of counselling and professional experience" />

                <SummaryCard icon={<MapPin className="h-5 w-5" />} tone="rose" title={coverage} description="Geographical coverage" />

                <SummaryCard icon={<Languages className="h-5 w-5" />} tone="blue" title={languages} description="Languages" />

                <SummaryCard icon={<Heart className="h-5 w-5" />} tone="rose" title="Reviews" description="Reviews are not available yet" />

              </div> */}
            </section>

            {/* Services */}

            <section
              id="services"
              className="scroll-mt-24 border-t border-[#e7ece9] px-5 py-6 sm:px-7 sm:py-8 lg:px-8"
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#102746] sm:text-[27px]">
                    Explore Our Services
                    {services.length ? ` (${services.length})` : ""}
                  </h2>

                  <p className="mt-1 text-sm text-[#718096]">
                    Find a service that best fits your needs.
                  </p>
                </div>

                <Link
                  href="/services"
                  className="shrink-0 text-sm font-semibold text-[#00665d] hover:underline"
                >
                  View All
                </Link>
              </div>

              {services.length > 0 ? (
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {services.map((service, index) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      className="group flex min-h-[68px] items-center gap-3 rounded-xl border border-[#e5e9ed] bg-white p-3 transition hover:border-[#b9d8d1] hover:bg-[#fbfdfc] hover:shadow-sm sm:p-3.5"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${serviceIconTone(index)}`}
                      >
                        {serviceIcon(index)}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-5 text-[#142b49] group-hover:text-[#00665d]">
                          {service.title}
                        </span>

                        {service.subtitle ? (
                          <span className="mt-0.5 line-clamp-1 block text-xs text-[#65758a]">
                            {service.subtitle}
                          </span>
                        ) : (
                          <span className="mt-0.5 block text-xs text-[#65758a]">
                            Explore service details
                          </span>
                        )}
                      </span>

                      <ChevronRight className="h-4 w-4 shrink-0 text-[#142b49] transition group-hover:translate-x-0.5 group-hover:text-[#00665d]" />
                    </Link>
                  ))}
                </div>
              ) : specialties.length > 0 ? (
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {specialties.map((item, index) => (
                    <Link
                      key={item}
                      href="/book-session"
                      className="group flex min-h-[68px] items-center gap-3 rounded-xl border border-[#e5e9ed] p-3 transition hover:border-[#b9d8d1] hover:bg-[#fbfdfc] sm:p-3.5"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${serviceIconTone(index)}`}
                      >
                        <Sparkles className="h-5 w-5" />
                      </span>

                      <span className="min-w-0 flex-1 text-sm font-semibold leading-5 text-[#142b49] group-hover:text-[#00665d]">
                        {item}
                        <span className="mt-1 block text-xs font-normal text-[#65758a]">
                          Explore booking options
                        </span>
                      </span>

                      <ChevronRight className="h-4 w-4 shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-[#dce5e3] p-6 text-sm text-[#65758a]">
                  Service details will appear here when available.
                </div>
              )}

              <p className="mt-3 text-xs text-[#8a96a5]">
                Session prices are shown during booking when available.
              </p>
            </section>

            {/* Approach */}

            {/* <section id="approach" className="scroll-mt-24 border-t border-[#e7ece9] px-5 py-6 sm:px-7 sm:py-8 lg:px-8">

              <div className="flex items-start gap-4">

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f5f0] text-[#087b61]"><Sparkles className="h-5 w-5" /></span>

                <div>

                  <h2 className="font-serif text-2xl font-bold text-[#102746]">Counselling Approach</h2>

                  <p className="mt-2 max-w-3xl text-sm leading-7 text-[#50627c]">{introduction[0] || "The counselling approach is shaped around listening, understanding your concerns and exploring suitable next steps together."}</p>

                </div>

              </div>

            </section> */}

            {/* Availability */}

            {/* <section id="availability" className="scroll-mt-24 border-t border-[#e7ece9] px-5 py-6 sm:px-7 sm:py-8 lg:px-8">

              <div className="flex flex-col gap-4 rounded-2xl bg-[#f0f7f4] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                <div className="flex items-start gap-3">

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#087b61]"><CalendarDays className="h-5 w-5" /></span>

                  <div><h2 className="font-serif text-xl font-bold text-[#102746]">Check Availability</h2><p className="mt-1 text-sm leading-6 text-[#50627c]">Continue to booking to view available dates and session times.</p></div>

                </div>

                <Link href="/book-session" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00665d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00554e]">Find a Session <ArrowRight className="h-4 w-4" /></Link>

              </div>

            </section> */}

            {/* Reviews */}

            {/* <section id="reviews" className="scroll-mt-24 border-t border-[#e7ece9] px-5 py-6 sm:px-7 sm:py-8 lg:px-8">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div><h2 className="font-serif text-2xl font-bold text-[#102746]">Client Reviews</h2><p className="mt-1 text-sm text-[#718096]">Feedback and experiences shared by clients.</p></div>

                <div className="inline-flex items-center gap-1.5 text-sm text-[#718096]"><Star className="h-4 w-4" /> No reviews yet</div>

              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e5e9ed] bg-[#fcfdfc] p-4">

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f2] text-[#e64e71]"><MessageCircle className="h-5 w-5" /></span>

                <p className="text-sm leading-6 text-[#50627c]">There are no published reviews for this counsellor yet.</p>

              </div>

            </section> */}

            {/* Bottom booking CTA */}

            <div className="flex flex-col gap-4 border-t border-[#e7ece9] bg-[#fbfcfb] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
              <div>
                <p className="font-serif text-xl font-bold text-[#102746]">
                  Ready to take the next step?
                </p>
                <p className="mt-1 text-sm text-[#65758a]">
                  Choose a session and continue to booking.
                </p>
              </div>

              <Link
                href="/book-session"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00665d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00554e]"
              >
                Book a Session{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function QuickFact({
  icon,
  tone,
  title,
  detail,
}: {
  icon: ReactNode;
  tone: "green" | "rose";
  title: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone === "rose" ? "bg-[#fff0f2] text-[#f04468]" : "bg-[#eaf7f2] text-[#07855f]"}`}
      >
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block break-words text-sm font-semibold leading-5 text-[#142b49]">
          {title}
        </span>
        <span className="mt-0.5 block text-xs leading-4 text-[#60718a]">
          {detail}
        </span>
      </span>
    </div>
  );
}

function SummaryCard({
  icon,
  tone,
  title,
  description,
}: {
  icon: ReactNode;
  tone: "amber" | "rose" | "blue";
  title: string;
  description: string;
}) {
  const toneClass =
    tone === "amber"
      ? "bg-[#fff4e5] text-[#ff8a00]"
      : tone === "blue"
        ? "bg-[#eaf3ff] text-[#1677ff]"
        : "bg-[#fff0f2] text-[#f04468]";

  return (
    <div className="flex min-h-[82px] items-start gap-3 rounded-xl border border-[#e5e9ed] bg-white p-3 sm:p-3.5">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${toneClass}`}
      >
        {icon}
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="block break-words text-sm font-semibold leading-5 text-[#142b49]">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-4 text-[#60718a]">
          {description}
        </span>
      </span>
    </div>
  );
}

function serviceIconTone(index: number) {
  const tones = [
    "bg-[#fff4e5] text-[#ff8a00]",
    "bg-[#fff0f2] text-[#f04468]",
    "bg-[#eaf3ff] text-[#1677ff]",
    "bg-[#e8f7ef] text-[#07855f]",
    "bg-[#f4eaff] text-[#9a42e8]",
  ];

  return tones[index % tones.length];
}

function serviceIcon(index: number) {
  const icons = [
    <Heart key="heart" className="h-5 w-5" />,
    <MessageCircle key="message" className="h-5 w-5" />,
    <UserRound key="user" className="h-5 w-5" />,
    <BriefcaseBusiness key="briefcase" className="h-5 w-5" />,
    <GraduationCap key="graduation" className="h-5 w-5" />,
  ];

  return icons[index % icons.length];
}
