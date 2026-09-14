import Image from "next/image";

import Container from "@/components/common/Container";
import { visionMissionData } from "@/data/visionMission";


export default function VisionSection() {
  const vision = visionMissionData.vision;

  return (
    <section
      className="
        relative
        mt-22
        overflow-hidden
        bg-[#fcfdf9]
        py-14
        sm:py-18
        lg:py-24
        xl:py-28
      "
    >

      {/* =====================================================
          TOP LEFT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/vision-mission/leaf-top-left.png"
        alt=""
        width={200}
        height={200}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          w-[75px]
          opacity-45
          sm:w-[90px]
          md:w-[120px]
          lg:w-[150px]
          xl:w-[190px]
        "
      />

      {/* =====================================================
          TOP RIGHT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/vision-mission/leaf-top-right.png"
        alt=""
        width={260}
        height={280}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          w-[70px]
          opacity-35
          sm:w-[100px]
          md:w-[125px]
          lg:w-[165px]
          xl:w-[205px]
        "
      />

      {/* =====================================================
          BOTTOM LEFT FLOWERS
          ===================================================== */}

      <Image
        src="/images/vision-mission/flower-left.png"
        alt=""
        width={260}
        height={300}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-0
          w-[75px]
          opacity-40
          sm:w-[105px]
          md:w-[130px]
          lg:w-[170px]
          xl:w-[215px]
        "
      />

      {/* =====================================================
          BOTTOM RIGHT FLOWERS
          ===================================================== */}

      <Image
        src="/images/vision-mission/flower-right.png"
        alt=""
        width={260}
        height={300}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          z-0
          w-[80px]
          opacity-40
          sm:w-[110px]
          md:w-[135px]
          lg:w-[175px]
          xl:w-[220px]
        "
      />

      {/* =====================================================
          FLOATING LEAF 1
          ===================================================== */}

      <Image
        src="/images/vision-mission/floating-leaf-1.png"
        alt=""
        width={70}
        height={100}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[34%]
          top-[18%]
          z-0
          hidden
          w-[35px]
          rotate-[-20deg]
          opacity-50
          lg:block
          xl:w-[45px]
        "
      />

      {/* =====================================================
          FLOATING LEAF 2
          ===================================================== */}

      <Image
        src="/images/vision-mission/floating-leaf-2.png"
        alt=""
        width={70}
        height={100}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[36%]
          top-[48%]
          z-0
          hidden
          w-[30px]
          rotate-12
          opacity-45
          lg:block
          xl:w-[40px]
        "
      />

      {/* =====================================================
          FLOATING LEAF 3
          ===================================================== */}

      <Image
        src="/images/vision-mission/floating-leaf-3.png"
        alt=""
        width={70}
        height={100}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[18%]
          left-[42%]
          z-0
          hidden
          w-[32px]
          rotate-[-15deg]
          opacity-40
          lg:block
          xl:w-[42px]
        "
      />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <Container className="relative z-10">
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            md:gap-6
            lg:gap-8
            xl:gap-10
          "
        >
          {/* =================================================
              MOBILE/TABLET TITLE
              ================================================= */}

          <div
            className="
              order-1
              mx-auto
              flex
              w-full
              max-w-[590px]
              flex-col
              items-center
              text-center
              md:hidden
            "
          >
            {/* Eyebrow */}

            <div className="flex items-center justify-center gap-3">
              <span className="hidden h-px w-8 bg-primary/25 sm:block" />

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.30em]
                  text-primary
                  sm:text-base
                "
              >
                Our Vision
              </p>

              <span className="hidden h-px w-8 bg-primary/25 sm:block" />
            </div>

            {/* Main title */}

            <h1
              className="
                mt-3
                text-4xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-secondary
                sm:text-5xl
              "
            >
              Vision
            </h1>

            {/* Divider */}

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-primary/20 sm:w-14" />

              <Image
                src="/images/vision-mission/leaf-divider.png"
                alt=""
                width={180}
                height={55}
                aria-hidden="true"
                className="
                  h-auto
                  w-[85px]
                  opacity-75
                  sm:w-[105px]
                "
              />

              <span className="h-px w-10 bg-primary/20 sm:w-14" />
            </div>
          </div>

          {/* =================================================
              LEFT — VISION IMAGE
              ================================================= */}

          <div
            className="
              order-2
              relative
              mx-auto
              w-full
              max-w-[620px]
              md:order-1
            "
          >
            {/* Decorative offset frame */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-3
                -right-3
                h-full
                w-full
                rounded-[30px]
                bg-[#edf6ea]
                sm:-bottom-4
                sm:-right-4
                lg:-bottom-5
                lg:-right-5
              "
            />

            {/* Main image */}

            <div
              className="
                relative
                z-10
                overflow-hidden
                rounded-[28px]
                border
                border-white
                bg-white
                shadow-[0_18px_50px_rgba(24,59,59,0.12)]
              "
            >
              <Image
                src={vision.image}
                alt={vision.title}
                width={800}
                height={800}
                priority
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1023px) 48vw,
                  50vw
                "
                className="
                  block
                  h-auto
                  w-full
                  object-cover
                "
              />
            </div>
          </div>

          {/* =================================================
              RIGHT — VISION CONTENT
              ================================================= */}

          <div
            className="
              order-3
              relative
              mx-auto
              flex
              w-full
              max-w-[590px]
              flex-col
              items-center
              text-center
              md:order-2
            "
          >
            {/* =================================================
                DESKTOP TITLE
                ================================================= */}

            <div className="hidden w-full md:flex md:flex-col md:items-center md:text-center">
              {/* Eyebrow */}

              <div className="flex items-center justify-center gap-3">
                <span className="hidden h-px w-8 bg-primary/25 sm:block" />

                <p
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.30em]
                    text-primary
                    sm:text-base
                  "
                >
                  Our Vision
                </p>

                <span className="hidden h-px w-8 bg-primary/25 sm:block" />
              </div>

              {/* Main title */}

              <h1
                className="
                  mt-3
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-tight
                  text-secondary
                  sm:text-4xl
                  lg:text-5xl
                  xl:text-7xl
                "
              >
                Vision
              </h1>

              {/* Leaf divider */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span className="h-px w-10 bg-primary/20 sm:w-14" />

                <Image
                  src="/images/vision-mission/leaf-divider.png"
                  alt=""
                  width={180}
                  height={55}
                  aria-hidden="true"
                  className="
                    h-auto
                    w-[85px]
                    opacity-75
                    sm:w-[105px]
                  "
                />

                <span className="h-px w-10 bg-primary/20 sm:w-14" />
              </div>
            </div>

            {/* =================================================
                PARAGRAPHS
                ================================================= */}

            <div
              className="
                mt-7
                w-full
                space-y-5
                text-left
                sm:mt-8
                sm:space-y-6
              "
            >
              {vision.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="
                    text-lg
                    leading-9
                    text-slate-700
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* =====================================================
          VERY SOFT BOTTOM WAVE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-0
          h-[35px]
          overflow-hidden
          sm:h-[45px]
        "
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            fill="#edf6ea"
            d="
              M0 58
              C150 82 280 80 420 63
              C560 46 670 45 790 57
              C920 70 1040 79 1160 64
              C1280 49 1360 44 1440 52
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