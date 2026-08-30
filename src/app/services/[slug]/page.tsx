import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import {
  getServiceBySlug,
  readyServices,
} from "@/data/services";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return readyServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service | Social Counselling",
    };
  }

  return {
    title: `${service.title} | Social Counselling`,
    description:
      service.description ||
      service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service || service.status !== "READY") {
    notFound();
  }

  return (
    <main className="bg-background-soft">
      {/* Back */}
      <section className="pt-8 sm:pt-10">
        <Container>
          <Link
            href="/services"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-text-secondary
              hover:text-primary
            "
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Services
          </Link>
        </Container>
      </section>

      {/* Hero */}
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
            <div className="p-6 sm:p-8 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Counselling Service
              </p>

              <h1
                className="
                  mt-4
                  max-w-4xl
                  text-4xl
                  font-semibold
                  tracking-[-0.04em]
                  text-secondary
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {service.title}
              </h1>

              <p
                className="
                  mt-6
                  max-w-3xl
                  text-base
                  leading-7
                  text-text-secondary
                  sm:text-lg
                "
              >
                {service.description ||
                  service.shortDescription}
              </p>

              {/* Suitable for */}
              {service.suitableFor &&
                service.suitableFor.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-xl font-semibold text-secondary">
                      This service may help with
                    </h2>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {service.suitableFor.map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3"
                          >
                            <div
                              className="
                                mt-0.5
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-primary-light
                                text-primary
                              "
                            >
                              <Check className="h-3.5 w-3.5" />
                            </div>

                            <p className="text-sm leading-6 text-text-secondary">
                              {item}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* CTA */}
              <div className="mt-10">
                <Button
                  href="/book-session"
                  size="lg"
                >
                  Book a Session
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}