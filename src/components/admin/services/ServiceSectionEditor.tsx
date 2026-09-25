"use client";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  ServiceSection,
  ServiceSubSection,
} from "@/types/admin-service";

import ServiceSubSectionEditor from "./ServiceSubSectionEditor";

interface Props {
  section: ServiceSection;
  index: number;
  onChange: (
    section: ServiceSection
  ) => void;
  onDelete: () => void;
}

export default function ServiceSectionEditor({
  section,
  index,
  onChange,
  onDelete,
}: Props) {
  /*
   * Older services may not have these
   * arrays in their stored content.
   *
   * Always work with safe arrays inside
   * the editor so old services don't crash.
   */
  const paragraphs = Array.isArray(
    section.content
  )
    ? section.content
    : [];

  const subSections = Array.isArray(
    section.subSections
  )
    ? section.subSections
    : [];

  const updateParagraph = (
    paragraphIndex: number,
    value: string
  ) => {
    const content = [
      ...paragraphs,
    ];

    content[paragraphIndex] = value;

    onChange({
      ...section,
      content,
      subSections,
    });
  };

  const addParagraph = () => {
    onChange({
      ...section,
      content: [
        ...paragraphs,
        "",
      ],
      subSections,
    });
  };

  const deleteParagraph = (
    paragraphIndex: number
  ) => {
    const content =
      paragraphs.filter(
        (_, index) =>
          index !== paragraphIndex
      );

    onChange({
      ...section,
      content:
        content.length > 0
          ? content
          : [""],
      subSections,
    });
  };

  const addSubSection = () => {
    const newSubSection: ServiceSubSection = {
      id: crypto.randomUUID(),
      title: "",
      content: [""],
    };

    onChange({
      ...section,
      content: paragraphs,
      subSections: [
        ...subSections,
        newSubSection,
      ],
    });
  };

  const updateSubSection = (
    index: number,
    value: ServiceSubSection
  ) => {
    const updatedSubSections = [
      ...subSections,
    ];

    updatedSubSections[index] =
      value;

    onChange({
      ...section,
      content: paragraphs,
      subSections:
        updatedSubSections,
    });
  };

  const deleteSubSection = (
    index: number
  ) => {
    onChange({
      ...section,
      content: paragraphs,
      subSections:
        subSections.filter(
          (_, i) => i !== index
        ),
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {/* HEADER */}

      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#238BE6]/10 text-xs font-bold text-[#238BE6]">
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>

          <span className="text-sm font-semibold text-[#183b3b]">
            Section {index + 1}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-700"
          >
            <ChevronUp className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-700"
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* BODY */}

      <div className="space-y-5 p-4 sm:p-5">
        {/* HEADING */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Section Heading
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            value={section.title ?? ""}
            onChange={(e) =>
              onChange({
                ...section,
                title:
                  e.target.value,
                content: paragraphs,
                subSections,
              })
            }
            placeholder="Why It Matters"
            className="input-admin"
          />
        </div>

        {/* CONTENT */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Paragraphs
            </label>

            <button
              type="button"
              onClick={addParagraph}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#238BE6]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Paragraph
            </button>
          </div>

          <div className="space-y-3">
            {paragraphs.length === 0 && (
              <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-400">
                No paragraphs available.
              </p>
            )}

            {paragraphs.map(
              (
                paragraph,
                paragraphIndex
              ) => (
                <div
                  key={`${section.id || index}-paragraph-${paragraphIndex}`}
                  className="flex gap-2"
                >
                  <textarea
                    value={paragraph ?? ""}
                    onChange={(e) =>
                      updateParagraph(
                        paragraphIndex,
                        e.target.value
                      )
                    }
                    rows={4}
                    placeholder="Enter paragraph content..."
                    className="min-w-0 flex-1 resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#238BE6] focus:ring-2 focus:ring-[#238BE6]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      deleteParagraph(
                        paragraphIndex
                      )
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* SUBSECTIONS */}

        <div className="border-t border-slate-100 pt-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-[#183b3b]">
              Subsections
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Optional. Use subsections when a section contains multiple topics.
            </p>
          </div>

          <div className="space-y-3">
            {subSections.map(
              (
                subSection,
                subIndex
              ) => (
                <ServiceSubSectionEditor
                  key={
                    subSection.id ||
                    `${section.id || index}-subsection-${subIndex}`
                  }
                  subSection={
                    subSection
                  }
                  index={subIndex}
                  onChange={(value) =>
                    updateSubSection(
                      subIndex,
                      value
                    )
                  }
                  onDelete={() =>
                    deleteSubSection(
                      subIndex
                    )
                  }
                />
              )
            )}
          </div>

          <button
            type="button"
            onClick={addSubSection}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#238BE6]/30 hover:text-[#238BE6]"
          >
            <Plus className="h-4 w-4" />
            Add Subsection
          </button>
        </div>
      </div>
    </div>
  );
}