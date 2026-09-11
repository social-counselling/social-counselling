import Image from "next/image";

import Container from "@/components/common/Container";
import { aboutData } from "@/data/about";
import SectionSideLeaves from "@/components/common/SectionSideLeaves";

export default function AboutThought() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-18 lg:py-24">

<SectionSideLeaves/>

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
          z-1
          w-[70px]
          opacity-58
          sm:w-[100px]
          lg:w-[150px]
          xl:w-[190px]
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
                z-1
                w-[90px]
                opacity-60
                sm:w-[120px]
                lg:w-[170px]
                xl:w-[205px]
              "
            />

                 {/* =====================================================
                             BOTTOM LEFT LEAVES
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
                             z-1
                             w-[90px]
                             opacity-60
                             sm:w-[120px]
                             lg:w-[170px]
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
          z-1
          w-[80px]
        opacity-60
          sm:w-[110px]
          lg:w-[160px]
          xl:w-[200px]
        "
      />

      <Container className="relative z-10">

        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
            xl:gap-20
          "
        >

          {/* =================================================
              LEFT IMAGE
              ================================================= */}

          <div className="relative mx-auto w-full max-w-[520px]">

            {/* Soft decorative frame */}
            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-3
                -left-3
                h-full
                w-full
                rounded-[30px]
                border
                border-primary/15
                sm:-bottom-4
                sm:-left-4
              "
            />

            {/* Image */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-[#f7fcf8]
                shadow-[0_15px_45px_rgba(24,59,59,0.10)]
              "
            >
              <Image
                src={aboutData.thought.image}
                alt={aboutData.thought.title}
                width={900}
                height={700}
                className="
                  block
                  h-auto
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-[1.02]
                "
              />
            </div>

            {/* Small leaf decoration */}
            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                absolute
                -bottom-6
                left-1/2
                h-auto
                w-[90px]
                -translate-x-1/2
                opacity-70
                sm:-bottom-7
              "
            />

          </div>

          {/* =================================================
              RIGHT CONTENT
              ================================================= */}

          <div className="mx-auto w-full max-w-2xl">

            <p
              className="
                text-2xl
                font-bold
                tracking-[0.25em]
                text-primary
                sm:text-2xl
                lg:text-3xl
                font-Unkempt
              "
            >
              {aboutData.thought.eyebrow}
            </p>

            <h1
              className="
                mt-4
                text-2xl
                font-bold
                leading-tight
                text-secondary
                sm:text-3xl
                lg:text-4xl
                xl:text-5xl
              "
            >
              {aboutData.thought.title}
            </h1>

            {/* Leaf divider */}
            <div className="mt-5">
              <Image
                src="/images/home/introduction/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                aria-hidden="true"
                className="h-auto w-[95px] opacity-65"
              />
            </div>

            {/* Paragraphs */}
            <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
              {aboutData.thought.paragraphs.map(
                (paragraph, index) => (
                  <p
                    key={index}
                    className="
                      text-base
                      leading-7
                      text-slate-600
                      sm:text-lg
                      sm:leading-8
                    "
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

          </div>

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