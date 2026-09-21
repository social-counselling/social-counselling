import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Languages,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";

import Container from "@/components/common/Container";
import type { CounsellorData } from "@/data/counsellors";

export default function CounsellorProfilePage({
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
    <main className="relative overflow-hidden bg-[#fcfdf9]">
      <section className="relative mt-22 overflow-hidden bg-[#f4faef] py-10 sm:py-14 lg:py-16">
        <Image
          src="/images/services/section-leaf-leftFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 w-[80px] opacity-45 sm:w-[115px] lg:w-[160px]"
        />
        <Image
          src="/images/services/section-leaf-rightFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-0 w-[80px] opacity-45 sm:w-[115px] lg:w-[160px]"
        />

        <Container className="relative z-10">
          <Link
            href="/counsellors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Counsellors
          </Link>

          <div className="mt-7 grid items-stretch gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div className="relative min-h-[390px] overflow-hidden rounded-[30px] bg-white shadow-[0_12px_35px_rgba(24,59,59,0.08)] sm:min-h-[500px] lg:min-h-[570px]">
              {counsellor.image ? (
                <Image
                  src={counsellor.image}
                  alt={counsellor.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-contain object-bottom"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#eaf4e6]">
                  <span className="flex h-40 w-40 items-center justify-center rounded-full bg-white text-5xl font-semibold text-primary shadow-sm">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center rounded-[30px] border border-white/80 bg-white/75 p-7 shadow-[0_12px_35px_rgba(24,59,59,0.07)] backdrop-blur-sm sm:p-9 lg:p-11">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6f3e5] px-3.5 py-2 text-xs font-semibold text-primary">
                <UserRound className="h-4 w-4" />
                Counsellor Profile
              </div>

              <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-secondary sm:text-5xl lg:text-6xl">
                {counsellor.name}
              </h1>

              <p className="mt-3 text-base font-semibold leading-6 text-[#2f7d48] sm:text-lg">
                {counsellor.credentials.join(" / ")}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <InfoBox
                  icon={<Languages className="h-5 w-5" />}
                  title="Languages"
                  value={counsellor.languages.join(" / ")}
                />
                <InfoBox
                  icon={<MapPin className="h-5 w-5" />}
                  title="Geographical Coverage"
                  value={counsellor.geographicalCoverage}
                />
                {counsellor.age && (
                  <InfoBox
                    icon={<UserRound className="h-5 w-5" />}
                    title="Age"
                    value={counsellor.age}
                  />
                )}
              </div>

              <div className="mt-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Specialization Area
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {counsellor.specializationAreas.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#edf6e9] px-3.5 py-2 text-sm font-medium leading-5 text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {counsellor.mantra && (
                <div className="mt-7 rounded-[22px] bg-[#edf6e9] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Mantra of Life
                  </p>
                  <p className="mt-2 font-serif text-xl font-semibold italic text-secondary">
                    “{counsellor.mantra}”
                  </p>
                </div>
              )}

              <Link
                href="/book-session"
                className="mt-7 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Book a Session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-white py-14 sm:py-18 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
            <div>
              <SectionHeading title="About the Counsellor" />
              <div className="mt-7 space-y-5 text-base leading-8 text-slate-700">
                {counsellor.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] border border-[#e2eee0] bg-[#f4faef] p-6 sm:p-7 lg:sticky lg:top-28">
              <SectionHeading title="Specialization" />
              <ul className="mt-5 space-y-3">
                {counsellor.specializationAreas.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-secondary"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-primary/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Languages
                </p>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {counsellor.languages.join(" / ")}
                </p>
              </div>

              <div className="mt-5 border-t border-primary/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Coverage
                </p>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {counsellor.geographicalCoverage}
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#edf6e9] py-14 sm:py-18 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-Unkempt text-xl font-bold tracking-[0.24em] text-[#168f91] sm:text-2xl">
              A Different Perspective
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-secondary sm:text-4xl lg:text-5xl">
              Take the first step towards a better conversation.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Choose a counsellor and continue to the booking process.
            </p>
            <Link
              href="/book-session"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Book a Session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-9 w-1 rounded-full bg-primary" />
        <h2 className="font-serif text-3xl font-semibold text-secondary sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className="mt-4">
        <Image
          src="/images/home/introduction/leaf-divider.png"
          alt=""
          width={140}
          height={40}
          aria-hidden="true"
          className="h-auto w-[90px] opacity-60"
        />
      </div>
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
    <div className="rounded-[20px] border border-[#e2eee0] bg-[#f8fcf6] p-4">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.12em]">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm leading-6 text-secondary">{value}</p>
    </div>
  );
}
