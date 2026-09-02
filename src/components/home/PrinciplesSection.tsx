import Container from "@/components/common/Container";

import { principlesData } from "@/data/home";

export default function PrinciplesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {principlesData.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {principlesData.title}
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {principlesData.principles.map(
            (principle) => (
              <article
                key={principle.id}
                className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
              >
                <span className="font-serif text-4xl italic text-primary/40">
                  {principle.title.charAt(0)}
                </span>

                <h3 className="mt-4 text-2xl font-semibold text-secondary">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {principle.description}
                </p>
              </article>
            )
          )}
        </div>
      </Container>
    </section>
  );
}