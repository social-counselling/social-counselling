"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";

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
  onPendingChange?: (serviceIds: number[], sharedPrice: string) => void;
}

interface ServiceItem {
  serviceId: number;
  title: string;
  selected: boolean;
  assignmentId?: number;
}

export default function CounsellorServicesEditor({
  counsellorId,
  onPendingChange,
}: Props) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [sharedPrice, setSharedPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(counsellorId);

  useEffect(() => {
    let cancelled = false;

    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const [availableResponse, assignedServices] = await Promise.all([
          getAdminServices({ page: 1, limit: 100, isActive: true }),
          isEditMode
            ? getAdminCounsellorServices(Number(counsellorId))
            : Promise.resolve([] as AdminCounsellorService[]),
        ]);

        if (cancelled) return;

        const assignedMap = new Map<number, AdminCounsellorService>();
        assignedServices.forEach((assignment) => assignedMap.set(assignment.serviceId, assignment));

        const available = Array.isArray(availableResponse.data) ? availableResponse.data : [];
        const serviceList = available.map((service) => {
          const assignment = assignedMap.get(service.serviceId);
          return {
            serviceId: service.serviceId,
            title: service.title,
            selected: Boolean(assignment),
            assignmentId: assignment?.id,
          };
        });

        setServices(serviceList);
        if (assignedServices.length > 0) {
          // A single shared fee is used for every selected service.
          setSharedPrice(String(assignedServices[0].price ?? ""));
        }
      } catch (loadError) {
        if (cancelled) return;
        console.error("LOAD COUNSELLOR SERVICES ERROR:", loadError);
        setError(loadError instanceof Error ? loadError.message : "Failed to load services");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadServices();
    return () => { cancelled = true; };
  }, [counsellorId, isEditMode]);

  const selectedServices = useMemo(
    () => services.filter((service) => service.selected),
    [services],
  );

  useEffect(() => {
    onPendingChange?.(selectedServices.map((service) => service.serviceId), sharedPrice);
  }, [onPendingChange, selectedServices, sharedPrice]);

  const toggleService = (serviceId: number) => {
    setServices((current) => current.map((service) =>
      service.serviceId === serviceId ? { ...service, selected: !service.selected } : service,
    ));
  };

  const handleSaveServices = async () => {
    if (!isEditMode || !counsellorId) return;

    if (selectedServices.length > 0 && (!sharedPrice.trim() || !Number.isFinite(Number(sharedPrice)) || Number(sharedPrice) <= 0)) {
      toast.error("Enter one valid fee greater than ₹0 for the selected services.");
      return;
    }

    setSaving(true);
    try {
      const currentAssignments = await getAdminCounsellorServices(Number(counsellorId));
      const selectedIds = new Set(selectedServices.map((service) => service.serviceId));

      await Promise.all(
        currentAssignments
          .filter((assignment) => !selectedIds.has(assignment.serviceId))
          .map((assignment) => deleteAdminCounsellorService(assignment.id)),
      );

      const price = Number(sharedPrice);
      await Promise.all(selectedServices.map(async (service) => {
        const existing = currentAssignments.find((assignment) => assignment.serviceId === service.serviceId);
        if (existing) {
          await updateAdminCounsellorService(existing.id, { price });
        } else {
          await createAdminCounsellorService({
            counsellorId: Number(counsellorId),
            serviceId: service.serviceId,
            price,
          });
        }
      }));

      const updatedAssignments = await getAdminCounsellorServices(Number(counsellorId));
      setServices((current) => current.map((service) => {
        const assignment = updatedAssignments.find((item) => item.serviceId === service.serviceId);
        return { ...service, assignmentId: assignment?.id, selected: Boolean(assignment) };
      }));
      toast.success("Counsellor services updated successfully.");
    } catch (saveError) {
      console.error("SAVE COUNSELLOR SERVICES ERROR:", saveError);
      toast.error(saveError instanceof Error ? saveError.message : "Failed to save counsellor services");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" />Loading services...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-700">Failed to load services</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#238BE6]">Professional setup</p>
          <h2 className="mt-1 text-lg font-semibold text-[#183b3b]">Counselling Services</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">Choose the services this counsellor offers. One shared fee will apply to every selected service.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#238BE6]">
          <Check className="h-3.5 w-3.5" />{selectedServices.length} selected
        </span>
      </div>

      {services.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
          <BriefcaseBusiness className="mx-auto h-6 w-6 text-slate-400" />
          <p className="mt-2 text-sm font-semibold text-slate-600">No active services found</p>
          <p className="mt-1 text-xs text-slate-400">Create an active service before assigning it to a counsellor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {services.map((service) => (
            <button
              key={service.serviceId}
              type="button"
              aria-pressed={service.selected}
              onClick={() => toggleService(service.serviceId)}
              className={`group flex min-h-[44px] items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#238BE6] focus-visible:ring-offset-2 ${
                service.selected
                  ? "border-[#238BE6] bg-blue-50 text-[#183b3b] shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#238BE6]/60 hover:bg-slate-50"
              }`}
            >
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${service.selected ? "border-[#238BE6] bg-[#238BE6] text-white" : "border-slate-300 bg-white text-transparent group-hover:border-[#238BE6]"}`}>
                <Check className="h-3 w-3" />
              </span>
              <span className="min-w-0 flex-1 text-xs font-semibold leading-4">{service.title}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label htmlFor="shared-counsellor-service-fee" className="block text-sm font-semibold text-[#183b3b]">Fee for selected services</label>
            <p className="mt-1 text-xs text-slate-500">This amount is applied equally to all {selectedServices.length} selected {selectedServices.length === 1 ? "service" : "services"}.</p>
            <div className="relative mt-2 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">₹</span>
              <input
                id="shared-counsellor-service-fee"
                type="text"
                inputMode="decimal"
                value={sharedPrice}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "" || /^\d*\.?\d*$/.test(value)) setSharedPrice(value);
                }}
                className="input-admin w-full pl-8"
                placeholder="Enter one shared fee"
                aria-describedby="shared-counsellor-service-fee-help"
              />
            </div>
            <p id="shared-counsellor-service-fee-help" className="mt-1.5 text-[11px] text-slate-400">Select services above, then enter the fee once.</p>
          </div>
          <div className="rounded-lg bg-white px-3 py-2 text-xs text-slate-500 sm:max-w-[180px]">
            <span className="block font-semibold text-[#183b3b]">Shared pricing</span>
            {sharedPrice && Number(sharedPrice) > 0 ? `₹${Number(sharedPrice).toLocaleString("en-IN")} per selected service` : "Fee not set yet"}
          </div>
        </div>
      </div>

      {isEditMode && (
        <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleSaveServices}
            disabled={saving || loading}
            className="flex h-10 items-center gap-2 rounded-xl bg-[#238BE6] px-5 text-sm font-semibold text-white transition hover:bg-[#1477ca] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving...</> : <><Check className="h-4 w-4" />Save Services</>}
          </button>
        </div>
      )}
    </section>
  );
}
