import Container from "@/components/common/Container";
import { visionMissionData } from "@/data/visionMission";

export default function PurposeSection() {
  const { purpose } = visionMissionData;

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-primary
            "
          >
            OUR PURPOSE
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              text-secondary
              sm:text-4xl
              lg:text-5xl
            "
          >
            {purpose.title}
          </h2>

          <p
            className="
              mt-6
              text-base
              leading-8
              text-slate-600
              sm:text-lg
            "
          >
            {purpose.introduction}
          </p>

          <ul
            className="
              mt-8
              space-y-4
              text-base
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            {purpose.points.map((point, index) => (
              <li
                key={index}
                className="flex gap-3"
              >
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />

                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p
            className="
              mt-10
              text-base
              font-medium
              leading-8
              text-secondary
              sm:text-lg
            "
          >
            {purpose.conclusion}
          </p>
        </div>
      </Container>
    </section>
  );
}