"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import type { CounsellorFormData } from "@/types/admin-counsellor";

import {
  getAdminLanguages,
  type AdminLanguage,
} from "@/services/admin/languages.api";

interface Props {
  data: CounsellorFormData;

  onChange: <K extends keyof CounsellorFormData>(
    field: K,
    value: CounsellorFormData[K],
  ) => void;
}

export default function CounsellorBasicInfo({ data, onChange }: Props) {
  const [languages, setLanguages] = useState<AdminLanguage[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [languageError, setLanguageError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadLanguages = async () => {
      try {
        setLoadingLanguages(true);
        setLanguageError("");

        const response = await getAdminLanguages();

        if (mounted) {
          setLanguages(response.filter((language) => language.isActive));
        }
      } catch (error) {
        console.error("LOAD LANGUAGES ERROR:", error);

        if (mounted) {
          setLanguageError(
            error instanceof Error ? error.message : "Failed to load languages",
          );
        }
      } finally {
        if (mounted) {
          setLoadingLanguages(false);
        }
      }
    };

    loadLanguages();

    return () => {
      mounted = false;
    };
  }, []);

  const updateUserField = <K extends keyof CounsellorFormData["user"]>(
    field: K,
    value: CounsellorFormData["user"][K],
  ) => {
    onChange("user", {
      ...data.user,
      [field]: value,
    });
  };

  const toggleLanguage = (languageId: string) => {
    const isSelected = data.languageIds.includes(languageId);

    if (isSelected) {
      onChange(
        "languageIds",
        data.languageIds.filter((id) => id !== languageId),
      );
      return;
    }

    onChange("languageIds", [...data.languageIds, languageId]);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183b3b] text-sm font-bold text-white">
            01
          </span>

          <div>
            <h2 className="text-lg font-semibold text-[#183b3b]">
              Personal Information
            </h2>

            <p className="text-xs text-slate-400">
              Add the counsellor&apos;s personal and contact information.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* FIRST NAME */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            First Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            value={data.user.firstName}
            onChange={(e) => updateUserField("firstName", e.target.value)}
            placeholder="Rahul"
            className="input-admin"
          />
        </div>

        {/* LAST NAME */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Last Name
          </label>

          <input
            value={data.user.lastName ?? ""}
            onChange={(e) => updateUserField("lastName", e.target.value)}
            placeholder="Sharma"
            className="input-admin"
          />
        </div>

        {/* EMAIL */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="email"
            value={data.user.email}
            onChange={(e) => updateUserField("email", e.target.value)}
            placeholder="rahul@example.com"
            className="input-admin"
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone
          </label>

          <input
            type="tel"
            value={data.user.phone ?? ""}
            onChange={(e) => updateUserField("phone", e.target.value)}
            placeholder="9876543210"
            className="input-admin"
          />
        </div>

        {/* GENDER */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Gender
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            value={data.user.gender}
            onChange={(e) =>
              updateUserField(
                "gender",
                e.target.value as CounsellorFormData["user"]["gender"],
              )
            }
            className="input-admin"
          >
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* DATE OF BIRTH */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Date of Birth
          </label>

          <input
            type="date"
            value={data.user.dateOfBirth ?? ""}
            onChange={(e) =>
              updateUserField("dateOfBirth", e.target.value || undefined)
            }
            className="input-admin"
          />
        </div>

        {/* PROFILE IMAGE */}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Profile Image URL
          </label>

          <input
            type="text"
            value={data.user.profileImageUrl ?? ""}
            onChange={(e) =>
              updateUserField("profileImageUrl", e.target.value || undefined)
            }
            placeholder="/images/counsellors/profile.jpg"
            className="input-admin"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Add the image URL used for the counsellor profile.
          </p>
        </div>

        {/* LANGUAGES */}

        <div className="sm:col-span-2">
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-slate-700">
              Languages
            </label>

            {data.languageIds.length > 0 && (
              <span className="text-xs font-medium text-[#238BE6]">
                {data.languageIds.length} selected
              </span>
            )}
          </div>

          {loadingLanguages ? (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading languages...
            </div>
          ) : languageError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {languageError}
            </div>
          ) : languages.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              No active languages available.
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => {
                const selected = data.languageIds.includes(language.id);

                return (
                  <button
                    key={language.id}
                    type="button"
                    onClick={() => toggleLanguage(language.id)}
                    className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      selected
                        ? "border-[#238BE6] bg-[#238BE6] text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#238BE6] hover:bg-slate-50"
                    }`}
                  >
                    <span>{language.name}</span>

                    {selected && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#238BE6]">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <p className="mt-2 text-xs text-slate-400">
            Select one or more languages spoken by the counsellor.
          </p>
        </div>
      </div>
    </section>
  );
}
