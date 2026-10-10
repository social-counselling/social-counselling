"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, CheckCircle2, FileText, Search } from "lucide-react";
import type { LegalSection } from "@/data/legalDocuments";

type Props = {
  title: string;
  eyebrow: string;
  description: string;
  updatedLabel: string;
  sections: LegalSection[];
  relatedHref: string;
  relatedLabel: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function LegalDocumentPage({
  title,
  eyebrow,
  description,
  updatedLabel,
  sections,
  relatedHref,
  relatedLabel,
}: Props) {
  const [query, setQuery] = useState("");
  const items = useMemo(
    () =>
      sections.map((section, index) => ({
        ...section,
        id: `${slugify(section.title)}-${index + 1}`,
      })),
    [sections],
  );
  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (section) =>
        section.title.toLowerCase().includes(term) ||
        section.blocks.some((block) => {
          if (block.text?.toLowerCase().includes(term)) return true;
          return block.rows?.some((row) =>
            row.some((cell) => cell.toLowerCase().includes(term)),
          );
        }),
    );
  }, [items, query]);

  return (
    <main className="min-h-screen bg-[#f7faf9] pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#123f49] via-[#175f63] to-[#187c78] text-white">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-white/5 blur-2xl" />
        {/* Keep the page heading clear of the fixed navbar and overlapping logo. */}
        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pt-36 sm:pb-20 lg:px-8 lg:pt-40 lg:pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-white/90 uppercase">
              <FileText className="h-3.5 w-3.5" />
              {eyebrow}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <CheckCircle2 className="h-4 w-4" />
                Social Counselling
              </span>
              <span className="rounded-full bg-white/10 px-3 py-2">{updatedLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pt-8 sm:px-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:px-8 lg:pt-10">
        <aside className="self-start lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-2xl border border-[#dce8e6] bg-white shadow-[0_8px_30px_rgba(24,59,59,0.05)]">
            <div className="border-b border-[#e7efed] p-5">
              <div className="flex items-center gap-2 font-semibold text-[#183b3b]">
                <BookOpen className="h-4 w-4 text-[#147d7e]" />
                On this page
              </div>
              <label className="mt-4 flex items-center gap-2 rounded-xl border border-[#dce8e6] bg-[#f8fbfa] px-3 py-2.5 focus-within:border-[#147d7e]">
                <Search className="h-4 w-4 shrink-0 text-[#718583]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find a topic..."
                  aria-label="Search document sections"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#183b3b] outline-none placeholder:text-[#8a9b9b]"
                />
              </label>
              {query.trim() && (
                <p className="mt-2 text-xs text-[#718583]">
                  {filteredItems.length} matching section{filteredItems.length === 1 ? "" : "s"}
                </p>
              )}
            </div>
            <nav className="max-h-[45vh] overflow-y-auto p-2 lg:max-h-[calc(100vh-245px)]" aria-label="Document contents">
              {filteredItems.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm leading-5 text-[#526a68] transition hover:bg-[#e8f5f4] hover:text-[#0e6667]"
                >
                  {section.title}
                </a>
              ))}
              {filteredItems.length === 0 && (
                <p className="px-3 py-5 text-sm text-[#718583]">
                  No matching section. Try another search.
                </p>
              )}
            </nav>
            <div className="border-t border-[#e7efed] p-4">
              <Link
                href={relatedHref}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#edf7f5] px-3 py-3 text-sm font-semibold text-[#0e6667] transition hover:bg-[#dff0ed]"
              >
                <span>{relatedLabel}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-[#dce8e6] bg-white p-5 shadow-[0_8px_30px_rgba(24,59,59,0.04)] sm:p-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-[#e8f5f4] p-2.5 text-[#147d7e]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#183b3b]">Please read carefully</h2>
                <p className="mt-1 text-sm leading-6 text-[#5f7373]">
                  This page presents the document provided by Social Counselling. Use the contents panel to jump to a section or search for a topic.
                </p>
              </div>
            </div>
          </div>

          {filteredItems.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="scroll-mt-6 rounded-2xl border border-[#dce8e6] bg-white p-5 shadow-[0_8px_30px_rgba(24,59,59,0.035)] sm:p-7"
            >
              <div className="mb-5 flex items-start gap-3 border-b border-[#edf2f1] pb-4">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d7a445]" />
                <h2 className="text-xl font-bold leading-snug text-[#183b3b] sm:text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4">
                {section.blocks.map((block, index) => {
                  if (block.type === "table" && block.rows) {
                    return (
                      <div key={index} className="overflow-x-auto rounded-xl border border-[#dce8e6]">
                        <table className="w-full min-w-[360px] border-collapse text-left text-sm">
                          <thead className="bg-[#e8f5f4] text-[#183b3b]">
                            <tr>
                              {block.rows[0]?.map((cell, cellIndex) => (
                                <th key={cellIndex} className="px-4 py-3 font-semibold">{cell}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.slice(1).map((row, rowIndex) => (
                              <tr key={rowIndex} className="border-t border-[#e7efed] even:bg-[#fbfdfc]">
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="px-4 py-3 leading-6 text-[#526a68]">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  if (block.type === "bullet") {
                    return (
                      <div key={index} className="flex gap-3 pl-1">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#147d7e]" />
                        <p className="whitespace-pre-line text-[15px] leading-7 text-[#526a68]">{block.text}</p>
                      </div>
                    );
                  }
                  return (
                    <p key={index} className="whitespace-pre-line text-[15px] leading-7 text-[#526a68]">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="rounded-2xl bg-[#123f49] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7">
            <div>
              <h2 className="text-lg font-semibold">Need help understanding these documents?</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Contact Social Counselling for questions about the policy or your service.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#123f49] transition hover:bg-[#e8f5f4] sm:mt-0"
            >
              Contact us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
