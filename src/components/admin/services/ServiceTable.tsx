"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { AdminService } from "@/types/admin-service";
import {
  deleteAdminService,
} from "@/app/services/admin-services-api";
interface Props {
  services: AdminService[];
}

export default function ServiceTable({
  services,
}: Props) {
    const [deletingId, setDeletingId] =
  useState<string | null>(null);

  const handleDelete = async (service: AdminService) => {
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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Desktop table */}

      <div className="hidden overflow-x-auto lg:block">

        <table className="w-full min-w-[1050px]">

          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                #
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Image
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Service
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Category
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Status
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Visibility
              </th>

              <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-slate-100 transition hover:bg-slate-50/70"
              >

                {/* NUMBER */}

                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-[#183b3b]">
                    {service.serviceNumber}
                  </span>
                </td>

                {/* IMAGE */}

                <td className="px-4 py-4">

                  <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-100">

                    {service.imageUrl ? (
                      <Image
                        src={service.imageUrl}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                        No image
                      </div>
                    )}

                  </div>

                </td>

                {/* SERVICE */}

                <td className="max-w-[320px] px-4 py-4">

                  <p className="truncate text-sm font-semibold text-[#183b3b]">
                    {service.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {service.subtitle}
                  </p>

                  <p className="mt-1 truncate text-[10px] text-slate-300">
                    /{service.slug}
                  </p>

                </td>

                {/* CATEGORY */}

                <td className="px-4 py-4">

                  <span className="inline-flex whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {service.category}
                  </span>

                </td>

                {/* STATUS */}

                <td className="px-4 py-4">

                  {service.isPublished ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      WIP
                    </span>
                  )}

                </td>

                {/* VISIBILITY */}

                <td className="px-4 py-4">

                  {service.isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Inactive
                    </span>
                  )}

                </td>

                {/* ACTIONS */}

                <td className="px-4 py-4">

                  <div className="flex items-center justify-end gap-1">

                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <Link
                     href={`/admin/services/new?id=${service.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#183b3b]"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>

                  <button
  type="button"
  disabled={deletingId === service.id}
  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
  title="Delete"
  onClick={() => handleDelete(service)}
>
  <Trash2 className="h-4 w-4" />
</button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      title="More"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile / Tablet cards */}

      <div className="divide-y divide-slate-100 lg:hidden">

        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 sm:p-5"
          >

            <div className="flex gap-4">

              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : null}

              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-xs font-semibold text-[#238BE6]">
                      {service.serviceNumber}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-[#183b3b]">
                      {service.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                      {service.subtitle}
                    </p>

                  </div>

                  <button
                    type="button"
                    className="shrink-0 text-slate-400"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>

                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
                    {service.category}
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      ${
                        service.isPublished
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    {service.isPublished
                      ? "Published"
                      : "WIP"}
                  </span>

                </div>

                <div className="mt-3 flex items-center gap-1">

                  <Link
                    href={`/services/${service.slug}`}
                    target="_blank"
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>

                  <Link
                    href={`/admin/services/new?id=${service.id}`}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>

                  <button
  type="button"
  disabled={deletingId === service.id}
  className="flex h-8 items-center gap-1.5 rounded-lg border border-red-100 px-3 text-xs font-medium text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
  onClick={() => handleDelete(service)}
>
  <Trash2 className="h-3.5 w-3.5" />
  {deletingId === service.id
    ? "Deleting..."
    : "Delete"}
</button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY */}

      {services.length === 0 && (
        <div className="px-6 py-16 text-center">

          <p className="text-sm font-semibold text-[#183b3b]">
            No services found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or filters.
          </p>

        </div>
      )}

    </div>
  );
}