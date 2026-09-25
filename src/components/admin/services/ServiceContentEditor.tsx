"use client";

import { Plus } from "lucide-react";

import type {
  ServiceContent,
  ServiceSection,
} from "@/types/admin-service";

import ServiceSectionEditor from "./ServiceSectionEditor";

interface Props {
  content: ServiceContent;
  onChange: (content: ServiceContent) => void;
}

const createSection = (): ServiceSection => ({
  id: crypto.randomUUID(),
  title: "",
  content: [""],
  subSections: [],
});

export default function ServiceContentEditor({
  content,
  onChange,
}: Props) {
  const sections = Array.isArray(content?.sections)
    ? content.sections
    : [];

  const addSection = () => {
    onChange({
      ...content,
      sections: [
        ...sections,
        createSection(),
      ],
    });
  };

  const updateSection = (
    index: number,
    section: ServiceSection
  ) => {
    const updatedSections = [
      ...sections,
    ];

    updatedSections[index] = section;

    onChange({
      ...content,
      sections: updatedSections,
    });
  };

  const deleteSection = (
    index: number
  ) => {
    onChange({
      ...content,
      sections: sections.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183b3b] text-sm font-bold text-white">
            02
          </span>

          <div>
            <h2 className="text-lg font-semibold text-[#183b3b]">
              Content Sections
            </h2>

            <p className="text-xs text-slate-400">
              Add as many sections and subsections as required.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addSection}
          className="hidden items-center gap-2 rounded-xl bg-[#183b3b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0d302f] sm:flex"
        >
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      </div>

      <div className="space-y-4">
        {sections.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
            <p className="text-sm font-semibold text-slate-600">
              No sections yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add your first content section.
            </p>
          </div>
        )}

        {sections.map(
          (section, index) => (
            <ServiceSectionEditor
              key={
                section.id ||
                `section-${index}`
              }
              section={section}
              index={index}
              onChange={(value) =>
                updateSection(
                  index,
                  value
                )
              }
              onDelete={() =>
                deleteSection(index)
              }
            />
          )
        )}
      </div>

      <button
        type="button"
        onClick={addSection}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#238BE6]/40 bg-[#238BE6]/5 py-3 text-sm font-semibold text-[#238BE6] transition hover:bg-[#238BE6]/10 sm:hidden"
      >
        <Plus className="h-4 w-4" />
        Add New Section
      </button>
    </section>
  );
}