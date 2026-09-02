import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import { homeClosingData } from "@/data/home";

export default function HomeClosingSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {homeClosingData.title}
          </h2>

          <p className="mt-3 font-serif text-2xl italic text-primary">
            {homeClosingData.tagline}
          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            {homeClosingData.description}
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              href={homeClosingData.button.href}
              size="lg"
            >
              {homeClosingData.button.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}