import Container from "@/components/common/Container";

import { socialCounsellingData } from "@/data/home";

export default function SocialCounsellingSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
            {socialCounsellingData.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {socialCounsellingData.title}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          {socialCounsellingData.paragraphs.map(
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
      </Container>
    </section>
  );
}