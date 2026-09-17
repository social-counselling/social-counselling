import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import Container from "@/components/common/Container";
import type { ServiceDetailData } from "@/data/service-details";

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

export default function ServiceDetailPage({
  service,
  relatedServices,
}: ServiceDetailPageProps) {
  return (
    <main className="relative overflow-hidden bg-[#fcfdf9]">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative overflow-hidden bg-[#f4faef] pt-28 sm:pt-32 lg:pt-36">
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
          <div className="grid items-center gap-8 pb-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:pb-20 xl:gap-14">

            <div className="order-2 lg:order-1">
              <Link
                href="/services"
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#168f91] transition hover:text-blue-600"
              >
                <span>Services</span>
                <ChevronRight className="h-4 w-4" />
                <span>{service.title}</span>
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-[#168f91]">01</span>
                <span className="h-px w-12 bg-[#168f91]/50" />
              </div>

              <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#123b69] sm:text-5xl lg:text-[56px] xl:text-[62px]">
                {service.title}
              </h1>

              <p className="mt-5 max-w-2xl text-lg font-semibold leading-7 text-[#2f7d48] sm:text-xl">
                {service.subtitle}
              </p>

              <div className="mt-6 max-w-2xl">
                <p className="text-sm leading-7 text-[#294766] sm:text-base sm:leading-8">
                  {cleanLine(service.content.split("\n").find(Boolean) ?? "")}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/book-session"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Book a Session
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#123b69]/25 bg-white/70 px-6 py-3 text-sm font-semibold text-[#123b69] transition hover:bg-white"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[680px] overflow-hidden rounded-[34px] bg-white/60 shadow-[0_20px_55px_rgba(24,59,59,0.10)]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>

          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#fcfdf9] to-transparent" />
      </section>

      {/* =====================================================
          QUICK VALUE STRIP
          ===================================================== */}

      <section className="relative z-10 -mt-5 px-4 sm:-mt-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-white/80 bg-[#f5faef]/95 shadow-[0_12px_40px_rgba(24,59,59,0.08)] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["A Safe Space", "Open, non-judgmental and supportive."],
            ["Greater Clarity", "Understand the situation and perspectives better."],
            ["Conscious Thinking", "Examine choices, expectations and implications."],
            ["Constructive Way Forward", "Move forward with greater understanding."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="border-b border-[#dcebd5] px-5 py-6 text-center last:border-b-0 sm:px-6 sm:py-7 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div className="mx-auto mb-3 h-9 w-9 rounded-full bg-[#168f91]/10" />
              <h3 className="text-sm font-bold text-[#123b69] sm:text-base">
                {title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#294766] sm:text-sm">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          COMPLETE CLIENT CONTENT
          ===================================================== */}

      <section className="relative overflow-hidden bg-white py-14 sm:py-18 lg:py-24">

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
            <div className="mb-10 text-center sm:mb-14">
              <p className="font-Unkempt text-xl font-bold tracking-[0.22em] text-[#168f91] sm:text-2xl">
                {service.title}
              </p>

              <div className="mt-4 flex justify-center">
                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={140}
                  height={40}
                  className="h-auto w-[95px] opacity-70"
                />
              </div>
            </div>

            <ContentRenderer content={service.content} />
          </div>
        </Container>
      </section>

      {/* =====================================================
          RELATED SERVICES
          ===================================================== */}

      <section className="relative overflow-hidden bg-[#f4faef] py-14 sm:py-18 lg:py-20">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-serif text-3xl font-semibold text-[#123b69] sm:text-4xl">
                Related Services
              </h2>
              <span className="h-px w-16 bg-[#168f91]/40" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_8px_28px_rgba(24,59,59,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(24,59,59,0.10)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#edf6e9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-contain transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold leading-tight text-[#123b69]">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#294766]">
                      {item.subtitle}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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

      <section className="relative overflow-hidden bg-[#edf6e9] py-16 sm:py-20">
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-Unkempt text-xl font-bold tracking-[0.24em] text-[#168f91] sm:text-2xl">
              A Different Perspective
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#123b69] sm:text-4xl lg:text-5xl">
              Sometimes, a different perspective
              can make all the difference.
            </h2>

            <div className="mt-6 flex justify-center">
              <Link
                href="/book-session"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Book a Session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
