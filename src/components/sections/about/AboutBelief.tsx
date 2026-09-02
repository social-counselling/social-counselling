import Container from "@/components/common/Container";
import { aboutData } from "@/data/about";

export default function AboutBelief() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-primary
              "
            >
              {aboutData.belief.eyebrow}
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-bold
                leading-tight
                text-secondary
                sm:text-4xl
                lg:text-5xl
              "
            >
              {aboutData.belief.title}
            </h2>
          </div>

          <div className="space-y-6">
            {aboutData.belief.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="
                    text-base
                    leading-8
                    text-slate-600
                    sm:text-lg
                  "
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