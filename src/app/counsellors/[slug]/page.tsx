import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import {
  counsellors,
  getCounsellorBySlug,
} from "@/data/counsellors";

interface CounsellorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return counsellors.map((counsellor) => ({
    slug: counsellor.slug,
  }));
}

export async function generateMetadata({
  params,
}: CounsellorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const counsellor = getCounsellorBySlug(slug);

  if (!counsellor) {
    return {
      title: "Counsellor | Social Counselling",
    };
  }

  return {
    title: `${counsellor.name} | Social Counselling`,
    description: counsellor.shortBio,
  };
}

function getInitials(name: string) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default async function CounsellorDetailPage({
  params,
}: CounsellorDetailPageProps) {
  const { slug } = await params;

  const counsellor = getCounsellorBySlug(slug);

  if (!counsellor) {
    notFound();
  }

  const initials = getInitials(counsellor.name);

  return (
    <main className="bg-background-soft">
      {/* Back */}
      <section className="pt-8 sm:pt-10">
        <Container>
          <Link
            href="/counsellors"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-text-secondary
              transition-colors
              hover:text-primary
            "
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Counsellors
          </Link>
        </Container>
      </section>

      {/* Profile */}
      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <div
            className="
              overflow-hidden
              rounded-[32px]
              border
              border-border
              bg-white
              shadow-[var(--shadow-soft)]
            "
          >
            <div
              className="
                grid
                lg:grid-cols-[0.8fr_1.2fr]
              "
            >
              {/* Image */}
              <div
                className="
                  relative
                  min-h-[360px]
                  bg-primary-light
                  sm:min-h-[480px]
                  lg:min-h-[620px]
                "
              >
                {counsellor.profileImage ? (
                  <Image
                    src={counsellor.profileImage}
                    alt={counsellor.name}
                    fill
                    priority
                    sizes="
                      (max-width: 1024px) 100vw,
                      40vw
                    "
                    className="object-fill"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      min-h-[360px]
                      items-center
                      justify-center
                      bg-gradient-to-br
                      from-primary-light
                      via-white
                      to-secondary-light
                    "
                  >
                    <div
                      className="
                        flex
                        h-40
                        w-40
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-5xl
                        font-semibold
                        text-primary
                        shadow-[var(--shadow-card)]
                      "
                    >
                      {initials}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Counsellor Profile
                </p>

                <h1
                  className="
                    mt-4
                    text-3xl
                    font-semibold
                    tracking-[-0.035em]
                    text-secondary
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {counsellor.name}
                </h1>

                <p className="mt-4 text-base leading-7 text-text-secondary">
                  {counsellor.credentials}
                </p>

                {/* Quick information */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {counsellor.age && (
                    <InfoItem
                      label="Age"
                      value={`${counsellor.age} years`}
                    />
                  )}

                  {counsellor.experience && (
                    <InfoItem
                      label="Experience"
                      value={counsellor.experience}
                    />
                  )}

                  <InfoItem
                    label="Languages"
                    value={counsellor.languages.join(", ")}
                  />

                  <div className="rounded-2xl bg-background-soft p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Coverage
                        </p>

                        <p className="mt-1 text-sm leading-5 text-secondary">
                          {counsellor.geographicalCoverage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="mt-8 border-t border-border pt-8">
                  <h2 className="text-xl font-semibold text-secondary">
                    About
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
                    {counsellor.fullBio}
                  </p>
                </div>

                {/* Specializations */}
                <div className="mt-8 border-t border-border pt-8">
                  <h2 className="text-xl font-semibold text-secondary">
                    Areas of support
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {counsellor.specializations.map(
                      (specialization) => (
                        <div
                          key={specialization.id}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                            <Check className="h-3.5 w-3.5" />
                          </div>

                          <p className="text-sm leading-6 text-text-secondary">
                            {specialization.title}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Mantra */}
                {counsellor.mantra && (
                  <div className="mt-8 rounded-2xl bg-primary-light p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Mantra of life
                    </p>

                    <p className="mt-2 font-serif text-lg italic text-secondary">
                      “{counsellor.mantra}”
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    href={`/book-session?counsellor=${counsellor.slug}`}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Book a Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-background-soft p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </p>

      <p className="mt-1 text-sm leading-5 text-secondary">
        {value}
      </p>
    </div>
  );
}