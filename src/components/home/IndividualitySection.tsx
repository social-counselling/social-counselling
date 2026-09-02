import Container from "@/components/common/Container";

import { individualityData } from "@/data/home";

export default function IndividualitySection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {individualityData.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {individualityData.title}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {individualityData.description}
          </p>
        </div>
      </Container>
    </section>
  );
}