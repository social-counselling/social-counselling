"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { AdminService } from "@/types/admin-service";
import { deleteAdminService } from "@/app/services/admin-services-api";

interface Props {
  services: AdminService[];
}

export default function ServiceCards({
  services,
}: Props) {
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const handleDelete = async (
    service: AdminService,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(service.id);

      await deleteAdminService(service.id);

      window.location.reload();
    } catch (error) {
      console.error(
        "DELETE SERVICE ERROR:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete service",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryLabel = (
    category: string,
  ) => {
    if (category === "SOCIAL_COUNSELLING") {
      return "Social Counselling";
    }

    if (
      category === "EMPATHETIC_LISTENING"
    ) {
      return "Empathetic Listening";
    }

    return category;
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <article
          key={service.id}
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

            {/* SERVICE NUMBER */}

            <div className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-xl bg-[#183b3b]/90 px-2 text-xs font-bold text-white backdrop-blur-sm">
              {service.serviceNumber || "--"}
            </div>

            {/* STATUS */}

            <div className="absolute right-4 top-4">
              {service.isPublished ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  WIP
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
              {service.isActive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Inactive
                </span>
              )}

              <span className="truncate text-[10px] text-slate-400">
                /{service.slug}
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
                href={`/admin/services/new?id=${service.id}`}
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#183b3b]"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>

              <button
                type="button"
                disabled={
                  deletingId === service.id
                }
                onClick={() =>
                  handleDelete(service)
                }
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-100 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />

                {deletingId === service.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}