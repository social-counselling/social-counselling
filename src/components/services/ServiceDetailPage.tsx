import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { resolveImageUrl } from "@/lib/image-url";
import Container from "@/components/common/Container";
import type {
  ServiceDetailData,
  StructuredServiceContent,
  StructuredServiceSection,
} from "@/data/service-details";

interface ServiceDetailPageProps {
  service: ServiceDetailData;
  relatedServices: ServiceDetailData[];
}

function cleanLine(value: string) {
  return value
    .replace(/\\$/g, "")
    .replace(/\*\*/g, "")
    .replace(/^\s*>\s*/, "")
    .trim();
}

function isHeading(line: string) {
  const value = line.trim();
  if (!value) return false;

  return (
    /^\*\*.+\*\*$/.test(value) ||
    /^\*\*\s*.+$/.test(value) ||
    /^[A-Z][A-Z\s/&–—'-]{6,}$/.test(cleanLine(value))
  );
}

function isBullet(line: string) {
  return /^\s*[·•-]\s+/.test(line.trim());
}

function isNumbered(line: string) {
  return /^\s*\d+\.\s+/.test(line.trim());
}

function isFlow(line: string) {
  const value = cleanLine(line);
  return value.includes("→") && value.split("→").filter(Boolean).length >= 3;
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-[#123b69]">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: Array<
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullet"; text: string }
    | { type: "number"; text: string }
    | { type: "flow"; items: string[] }
    | { type: "quote"; text: string }
  > = [];

  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.map(cleanLine).filter(Boolean).join(" ");
    if (text) blocks.push({ type: "paragraph", text });
    paragraph = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (isFlow(line)) {
      flushParagraph();
      blocks.push({
        type: "flow",
        items: cleanLine(line)
          .split("→")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      continue;
    }

    if (isHeading(line)) {
      flushParagraph();
      blocks.push({ type: "heading", text: cleanLine(line) });
      continue;
    }

    if (isBullet(line)) {
      flushParagraph();
      blocks.push({
        type: "bullet",
        text: cleanLine(line).replace(/^[·•-]\s+/, ""),
      });
      continue;
    }

    if (isNumbered(line)) {
      flushParagraph();
      blocks.push({
        type: "number",
        text: cleanLine(line),
      });
      continue;
    }

    if (line.startsWith(">>")) {
      flushParagraph();
      blocks.push({
        type: "quote",
        text: cleanLine(line.replace(/^>>\s*/, "")),
      });
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();

  return (
    <div className="space-y-8 sm:space-y-10">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <div key={index} className="pt-2">
              <div className="flex items-center gap-4">
                <h2 className="font-serif text-2xl font-semibold leading-tight text-[#123b69] sm:text-3xl lg:text-4xl">
                  {block.text}
                </h2>
                <span className="hidden h-px w-16 bg-[#168f91]/40 sm:block" />
              </div>
            </div>
          );
        }

        if (block.type === "flow") {
          return (
            <div
              key={index}
              className="grid gap-3 rounded-[24px] border border-[#dcebd5] bg-[#f5faef] p-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {block.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#168f91]/10 text-sm font-bold text-[#168f91]">
                    {itemIndex + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#123b69]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "bullet") {
          return (
            <div
              key={index}
              className="flex gap-3 text-sm leading-7 text-[#294766] sm:text-base"
            >
              <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#168f91] text-white">
                <Check className="h-3 w-3" />
              </span>
              <p>
                <InlineText text={block.text} />
              </p>
            </div>
          );
        }

        if (block.type === "number") {
          return (
            <div
              key={index}
              className="rounded-[22px] border border-white/80 bg-white/75 p-5 shadow-[0_8px_28px_rgba(24,59,59,0.05)] sm:p-6"
            >
              <p className="text-sm leading-7 text-[#294766] sm:text-base">
                <InlineText text={block.text} />
              </p>
            </div>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="rounded-[28px] bg-[#edf6e9] px-6 py-7 text-center font-serif text-xl leading-relaxed text-[#123b69] sm:px-10 sm:text-2xl"
            >
              <InlineText text={block.text} />
            </blockquote>
          );
        }

        return (
          <p
            key={index}
            className="text-sm leading-7 text-[#294766] sm:text-base sm:leading-8"
          >
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

function StructuredContentRenderer({
  content,
}: {
  content: StructuredServiceContent;
}) {
  const sections = Array.isArray(content.sections) ? content.sections : [];

  return (
    <div className="space-y-12 sm:space-y-14">
      {sections.map((section: StructuredServiceSection, index) => {
        const paragraphs = Array.isArray(section.content)
          ? section.content.filter(
              (item): item is string =>
                typeof item === "string" && item.trim().length > 0,
            )
          : [];
        const subSections = Array.isArray(section.subSections)
          ? section.subSections
          : [];

        return (
          <section
            key={section.id || `${section.title}-${index}`}
            className="scroll-mt-24"
          >
            <div className="mb-5 flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#168f91]/10 text-sm font-bold text-[#168f91]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-2xl font-semibold leading-tight text-[#123b69] sm:text-3xl lg:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-3 h-1 w-14 rounded-full bg-[#168f91]/60" />
              </div>
            </div>

            {paragraphs.length > 0 && (
              <div className="ml-0 space-y-4 sm:ml-[52px]">
                {paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.id || index}-p-${paragraphIndex}`}
                    className="text-sm leading-7 text-[#294766] sm:text-base sm:leading-8"
                  >
                    <InlineText text={paragraph} />
                  </p>
                ))}
              </div>
            )}

            {subSections.length > 0 && (
              <div className="mt-6 grid gap-4 sm:ml-[52px] sm:grid-cols-2">
                {subSections.map((subSection, subIndex) => {
                  const items = Array.isArray(subSection.content)
                    ? subSection.content.filter(
                        (item): item is string =>
                          typeof item === "string" && item.trim().length > 0,
                      )
                    : [];

                  return (
                    <article
                      key={subSection.id || `${subSection.title}-${subIndex}`}
                      className="rounded-2xl border border-[#dcebd5] bg-[#fbfdf8] p-5 shadow-[0_6px_20px_rgba(24,59,59,0.04)] sm:p-6"
                    >
                      <h3 className="font-serif text-lg font-semibold leading-snug text-[#123b69] sm:text-xl">
                        {subSection.title}
                      </h3>
                      {items.length > 0 && (
                        <ul className="mt-4 space-y-3">
                          {items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-3 text-sm leading-6 text-[#294766] sm:text-base sm:leading-7"
                            >
                              <Check className="mt-1 h-4 w-4 shrink-0 text-[#168f91]" />
                              <span>
                                <InlineText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function getServiceIntro(content: ServiceDetailData["content"]): string {
  if (typeof content === "string") {
    return cleanLine(content.split("\n").find(Boolean) ?? "");
  }

  for (const section of content.sections ?? []) {
    const firstParagraph = section.content?.find(
      (item) => typeof item === "string" && item.trim(),
    );
    if (firstParagraph) return firstParagraph;
  }

  return "Explore the service, understand the support available, and consider a constructive way forward.";
}

export default function ServiceDetailPage({
  service,
  relatedServices,
}: ServiceDetailPageProps) {
  return (
    <main className="relative overflow-hidden bg-[#fbfcf8] text-[#183b42]">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_rgba(205,232,194,0.62),_transparent_48%),linear-gradient(135deg,#f4faef_0%,#fbfcf8_55%,#edf7f3_100%)] pt-28 sm:pt-32 lg:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-[#cce8d8]/45 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-[28%] h-64 w-64 rounded-full bg-[#e5efc9]/55 blur-3xl" />
        <Image
          src="/images/services/section-leaf-leftFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 w-[90px] opacity-55 sm:w-[130px] lg:w-[180px] xl:w-[220px]"
        />

        <Image
          src="/images/services/section-leaf-rightFull.png"
          alt=""
          width={300}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-0 w-[90px] opacity-50 sm:w-[130px] lg:w-[180px] xl:w-[220px]"
        />

        <Container className="relative z-10">
          <div className="grid items-center gap-9 pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:pb-24 xl:gap-16">
            <div className="order-2 lg:order-1">
              <Link
                href="/services"
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d5e8d7] bg-white/75 px-4 py-2 text-xs font-semibold tracking-wide text-[#347d70] shadow-sm backdrop-blur transition hover:border-[#168f91]/50 hover:bg-white"
              >
                <span>Services</span>
                <ChevronRight className="h-4 w-4" />
                <span>{service.title}</span>
              </Link>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#dff0e2] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#286b59]">
                <Sparkles className="h-3.5 w-3.5" /> Thoughtful support, at your pace
              </div>

              <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-[#123b69] sm:text-5xl lg:text-[58px] xl:text-[66px]">
                {service.title}
              </h1>

              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#347d70] sm:text-xl">
                {service.subtitle}
              </p>

              <div className="mt-6 max-w-2xl">
                <p className="text-[15px] leading-7 text-[#49636a] sm:text-base sm:leading-8">
                  {getServiceIntro(service.content)}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book-session"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#147f79] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(20,127,121,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#106d68] hover:shadow-[0_14px_30px_rgba(20,127,121,0.28)]"
                >
                  Book a Session
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#c9ded7] bg-white/75 px-6 py-3.5 text-sm font-bold text-[#234d55] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#147f79]/40 hover:bg-white"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto w-full max-w-[760px]">
                <div aria-hidden="true" className="absolute -inset-3 rounded-[38px] bg-gradient-to-br from-[#cce6d1] via-white to-[#c9e6e1] opacity-80 blur-sm" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_28px_70px_rgba(24,59,59,0.16)] sm:rounded-[38px]">
                  <Image
                    src={resolveImageUrl(service.image)}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123b69]/35 via-transparent to-white/10" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="max-w-[75%] rounded-2xl border border-white/40 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md sm:px-5 sm:py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#398678]">A space for growth</p>
                      <p className="mt-1 font-serif text-lg font-semibold leading-tight text-[#123b69] sm:text-xl">Support that meets you where you are.</p>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#147f79] shadow-lg backdrop-blur sm:flex">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#fcfdf9] to-transparent" />
      </section>

      {/* =====================================================
          QUICK VALUE STRIP
          ===================================================== */}

      <section className="relative z-10 -mt-7 px-4 sm:-mt-10">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[26px] border border-[#e0ece0] bg-white/95 shadow-[0_18px_50px_rgba(24,59,59,0.09)] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["A Safe Space", "Open, non-judgmental and supportive."],
            [
              "Greater Clarity",
              "Understand the situation and perspectives better.",
            ],
            [
              "Conscious Thinking",
              "Examine choices, expectations and implications.",
            ],
            [
              "Constructive Way Forward",
              "Move forward with greater understanding.",
            ],
          ].map(([title, text], index) => {
            const ValueIcon = [HeartHandshake, Sparkles, ShieldCheck, Leaf][index];
            return (
              <div
                key={title}
                className="group border-b border-[#e4eee3] px-5 py-6 text-center transition-colors duration-300 hover:bg-[#f7fbf5] last:border-b-0 sm:px-6 sm:py-7 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5e9] text-[#278476] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#147f79] group-hover:text-white">
                  <ValueIcon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#123b69] sm:text-base">{title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-[#587078] sm:text-sm">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          COMPLETE CLIENT CONTENT
          ===================================================== */}

      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
        <Image
          src="/images/contact/section-leaf-left.png"
          alt=""
          width={160}
          height={600}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 hidden w-[75px] opacity-25 md:block lg:w-[95px]"
        />

        <Image
          src="/images/contact/section-leaf-right.png"
          alt=""
          width={160}
          height={600}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[75px] opacity-25 md:block lg:w-[95px]"
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#edf7ed] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#328275]">
                <Leaf className="h-3.5 w-3.5" /> Explore the support
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#123b69] sm:text-4xl lg:text-5xl">
                A little more clarity can change a lot.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#587078] sm:text-base">
                Learn what this service offers and find the approach that feels right for you.
              </p>

              <div className="mt-5 flex justify-center">
                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={140}
                  height={40}
                  className="h-auto w-[95px] opacity-70"
                />
              </div>
            </div>

            {typeof service.content === "string" ? (
              <ContentRenderer content={service.content} />
            ) : (
              <StructuredContentRenderer content={service.content} />
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          RELATED SERVICES
          ===================================================== */}

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f2f9ef_0%,#f8fbf6_100%)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#328275]">Keep exploring</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#123b69] sm:text-4xl">Related services</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#587078] sm:text-base">You may find another kind of support that fits your current needs.</p>
              </div>
              <Link href="/services" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#147f79] transition hover:gap-3">
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group overflow-hidden rounded-[26px] border border-[#e1ece0] bg-white shadow-[0_8px_26px_rgba(24,59,59,0.055)] transition duration-300 hover:-translate-y-1.5 hover:border-[#b9d9c6] hover:shadow-[0_20px_45px_rgba(24,59,59,0.12)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf6e9]">
                    <Image
                      src={resolveImageUrl(item.image)}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123b69]/25 to-transparent opacity-70" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-lg font-semibold leading-tight text-[#123b69]">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#294766]">
                      {item.subtitle}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#147f79]">
                      Explore service
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <section className="relative overflow-hidden bg-[#edf6e9] py-16 sm:py-20 lg:py-24">
        <Image
          src="/images/services/bottom-left-leaves.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-[100px] opacity-50 sm:w-[150px] lg:w-[210px]"
        />

        <Image
          src="/images/services/bottom-right-leaves.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-[100px] opacity-50 sm:w-[150px] lg:w-[210px]"
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/80 bg-white/55 px-6 py-10 text-center shadow-[0_18px_50px_rgba(24,59,59,0.06)] backdrop-blur sm:px-12 sm:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#328275] shadow-sm">
              <HeartHandshake className="h-4 w-4" /> You do not have to figure it out alone
            </span>

            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#123b69] sm:text-4xl lg:text-5xl">
              A different perspective can make all the difference.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#587078] sm:text-base">
              Take the first step towards understanding, connection and a more constructive way forward.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/book-session"
                className="group inline-flex items-center gap-2 rounded-full bg-[#147f79] px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(20,127,121,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#106d68]"
              >
                Book a Session
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#c9ded7] bg-white px-8 py-3.5 text-sm font-bold text-[#234d55] transition hover:border-[#147f79]/40 hover:bg-[#f7fbf5]"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
