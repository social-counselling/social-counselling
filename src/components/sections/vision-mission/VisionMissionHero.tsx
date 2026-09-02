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
      <div
        className="
          relative
          h-[520px]
          w-full
          sm:h-[580px]
          md:h-[620px]
          lg:h-[700px]
          xl:h-[760px]
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <Container className="relative z-10 h-full">
          <div
            className={`
              flex h-full items-center
              ${
                reverse
                  ? "justify-end"
                  : "justify-end"
              }
            `}
          >
            <div
              className="
                w-full
                max-w-xl
                rounded-3xl
                border
                border-white/50
                bg-white/20
                p-6
                shadow-xl
                backdrop-blur-md
                sm:p-8
                lg:p-10
              "
            >
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

              <h1
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-secondary
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {title}
              </h1>

              <div className="mt-6 space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="
                      text-sm
                      leading-7
                      text-slate-800
                      sm:text-base
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

export default function VisionMissionHero() {
  return (
    <>
      <ImageSection
        title={visionMissionData.vision.title}
        image={visionMissionData.vision.image}
        paragraphs={visionMissionData.vision.paragraphs}
      />

      <ImageSection
        title={visionMissionData.mission.title}
        image={visionMissionData.mission.image}
        paragraphs={visionMissionData.mission.paragraphs}
        reverse
      />
    </>
  );
}