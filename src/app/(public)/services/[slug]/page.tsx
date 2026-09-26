import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { serviceDetails, serviceDetailsBySlug } from "@/data/service-details";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetailsBySlug[slug];

  if (!service) {
    return {
      title: "Service | Social Counselling",
    };
  }

  return {
    title: `${service.title} | Social Counselling`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceDetailsBySlug[slug];

  if (!service) {
    notFound();
  }

  const relatedServices = serviceDetails
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4);

  return (
    <ServiceDetailPage
      service={service}
      relatedServices={relatedServices}
    />
  );
}
