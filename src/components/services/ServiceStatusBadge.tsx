import type { ServiceStatus } from "@/types/service";

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
}

export default function ServiceStatusBadge({
  status,
}: ServiceStatusBadgeProps) {
  if (status === "READY") {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-primary-light
          px-3
          py-1
          text-xs
          font-semibold
          text-primary
        "
      >
        Available
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-slate-100
        px-3
        py-1
        text-xs
        font-semibold
        text-slate-500
      "
    >
      Coming soon
    </span>
  );
}