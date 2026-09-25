"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  AdminCounsellor,
} from "@/types/admin-counsellor";

import {
  deleteAdminCounsellor,
} from "@/services/admin/counsellors.api";

interface Props {
  counsellors: AdminCounsellor[];
}

export default function CounsellorCards({
  counsellors,
}: Props) {
  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  /**
   * Normalize counsellor profile image paths.
   *
   * Handles:
   * \images\counsellors\image.jpg
   * /images/counsellors/image.jpg
   * images/counsellors/image.jpg
   * https://example.com/image.jpg
   */
  const getProfileImage = (
    profileImageUrl: string | null,
  ) => {
    if (!profileImageUrl) {
      return null;
    }

    const normalizedPath = profileImageUrl.replace(
      /\\/g,
      "/",
    );

    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://") ||
      normalizedPath.startsWith("/")
    ) {
      return normalizedPath;
    }

    return `/${normalizedPath}`;
  };

  const handleDelete = async (
    counsellor: AdminCounsellor,
  ) => {
    const fullName = [
      counsellor.user.firstName,
      counsellor.user.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const confirmed = window.confirm(
      `Are you sure you want to delete "${fullName}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(counsellor.id);

      await deleteAdminCounsellor(
        String(counsellor.id),
      );

      window.location.reload();
    } catch (error) {
      console.error(
        "DELETE COUNSELLOR ERROR:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete counsellor",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {counsellors.map((counsellor) => {
        const fullName = [
          counsellor.user.firstName,
          counsellor.user.lastName,
        ]
          .filter(Boolean)
          .join(" ");

        const profileImage = getProfileImage(
          counsellor.user.profileImageUrl,
        );

        return (
          <article
            key={counsellor.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* IMAGE */}

            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={fullName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No image
                </div>
              )}

              {/* STATUS */}

              <div className="absolute right-4 top-4">
                {counsellor.status === "ACTIVE" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50/95 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    {counsellor.status}
                  </span>
                )}
              </div>
            </div>

            {/* CONTENT */}

            <div className="p-5">
              <h2 className="text-lg font-semibold text-[#183b3b]">
                {fullName}
              </h2>

              {counsellor.credentials && (
                <p className="mt-1 text-sm font-medium text-[#238BE6]">
                  {counsellor.credentials}
                </p>
              )}

              {/* EXPERIENCE */}

              {counsellor.experienceYears !== null && (
                <p className="mt-1 text-xs text-slate-400">
                  {counsellor.experienceYears} years
                  experience
                </p>
              )}

              {/* SPECIALIZATIONS */}

              {counsellor.specializations.length >
                0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {counsellor.specializations
                    .slice(0, 3)
                    .map((specialization) => (
                      <span
                        key={specialization}
                        className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-[#238BE6]"
                      >
                        {specialization}
                      </span>
                    ))}
                </div>
              )}

              {/* LANGUAGES */}

              <p className="mt-4 line-clamp-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Languages:
                </span>{" "}
                {counsellor.languages.length > 0
                  ? counsellor.languages
                      .map((language) => language.name)
                      .join(", ")
                  : "Not specified"}
              </p>

              {/* COVERAGE */}

              {counsellor.coverage && (
                <p className="mt-2 line-clamp-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Coverage:
                  </span>{" "}
                  {counsellor.coverage}
                </p>
              )}

              {/* SERVICES */}

              <p className="mt-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Services:
                </span>{" "}
                {counsellor.services.length}
              </p>

              <div className="my-5 border-t border-slate-100" />

              {/* ACTIONS */}

              <div className="flex gap-2">
                <Link
                  href={`/counsellors/${counsellor.id}`}
                  target="_blank"
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </Link>

                <Link
                  href={`/admin/counsellors/new?id=${counsellor.id}`}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#183b3b]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>

                <button
                  type="button"
                  disabled={
                    deletingId === counsellor.id
                  }
                  onClick={() =>
                    handleDelete(counsellor)
                  }
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-100 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />

                  {deletingId ===
                  counsellor.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          </article>
        );
      })}

      {counsellors.length === 0 && (
        <div className="col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <p className="text-sm font-semibold text-[#183b3b]">
            No counsellors found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}