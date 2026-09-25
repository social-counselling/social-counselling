"use client";

import type { CounsellorFormData } from "@/types/admin-counsellor";

interface Props {
  data: CounsellorFormData;

  onChange: <K extends keyof CounsellorFormData>(
    field: K,
    value: CounsellorFormData[K],
  ) => void;
}

export default function CounsellorProfessionalInfo({
  data,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183b3b] text-sm font-bold text-white">
            02
          </span>

          <div>
            <h2 className="text-lg font-semibold text-[#183b3b]">
              Professional Information
            </h2>

            <p className="text-xs text-slate-400">
              Add the counsellor&apos;s professional profile and experience.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* CREDENTIALS */}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Credentials
          </label>

          <input
            value={data.credentials ?? ""}
            onChange={(e) =>
              onChange("credentials", e.target.value)
            }
            placeholder="Professional Counsellor / Psychologist / Social Advisor"
            className="input-admin"
          />
        </div>

        {/* BIO */}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bio
          </label>

          <textarea
            value={data.bio ?? ""}
            onChange={(e) => onChange("bio", e.target.value)}
            rows={5}
            placeholder="Write a short professional biography..."
            className="input-admin resize-none"
          />
        </div>

        {/* MANTRA */}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Mantra
          </label>

          <textarea
            value={data.mantra ?? ""}
            onChange={(e) =>
              onChange("mantra", e.target.value)
            }
            rows={3}
            placeholder="Listen, understand and support"
            className="input-admin resize-none"
          />
        </div>

        {/* COVERAGE */}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Coverage
          </label>

          <input
            value={data.coverage ?? ""}
            onChange={(e) =>
              onChange("coverage", e.target.value)
            }
            placeholder="Pan India"
            className="input-admin"
          />
        </div>

        {/* EXPERIENCE YEARS */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Experience (Years)
          </label>

          <input
            type="number"
            min={0}
            value={
              data.experienceYears === undefined
                ? ""
                : data.experienceYears
            }
            onChange={(e) => {
              const value = e.target.value;

              onChange(
                "experienceYears",
                value === "" ? undefined : Number(value),
              );
            }}
            placeholder="5"
            className="input-admin"
          />
        </div>

        {/* EXPERIENCE TEXT */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Experience Description
          </label>

          <input
            value={data.experienceText ?? ""}
            onChange={(e) =>
              onChange(
                "experienceText",
                e.target.value,
              )
            }
            placeholder="5+ years of counselling experience"
            className="input-admin"
          />
        </div>

        {/* SORT ORDER */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Sort Order
          </label>

          <input
            type="number"
            min={0}
            value={data.sortOrder ?? 0}
            onChange={(e) =>
              onChange(
                "sortOrder",
                Number(e.target.value),
              )
            }
            className="input-admin"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Lower numbers appear first.
          </p>
        </div>
      </div>
    </section>
  );
}