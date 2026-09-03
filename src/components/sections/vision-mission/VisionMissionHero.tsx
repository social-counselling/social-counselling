import Image from "next/image";

import Container from "@/components/common/Container";
import { visionMissionData } from "@/data/visionMission";

function ImageSection({
  title,
  image,
  paragraphs,
  reverse = false,
}: {
  title: string;
  image: string;
  paragraphs: string[];
  reverse?: boolean;
}) {
  return (
    <section className="relative w-full overflow-hidden">

      {/* =====================================================
          MOBILE + TABLET
          < 1024px
          ===================================================== */}

      <div className="relative w-full lg:hidden">

        {/* ===================================================
            FULL IMAGE
            h-auto + w-full keeps the complete image visible.
            =================================================== */}

        <Image
          src={image}
          alt={title}
          width={1200}
          height={800}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />

        {/* ===================================================
            CONTENT OVER IMAGE

            This is directly relative to the image.
            =================================================== */}

        <div className="absolute inset-0 z-10">

     <div
  className={`
    absolute
    z-20

    /* ================= MOBILE ================= */
    left-1/2
    -translate-x-1/2
    w-[72%]

    rounded-3xl
    border
    border-white/50
    bg-white/25
    p-3
    shadow-xl
    backdrop-blur-md

    /* ================= TABLET ================= */
    sm:left-auto
    sm:right-4
    sm:translate-x-0
    sm:w-[78%]
    sm:p-5

    md:right-2
    md:w-[50%]
    md:p-6

    /* ================= POSITION ================= */
    ${
      reverse
        ? "bottom-2"
        : "top-2"
    }
  `}
>

            {/* =================================================
                EYEBROW
                ================================================= */}

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-primary

                sm:text-xs
              "
            >
              {title}
            </p>

            {/* =================================================
                TITLE
                ================================================= */}

            <h1
              className="
                mt-2
                text-2xl
                font-bold
                text-secondary

                sm:text-3xl
                md:text-4xl
              "
            >
              {title}
            </h1>

            {/* =================================================
                PARAGRAPHS
                ================================================= */}

            <div
              className="
                mt-4
                space-y-3

                sm:mt-5
                sm:space-y-4

                md:mt-5
                md:space-y-4
              "
            >
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="
                     text-[10px]
  leading-4
  text-slate-800

  sm:text-xs
  sm:leading-6

                    md:text-sm
                    md:leading-6
                  "
                >
                  {paragraph}
                </p>
              ))}
            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          DESKTOP
          >= 1024px

          Desktop behavior remains unchanged.
          ===================================================== */}

      <div
        className="
          relative
          hidden
          w-full
          min-h-[700px]
          lg:block
          xl:min-h-[780px]
        "
      >

        {/* ===================================================
            DESKTOP IMAGE
            =================================================== */}

        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* ===================================================
            DESKTOP CONTENT
            =================================================== */}

        <Container className="relative z-10 h-full">

          <div
            className="
              relative
              min-h-[700px]
              xl:min-h-[780px]

              flex
              items-center
              justify-end
            "
          >

            <div
              className="
                relative
                z-20
                w-full
                max-w-xl

                rounded-3xl
                border
                border-white/50
                bg-white/25
                p-10
                shadow-xl
                backdrop-blur-md
              "
            >

              {/* =================================================
                  EYEBROW
                  ================================================= */}

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-primary
                "
              >
                {title}
              </p>

              {/* =================================================
                  TITLE
                  ================================================= */}

              <h1
                className="
                  mt-3
                  text-5xl
                  font-bold
                  text-secondary
                "
              >
                {title}
              </h1>

              {/* =================================================
                  PARAGRAPHS
                  ================================================= */}

              <div className="mt-6 space-y-4">

                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="
                      text-base
                      leading-7
                      text-slate-800
                    "
                  >
                    {paragraph}
                  </p>
                ))}

              </div>

            </div>

          </div>

        </Container>
      </div>

    </section>
  );
}


/* =========================================================
   VISION + MISSION
   ========================================================= */

export default function VisionMissionHero() {
  return (
    <>
      {/* =====================================================
          VISION
          Content: TOP RIGHT on mobile/tablet
          ===================================================== */}

      <ImageSection
        title={visionMissionData.vision.title}
        image={visionMissionData.vision.image}
        paragraphs={visionMissionData.vision.paragraphs}
      />

      {/* =====================================================
          MISSION
          Content: BOTTOM RIGHT on mobile/tablet
          ===================================================== */}

      <ImageSection
        title={visionMissionData.mission.title}
        image={visionMissionData.mission.image}
        paragraphs={visionMissionData.mission.paragraphs}
        reverse
      />
    </>
  );
}