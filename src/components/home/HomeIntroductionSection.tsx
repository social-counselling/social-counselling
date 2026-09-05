import Image from "next/image";

import Container from "@/components/common/Container";
import { homeIntroduction } from "@/data/home";

export default function HomeIntroductionSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-16
        sm:py-20
        lg:py-24
        xl:py-28
      "
    >

     <Image
  src="/images/home/introduction/vertical2.png"
  alt=""
  width={128}
  height={671}
  aria-hidden="true"
  className="
    pointer-events-none
    absolute
    right-0
    top-1/2
    z-0
    h-[clamp(220px,42vh,600px)]
    w-auto
    -translate-y-1/2
    scale-x-[-1]
    opacity-25
    sm:h-[clamp(280px,44vh,600px)]
    sm:opacity-28
    md:h-[clamp(340px,48vh,600px)]
    md:opacity-30
    lg:h-[clamp(420px,55vh,600px)]
    xl:h-[600px]
    xl:opacity-35
  "
/>

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
          z-0
          w-[90px]
          opacity-45
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[210px]
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
          z-0
          w-[90px]
          opacity-40
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[205px]
        "
      />

      <Container className="relative z-10">
        {/* ===================================================
            HEADER
            =================================================== */}

        {/* ===================================================
    HEADER
    =================================================== */}

<div className="mx-auto max-w-4xl text-center">
  {/* Title */}
  <p
    className="
      text-[11px]
      font-bold
      uppercase
      tracking-[0.32em]
      text-primary
      sm:text-xs
      lg:text-sm
    "
  >
    {homeIntroduction.eyebrow}
  </p>

  {/* Leaf Divider */}
  <div
    className="mt-4 flex justify-center sm:mt-5"
    aria-hidden="true"
  >
    <Image
      src="/images/home/introduction/leaf-divider.png"
      alt=""
      width={140}
      height={40}
      className="
        h-auto
        w-[100px]
        opacity-70
        sm:w-[120px]
        lg:w-[140px]
      "
    />
  </div>

  {/* Subtitle */}
  <h2
    className="
      mx-auto
      mt-5
      max-w-3xl
      text-center
      text-2xl
      font-bold
      leading-tight
      tracking-tight
      text-secondary
      sm:mt-6
      sm:text-3xl
      lg:text-4xl
      xl:text-[42px]
    "
  >
    {homeIntroduction.title}
  </h2>
</div>

        {/* ===================================================
            MAIN CONTENT
            =================================================== */}

        <div
          className="
            relative
            mt-10
            sm:mt-12
            xl:mt-14
          "
        >
          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-10
              xl:grid-cols-[1.08fr_0.92fr]
              xl:gap-20
              2xl:gap-24
            "
          >
            {/* =================================================
                LEFT — VISUAL STORY
                ================================================= */}

            <div className="relative">
              {/* Title */}

             

              {/* Image */}

              <div
                className="
                  relative
                  mt-8
                  sm:mt-10
                "
              >
                {/* soft background glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -inset-5
                    rounded-[45%]
                    bg-primary/[0.035]
                    blur-3xl
                  "
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden">
                  <Image
                    src="/images/home/introduction/introduction-scene1.png"
                    alt="A peaceful mountain lake landscape"
                    width={1536}
                    height={1024}
                    sizes="
                      (min-width: 1280px) 55vw,
                      100vw
                    "
                    className="
                      block
                      h-auto
                      w-full
                    "
                  />

                  {/* organic image fade */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      left-0
                      right-0
                      h-[100px]
                      bg-gradient-to-t
                      from-white
                      via-white/35
                      to-transparent
                      sm:h-[125px]
                    "
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT — CONTENT
                ================================================= */}

            <div className="relative">
              {/* Desktop botanical divider */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -left-8
                  top-0
                  hidden
                  h-full
                  xl:block
                "
                aria-hidden="true"
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary/15" />

                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={40}
                  height={140}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[30px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-90
                    opacity-65
                  "
                />
              </div>

              {/* Mobile divider */}

              <div
                className="
                  mb-7
                  flex
                  justify-center
                  xl:hidden
                "
                aria-hidden="true"
              >
                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={140}
                  height={40}
                  className="h-auto w-[105px] opacity-55"
                />
              </div>

              {/* Paragraphs */}

             

<div
  className="
    mx-auto
    w-full
    max-w-3xl
    space-y-7
    sm:space-y-8
    xl:mx-0
    xl:max-w-none
  "
>
  {homeIntroduction.paragraphs.map(
    (paragraph, index) => (
      <div key={index}>
        <p
          className="
            text-[15px]
            leading-7
            text-slate-600
            sm:text-base
            sm:leading-8
            lg:text-[17px]
            lg:leading-8
            xl:text-[17px]
            xl:leading-9
          "
        >
          {paragraph}
        </p>

        {index === 0 && (
          <div
            className="
              mt-6
              flex
              justify-center
              sm:mt-7
              xl:justify-start
            "
            aria-hidden="true"
          >
            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              className="
                h-auto
                w-[90px]
                opacity-45
                sm:w-[105px]
              "
            />
          </div>
        )}
      </div>
    )
  )}
</div>
            </div>
          </div>
        </div>
      </Container>

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
          z-0
          w-[90px]
          opacity-30
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[210px]
        "
      />

      {/* =====================================================
          BOTTOM RIGHT LEAVES
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
          z-0
          w-[105px]
          opacity-35
          sm:w-[135px]
          lg:w-[180px]
          xl:w-[220px]
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