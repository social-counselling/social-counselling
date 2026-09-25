"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";

import type { CounsellorFormData } from "@/types/admin-counsellor";

import {
  createAdminCounsellorService,
  deleteAdminCounsellorService,
  getAdminCounsellorServices,
  updateAdminCounsellorService,
  type AdminCounsellorService,
} from "@/services/admin/counsellor-services.api";

import { getAdminServices } from "@/services/admin/services.api";

interface Props {
  data: CounsellorFormData;
  counsellorId?: string;
}

interface ServiceItem {
  serviceId: number;
  title: string;
  subtitle: string;
  price: string;
  assignmentId?: number;
  isExisting: boolean;
}

export default function CounsellorServicesEditor({
  data,
  counsellorId,
}: Props) {
  const [services, setServices] = useState<ServiceItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const isEditMode = Boolean(counsellorId);

  /*
   * Load services.
   */
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const [availableServices, assignedServices] = await Promise.all([
          getAdminServices({
            page: 1,
            limit: 100,
            isActive: true,
          }),

          isEditMode
            ? getAdminCounsellorServices(Number(counsellorId))
            : Promise.resolve([]),
        ]);

        const assignedMap = new Map<number, AdminCounsellorService>();

        assignedServices.forEach((assignment) => {
          assignedMap.set(assignment.serviceId, assignment);
        });

        const serviceList = availableServices.data.map((service) => {
          const assignment = assignedMap.get(service.serviceId);

          return {
            serviceId: service.serviceId,

            title: service.title,

            subtitle: service.subtitle ?? "",

            price: assignment?.price ?? "",

            assignmentId: assignment?.id,

            isExisting: Boolean(assignment),
          };
        });

        setServices(serviceList);
      } catch (error) {
        console.error("LOAD COUNSELLOR SERVICES ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load services",
        );
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [counsellorId, isEditMode]);

  /*
   * Selected services.
   */
  const selectedServices = useMemo(() => {
    return services.filter((service) => service.price.trim() !== "");
  }, [services]);

  /*
   * Toggle service selection.
   */
  const toggleService = (serviceId: number) => {
    setServices((previous) =>
      previous.map((service) => {
        if (service.serviceId !== serviceId) {
          return service;
        }

        return {
          ...service,
          price: service.price.trim() === "" ? "0" : "",
        };
      }),
    );
  };

  /*
   * Update service price.
   */
  const updatePrice = (serviceId: number, price: string) => {
    if (price !== "" && !/^\d*\.?\d*$/.test(price)) {
      return;
    }

    setServices((previous) =>
      previous.map((service) =>
        service.serviceId === serviceId
          ? {
              ...service,
              price,
            }
          : service,
      ),
    );
  };

  /*
   * Save all service assignments.
   */
  const handleSaveServices = async () => {
    if (!isEditMode || !counsellorId) {
      return;
    }

    const invalidPrice = selectedServices.some(
      (service) => service.price === "" || Number(service.price) < 0,
    );

    if (invalidPrice) {
      alert("Please enter a valid price for every selected service.");
      return;
    }

    setSaving(true);

    try {
      const currentAssignments = await getAdminCounsellorServices(
        Number(counsellorId),
      );

      const selectedServiceIds = new Set(
        selectedServices.map((service) => service.serviceId),
      );

      /*
       * Delete removed services.
       */
      const servicesToDelete = currentAssignments.filter(
        (assignment) => !selectedServiceIds.has(assignment.serviceId),
      );

      await Promise.all(
        servicesToDelete.map((assignment) =>
          deleteAdminCounsellorService(assignment.id),
        ),
      );

      /*
       * Create / update selected services.
       */
      await Promise.all(
        selectedServices.map(async (service) => {
          const existing = currentAssignments.find(
            (assignment) => assignment.serviceId === service.serviceId,
          );

          const price = Number(service.price);

          if (existing) {
            await updateAdminCounsellorService(existing.id, {
              price,
            });
          } else {
            await createAdminCounsellorService({
              counsellorId: Number(counsellorId),

              serviceId: service.serviceId,

              price,
            });
          }
        }),
      );

      /*
       * Reload assignments so the UI
       * has the latest assignment IDs.
       */
      const updatedAssignments = await getAdminCounsellorServices(
        Number(counsellorId),
      );

      setServices((previous) =>
        previous.map((service) => {
          const assignment = updatedAssignments.find(
            (item) => item.serviceId === service.serviceId,
          );

          return {
            ...service,
            assignmentId: assignment?.id,
            isExisting: Boolean(assignment),
          };
        }),
      );

      alert("Counsellor services updated successfully.");
    } catch (error) {
      console.error("SAVE COUNSELLOR SERVICES ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save counsellor services",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Create mode.
   *
   * Services cannot be saved until the
   * counsellor has been created because
   * we need the counsellor ID.
   */
  if (!isEditMode) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#238BE6]">
            Services
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#183b3b]">
            Counselling Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create the counsellor first, then assign services and prices.
          </p>
        </div>
      </section>
    );
  }

  /*
   * Loading.
   */
  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading services...
        </div>
      </section>
    );
  }

  /*
   * Error.
   */
  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-700">
          Failed to load services
        </p>

        <p className="mt-1 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#238BE6]">
            Services
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#183b3b]">
            Counselling Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the services this counsellor provides and set individual
            pricing.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-[#238BE6]">
          <Plus className="h-3.5 w-3.5" />
          {selectedServices.length} selected
        </div>
      </div>

      {/* SERVICE LIST */}

      {services.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
          <p className="text-sm font-semibold text-slate-600">
            No active services found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Create an active service before assigning it to a counsellor.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {services.map((service) => {
            const selected = service.price.trim() !== "";

            return (
              <div
                key={service.serviceId}
                className={`rounded-xl border p-4 transition ${
                  selected
                    ? "border-[#238BE6] bg-blue-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {/* SERVICE TOP */}

                <button
                  type="button"
                  onClick={() => toggleService(service.serviceId)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      selected
                        ? "border-[#238BE6] bg-[#238BE6] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selected && <Check className="h-3.5 w-3.5" />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#183b3b]">
                      {service.title}
                    </span>

                    {service.subtitle && (
                      <span className="mt-1 block line-clamp-2 text-xs text-slate-500">
                        {service.subtitle}
                      </span>
                    )}
                  </span>
                </button>

                {/* PRICE */}

                {selected && (
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                        ₹
                      </span>

                      <input
                        type="text"
                        inputMode="decimal"
                        value={service.price}
                        onChange={(event) =>
                          updatePrice(service.serviceId, event.target.value)
                        }
                        className="input-admin w-full pl-8"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SAVE */}

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={handleSaveServices}
          disabled={saving}
          className="flex h-10 items-center gap-2 rounded-xl bg-[#238BE6] px-5 text-sm font-semibold text-white transition hover:bg-[#1477ca] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Services
            </>
          )}
        </button>
      </div>
    </section>
  );
}
