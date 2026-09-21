"use client";

import Image from "next/image";

import type { ServiceFormData } from "@/types/admin-service";

interface Props {
  data: ServiceFormData;
}

export default function ServicePreview({
  data,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#238BE6]">
            Live Preview
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Service page preview
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-500">
          Preview
        </span>

      </div>

      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">

        {/* IMAGE */}

        {data.heroImageUrl && (
          <div className="relative aspect-[16/9] w-full bg-slate-100">

            <Image
              src={data.heroImageUrl}
              alt=""
              fill
              sizes="430px"
              className="object-cover"
            />

          </div>
        )}

        <div className="p-5">

          {/* NUMBER */}

          {data.serviceNumber && (
            <p className="text-xs font-bold tracking-[0.15em] text-[#238BE6]">
              {data.serviceNumber}
            </p>
          )}

          {/* TITLE */}

          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#183b3b]">
            {data.title ||
              "Service Title"}
          </h2>

          {/* SUBTITLE */}

          <p className="mt-3 text-sm leading-6 text-[#2f7d48]">
            {data.subtitle ||
              "Service subtitle will appear here."}
          </p>

          <div className="my-6 h-px bg-slate-100" />

          {/* SECTIONS */}

          <div className="space-y-7">

            {data.content.sections.map(
              (section, index) => (
                <section
                  key={section.id}
                >

                  <div className="mb-3 flex items-start gap-3">

                    <span className="mt-1 text-[10px] font-bold text-[#238BE6]">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <h3 className="text-lg font-semibold leading-tight text-[#183b3b]">
                      {section.title ||
                        "Section Heading"}
                    </h3>

                  </div>

                  <div className="space-y-3">

                    {section.content.map(
                      (
                        paragraph,
                        paragraphIndex
                      ) =>
                        paragraph && (
                          <p
                            key={
                              paragraphIndex
                            }
                            className="text-sm leading-6 text-slate-600"
                          >
                            {
                              paragraph
                            }
                          </p>
                        )
                    )}

                  </div>

                  {/* SUBSECTIONS */}

                  {section.subSections
                    .length > 0 && (
                    <div className="mt-5 space-y-5 border-l-2 border-[#238BE6]/15 pl-4">

                      {section.subSections.map(
                        (
                          subSection
                        ) => (
                          <div
                            key={
                              subSection.id
                            }
                          >

                            <h4 className="text-sm font-semibold text-[#183b3b]">
                              {
                                subSection.title ||
                                "Subsection"
                              }
                            </h4>

                            <div className="mt-2 space-y-2">

                              {subSection.content.map(
                                (
                                  paragraph,
                                  paragraphIndex
                                ) =>
                                  paragraph && (
                                    <p
                                      key={
                                        paragraphIndex
                                      }
                                      className="text-xs leading-5 text-slate-600"
                                    >
                                      {
                                        paragraph
                                      }
                                    </p>
                                  )
                              )}

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </section>
              )
            )}

          </div>

          {data.content.sections.length ===
            0 && (
            <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">

              <p className="text-sm font-medium text-slate-500">
                Service content will appear here.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}