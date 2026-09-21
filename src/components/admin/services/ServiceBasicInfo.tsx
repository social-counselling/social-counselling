"use client";

import type { ServiceFormData } from "@/types/admin-service";

interface Props {
  data: ServiceFormData;

  onChange: <K extends keyof ServiceFormData>(
    field: K,
    value: ServiceFormData[K]
  ) => void;
}

export default function ServiceBasicInfo({
  data,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183b3b] text-sm font-bold text-white">
            01
          </span>

          <div>
            <h2 className="text-lg font-semibold text-[#183b3b]">
              Basic Service Information
            </h2>

            <p className="text-xs text-slate-400">
              Add the main information about this service.
            </p>
          </div>

        </div>

      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        {/* NUMBER */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Service Number
          </label>

          <input
            value={data.serviceNumber}
            onChange={(e) =>
              onChange(
                "serviceNumber",
                e.target.value
              )
            }
            placeholder="01"
            className="input-admin"
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={data.category}
            onChange={(e) =>
              onChange(
                "category",
                e.target.value
              )
            }
            className="input-admin"
          >
            <option value="">
              Select category
            </option>

           <option value="SOCIAL_COUNSELLING">
  Social Counselling
</option>

<option value="EMPATHETIC_LISTENING">
  Empathetic Listening
</option>
          </select>
        </div>

        {/* TITLE */}

        <div className="sm:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Service Title
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            value={data.title}
            onChange={(e) =>
              onChange(
                "title",
                e.target.value
              )
            }
            placeholder="Teenager / Youth Counselling"
            className="input-admin"
          />

        </div>

        {/* SUBTITLE */}

        <div className="sm:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Subtitle
          </label>

          <textarea
            value={data.subtitle}
            onChange={(e) =>
              onChange(
                "subtitle",
                e.target.value
              )
            }
            rows={3}
            placeholder="Maturity, responsibility and conscious thinking."
            className="input-admin resize-none"
          />

        </div>

        {/* SLUG */}

        <div className="sm:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Slug
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            value={data.slug}
            onChange={(e) =>
              onChange(
                "slug",
                e.target.value
              )
            }
            placeholder="teenager-youth-counselling"
            className="input-admin"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Used in the public service URL.
          </p>

        </div>

        {/* HERO IMAGE */}

        <div className="sm:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Hero Image URL
          </label>

          <input
            value={data.heroImageUrl}
            onChange={(e) =>
              onChange(
                "heroImageUrl",
                e.target.value
              )
            }
            placeholder="/images/services/service.png"
            className="input-admin"
          />

        </div>

        {/* IMAGE */}

        <div className="sm:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Service Image URL
          </label>

          <input
            value={data.imageUrl}
            onChange={(e) =>
              onChange(
                "imageUrl",
                e.target.value
              )
            }
            placeholder="/images/services/service.png"
            className="input-admin"
          />

        </div>

      </div>

    </section>
  );
}