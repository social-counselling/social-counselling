import Image from "next/image";

import Container from "@/components/common/Container";
import { aboutData } from "@/data/about";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="
          relative
          h-[300px]
          w-full
          sm:h-[400px]
          md:h-[500px]
          lg:h-[650px]
          xl:h-[760px]
        "
      >
        <Image
          src={aboutData.heroImage}
          alt="About Social Counselling"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>
    </section>
  );
}