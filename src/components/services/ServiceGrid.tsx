import type { Service } from "@/types/service";

import ServiceCard from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({
  services,
}: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-border
          bg-white
          p-8
          text-center
        "
      >
        <p className="text-sm text-text-secondary">
          No services are currently available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}