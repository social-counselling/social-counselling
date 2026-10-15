"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  HeartHandshake,
  Info,
  MessageCircle,
  Search,
  ShieldAlert,
  Scale,
  Target,
  X,
} from "lucide-react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const boundaries = [
  {
    id: "agreement",
    number: "01",
    title: "We don't simply agree with you",
    short:
      "Your perspective is the starting point for understanding—not an established fact.",
    detail:
      "We may ask questions, explore the circumstances and consider different perspectives. If we believe your thinking is incomplete or heading in an unconstructive direction, we will communicate that respectfully. Our objective is to help you understand your thoughts better, not automatically validate every thought.",
    icon: MessageCircle,
    tone: "teal",
    takeaway: "Understanding matters more than automatic agreement.",
  },
  {
    id: "taking-sides",
    number: "02",
    title: "We don't take sides just to help someone win",
    short:
      "A disagreement is rarely as simple as one person being right and the other being wrong.",
    detail:
      "We seek to understand what happened, why you see it this way, what the other person may be experiencing, the role you may have played and what could be a constructive way forward. Sometimes one position may be more appropriate, but the aim is not to win an argument.",
    icon: Scale,
    tone: "gold",
    takeaway: "We look for a thoughtful way forward, not a winner.",
  },
  {
    id: "beliefs",
    number: "03",
    title: "We don't impose personal beliefs",
    short:
      "Guidance considers your circumstances instead of imposing someone else's way of life.",
    detail:
      "Our counsellors recognise that personal background, culture and experience can influence how people see the world. Cultural practices and traditions may be relevant, but personal preferences should not automatically be presented as universal truths. Guidance should be based on the situation.",
    icon: HeartHandshake,
    tone: "blue",
    takeaway: "Your circumstances deserve to be understood on their own terms.",
  },
  {
    id: "clinical",
    number: "04",
    title:
      "We are not a medical, psychiatric or clinical psychological service",
    short:
      "We offer social and emotional support for life situations—not diagnosis or clinical treatment.",
    detail:
      "Social Counselling can offer perspective around everyday situations such as relationship difficulties, family conflict, teenage issues and personal challenges. We do not diagnose, treat or manage medical, psychiatric or clinical psychological conditions, and we do not provide clinical therapy. If specialised intervention appears necessary, seek appropriate professional help.",
    icon: ShieldAlert,
    tone: "rose",
    takeaway:
      "When specialised care is needed, seek the appropriate professional.",
  },
  {
    id: "legal",
    number: "05",
    title: "We are not a legal or dispute resolution service",
    short:
      "Legal questions and proceedings must be handled by appropriate professionals or authorities.",
    detail:
      "We do not provide legal advice or opinions, legal representation, litigation guidance, or advice on police and court proceedings. Where a matter has an existing or potential legal dimension, it falls outside the scope of Social Counselling and should be addressed by the appropriate professional or competent authority.",
    icon: Scale,
    tone: "gold",
    takeaway: "Legal matters belong with the appropriate professional.",
  },
  {
    id: "outcomes",
    number: "06",
    title: "We don't promise a particular outcome",
    short:
      "We provide empathy, support, perspective and guidance—but cannot guarantee results.",
    detail:
      "We cannot guarantee that another person will change, a relationship will be restored, a family dispute will be resolved, a counselee will accept our guidance or a particular outcome will be achieved. People make their own choices, and circumstances can involve factors beyond anyone's control.",
    icon: Target,
    tone: "teal",
    takeaway: "Guidance is offered; a specific result cannot be promised.",
  },
  {
    id: "control",
    number: "07",
    title: "We don't run your life for you",
    short:
      "We help you think through your circumstances; your choices remain yours.",
    detail:
      "We may make recommendations when appropriate, but we do not dictate every conversation, decision or action. We aim to offer a broader perspective and a constructive framework so you can navigate your own circumstances with greater clarity and confidence.",
    icon: Compass,
    tone: "blue",
    takeaway: "You remain in control of your decisions.",
  },
];

const toneStyles: Record<
  string,
  { icon: string; number: string; tag: string }
