import Image from "next/image";

import Container from "@/components/common/Container";
import { visionMissionData } from "@/data/visionMission";

export default function MissionSection() {
  const mission = visionMissionData.mission;

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f3f9ef]
        py-14
        sm:py-16
        lg:py-20
        xl:py-24
      "
    >
      {/* =====================================================
          TOP LEFT LEAF
          ===================================================== */}

      <Image
        src="/images/vision-mission/leaf-top-left.png"
        alt=""
        width={260}
        height={280}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          w-[65px]
          rotate-[-5deg]
          opacity-35
          sm:w-[95px]
          md:w-[115px]
          lg:w-[150px]
          xl:w-[190px]
        "
      />

      {/* =====================================================
          TOP RIGHT LEAF
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
          rotate-3
          opacity-40
          sm:w-[100px]
          md:w-[120px]
          lg:w-[155px]
          xl:w-[195px]
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
          opacity-40
          sm:w-[100px]
          md:w-[125px]
          lg:w-[160px]
          xl:w-[205px]
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
          w-[70px]
          opacity-40
          sm:w-[100px]
          md:w-[125px]
          lg:w-[160px]
          xl:w-[205px]
        "
      />

      {/* =====================================================
          FLOATING LEAF — LEFT
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
          left-[8%]
          top-[40%]
          z-0
          hidden
          w-[32px]
          rotate-[-25deg]
          opacity-40
          lg:block
          xl:w-[42px]
        "
      />

      {/* =====================================================
          FLOATING LEAF — RIGHT
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
          right-[8%]
          top-[28%]
          z-0
          hidden
          w-[30px]
          rotate-12
          opacity-40
          lg:block
          xl:w-[40px]
        "
      />

      {/* =====================================================
          FLOATING LEAF — CENTER
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
          bottom-[20%]
          left-[47%]
          z-0
          hidden
          w-[30px]
          rotate-[-12deg]
          opacity-35
          lg:block
          xl:w-[40px]
        "
      />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <Container className="relative z-10">
        <div
          className="
            grid
            items-center
            gap-6
            md:grid-cols-2
            md:gap-6
            lg:gap-8
            xl:gap-10
          "
        >
          {/* =================================================
              LEFT — MISSION CONTENT
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
              md:items-center
            "
          >
            {/* =================================================
                EYEBROW
                ================================================= */}

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
              Our Mission
            </p>

            {/* =================================================
                MAIN TITLE
                ================================================= */}

            <h1
              className="
                mt-2
                text-4xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-secondary
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Mission
            </h1>

            {/* =================================================
                LEAF DIVIDER
                ================================================= */}

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

            {/* =================================================
                MISSION PARAGRAPHS
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
              {mission.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="
                    text-base
                    leading-7
                    text-slate-700
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* =================================================
                SMALL DECORATIVE DOTS
                ================================================= */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-2
              "
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/15" />
            </div>
          </div>

          {/* =================================================
              RIGHT — MISSION IMAGE
              ================================================= */}

          <div
            className="
              relative
              order-2
              mx-auto
              w-full
              max-w-[620px]
            "
          >
            {/* =================================================
                OFFSET FRAME
                ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-3
                -left-3
                h-full
                w-full
                rounded-[30px]
                bg-white/70
                sm:-bottom-4
                sm:-left-4
                lg:-bottom-5
                lg:-left-5
              "
            />

            {/* =================================================
                IMAGE
                ================================================= */}

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
                src={mission.image}
                alt={mission.title}
                width={800}
                height={800}
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

            {/* =================================================
                FLOWER ACCENT
                ================================================= */}

            {/* <Image
              src="/images/vision-mission/flower-accent.png"
              alt=""
              width={150}
              height={150}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-7
                -right-6
                z-20
                w-[70px]
                opacity-90
                sm:-bottom-9
                sm:-right-8
                sm:w-[90px]
                lg:w-[105px]
              "
            /> */}
          </div>
        </div>
      </Container>

      {/* =====================================================
          BOTTOM WAVE
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
            fill="#ffffff"
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