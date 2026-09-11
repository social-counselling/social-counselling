import Image from "next/image";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import { homeClosingData } from "@/data/home";

export default function HomeClosingSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7fcf8]
        py-16
        sm:py-20
        lg:py-24
      "
    >

      {/* =====================================================
          SOFT CENTER GLOW
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[320px]
          w-[320px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/5
          blur-3xl
          sm:h-[420px]
          sm:w-[420px]
          lg:h-[520px]
          lg:w-[520px]
        "
      />

      {/* =====================================================
          TOP LEFT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-top-left7.png"
        alt=""
        width={255}
        height={245}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          w-[85px]
          opacity-35
          sm:w-[120px]
          lg:w-[175px]
          xl:w-[210px]
        "
      />

      {/* =====================================================
          TOP RIGHT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-top-right 3.png"
        alt=""
        width={240}
        height={225}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          w-[80px]
          opacity-30
          sm:w-[115px]
          lg:w-[165px]
          xl:w-[200px]
        "
      />

      {/* =====================================================
          BOTTOM LEFT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-bottom-left1.png"
        alt=""
        width={220}
        height={290}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-0
          w-[85px]
          opacity-30
          sm:w-[120px]
          lg:w-[175px]
          xl:w-[210px]
        "
      />

      {/* =====================================================
          BOTTOM RIGHT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-bottom-right1.png"
        alt=""
        width={285}
        height={270}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          z-0
          w-[90px]
          opacity-30
          sm:w-[125px]
          lg:w-[180px]
          xl:w-[215px]
        "
      />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <Container className="relative z-10">

        <div className="mx-auto max-w-3xl text-center">

          {/* Small decorative eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-primary/25 sm:w-16" />

            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="h-auto w-[75px] opacity-65 sm:w-[90px]"
            />

            <span className="h-px w-12 bg-primary/25 sm:w-16" />
          </div>

          {/* Main title */}
          <h2
            className="
              text-3xl
              font-semibold
              tracking-tight
              text-secondary
              sm:text-4xl
              lg:text-5xl
            "
          >
            {homeClosingData.title}
          </h2>

          {/* Tagline */}
          <p
            className="
              mt-4
              font-serif
              text-xl
              italic
              text-primary
              sm:text-2xl
              lg:text-3xl
            "
          >
            {homeClosingData.tagline}
          </p>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-600
              sm:text-lg
              sm:leading-8
            "
          >
            {homeClosingData.description}
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center sm:mt-9">
            <Button
              href={homeClosingData.button.href}
              size="lg"
              className="
                rounded-full
                px-8
                shadow-[0_8px_25px_rgba(24,59,59,0.12)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_12px_30px_rgba(24,59,59,0.18)]
              "
            >
              {homeClosingData.button.label}
            </Button>
          </div>

        </div>

      </Container>

      {/* =====================================================
          BOTTOM SOFT WAVE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-[30px]
          overflow-hidden
          opacity-70
          sm:h-[40px]
        "
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            fill="#E8F5E9"
            d="
              M0 55
              C160 80 280 82 420 65
              C570 47 650 38 780 52
              C920 68 1030 82 1160 66
              C1280 51 1360 40 1440 48
              L1440 100
              L0 100
              Z
            "
          />
        </svg>
      </div>

    </section>
  );
}