import type { Metadata } from "next";

import Container from "@/components/common/Container";
import CounsellorGrid from "@/components/counsellors/CounsellorGrid";

import { counsellors } from "@/data/counsellors";

export const metadata: Metadata = {
  title: "Our Counsellors | Social Counselling",
  description:
    "Meet our counsellors and learn about their areas of experience and support.",
};

export default function CounsellorsPage() {
  return (
    <main className="bg-background-soft">
      {/* Hero */}
      <section className="pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              Our Counsellors
            </p>

            <h1
              className="
                mt-4
                text-4xl
                font-semibold
                leading-tight
                tracking-[-0.04em]
                text-secondary
                sm:text-5xl
                lg:text-6xl
              "
            >
              People who listen,
              <span className="block font-serif italic font-normal text-primary">
                understand and guide.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
              Explore our counsellors, their areas of support and
              the perspectives they bring to each conversation.
            </p>
          </div>
        </Container>
      </section>

      {/* Counsellor listing */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          <CounsellorGrid counsellors={counsellors} />
        </Container>
      </section>
    </main>
  );
}