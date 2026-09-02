import Container from "@/components/common/Container";

import { ourRoleData } from "@/data/home";

export default function OurRoleSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {ourRoleData.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {ourRoleData.title}
          </h2>

          <div className="mt-8 space-y-5">
            {ourRoleData.paragraphs.map(
              (paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
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