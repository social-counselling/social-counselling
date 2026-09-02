import Container from "@/components/common/Container";

import { homeIntroduction } from "@/data/home";

export default function HomeIntroductionSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              {homeIntroduction.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              {homeIntroduction.title}
            </h2>
          </div>

          {/* Right */}
          <div className="max-w-3xl">
            {homeIntroduction.paragraphs.map(
              (paragraph) => (
                <p
                  key={paragraph}
                  className="mb-5 text-base leading-7 text-slate-600 last:mb-0 sm:text-lg sm:leading-8"
                >
                  {paragraph}
                </p>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}