> = {
  teal: {
    icon: "bg-[#e4f4ef] text-[#147d7e]",
    number: "bg-[#e4f4ef] text-[#147d7e]",
    tag: "bg-[#edf7f4] text-[#17685f]",
  },
  gold: {
    icon: "bg-[#fbf2e3] text-[#a16a17]",
    number: "bg-[#fbf2e3] text-[#8d611e]",
    tag: "bg-[#fbf4e8] text-[#8d611e]",
  },
  blue: {
    icon: "bg-[#eaf1f9] text-[#315f8c]",
    number: "bg-[#eaf1f9] text-[#315f8c]",
    tag: "bg-[#edf3fa] text-[#315f8c]",
  },
  rose: {
    icon: "bg-[#fff0ee] text-[#b54d45]",
    number: "bg-[#fff0ee] text-[#a84640]",
    tag: "bg-[#fff0ee] text-[#a84640]",
  },
};

export default function WhatWeAreNotPage() {
  const [expanded, setExpanded] = useState<string | null>("agreement");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredBoundaries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return boundaries;
    return boundaries.filter((item) =>
      `${item.title} ${item.short} ${item.detail} ${item.takeaway}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const toggle = (id: string) => {
    setExpanded((current) => (current === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-[#f7faf9] pb-16">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#123f49] via-[#175f63] to-[#187c78] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-20 top-16 h-44 w-44 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 left-[40%] h-72 w-72 rounded-full bg-white/5 blur-2xl" />
        <Container className="relative grid items-center gap-10 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-12 lg:pb-20 lg:pt-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              <Info className="h-4 w-4" />
              Our approach & boundaries
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              What Social Counselling{" "}
              <span className="text-[#d7e9cf]">Is Not</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Knowing what we do also means being clear about what we don’t. We
              listen, understand, offer perspective and guide constructively—we
              don’t take control of your life or make decisions on your behalf.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href="#our-boundaries"
                variant="secondary"
                size="lg"
                className="bg-white !text-[#123f49] hover:!bg-[#eaf5f1]"
              >
                Explore our boundaries <ArrowDown className="h-4 w-4" />
              </Button>
              <a
                href="#crisis-support"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Important safety information
              </a>
            </div>
            <div className="mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: MessageCircle,
                  label: "We listen",
                  copy: "Without automatic agreement",
                },
                {
                  icon: Compass,
                  label: "We guide",
                  copy: "Without taking control",
                },
                {
                  icon: HeartHandshake,
                  label: "We support",
                  copy: "Without taking sides to win",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#d7e9cf]" />
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/70">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[600px] lg:justify-self-end">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-white/20 sm:-right-5 sm:-top-5 sm:h-32 sm:w-32" />
            <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-full bg-[#d7e9cf]/15 blur-2xl" />
 
            {/* Keep the image's native 3:2 ratio so the sign and person remain visible. */}
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] border border-white/20 bg-[#dce9dd] shadow-2xl shadow-[#062e35]/25 sm:rounded-[2rem]">
              <Image
                src="/images/What-we-are-NOT.png"
                alt="A garden sign illustrating the boundaries of Social Counselling"
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 46vw"
                className="object-contain"
              />
            </div>

            <div className="absolute -left-2 -top-4 flex max-w-[calc(100%-1rem)] items-center gap-2 rounded-full border border-white/70 bg-[#f7fbf7]/95 px-3 py-2 text-xs font-semibold text-[#174d50] shadow-lg backdrop-blur-md sm:-left-4 sm:-top-3 sm:px-4 sm:py-3 sm:text-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff2e9] text-[#147d7e]">
                <HeartHandshake className="h-4 w-4" />
              </span>
              Respectful, constructive guidance
            </div>

            <div className="relative mt-4 rounded-2xl border border-white/60 bg-white/[0.94] p-4 text-[#183b3b] shadow-lg shadow-[#062e35]/10 backdrop-blur sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#147d7e]">
                Our promise
              </p>
              <p className="mt-2 text-base font-semibold leading-snug sm:text-lg">
                A thoughtful space for clarity, perspective and your own
                choices.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-8 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
          <section id="our-boundaries" className="min-w-0 scroll-mt-28">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                  Clear expectations
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#183b3b] sm:text-3xl">
                  What you can expect from us
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f7373] sm:text-base">
                  Explore each boundary to understand how we approach
                  conversations and where our service has limits.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#c9ded8] bg-white px-4 text-sm font-semibold text-[#0e6667] transition hover:bg-[#edf7f4] sm:self-auto"
              >
                {showAll ? "Collapse all" : "Expand all"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <label className="mt-6 flex items-center gap-3 rounded-2xl border border-[#dce8e6] bg-white px-4 py-3.5 shadow-[0_4px_18px_rgba(24,59,59,0.03)] focus-within:border-primary">
              <Search className="h-5 w-5 shrink-0 text-[#718583]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics, e.g. clinical care or outcomes"
                aria-label="Search counselling boundaries"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#183b3b] outline-none placeholder:text-[#8a9b9b]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="rounded-full p-1 text-[#718583] transition hover:bg-[#edf5f2] hover:text-[#183b3b]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <p className="mt-2 text-xs text-[#718583]" aria-live="polite">
              {filteredBoundaries.length} of {boundaries.length} topics
              {query.trim() ? " match your search" : " explained"}
            </p>

            <div className="mt-4 space-y-3">
              {filteredBoundaries.map((item) => {
                const Icon = item.icon;
                const isOpen = showAll || expanded === item.id;
                const tone = toneStyles[item.tone];
                return (
                  <Card
                    key={item.id}
                    className={`overflow-hidden transition-all duration-200 ${isOpen ? "border-[#b9d7ce] shadow-[0_12px_32px_rgba(24,59,59,0.07)]" : "hover:border-[#c6ddd6]"}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`boundary-${item.id}`}
                      onClick={() => {
                        setShowAll(false);
                        toggle(item.id);
                      }}
                      className="flex w-full items-start gap-3 p-4 text-left sm:gap-4 sm:p-5"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${tone.number}`}
                          >
                            {item.number}
                          </span>
                          <span className="text-base font-semibold leading-6 text-[#183b3b] sm:text-lg">
                            {item.title}
                          </span>
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-[#5f7373]">
                          {item.short}
                        </span>
                      </span>
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2f7f5] text-[#147d7e]">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        id={`boundary-${item.id}`}
                        className="px-4 pb-5 sm:pl-[4.75rem] sm:pr-5"
                      >
                        <div className="border-t border-[#edf2f1] pt-4">
                          <p className="text-sm leading-7 text-[#526a68]">
                            {item.detail}
                          </p>
                          <div
                            className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm leading-6 ${tone.tag}`}
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                              <strong>In practice:</strong> {item.takeaway}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
              {filteredBoundaries.length === 0 && (
                <Card className="p-8 text-center">
                  <Search className="mx-auto h-8 w-8 text-[#8a9b9b]" />
                  <h3 className="mt-3 font-semibold text-[#183b3b]">
                    No matching topics
                  </h3>
                  <p className="mt-1 text-sm text-[#5f7373]">
                    Try searching for “beliefs”, “legal”, “clinical” or
                    “outcomes”.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setQuery("")}
                  >
                    Clear search
                  </Button>
                </Card>
              )}
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <Card className="p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5f4] text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#183b3b]">
                Our guiding principle
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5f7373]">
                We help you see your circumstances more clearly, consider
                constructive options and make your own decisions.
              </p>
              <div className="mt-4 space-y-2.5 border-t border-[#e7efed] pt-4">
                {[
                  "We guide. We don't control.",
                  "We challenge. We don't judge.",
                  "We support. We don't take over.",
                ].map((line) => (
                  <p
                    key={line}
                    className="flex gap-2 text-sm font-semibold leading-5 text-[#17685f]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0" /> {line}
                  </p>
                ))}
              </div>
            </Card>

            <div id="crisis-support" className="scroll-mt-28">
              <Card className="border-[#efd3b6] bg-[#fff8ef] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffead4] text-[#a34c17]">
                    <ShieldAlert className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold leading-6 text-[#783b16]">
                      Emergency & crisis warning
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#774b2e]">
                      Social Counselling is not a crisis intervention service or
                      suicide prevention helpline. If you or someone you know is
                      experiencing severe distress, a mental health emergency or
                      thoughts of self-harm, contact national emergency services
                      or a crisis helpline immediately.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-5">
              <p className="text-sm font-semibold text-[#183b3b]">
                Need to understand our services?
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5f7373]">
                Review our service information before deciding whether Social
                Counselling is right for your situation.
              </p>
              <Button
                href="/services"
                variant="outline"
                size="md"
                className="mt-4 w-full"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          </aside>
        </div>

        <section className="mt-10 rounded-3xl bg-gradient-to-r from-[#e8f3ee] via-[#f1f7f3] to-[#f8f4e9] p-6 sm:mt-14 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                A thoughtful way forward
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#183b3b] sm:text-3xl">
                Your choices remain your own.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#526a68] sm:text-base">
                Our role is to offer empathy, support, perspective and guidance
                while respecting your ability to decide what comes next.
              </p>
            </div>
            <Button
              href="/services"
              size="lg"
              className="shrink-0 self-start sm:self-auto"
            >
              Explore our services <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
