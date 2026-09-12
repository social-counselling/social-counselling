import Image from "next/image";

import Container from "@/components/common/Container";
import { aboutData } from "@/data/about";
import SectionSideLeaves from "@/components/common/SectionSideLeaves";

export default function AboutBelief() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7fcf8]
        py-14
        sm:py-18
        lg:py-24
      "
    >

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
          w-[75px]
          opacity-55
          sm:w-[110px]
          lg:w-[165px]
          xl:w-[205px]
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
          w-[75px]
          opacity-55
          sm:w-[105px]
          lg:w-[160px]
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
          z-1
          w-[80px]
          opacity-55
          sm:w-[115px]
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
          w-[85px]
          opacity-55
          sm:w-[120px]
          lg:w-[175px]
          xl:w-[215px]
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
            gap-8
            md:grid-cols-[0.85fr_1.15fr]
            md:gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-14
            xl:gap-20
          "
        >

          {/* =================================================
              LEFT — Lady IMAGE
              ================================================= */}

        <div
  className="
    relative
    mx-auto
    hidden
    w-full
    max-w-[330px]
    items-end
    justify-center
    md:flex
    md:max-w-[200px]
    lg:max-w-[380px]
    xl:max-w-[420px]
  "
>

            

            <Image
            src= {aboutData.belief.image}
              alt="Young lady representing belief and positive guidance"
              width={900}
              height={1000}
              priority
              className="
                relative
                z-10
                block
                h-auto
                w-full
                object-contain
              "
            />

          </div>

          {/* =================================================
              RIGHT — BELIEF CONTENT
              ================================================= */}

          <div
            className="
              mx-auto
              w-full
              max-w-2xl
              text-center
              md:text-left
            "
          >

            {/* Eyebrow */}
            <p
              className="
                text-2xl
                font-bold
                tracking-[0.25em]
                text-primary
                sm:text-2xl
                lg:text-4xl
                font-Unkempt
              "
            >
              {aboutData.belief.eyebrow}
            </p>

          

            {/* Decorative divider */}
            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-3
                md:justify-start
              "
            >
              <span className="hidden h-px w-10 bg-primary/20 sm:block" />

              <Image
                src="/images/home/introduction/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                aria-hidden="true"
                className="
                  h-auto
                  w-[90px]
                  opacity-65
                  sm:w-[100px]
                "
              />

              <span className="hidden h-px w-10 bg-primary/20 sm:block" />
            </div>

            {/* Paragraphs */}
            <div
              className="
                mt-7
                space-y-5
                sm:mt-8
                sm:space-y-6
              "
            >
              {aboutData.belief.paragraphs.map(
                (paragraph, index) => (
                  <p
                    key={index}
                    className="
                      text-lg
                      leading-9
                      text-slate-600
                      sm:text-lg
                      sm:leading-9
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
          SMALL BOTTOM DECORATIVE LINE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-px
          w-[70%]
          -translate-x-1/2
          bg-primary/10
          sm:w-[60%]
          lg:w-[45%]
        "
      />
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