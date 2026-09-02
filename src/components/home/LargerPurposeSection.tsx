import Container from "@/components/common/Container";

import { largerPurposeData } from "@/data/home";

export default function LargerPurposeSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {largerPurposeData.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {largerPurposeData.title}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {largerPurposeData.description}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {largerPurposeData.journey.map(
            (item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <span className="text-xs font-semibold tracking-[0.15em] text-primary">
                  0{index + 1}
                </span>

                <p className="mt-3 text-sm font-semibold leading-5 text-secondary">
                  {item.title}
                </p>
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}