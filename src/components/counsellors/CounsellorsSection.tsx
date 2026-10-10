"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import SectionSideLeaves from "@/components/common/SectionSideLeaves";
import type { CounsellorData } from "@/data/counsellors";
import { getPublicCounsellors } from "@/services/public/public-content.api";
import CounsellorCard from "./CounsellorCard";

export default function CounsellorsSection() {
  const [counsellors, setCounsellors] = useState<CounsellorData[]>([]);

  useEffect(() => {
    let cancelled = false;
    getPublicCounsellors()
      .then((items) => { if (!cancelled) setCounsellors(items); })
      .catch((error: unknown) => console.error("Failed to load public counsellors:", error));
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#fcfdf9]">
      <section className="relative mt-22 overflow-hidden bg-[#edf6e9] py-20 sm:py-24 lg:py-28">
        <Image
          src="/images/services/section-leaf-leftFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 w-[90px] opacity-55 sm:w-[125px] lg:w-[175px]"
        />
        <Image
          src="/images/services/section-leaf-rightFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 w-[90px] opacity-55 sm:w-[125px] lg:w-[175px]"
        />

        <Container className="relative z-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-Unkempt text-2xl font-bold tracking-[0.28em] text-[#168f91] sm:text-3xl">
              Meet Our Counsellors
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#123b69] sm:text-5xl lg:text-6xl">
              Compassionate Professionals Here for You
            </h1>
            <div className="mt-5 flex justify-center">
              <Image
                src="/images/home/introduction/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                aria-hidden="true"
                className="h-auto w-[95px] opacity-70"
              />
            </div>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#294766]">
              Our counsellors bring different professional and life
              experiences to create a safe, supportive and thoughtful space
              for people seeking a different perspective.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative bg-[#f4faef] py-14 sm:py-18 lg:py-20">
        <SectionSideLeaves />
        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {counsellors.map((counsellor) => (
              <CounsellorCard key={counsellor.id} counsellor={counsellor} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
