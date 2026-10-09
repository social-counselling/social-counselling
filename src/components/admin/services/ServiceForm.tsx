"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

import type { ServiceFormData } from "@/types/admin-service";

import {
  createAdminService,
  updateAdminService,
} from "@/services/admin/services.api";

import ServiceBasicInfo from "./ServiceBasicInfo";
import ServiceContentEditor from "./ServiceContentEditor";
import ServicePreview from "./ServicePreview";

interface Props {
  mode?: "create" | "edit";
  initialData?: ServiceFormData;
  serviceId?: string;
}

const emptyService: ServiceFormData = {
  category: "",
  title: "",
  subtitle: "",
  slug: "",

  heroImageUrl: "",
  imageUrl: "",

  content: {
    sections: [],
  },

  isActive: true,
  sortOrder: 0,
};

export default function ServiceForm({
  mode = "create",
  initialData,
  serviceId,
}: Props) {
  const [formData, setFormData] = useState<ServiceFormData>(
    initialData ?? emptyService,
  );

  const [saving, setSaving] = useState(false);

  const updateField = <K extends keyof ServiceFormData>(
    field: K,
    value: ServiceFormData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const payload: ServiceFormData = {
        ...formData,
      };

      if (mode === "edit" && serviceId) {
        const updatedService = await updateAdminService(serviceId, payload);

        console.log("SERVICE UPDATED:", updatedService);
      } else {
        const createdService = await createAdminService(payload);

        console.log("SERVICE CREATED:", createdService);
      }

      window.location.href = "/admin/services";
    } catch (error) {
      console.error(
        mode === "edit" ? "UPDATE SERVICE ERROR:" : "CREATE SERVICE ERROR:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : mode === "edit"
            ? "Failed to update service"
            : "Failed to create service",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* TOP BAR */}

      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin/services"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#238BE6]">
                Services
              </p>

              <h1 className="truncate text-lg font-semibold text-[#183b3b]">
                {mode === "edit" ? "Edit Service" : "Create New Service"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex h-10 items-center gap-2 rounded-xl bg-[#238BE6] px-4 text-sm font-semibold text-white transition hover:bg-[#1477ca] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />

              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}

      <main className="p-5 sm:p-6 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
          {/* FORM */}

          <div className="min-w-0 space-y-6">
            <ServiceBasicInfo data={formData} onChange={updateField} />

            <ServiceContentEditor
              content={formData.content}
              onChange={(content) => updateField("content", content)}
            />
          </div>

          {/* PREVIEW */}

          <div className="xl:sticky xl:top-[96px] xl:self-start">
            <ServicePreview data={formData} />
          </div>
        </div>
      </main>
    </div>
  );
}
