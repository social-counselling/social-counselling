"use client";

import { useEffect, useState } from "react";

import ServiceForm from "@/components/admin/services/ServiceForm";
import { getAdminService } from "@/services/admin/services.api";
import type { ServiceFormData } from "@/types/admin-service";

export default function CreateServicePage() {
  const [serviceId, setServiceId] = useState<string | null>(null);

  const [initialData, setInitialData] = useState<ServiceFormData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    setServiceId(id);

    if (!id) {
      setInitialData(null);
      return;
    }

    const loadService = async () => {
      try {
        setLoading(true);
        setError("");

        const service = await getAdminService(id);

        setInitialData({
          category: service.category,
          title: service.title,
          subtitle: service.subtitle ?? "",
          slug: service.slug ?? "",
          heroImageUrl: service.heroImageUrl ?? "",
          imageUrl: service.imageUrl ?? "",
          content: service.content ?? {
            sections: [],
          },
          isActive: service.isActive,
          sortOrder: service.sortOrder,
        });
      } catch (err) {
        console.error("Failed to load service:", err);

        setError(err instanceof Error ? err.message : "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading service...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-sm text-red-600">{error}</div>;
  }

  return (
    <ServiceForm
      mode={serviceId ? "edit" : "create"}
      initialData={initialData ?? undefined}
      serviceId={serviceId ?? undefined}
    />
  );
}
