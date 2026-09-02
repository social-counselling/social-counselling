import Container from "@/components/common/Container";

import { counsellingHelpData } from "@/data/home";

export default function CounsellingHelpSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {counsellingHelpData.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              {counsellingHelpData.title}
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-600">
              {counsellingHelpData.introduction}
            </p>

            <p className="mt-4 text-base font-medium leading-7 text-secondary">
              {counsellingHelpData.preparation}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {counsellingHelpData.situations.map(
              (item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-secondary">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}