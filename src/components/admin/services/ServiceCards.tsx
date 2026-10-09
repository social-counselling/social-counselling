"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Power } from "lucide-react";

import type { AdminService } from "@/types/admin-service";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  disableAdminService,
  enableAdminService,
} from "@/services/admin/services.api";

interface Props {
  services: AdminService[];
}

export default function ServiceCards({ services }: Props) {
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<AdminService | null>(
    null,
  );

  const handleStatusChange = async (service: AdminService) => {
    const action = service.isActive ? "disable" : "enable";

    try {
      setUpdatingId(service.serviceId);

      if (service.isActive) {
        await disableAdminService(String(service.serviceId));
      } else {
        await enableAdminService(String(service.serviceId));
      }

      toast.success(`Service ${action}d successfully.`);

      setSelectedService(null);
      window.location.reload();
    } catch (error) {
      console.error("UPDATE SERVICE STATUS ERROR:", error);

      toast.error(
        error instanceof Error ? error.message : `Failed to ${action} service`,
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    if (category === "SOCIAL_COUNSELLING") {
      return "Social Counselling";
    }

    if (category === "EMPATHETIC_LISTENING") {
      return "Empathetic Listening";
    }

    return category;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.serviceId}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* IMAGE */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No image available
                </div>
              )}

              {/* SERVICE ID */}
              <div className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-xl bg-[#183b3b]/90 px-2 text-xs font-bold text-white backdrop-blur-sm">
                #{service.serviceId}
              </div>

              {/* STATUS */}
              <div className="absolute right-4 top-4">
                {service.isActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50/95 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {/* CATEGORY */}
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-[#238BE6]">
                {getCategoryLabel(service.category)}
              </span>

              {/* TITLE */}
              <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-6 text-[#183b3b]">
                {service.title}
              </h2>

              {/* SUBTITLE */}
              {service.subtitle && (
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
                  {service.subtitle}
                </p>
              )}

              {/* META */}
              <div className="mt-4 flex items-center gap-2">
                <span className="truncate text-[10px] text-slate-400">
                  /{service.slug}
                </span>

                <span className="text-[10px] text-slate-300">•</span>

                <span className="text-[10px] text-slate-400">
                  Order {service.sortOrder}
                </span>
              </div>

              {/* DIVIDER */}
              <div className="my-5 border-t border-slate-100" />

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  target="_blank"
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </Link>

                <Link
                  href={`/admin/services/new?id=${service.serviceId}`}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#183b3b]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>

                <button
                  type="button"
                  disabled={updatingId === service.serviceId}
                  onClick={() => setSelectedService(service)}
                  className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    service.isActive
                      ? "border-red-100 text-red-500 hover:bg-red-50"
                      : "border-emerald-100 text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <Power className="h-3.5 w-3.5" />

                  {updatingId === service.serviceId
                    ? service.isActive
                      ? "Disabling..."
                      : "Enabling..."
                    : service.isActive
                      ? "Disable"
                      : "Enable"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Service Status Confirmation Dialog */}
      <AlertDialog
        open={selectedService !== null}
        onOpenChange={(open) => {
          if (!open && updatingId === null) {
            setSelectedService(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm status change</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to{" "}
              {selectedService?.isActive ? "disable" : "enable"} &quot;
              {selectedService?.title}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={updatingId !== null}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={updatingId !== null}
              onClick={(event) => {
                event.preventDefault();

                if (selectedService) {
                  void handleStatusChange(selectedService);
                }
              }}
            >
              {updatingId !== null ? "Please wait..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
