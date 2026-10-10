import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { serviceDetails, serviceDetailsBySlug } from "@/data/service-details";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { getPublicServiceBySlug, getPublicServiceDetails } from "@/services/public/public-content.api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

async function resolveService(slug: string) {
  // Prefer the service saved in the backend so the public page renders the latest admin-managed content.
  const backendService = await getPublicServiceBySlug(slug);
  return backendService ?? serviceDetailsBySlug[slug] ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await resolveService(slug);

  if (!service) {
    return { title: "Service | Social Counselling" };
  }

  return {
    title: `${service.title} | Social Counselling`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const service = await resolveService(slug);

  if (!service) notFound();

  const backendServices = await getPublicServiceDetails().catch(() => []);
  const relatedSource = backendServices.length ? backendServices : serviceDetails;
  const relatedServices = relatedSource
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4);

  return <ServiceDetailPage service={service} relatedServices={relatedServices} />;
}
