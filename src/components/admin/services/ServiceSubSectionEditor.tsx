"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

import type {
  ServiceSubSection,
} from "@/types/admin-service";

interface Props {
  subSection: ServiceSubSection;
  index: number;
  onChange: (
    value: ServiceSubSection
  ) => void;
  onDelete: () => void;
}

export default function ServiceSubSectionEditor({
  subSection,
  index,
  onChange,
  onDelete,
}: Props) {
  const updateContent = (
    index: number,
    value: string
  ) => {
    const content = [
      ...subSection.content,
    ];

    content[index] = value;

    onChange({
      ...subSection,
      content,
    });
  };

  const addParagraph = () => {
    onChange({
      ...subSection,
      content: [
        ...subSection.content,
        "",
      ],
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

      <div className="mb-4 flex items-center justify-between">

        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#238BE6]">
          Subsection {index + 1}
        </p>

        <button
          type="button"
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>

      </div>

      <div className="space-y-4">

        <div>

          <label className="mb-2 block text-xs font-medium text-slate-600">
            Subsection Heading
          </label>

          <input
            value={subSection.title}
            onChange={(e) =>
              onChange({
                ...subSection,
                title: e.target.value,
              })
            }
            placeholder="Academic Pressure"
            className="input-admin"
          />

        </div>

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="text-xs font-medium text-slate-600">
              Content
            </label>

            <button
              type="button"
              onClick={addParagraph}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#238BE6]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>

          </div>

          <div className="space-y-3">

            {subSection.content.map(
              (
                paragraph,
                paragraphIndex
              ) => (
                <textarea
                  key={paragraphIndex}
                  value={paragraph}
                  onChange={(e) =>
                    updateContent(
                      paragraphIndex,
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Enter subsection content..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#238BE6] focus:ring-2 focus:ring-[#238BE6]/10"
                />
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}