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
      =================================================== */}

 <div className="absolute inset-0 z-10">
  <div
    className={`
      absolute
      left-1/2
      z-20
      w-[82%]
      -translate-x-1/2

      rounded-3xl
      border
      border-white/50
      bg-white/25
      p-3
      shadow-xl
      backdrop-blur-md

      ${
        reverse
          ? "bottom-[6%]"
          : "top-[6%]"
      }

      sm:left-auto
      sm:right-4
      sm:w-[78%]
      sm:translate-x-0
      sm:p-5

      md:right-2
      md:w-[50%]
      md:p-6

      sm:${
        reverse
          ? "bottom-[5%]"
          : "top-[5%]"
      }
    `}
  >

    

      {/* =================================================
          EYEBROW
          ================================================= */}

      <p
        className="
          text-[8px]
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
          mt-1
          text-xl
          font-bold
          text-white

          sm:mt-2
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
          mt-3
          space-y-2

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
              text-[9px]
              leading-4
              text-white

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
                      text-white
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