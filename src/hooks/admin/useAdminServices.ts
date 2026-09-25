"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getAdminServices,
  type AdminServicesParams,
  type AdminServicesResponse,
} from "@/services/admin/services.api";

export function useAdminServices(params: AdminServicesParams = {}) {
  const [data, setData] = useState<AdminServicesResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAdminServices(params);

      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }, [
    params.search,
    params.category,
    params.isActive,
    params.page,
    params.limit,
  ]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    data,
    services: data?.data ?? [],
    meta: data?.meta,
    loading,
    error,
    refetch: fetchServices,
  };
}
