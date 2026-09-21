import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Languages, MapPin, Sparkles } from "lucide-react";
import type { CounsellorData } from "@/data/counsellors";

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

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-[0_10px_35px_rgba(24,59,59,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(24,59,59,0.13)]">
      <div className="relative h-[270px] overflow-hidden bg-[#eaf4e6]">
        {counsellor.image ? (
          <Image
            src={counsellor.image}
            alt={counsellor.name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-3xl font-semibold text-primary shadow-sm">
              {initials}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
          Counsellor
        </span>
      </div>

      <div className="p-6">
        <h2 className="font-serif text-2xl font-semibold leading-tight text-secondary">
          {counsellor.name}
        </h2>

        <p className="mt-2 text-sm font-semibold leading-5 text-[#2f7d48]">
          {counsellor.credentials.join(" / ")}
        </p>

        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-2.5">
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{counsellor.languages.join(" / ")}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{counsellor.geographicalCoverage}</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <Sparkles className="h-4 w-4" />
            Specialization
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {counsellor.specializationAreas.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#edf6e9] px-3 py-1.5 text-xs font-medium leading-4 text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/counsellors/${counsellor.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          View Profile
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
