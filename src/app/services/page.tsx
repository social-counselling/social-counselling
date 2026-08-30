import type { Metadata } from "next";

import Container from "@/components/common/Container";
import ServiceGrid from "@/components/services/ServiceGrid";

import { readyServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Counselling Services | Social Counselling",
  description:
    "Explore counselling services designed to provide empathy, support and guidance.",
};

export default function ServicesPage() {
  return (
    <main className="bg-background-soft">
      {/* Header */}
      <section className="pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              Our Services
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
              Support for where
              <span className="block font-serif italic font-normal text-primary">
                you are in life.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-6
                text-text-secondary
                sm:text-base
                sm:leading-7
              "
            >
              Find a space to talk, reflect and move
              forward with greater clarity.
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          <ServiceGrid services={readyServices} />
        </Container>
      </section>
    </main>
  );
}