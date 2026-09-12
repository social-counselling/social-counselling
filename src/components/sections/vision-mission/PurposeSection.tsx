import Image from "next/image";

import Container from "@/components/common/Container";
import { visionMissionData } from "@/data/visionMission";

export default function PurposeSection() {
  const { purpose } = visionMissionData;

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#fcfdf9]
        py-12
        sm:py-16
        lg:py-20
        xl:py-24
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
          w-[70px]
          opacity-40
          sm:w-[90px]
          md:w-[115px]
          lg:w-[140px]
          xl:w-[175px]
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
          w-[65px]
          opacity-30
          sm:w-[90px]
          md:w-[115px]
          lg:w-[145px]
          xl:w-[180px]
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
          w-[70px]
          opacity-35
          sm:w-[95px]
          md:w-[120px]
          lg:w-[150px]
          xl:w-[190px]
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
          w-[75px]
          opacity-35
          sm:w-[100px]
          md:w-[125px]
          lg:w-[155px]
          xl:w-[195px]
        "
      />

      {/* =====================================================
          FLOATING LEAVES
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
          left-[36%]
          top-[22%]
          z-0
          hidden
          w-[32px]
          rotate-[-20deg]
          opacity-45
          lg:block
          xl:w-[42px]
        "
      />

      <Image
        src="/images/vision-mission/floating-leaf-2.png"
        alt=""
        width={70}
        height={100}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[34%]
          top-[45%]
          z-0
          hidden
          w-[30px]
          rotate-12
          opacity-40
          lg:block
          xl:w-[40px]
        "
      />

      <Image
        src="/images/vision-mission/floating-leaf-3.png"
        alt=""
        width={70}
        height={100}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[20%]
          left-[43%]
          z-0
          hidden
          w-[30px]
          rotate-[-15deg]
          opacity-40
          lg:block
          xl:w-[40px]
        "
      />

      {/* =====================================================
          CONTAINER
          ===================================================== */}

      <Container className="relative z-10">

        {/* ===================================================
            HEADING
            =================================================== */}

        <div
          className="
            mx-auto
            max-w-4xl
            text-center
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
              Our Purpose
            </p>

            <span className="hidden h-px w-8 bg-primary/25 sm:block" />
          </div>

          {/* Title */}

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-secondary
              sm:text-4xl
              lg:text-5xl
              xl:text-6xl
            "
          >
            {purpose.title}
          </h2>

          {/* Divider */}

          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-5">
            <span className="h-px w-10 bg-primary/20 sm:w-14" />

            <Image
              src="/images/vision-mission/leaf-divider.png"
              alt=""
              width={180}
              height={55}
              aria-hidden="true"
              className="
                h-auto
                w-[80px]
                opacity-70
                sm:w-[100px]
              "
            />

            <span className="h-px w-10 bg-primary/20 sm:w-14" />
          </div>
        </div>

        {/* ===================================================
            MAIN AREA
            =================================================== */}

        <div
          className="
            mt-8
            grid
            items-stretch
            gap-6
            md:mt-10
            md:grid-cols-[0.95fr_1.05fr]
            md:gap-7
            lg:gap-9
            xl:gap-12
          "
        >

          {/* =================================================
              LEFT — IMAGE
              ================================================= */}

          <div
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[650px]
              items-center
            "
          >
            {/* Soft botanical panel */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-5
                left-4
                right-0
                rounded-[36px]
                bg-[#edf6ea]
                sm:inset-y-6
                sm:left-6
              "
            />

            {/* Decorative leaf */}

            <Image
              src="/images/vision-mission/floating-leaf-3.png"
              alt=""
              width={70}
              height={100}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-3
                top-[18%]
                z-20
                hidden
                w-[42px]
                rotate-[-25deg]
                opacity-55
                lg:block
              "
            />

            {/* Image */}

            <div
              className="
                relative
                z-10
                w-full
                overflow-hidden
                rounded-[30px]
                border
                border-white
                bg-white
                shadow-[0_18px_50px_rgba(24,59,59,0.12)]
              "
            >
              <Image
                src="/images/vision-mission/Purpose.png"
                alt="People growing and nurturing together"
                width={1536}
                height={1024}
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
              RIGHT — CONTENT
              ================================================= */}

          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[650px]
              flex-col
            "
          >

            {/* Introduction */}

            <p
              className="
                text-base
                leading-7
                text-slate-600
                sm:text-lg
                sm:leading-8
              "
            >
              {purpose.introduction}
            </p>

            {/* =================================================
                POINTS
                ================================================= */}

            <div
              className="
                mt-6
                grid
                gap-x-6
                gap-y-3
                sm:mt-7
                sm:grid-cols-2
                sm:gap-y-3.5
              "
            >
              {purpose.points.map((point, index) => (
                <div
                  key={index}
                  className="
                    group
                    flex
                    items-start
                    gap-3
                  "
                >
                  {/* Number */}

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#edf6ea]
                      text-[9px]
                      font-semibold
                      text-primary
                      transition-all
                      duration-200
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Text */}

                  <p
                    className="
                      flex-1
                      text-base
                      leading-6
                      text-slate-600
                      sm:text-[17px]
                      sm:leading-6
                    "
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* =================================================
                CONCLUSION
                ================================================= */}

            <div
              className="
                relative
                mt-7
                border-t
                border-primary/15
                pt-6
                sm:mt-8
                sm:pt-7
              "
            >
              {/* Small leaf */}

              <Image
                src="/images/vision-mission/flower-accent.png"
                alt=""
                width={180}
                height={55}
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-1
                  -top-17
                  h-auto
                  w-[75px]

                  opacity-35
                  sm:w-[90px]
                "
              />

              <p
                className="
                  relative
                  text-lg
                  font-medium
                  leading-7
                  text-secondary
                  sm:text-lg
                  sm:leading-8
                "
              >
                {purpose.conclusion}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM DECORATIVE DIVIDER
            =================================================== */}

        <div
          className="
            mx-auto
            mt-9
            flex
            max-w-3xl
            items-center
            justify-center
            gap-4
            sm:mt-12
          "
        >
          <span className="h-px flex-1 bg-primary/10" />

          <Image
            src="/images/home/introduction/horizontal_leaves1.png"
            alt=""
            width={180}
            height={55}
            aria-hidden="true"
            className="
              h-auto
              w-[70px]
              opacity-45
              sm:w-[85px]
            "
          />

          <span className="h-px flex-1 bg-primary/10" />
        </div>
      </Container>
 {/* =====================================================
          ORGANIC SECTION TRANSITION
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-[55px]
          overflow-hidden
          sm:h-[65px]
          lg:h-[75px]
        "
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
        >
          <path
             fill="#E8F5E9"
            d="
              M0 65
              C120 95 210 112 340 102
              C470 92 535 55 665 65
              C795 75 850 112 970 105
              C1090 98 1145 65 1250 72
              C1340 78 1390 92 1440 88
              L1440 140
              L0 140
              Z
            "
          />
        </svg>
      </div>

    </section>
  );
}