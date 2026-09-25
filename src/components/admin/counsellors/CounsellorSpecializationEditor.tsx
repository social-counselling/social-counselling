"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";

import type { CounsellorFormData } from "@/types/admin-counsellor";

interface Props {
  data: CounsellorFormData;

  onChange: <K extends keyof CounsellorFormData>(
    field: K,
    value: CounsellorFormData[K],
  ) => void;
}

const DEFAULT_SPECIALIZATIONS = [
  "Marriage Counselling",
  "Youth Counselling",
  "Student Counselling",
  "Teenager Counselling",
  "Individual Counselling",
  "Corporate Employee Counselling",
  "Relationship Counselling",
  "Family Counselling",
  "Career Counselling",
  "Stress Management",
];

export default function CounsellorSpecializationEditor({
  data,
  onChange,
}: Props) {
  const [customSpecialization, setCustomSpecialization] = useState("");

  const toggleSpecialization = (specialization: string) => {
    const exists = data.specializations.includes(specialization);

    if (exists) {
      onChange(
        "specializations",
        data.specializations.filter((item) => item !== specialization),
      );

      return;
    }

    onChange("specializations", [...data.specializations, specialization]);
  };

  const addCustomSpecialization = () => {
    const value = customSpecialization.trim();

    if (!value) {
      return;
    }

    const alreadyExists = data.specializations.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );

    if (alreadyExists) {
      setCustomSpecialization("");
      return;
    }

    onChange("specializations", [...data.specializations, value]);

    setCustomSpecialization("");
  };

  const removeSpecialization = (specialization: string) => {
    onChange(
      "specializations",
      data.specializations.filter((item) => item !== specialization),
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183b3b] text-sm font-bold text-white">
            03
          </span>

          <div>
            <h2 className="text-lg font-semibold text-[#183b3b]">
              Specializations
            </h2>

            <p className="text-xs text-slate-400">
              Select the areas this counsellor specializes in.
            </p>
          </div>
        </div>
      </div>

      {/* PREDEFINED SPECIALIZATIONS */}

      <div className="flex flex-wrap gap-3">
        {DEFAULT_SPECIALIZATIONS.map((specialization) => {
          const selected = data.specializations.includes(specialization);

          return (
            <button
              key={specialization}
              type="button"
              onClick={() => toggleSpecialization(specialization)}
              className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                selected
                  ? "border-[#238BE6] bg-[#238BE6] text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#238BE6] hover:bg-slate-50"
              }`}
            >
              <span>{specialization}</span>

              {selected && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#238BE6]">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CUSTOM SPECIALIZATION */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Add Custom Specialization
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={customSpecialization}
            onChange={(e) => setCustomSpecialization(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomSpecialization();
              }
            }}
            placeholder="Corporate Wellness Counselling"
            className="input-admin flex-1"
          />

          <button
            type="button"
            onClick={addCustomSpecialization}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#183b3b] px-5 text-sm font-semibold text-white transition hover:bg-[#102d2d]"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* SELECTED CUSTOM TAGS */}

      {data.specializations.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Selected Specializations
          </p>

          <div className="flex flex-wrap gap-2">
            {data.specializations.map((specialization) => (
              <span
                key={specialization}
                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {specialization}

                <button
                  type="button"
                  onClick={() => removeSpecialization(specialization)}
                  className="rounded-full text-slate-400 transition hover:text-red-500"
                  aria-label={`Remove ${specialization}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
