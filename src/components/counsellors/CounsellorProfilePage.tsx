"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Languages,
  MapPin,
  Sparkles,
  UserRound,
  Quote,
  ChevronDown,
  CheckCircle2,
  Compass,
  HeartHandshake,
} from "lucide-react";

import Container from "@/components/common/Container";
import type { CounsellorData } from "@/data/counsellors";

type ProfileTab = "about" | "specializations" | "details";

export default function CounsellorProfilePage({
  counsellor,
}: {
  counsellor: CounsellorData;
}) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("about");
  const [showAllIntroduction, setShowAllIntroduction] = useState(false);

  const initials = counsellor.name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const introPreviewCount = 2;
  const visibleIntroduction = showAllIntroduction
    ? counsellor.introduction
    : counsellor.introduction.slice(0, introPreviewCount);
  const hasMoreIntroduction =
    counsellor.introduction.length > introPreviewCount;

  return (
    <main className="relative overflow-hidden bg-[#fbfcf8] text-[#193d36]">
      <section className="relative mt-22 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#eaf5e7] via-[#f5faf1] to-[#fcfdf9] py-8 sm:py-12 lg:py-14">
        <Image
          src="/images/services/section-leaf-leftFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 w-[76px] opacity-30 sm:w-[115px] lg:w-[150px]"
        />
        <Image
          src="/images/services/section-leaf-rightFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-0 w-[76px] opacity-30 sm:w-[115px] lg:w-[150px]"
        />

        <Container className="relative z-10">
          <Link
            href="/counsellors"
            className="group inline-flex items-center gap-2 rounded-full border border-[#dce9d8] bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#315e4c] shadow-sm transition hover:-translate-x-0.5 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            All Counsellors
          </Link>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-white bg-white/90 shadow-[0_24px_70px_rgba(25,61,54,0.10)] backdrop-blur sm:rounded-[34px]">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#1d7560] via-[#79ad78] to-[#d9e9c9]" />
            <div className="grid gap-7 p-5 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-9 md:p-9 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:p-11">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative mx-auto h-[210px] w-[165px] shrink-0 overflow-hidden rounded-[18px] border-[5px] border-white bg-[#eaf4e6] shadow-[0_10px_28px_rgba(24,59,59,0.16)] ring-1 ring-[#dce9d8] sm:h-[240px] sm:w-[190px] md:mx-0 md:h-[250px] md:w-[198px] lg:h-[280px] lg:w-[220px]">
                  {counsellor.image ? (
                    <Image
                      src={counsellor.image}
                      alt={counsellor.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 190px, 165px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#eaf4e6] to-[#d6e9d0]">
                      <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white bg-white/90 text-3xl font-semibold text-[#1d7560] shadow-sm">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#dce9d8] bg-[#f3f8ef] px-3.5 py-2 text-xs font-semibold text-[#326a4e]">
                  <CheckCircle2 className="h-4 w-4" />
                  Counsellor Profile
                </div>
                {counsellor.age ? (
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#58736a]">
                    <UserRound className="h-4 w-4 text-[#438061]" />
                    Age {counsellor.age}
                  </div>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#438061]">
                  A supportive space to be heard
                </p>
                <h1 className="mt-3 break-words font-serif text-3xl font-semibold leading-tight tracking-tight text-[#193d36] sm:text-4xl lg:text-5xl">
                  {counsellor.name}
                </h1>
                <p className="mt-3 text-base font-medium leading-7 text-[#397b56] sm:text-lg">
                  {counsellor.credentials.join(" / ")}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <InfoBox
                    icon={<Languages className="h-5 w-5" />}
                    title="Languages"
                    value={counsellor.languages.join(" / ")}
                  />
                  <InfoBox
                    icon={<MapPin className="h-5 w-5" />}
                    title="Geographical coverage"
                    value={counsellor.geographicalCoverage}
                  />
                </div>

                {counsellor.mantra ? (
                  <div className="mt-5 flex gap-3 rounded-2xl border border-[#e1eddb] bg-[#f4f9f0] p-4 sm:p-5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#438061] shadow-sm">
                      <Quote className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#438061]">
                        Mantra of life
                      </p>
                      <p className="mt-1 font-serif text-lg font-semibold italic leading-7 text-[#244b3d]">
                        “{counsellor.mantra}”
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/book-session"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1d7560] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(29,117,96,0.20)] transition hover:-translate-y-0.5 hover:bg-[#175f4e] hover:shadow-[0_12px_24px_rgba(29,117,96,0.24)]"
                  >
                    Book a Session
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="#counsellor-details"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d8e6d4] bg-white px-6 py-3 text-sm font-semibold text-[#315e4c] transition hover:bg-[#f4f9f0]"
                  >
                    Explore profile
                    <ChevronDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="counsellor-details" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-12">
            <div className="min-w-0">
              <div className="border-b border-[#e7eee3]">
                <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="Counsellor profile sections">
                  <ProfileTabButton
                    active={activeTab === "about"}
                    onClick={() => setActiveTab("about")}
                    icon={<HeartHandshake className="h-4 w-4" />}
                  >
                    About
                  </ProfileTabButton>
                  <ProfileTabButton
                    active={activeTab === "specializations"}
                    onClick={() => setActiveTab("specializations")}
                    icon={<Sparkles className="h-4 w-4" />}
                  >
                    Specializations
                  </ProfileTabButton>
                  <ProfileTabButton
                    active={activeTab === "details"}
                    onClick={() => setActiveTab("details")}
                    icon={<Compass className="h-4 w-4" />}
                  >
                    Profile details
                  </ProfileTabButton>
                </div>
              </div>

              <div className="pt-7 sm:pt-9">
                {activeTab === "about" ? (
                  <div role="tabpanel" className="animate-in fade-in duration-300">
                    <SectionHeading
                      eyebrow="Get to know your counsellor"
                      title="About the Counsellor"
                    />
                    <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#52675f] sm:text-base">
                      {visibleIntroduction.map((paragraph, index) => (
                        <p key={`${index}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                    {hasMoreIntroduction ? (
                      <button
                        type="button"
                        onClick={() => setShowAllIntroduction((value) => !value)}
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dce9d8] px-4 py-2.5 text-sm font-semibold text-[#2e6b4c] transition hover:bg-[#f4f9f0]"
                        aria-expanded={showAllIntroduction}
                      >
                        {showAllIntroduction ? "Show less" : "Read full introduction"}
                        <ChevronDown className={`h-4 w-4 transition-transform ${showAllIntroduction ? "rotate-180" : ""}`} />
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {activeTab === "specializations" ? (
                  <div role="tabpanel" className="animate-in fade-in duration-300">
                    <SectionHeading
                      eyebrow="Areas of support"
                      title="Specialization Areas"
                    />
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#65776e]">
                      Explore the areas this counsellor has listed in their profile.
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {counsellor.specializationAreas.map((item, index) => (
                        <div
                          key={item}
                          className="group flex items-start gap-3 rounded-2xl border border-[#e3ecdf] bg-[#fbfdf9] p-4 transition hover:-translate-y-0.5 hover:border-[#bcd7b5] hover:bg-[#f4f9f0] hover:shadow-sm"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#e7f2e2] text-sm font-bold text-[#2f7853]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="pt-1 text-sm font-medium leading-6 text-[#315347]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {activeTab === "details" ? (
                  <div role="tabpanel" className="animate-in fade-in duration-300">
                    <SectionHeading
                      eyebrow="At a glance"
                      title="Profile Details"
                    />
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <DetailCard
                        icon={<Languages className="h-5 w-5" />}
                        title="Languages"
                        value={counsellor.languages.join(" / ")}
                      />
                      <DetailCard
                        icon={<MapPin className="h-5 w-5" />}
                        title="Geographical coverage"
                        value={counsellor.geographicalCoverage}
                      />
                      {counsellor.age ? (
                        <DetailCard
                          icon={<UserRound className="h-5 w-5" />}
                          title="Age"
                          value={String(counsellor.age)}
                        />
                      ) : null}
                      <DetailCard
                        icon={<UserRound className="h-5 w-5" />}
                        title="Credentials"
                        value={counsellor.credentials.join(" / ")}
                      />
                    </div>
                    {counsellor.mantra ? (
                      <div className="mt-5 rounded-2xl bg-[#f4f9f0] p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#438061]">
                          Mantra of life
                        </p>
                        <p className="mt-2 font-serif text-xl italic leading-8 text-[#244b3d]">
                          “{counsellor.mantra}”
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="h-fit rounded-[26px] border border-[#e0ebdc] bg-[#f6faf2] p-5 sm:p-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#327753] shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-xl font-semibold text-[#193d36]">
                    Areas of support
                  </p>
                  <p className="mt-0.5 text-xs text-[#708178]">
                    Listed specializations
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {counsellor.specializationAreas.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-[#38584b]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#438061]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[#dce8d7] pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#438061]">
                  Languages
                </p>
                <p className="mt-2 text-sm leading-6 text-[#38584b]">
                  {counsellor.languages.join(" / ")}
                </p>
              </div>
              <div className="mt-5 border-t border-[#dce8d7] pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#438061]">
                  Coverage
                </p>
                <p className="mt-2 text-sm leading-6 text-[#38584b]">
                  {counsellor.geographicalCoverage}
                </p>
              </div>
              <Link
                href="/book-session"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1d7560] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#175f4e]"
              >
                Book a Session
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#edf6e9] py-14 sm:py-18 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white/80 text-[#2f7853] shadow-sm">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <p className="mt-5 font-Unkempt text-xl font-bold tracking-[0.2em] text-[#168f91] sm:text-2xl">
              A Different Perspective
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#193d36] sm:text-4xl lg:text-5xl">
              Take the first step towards a better conversation.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#63766d]">
              Choose a counsellor and continue to the booking process.
            </p>
            <Link
              href="/book-session"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#1d7560] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#175f4e]"
            >
              Book a Session
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#438061]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#193d36] sm:text-4xl">
        {title}
      </h2>
      <Image
        src="/images/home/introduction/leaf-divider.png"
        alt=""
        width={140}
        height={40}
        aria-hidden="true"
        className="mt-3 h-auto w-[88px] opacity-60"
      />
    </div>
  );
}

function InfoBox({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e2eee0] bg-[#fbfdf9] p-4 transition hover:border-[#c5ddbd] hover:bg-[#f6faf2]">
      <div className="flex items-center gap-2 text-[#438061]">
        {icon}
        <p className="text-[11px] font-bold uppercase tracking-[0.12em]">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm leading-6 text-[#315347]">{value}</p>
    </div>
  );
}

function DetailCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e2eee0] bg-[#fbfdf9] p-4">
      <div className="flex items-center gap-2 text-[#438061]">
        {icon}
        <p className="text-xs font-bold uppercase tracking-[0.12em]">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-[#315347]">{value}</p>
    </div>
  );
}

function ProfileTabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-t-xl border-b-2 px-3 py-3 text-sm font-semibold transition sm:px-4 ${
        active
          ? "border-[#1d7560] bg-[#f4f9f0] text-[#1d7560]"
          : "border-transparent text-[#738178] hover:bg-[#f8fbf6] hover:text-[#315e4c]"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
