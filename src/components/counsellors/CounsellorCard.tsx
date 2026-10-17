import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Languages, MapPin, Sparkles } from "lucide-react";

import type { CounsellorData } from "@/data/counsellors";
import { resolveImageUrl } from "@/lib/image-url";

export default function CounsellorCard({
  counsellor,
}: {
  counsellor: CounsellorData;
}) {
  const initials = counsellor.name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const mantra = counsellor.mantra?.trim();

  // Separate the main coverage label from its description.
  const coverage = (counsellor.geographicalCoverage || "").trim();
  const coverageComma = coverage.indexOf(",");

  const coverageTitle =
    coverageComma === -1 ? coverage : coverage.slice(0, coverageComma).trim();

  const coverageDescription =
    coverageComma === -1 ? "" : coverage.slice(coverageComma + 1).trim();

  return (
    <article className="group mx-auto flex h-full w-full max-w-[390px] min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#dce9e2] bg-white shadow-[0_6px_22px_rgba(24,59,59,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8d8c7] hover:shadow-[0_16px_35px_rgba(24,59,59,0.13)]">
      {/* Scenic banner */}
      <div className="relative h-[175px] shrink-0 overflow-hidden bg-[#dcebe5]">
        <Image
          src="/images/Tranquil-Alpine-Lake-Valley.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
          aria-hidden="true"
          unoptimized
        />

        {/* Reduce the image's brightness without hiding the scenery */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#164c43]/20 via-white/10 to-[#164c43]/25" />

        {/* Soft highlight behind the mantra */}
        <div className="absolute inset-x-3 top-3 z-10 flex justify-center">
          <div className="flex max-w-[94%] items-start gap-1.5 rounded-xl border border-white/45 bg-white/65 px-3 py-2 shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/80">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#317d69]" />

            <p className="line-clamp-2 text-center font-serif text-xs font-semibold italic leading-4 text-[#174e43]">
              {mantra || "Understanding begins with listening."}
            </p>
          </div>
        </div>

        {/* Gentle lower fade */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent" />
      </div>

      {/*  circular portrait */}
      <div className="relative z-10 -mt-18 flex justify-center">
        <div className="relative h-[140px] w-[140px] shrink-0 rounded-full bg-gradient-to-br from-white via-[#c8e8d7] to-[#4c9b7d] p-[4px] shadow-[0_6px_20px_rgba(24,59,59,0.20)] transition-transform duration-300 group-hover:scale-105">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-[#eaf4e6]">
            {counsellor.image ? (
              <Image
                src={resolveImageUrl(counsellor.image)}
                alt={counsellor.name}
                fill
                sizes="140px"
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#eaf4e6] to-[#c6e5d8] font-serif text-2xl font-semibold text-[#245c50]">
                {initials}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5">
        {/* Name and credentials */}
        <div className="text-center">
          <h2 className="line-clamp-1 font-serif text-lg font-semibold leading-6 text-[#183b3b]">
            {counsellor.name}
          </h2>

          <p className="mt-1 line-clamp-2 min-h-8 text-xs font-medium leading-4 text-[#43856a]">
            {counsellor.credentials.length
              ? counsellor.credentials.join(" / ")
              : "Social Counsellor"}
          </p>
        </div>

        {/* Languages + Coverage in one row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* Languages */}
          <div className="flex min-w-0 items-start gap-2">
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-[#317d69]" />

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#43856a]">
                Languages
              </p>

              <p
                title={
                  counsellor.languages.length
                    ? counsellor.languages.join(" / ")
                    : "Languages not specified"
                }
                className="mt-0.5 text-xs leading-4 text-slate-600"
              >
                {counsellor.languages.length
                  ? counsellor.languages.join(" / ")
                  : "Not specified"}
              </p>
            </div>
          </div>

          {/* Coverage */}
          <div className="flex min-w-0 items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#317d69]" />

            <div className="min-w-0">
              <p
                title={coverage || "Coverage not specified"}
                className="mt-0.5 text-xs font-semibold leading-4 text-[#294f43]"
              >
                {coverageTitle || "Not specified"}
              </p>

              {coverageDescription && (
                <p className="mt-1 line-clamp-3 break-words text-[11px] leading-4 text-slate-500">
                  {coverageDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Left-aligned specializations */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#317d69]">
            <Sparkles className="h-3.5 w-3.5" />
            Specializations
          </div>

          <div className="mt-2 flex flex-wrap justify-start gap-1.5">
            {counsellor.specializationAreas.slice(0, 3).map((item) => (
              <span
                key={item}
                className="max-w-full rounded-full border border-[#dcece1] bg-[#edf6e9] px-2.5 py-1 text-[10px] font-medium leading-4 text-[#315d4c] transition-colors duration-200 hover:border-[#a9d4b9] hover:bg-[#e0f0e5]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Profile button */}
        <div className="mt-auto pt-4">
          <Link
            href={`/counsellors/${counsellor.slug}`}
            className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#eaf4ed] px-3 py-2 text-xs font-semibold text-[#245c50] transition-all duration-300 hover:bg-[#245c50] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#317d69] focus-visible:ring-offset-2"
          >
            View Profile
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
