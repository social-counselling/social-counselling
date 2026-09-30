"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";

import type { CounsellorFormData } from "@/types/admin-counsellor";
import CounsellorServicesEditor from "./CounsellorServicesEditor";
import {
  createAdminCounsellor,
  getAdminCounsellor,
  updateAdminCounsellor,
} from "@/services/admin/counsellors.api";

import CounsellorBasicInfo from "./CounsellorBasicInfo";
import CounsellorProfessionalInfo from "./CounsellorProfessionalInfo";
import CounsellorSpecializationEditor from "./CounsellorSpecializationEditor";
import CounsellorAvailabilityEditor from "./CounsellorAvailabilityEditor";

const emptyCounsellor: CounsellorFormData = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: undefined,
    gender: "MALE",
    profileImageUrl: "",
  },

  credentials: "",
  bio: "",
  mantra: "",
  coverage: "",
  experienceYears: undefined,
  experienceText: "",
  languageIds: [],
  specializations: [],
  sortOrder: 0,
};
interface CounsellorFormProps {
  counsellorId?: string;
}

export default function CounsellorForm({ counsellorId }: CounsellorFormProps) {
  const isEditMode = Boolean(counsellorId);

  const [formData, setFormData] = useState<CounsellorFormData>(emptyCounsellor);

  const [loading, setLoading] = useState(isEditMode);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof CounsellorFormData>(
    field: K,
    value: CounsellorFormData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Load existing counsellor
   * when edit mode is active.
   */
  useEffect(() => {
    if (!counsellorId) {
      setLoading(false);
      return;
    }

    const loadCounsellor = async () => {
      try {
        setLoading(true);
        setError(null);

        const counsellor = await getAdminCounsellor(counsellorId);

        const user = counsellor.user;

        const editData: CounsellorFormData = {
          user: {
            firstName: user.firstName ?? "",

            lastName: user.lastName ?? "",

            email: user.email ?? "",

            phone: user.phone ?? "",

            dateOfBirth: user.dateOfBirth
              ? user.dateOfBirth.split("T")[0]
              : undefined,

            gender: user.gender,

            profileImageUrl: user.profileImageUrl ?? "",
          },

          credentials: counsellor.credentials ?? "",

          bio: counsellor.bio ?? "",

          mantra: counsellor.mantra ?? "",

          coverage: counsellor.coverage ?? "",

          experienceYears: counsellor.experienceYears ?? undefined,

          experienceText: counsellor.experienceText ?? "",

          languageIds: Array.isArray(counsellor.languageIds)
            ? [...counsellor.languageIds]
            : [],

          specializations: Array.isArray(counsellor.specializations)
            ? [...counsellor.specializations]
            : [],

          sortOrder: counsellor.sortOrder ?? 0,
        };

        setFormData(editData);
      } catch (error) {
        console.error("LOAD COUNSELLOR ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load counsellor",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCounsellor();
  }, [counsellorId]);

  const validateForm = () => {
    if (!formData.user.firstName.trim()) {
      alert("First name is required.");
      return false;
    }

    if (!formData.user.email.trim()) {
      alert("Email is required.");
      return false;
    }

    if (!formData.user.gender) {
      alert("Gender is required.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const payload: CounsellorFormData = {
        ...formData,

        user: {
          ...formData.user,

          firstName: formData.user.firstName.trim(),

          lastName: formData.user.lastName?.trim() || undefined,

          email: formData.user.email.trim(),

          phone: formData.user.phone?.trim() || undefined,

          profileImageUrl: formData.user.profileImageUrl?.trim() || undefined,
        },

        credentials: formData.credentials?.trim() || undefined,

        bio: formData.bio?.trim() || undefined,

        mantra: formData.mantra?.trim() || undefined,

        coverage: formData.coverage?.trim() || undefined,

        experienceText: formData.experienceText?.trim() || undefined,

        languageIds: [...formData.languageIds],

        specializations: [...formData.specializations],
      };

      /*
       * EDIT MODE
       */
      if (isEditMode && counsellorId) {
        const updatedCounsellor = await updateAdminCounsellor(
          counsellorId,
          payload,
        );

        console.log("COUNSELLOR UPDATED:", updatedCounsellor);

        alert("Counsellor updated successfully.");
      } else {
        /*
         * CREATE MODE
         */
        const createdCounsellor = await createAdminCounsellor(payload);

        console.log("COUNSELLOR CREATED:", createdCounsellor);

        alert("Counsellor created successfully.");
      }

      window.location.href = "/admin/counsellors";
    } catch (error) {
      console.error(
        isEditMode ? "UPDATE COUNSELLOR ERROR:" : "CREATE COUNSELLOR ERROR:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : isEditMode
            ? "Failed to update counsellor"
            : "Failed to create counsellor",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm font-medium text-slate-500">
          Loading counsellor...
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-700">
            Failed to load counsellor
          </p>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <Link
            href="/admin/counsellors"
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-[#238BE6] px-4 text-sm font-semibold text-white"
          >
            Back to Counsellors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* TOP BAR */}

      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin/counsellors"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#238BE6]">
                Counsellors
              </p>

              <h1 className="truncate text-lg font-semibold text-[#183b3b]">
                {isEditMode ? "Edit Counsellor" : "Create New Counsellor"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />

              <span className="hidden sm:inline">Save Draft</span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex h-10 items-center gap-2 rounded-xl bg-[#238BE6] px-4 text-sm font-semibold text-white transition hover:bg-[#1477ca] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />

              <span className="hidden sm:inline">
                {saving
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                    ? "Update Counsellor"
                    : "Create Counsellor"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}

      <main className="p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6">
            <CounsellorBasicInfo data={formData} onChange={updateField} />

            <CounsellorProfessionalInfo
              data={formData}
              onChange={updateField}
            />

            <CounsellorSpecializationEditor
              data={formData}
              onChange={updateField}
            />

            <CounsellorServicesEditor
              data={formData}
              counsellorId={counsellorId}
            />
            <CounsellorAvailabilityEditor counsellorId={counsellorId} />

            {/* BOTTOM ACTIONS */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/admin/counsellors"
                className="flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#238BE6] px-6 text-sm font-semibold text-white transition hover:bg-[#1477ca] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />

                {saving
                  ? isEditMode
                    ? "Updating Counsellor..."
                    : "Creating Counsellor..."
                  : isEditMode
                    ? "Update Counsellor"
                    : "Create Counsellor"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
