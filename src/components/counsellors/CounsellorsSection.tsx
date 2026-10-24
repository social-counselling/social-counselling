"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/common/Container";
import SectionSideLeaves from "@/components/common/SectionSideLeaves";
import type { CounsellorData } from "@/data/counsellors";
import { getPublicCounsellors } from "@/services/public/public-content.api";
import CounsellorCard from "./CounsellorCard";

export default function CounsellorsSection() {
  const [counsellors, setCounsellors] = useState<CounsellorData[]>([]);

  // Keep the existing API functionality unchanged.
  useEffect(() => {
    let cancelled = false;

    getPublicCounsellors()
      .then((items) => {
        if (!cancelled) setCounsellors(items);
      })
      .catch((error: unknown) =>
        console.error("Failed to load public counsellors:", error),
      );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative  overflow-hidden bg-[#fcfdf9]">
      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative  min-h-[500px] overflow-hidden sm:min-h-[540px] lg:min-h-[570px]">
        {/* Shared Services hero background */}
        <Image
          src="/images/counsellors/Serene-Alpine-Lake-Valley-Panorama.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />

        {/* Soft white overlay */}
        <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

        {/* Center glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto h-full max-w-5xl bg-white/30 blur-3xl"
          aria-hidden="true"
        />

        {/* Hero content */}
        <Container className="relative z-20">
          <div className="relative mx-auto flex min-h-[620px] max-w-5xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:min-h-[660px] sm:pb-28 sm:pt-36 lg:min-h-[700px] lg:pt-40">
            {/* Left handwritten decoration */}
            <div
              className="pointer-events-none absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
              aria-hidden="true"
            >
              <Image
                src="/images/services/hero-text-left.png"
                alt=""
                width={220}
                height={220}
                className="h-auto w-[125px] opacity-65 2xl:w-[155px]"
              />
            </div>

            {/* Right handwritten decoration */}
            <div
              className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
              aria-hidden="true"
            >
              <Image
                src="/images/services/hero-text-right.png"
                alt=""
                width={220}
                height={220}
                className="h-auto w-[125px] opacity-65 2xl:w-[155px]"
              />
            </div>

            {/* Heading */}
            <p className="relative z-10 font-Unkempt text-2xl font-bold tracking-[0.24em] text-[#168f91] sm:text-3xl lg:text-4xl">
              Meet Our Counsellors
            </p>

            <h1 className="relative z-10 mx-auto mt-4 max-w-[760px] font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#123b69] sm:text-5xl lg:text-[58px]">
              Compassionate Professionals Here for You
            </h1>

            {/* Leaf divider */}
            <div className="relative z-10 mt-5 flex justify-center">
              <Image
                src="/images/services/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                className="h-auto w-[90px] opacity-80 sm:w-[105px]"
                aria-hidden="true"
              />
            </div>

            <p className="relative z-10 mx-auto mt-5 max-w-[680px] text-sm leading-6 text-[#294766] sm:text-base sm:leading-7 lg:text-[17px]">
              Our counsellors bring different professional and life experiences
              to create a safe, supportive and thoughtful space for people
              seeking a different perspective.
            </p>

            {/* Small decorative quote */}
            <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-xs font-medium italic text-[#317d69] shadow-sm backdrop-blur-sm sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0" />
              Every journey begins with being heard.
            </div>
          </div>
        </Container>

        {/* Bottom fade blends the hero into the cards section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#f4faef] via-[#f4faef]/70 to-transparent sm:h-40"
          aria-hidden="true"
        />

        {/* Hero wave */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[45px] overflow-hidden sm:h-[58px] lg:h-[68px]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-full w-full"
          >
            <path
              fill="#f4faef"
              d="M0 65 C120 95 210 112 340 102 C470 92 535 55 665 65 C795 75 850 112 970 105 C1090 98 1145 65 1250 72 C1340 78 1390 92 1440 88 L1440 140 L0 140 Z"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          COUNSELLOR CARDS
          ===================================================== */}
      <section className="relative overflow-hidden bg-[#f4faef] pb-14 pt-5 sm:pb-20 sm:pt-8 lg:pb-24">
        {/* Existing side leaves */}
        <SectionSideLeaves />

        {/* Top botanical decorations */}
        <Image
          src="/images/services/section-leaf-leftFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 w-[70px] opacity-55 sm:w-[115px] lg:w-[165px] xl:w-[195px]"
        />

        <Image
          src="/images/services/section-leaf-rightFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 w-[70px] opacity-55 sm:w-[115px] lg:w-[165px] xl:w-[195px]"
        />

        <Container className="relative z-20">
          {/* Decorative separator */}
          <div className="mx-auto mb-9 flex max-w-5xl items-center justify-center gap-4 sm:mb-12">
            <span className="h-px flex-1 bg-[#317d69]/15" />

            <Image
              src="/images/home/introduction/horizontal_leaves1.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="h-auto w-[75px] opacity-65 sm:w-[95px]"
            />

            <span className="h-px flex-1 bg-[#317d69]/15" />
          </div>

          {/* Keep existing API-driven card rendering */}
          <div className="mx-auto grid w-full  grid-cols-1 items-stretch justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {counsellors.map((counsellor) => (
              <CounsellorCard key={counsellor.id} counsellor={counsellor} />
            ))}
          </div>

          {/* Inspirational quote after the cards */}
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center text-center sm:mt-20">
            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="mb-5 h-auto w-[90px] opacity-70"
            />

            <p className="font-serif text-2xl italic leading-relaxed text-[#245c50] sm:text-3xl">
              “Sometimes, being truly understood is the beginning of a new
              perspective.”
            </p>

            <span className="mt-5 h-1 w-12 rounded-full bg-[#7ab79b]" />
          </div>
        </Container>

        {/* Bottom flowers */}
        <Image
          src="/images/vision-mission/flower-left.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-10 w-[65px] opacity-65 sm:w-[100px] md:w-[125px] lg:w-[165px] xl:w-[190px]"
        />

        <Image
          src="/images/vision-mission/flower-right.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-10 w-[65px] opacity-65 sm:w-[100px] md:w-[125px] lg:w-[165px] xl:w-[190px]"
        />
      </section>

      <div
        className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            z-20
            h-[50px]
            overflow-hidden
            sm:h-[60px]
            lg:h-[70px]
          "
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
        >
          <path
            fill="#e1efdd"
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
    </main>
  );
}
